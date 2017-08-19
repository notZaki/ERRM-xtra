Plotly.d3.csv('https://raw.githubusercontent.com/MPUmri/ERRM/master/dataResults/e03a-downsampleMapResultsMean.csv', function(err, rows){

  function unpack(rows, key) {
    return rows.map(function(row) { return row[key]; });
  }

  function unpackNum(rows, key) {
    return rows.map(function(row) { return Number(row[key]); });
  }

  var fitMethods = unpack(rows,'FitMethod'),
  allTemporalRes = unpackNum(rows,'TemporalRes'),
  allVp = unpackNum(rows,'TrueVp'),
  allErrKt = unpack(rows, 'errKt'),
  allErrKep = unpack(rows, 'errKep'),
  allErrVe = unpack(rows, 'errVe'),
  allErrVp = unpack(rows, 'errVp'),
  allStdKt = unpack(rows, 'stdKt'),
  allStdKep = unpack(rows, 'stdKep'),
  allStdVe = unpack(rows, 'stdVe'),
  allStdVp = unpack(rows, 'stdVp'),
  allSigmaC = unpackNum(rows,'sigmaC')

  var currentTResA = allTemporalRes.filter(function(item, i, ar){ return ar.indexOf(item) === i; });
  var modelChoices = fitMethods.filter(function(item, i, ar){ return ar.indexOf(item) === i; })
  var sigmaChoices = allSigmaC.filter(function(item, i, ar){ return ar.indexOf(item) === i; });

  currentTResB = [];
  for (var i = 0, len = currentTResA.length; i < len; i++) {
    currentTResB[i]=currentTResA[i];//-0.001;
  }

  function getParamData(chosenModelA,chosenModelB,chosenSigma) {

    currentErrKtA = [];
    currentErrKepA = [];
    currentErrVeA = [];
    currentErrVpA = [];

    currentErrKtB = [];
    currentErrKepB = [];
    currentErrVeB = [];
    currentErrVpB = [];

    currentStdKtA = [];
    currentStdKepA = [];
    currentStdVeA = [];
    currentStdVpA = [];

    currentStdKtB = [];
    currentStdKepB = [];
    currentStdVeB = [];
    currentStdVpB = [];

    for (var i = 0 ; i < fitMethods.length ; i++){
      if ( fitMethods[i] === chosenModelA && allSigmaC[i]==chosenSigma) {
        currentErrKtA.push(allErrKt[i]);
        currentErrKepA.push(allErrKep[i]);
        currentErrVeA.push(allErrVe[i]);
        currentErrVpA.push(allErrVp[i]);

        currentStdKtA.push(allStdKt[i]);
        currentStdKepA.push(allStdKep[i]);
        currentStdVeA.push(allStdVe[i]);
        currentStdVpA.push(allStdVp[i]);

      } if ( fitMethods[i] === chosenModelB && allSigmaC[i]==chosenSigma) {
        currentErrKtB.push(allErrKt[i]);
        currentErrKepB.push(allErrKep[i]);
        currentErrVeB.push(allErrVe[i]);
        currentErrVpB.push(allErrVp[i]);

        currentStdKtB.push(allStdKt[i]);
        currentStdKepB.push(allStdKep[i]);
        currentStdVeB.push(allStdVe[i]);
        currentStdVpB.push(allStdVp[i]);
      }
    }
  };

  var colourA = '#ff9955';
  var colourB = '#7e2f8e';

  var lineW = 3;
  var errW = 10;

  // Default Country Data
  setBubblePlot('CERRM','ETM',0.01);

  function setBubblePlot(chosenModelA,chosenModelB,chosenSigma) {
    getParamData(chosenModelA,chosenModelB,chosenSigma);

    var trace10 = {
      name: chosenModelA,
      legendgroup: chosenModelA,
      x: currentTResA,
      y: currentErrKtA,
      mode: 'lines+markers',
      type: 'scatter',
      line: {
        color: colourA,
        width: lineW
      },
      error_y:{
        type: 'data',
        array: currentStdKtA,
        color: colourA,
        thickness : lineW,
        width : errW,
        visible:true
      }
    };

    var trace11 = {
      name: chosenModelB,
      legendgroup: chosenModelB,
      x: currentTResB,
      y: currentErrKtB,
      mode: 'lines+markers',
      type: 'scatter',
      line: {
        color: colourB,
        width: lineW
      },
      error_y:{
        type: 'data',
        array: currentStdKtB,
        color: colourB,
        thickness : lineW,
        width : errW,
        visible:true
      }
    };

    var trace20 = {
      name: chosenModelA,
      legendgroup: chosenModelA,
      x: currentTResA,
      y: currentErrKepA,
      mode: 'lines+markers',
      type: 'scatter',
      xaxis:'x2',
      yaxis:'y2',
      showlegend: false,
      line: {
        color: colourA,
        width: lineW
      },
      error_y:{
        type: 'data',
        array: currentStdKepA,
        color: colourA,
        thickness : lineW,
        width : errW,
        visible:true
      }
    };

    var trace21 = {
      name: chosenModelB,
      legendgroup: chosenModelB,
      x: currentTResB,
      y: currentErrKepB,
      mode: 'lines+markers',
      type: 'scatter',
      xaxis:'x2',
      yaxis:'y2',
      showlegend: false,
      line: {
        color: colourB,
        width: lineW
      },
      error_y:{
        type: 'data',
        array: currentStdKepB,
        color: colourB,
        thickness : lineW,
        width : errW,
        visible:true
      }
    };

    var trace30 = {
      name: chosenModelA,
      legendgroup: chosenModelA,
      x: currentTResA,
      y: currentErrVeA,
      mode: 'lines+markers',
      type: 'scatter',
      xaxis:'x3',
      yaxis:'y3',
      showlegend: false,
      line: {
        color: colourA,
        width: lineW
      },
      error_y:{
        type: 'data',
        array: currentStdVeA,
        color: colourA,
        thickness : lineW,
        width : errW,
        visible:true
      }
    };

    var trace31 = {
      name: chosenModelB,
      legendgroup: chosenModelB,
      x: currentTResB,
      y: currentErrVeB,
      mode: 'lines+markers',
      type: 'scatter',
      xaxis:'x3',
      yaxis:'y3',
      showlegend: false,
      line: {
        color: colourB,
        width: lineW
      },
      error_y:{
        type: 'data',
        array: currentStdVeB,
        color: colourB,
        thickness : lineW,
        width : errW,
        visible:true
      }
    };

    var trace40 = {
      name: chosenModelA,
      legendgroup: chosenModelA,
      x: currentTResA,
      y: currentErrVpA,
      mode: 'lines+markers',
      type: 'scatter',
      xaxis:'x4',
      yaxis:'y4',
      showlegend: false,
      line: {
        color: colourA,
        width: lineW
      },
      error_y:{
        type: 'data',
        array: currentStdVpA,
        color: colourA,
        thickness : lineW,
        width : errW,
        visible:true
      }
    };

    var trace41 = {
      name: chosenModelB,
      legendgroup: chosenModelB,
      x: currentTResB,
      y: currentErrVpB,
      mode: 'lines+markers',
      type: 'scatter',
      xaxis:'x4',
      yaxis:'y4',
      showlegend: false,
      line: {
        color: colourB,
        width: lineW
      },
      error_y:{
        type: 'data',
        array: currentStdVpB,
        color: colourB,
        thickness : lineW,
        width : errW,
        visible:true
      }
    };


    var data = [trace10,trace11,trace20,trace21,
                trace30,trace31,trace40,trace41
               ];
    var layout = {
      height: 800,
      xaxis: {domain: [0, 0.45],hoverformat: '.2f'},
      yaxis: {domain: [0.55, 1],hoverformat: '.2f',title: '%Error in K<sup>Trans</sup>'},
      xaxis4: {
        domain: [0.55, 1],
        hoverformat: '.2f',
        title: 'σ [mM]',
        anchor: 'y4'
      },
      xaxis3: {
        domain: [0, 0.45],
        hoverformat: '.2f',
        title: 'σ [mM]',
        anchor: 'y3'
      },
      xaxis2: {domain: [0.55, 1],hoverformat: '.2f'},
      yaxis2: {
        domain: [0.55, 1],
        hoverformat: '.2f',
        title: '%Error in k<sub>ep</sub>',
        anchor: 'x2'
      },
      yaxis3: {domain: [0, 0.45],hoverformat: '.2f',title: '%Error in v<sub>e</sub>'},
      yaxis4: {
        domain: [0, 0.45],
        hoverformat: '.2f',
        title: '%Error in v<sub>p</sub>',
        anchor: 'x4'
      },
      title: 'Percent Error for ' + chosenModelA
    };

    Plotly.newPlot('plotdiv', data, layout);
  };

  var innerContainer = document.querySelector('[data-num="0"'),
      plotEl = innerContainer.querySelector('.plot'),
      modelSelectorA = innerContainer.querySelector('.modelChoiceA');
      modelSelectorB = innerContainer.querySelector('.modelChoiceB');
      sigmaSelector = innerContainer.querySelector('.sigmaChoice');

  function assignOptions(textArray, selector) {
    for (var i = 0; i < textArray.length;  i++) {
        var currentOption = document.createElement('option');
        currentOption.text = textArray[i];
        selector.appendChild(currentOption);
    }
  }

  assignOptions(modelChoices,modelSelectorA);
  assignOptions(modelChoices,modelSelectorB);
  assignOptions(sigmaChoices,sigmaSelector);

  modelSelectorA.value = 'CERRM';
  modelSelectorB.value = 'ETM';
  sigmaSelector.value = 0.01;

  function updateParams(){
      setBubblePlot(modelSelectorA.value,modelSelectorB.value,sigmaSelector.value);
  }

  modelSelectorA.addEventListener('change', updateParams, false);
  modelSelectorB.addEventListener('change', updateParams, false);
  sigmaSelector.addEventListener('change', updateParams, false);


});
