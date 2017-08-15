Plotly.d3.csv('https://raw.githubusercontent.com/notZaki/ERRM/master/dataResults/e01-simResults-SingleTissueSim.csv?token=AImhIRdNx3LG4ShlqPHHL--uXl2j9-Yhks5Zb7q_wA%3D%3D', function(err, rows){

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
    allStdKt = unpack(rows, 'stdErrKt'),
    allStdKep = unpack(rows, 'stdErrKep'),
    allStdVe = unpack(rows, 'stdErrVe'),
    allStdVp = unpack(rows, 'stdErrVp'),
    allSigmaC = unpackNum(rows,'sigmaC')
    listofParams = ['KTrans','kep','ve','vp'];

    var currentSigma = allSigmaC.filter(function(item, i, ar){ return ar.indexOf(item) === i; });
  var vpChoices = allVp.filter(function(item, i, ar){ return ar.indexOf(item) === i; });
  var tResChoices = allTemporalRes.filter(function(item, i, ar){ return ar.indexOf(item) === i; });
  var modelChoices = fitMethods.filter(function(item, i, ar){ return ar.indexOf(item) === i; })

  currentSigma2 = [];
  for (var i = 0, len = currentSigma.length; i < len; i++) {
    currentSigma2[i]=currentSigma[i]+0.001;
  }

  function getParamData(chosenModelA,chosenModelB,chosenVp,chosenTRes) {
    currentErrKt1 = [];
    currentErrKep1 = [];
    currentErrVe1 = [];
    currentErrVp1 = [];

    currentErrKt2 = [];
    currentErrKep2 = [];
    currentErrVe2 = [];
    currentErrVp2 = [];

    currentStdKt1 = [];
    currentStdKep1 = [];
    currentStdVe1 = [];
    currentStdVp1 = [];

    currentStdKt2 = [];
    currentStdKep2 = [];
    currentStdVe2 = [];
    currentStdVp2 = [];

    for (var i = 0 ; i < allSigmaC.length ; i++){
      if ( fitMethods[i] === chosenModelA && allTemporalRes[i]==chosenTRes && allVp[i]==chosenVp) {
        currentErrKt1.push(allErrKt[i]);
        currentStdKt1.push(allStdKt[i]);
        currentErrKep1.push(allErrKep[i]);
        currentStdKep1.push(allStdKep[i]);
        currentErrVe1.push(allErrVe[i]);
        currentStdVe1.push(allStdVe[i]);
        currentErrVp1.push(allErrVp[i]);
        currentStdVp1.push(allStdVp[i]);
      } if ( fitMethods[i] === chosenModelB && allTemporalRes[i]==chosenTRes && allVp[i]==chosenVp) {
        currentErrKt2.push(allErrKt[i]);
        currentStdKt2.push(allStdKt[i]);
        currentErrKep2.push(allErrKep[i]);
        currentStdKep2.push(allStdKep[i]);
        currentErrVe2.push(allErrVe[i]);
        currentStdVe2.push(allStdVe[i]);
        currentErrVp2.push(allErrVp[i]);
        currentStdVp2.push(allStdVp[i]);
      }
    }
  };

var colA = '#ff9955';
var colB = '#7e2f8e';

var lineW = 3;
var errW = 10;

// Default Country Data
setBubblePlot('ERRM','CERRM',0.1,5);

function setBubblePlot(chosenModelA,chosenModelB,chosenVp,chosenTRes) {
    getParamData(chosenModelA,chosenModelB,chosenVp,chosenTRes);

    var trace11 = {
      name: chosenModelA,
      legendgroup: chosenModelA,
      x: currentSigma,
      y: currentErrKt1,
      mode: 'lines+markers',
      type: 'scatter',
      line: {
        color: colA,
        width: lineW
      },
      error_y:{
        type: 'data',
        array: currentStdKt1,
        color: colA,
        thickness : lineW,
        width : errW,
        visible:true
      }
    };

    var trace12 = {
      name: chosenModelB,
      legendgroup: chosenModelB,
      x: currentSigma2,
      y: currentErrKt2,
      mode: 'lines+markers',
      type: 'scatter',
      line: {
        color: colB,
        width: lineW
      },
      error_y:{
        type: 'data',
        array: currentStdKt2,
        color: colB,
        thickness : lineW,
        width : errW,
        visible:true
      }
    };

    var trace21 = {
      name: chosenModelA,
      legendgroup: chosenModelA,
      x: currentSigma,
      y: currentErrKep1,
      mode: 'lines+markers',
      type: 'scatter',
      xaxis:'x2',
      yaxis:'y2',
      showlegend: false,
      line: {
        color: colA,
        width: lineW
      },
      error_y:{
        type: 'data',
        array: currentStdKep1,
        color: colA,
        thickness : lineW,
        width : errW,
        visible:true
      }
    };

    var trace22 = {
      name: chosenModelB,
      legendgroup: chosenModelB,
      x: currentSigma2,
      y: currentErrKep2,
      mode: 'lines+markers',
      type: 'scatter',
      xaxis:'x2',
      yaxis:'y2',
      showlegend: false,
      line: {
        color: colB,
        width: lineW
      },
      error_y:{
        type: 'data',
        array: currentStdKep2,
        color: colB,
        thickness : lineW,
        width : errW,
        visible:true
      }
    };

    var trace31 = {
      name: chosenModelA,
      legendgroup: chosenModelA,
      x: currentSigma,
      y: currentErrVe1,
      mode: 'lines+markers',
      type: 'scatter',
      xaxis:'x3',
      yaxis:'y3',
      showlegend: false,
      line: {
        color: colA,
        width: lineW
      },
      error_y:{
        type: 'data',
        array: currentStdVe1,
        color: colA,
        thickness : lineW,
        width : errW,
        visible:true
      }
    };

    var trace32 = {
      name: chosenModelB,
      legendgroup: chosenModelB,
      x: currentSigma,
      y: currentErrVe2,
      mode: 'lines+markers',
      type: 'scatter',
      xaxis:'x3',
      yaxis:'y3',
      showlegend: false,
      line: {
        color: colB,
        width: lineW
      },
      error_y:{
        type: 'data',
        array: currentStdVe2,
        color: colB,
        thickness : lineW,
        width : errW,
        visible:true
      }
    };

    var trace41 = {
      name: chosenModelA,
      legendgroup: chosenModelA,
      x: currentSigma,
      y: currentErrVp1,
      mode: 'lines+markers',
      type: 'scatter',
      xaxis:'x4',
      yaxis:'y4',
      showlegend: false,
      line: {
        color: colA,
        width: lineW
      },
      error_y:{
        type: 'data',
        array: currentStdVp1,
        color: colA,
        thickness : lineW,
        width : errW,
        visible:true
      }
    };

    var trace42 = {
      name: chosenModelB,
      legendgroup: chosenModelB,
      x: currentSigma2,
      y: currentErrVp2,
      mode: 'lines+markers',
      type: 'scatter',
      xaxis:'x4',
      yaxis:'y4',
      showlegend: false,
      line: {
        color: colB,
        width: lineW
      },
      error_y:{
        type: 'data',
        array: currentStdVp2,
        color: colB,
        thickness : lineW,
        width : errW,
        visible:true
      }
    };


    var data = [trace11,trace12,trace21,trace22,trace31,trace32,trace41,trace42];

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
      title: 'Percent Error for when vp = ' + chosenVp + ' and TRes = ' + chosenTRes
    };

    Plotly.newPlot('plotdiv', data, layout);
};

var innerContainer = document.querySelector('[data-num="0"'),
    plotEl = innerContainer.querySelector('.plot'),
    vpSelector = innerContainer.querySelector('.vpChoice');
    tResSelector = innerContainer.querySelector('.tResChoice');
    modelSelectorA = innerContainer.querySelector('.modelChoiceA');
    modelSelectorB = innerContainer.querySelector('.modelChoiceB');

function assignOptions(textArray, selector) {
  for (var i = 0; i < textArray.length;  i++) {
      var currentOption = document.createElement('option');
      currentOption.text = textArray[i];
      selector.appendChild(currentOption);
  }
}

assignOptions(vpChoices,vpSelector);
assignOptions(tResChoices,tResSelector);
assignOptions(modelChoices,modelSelectorA);
assignOptions(modelChoices,modelSelectorB);
vpSelector.value = 0.1;
tResSelector.value = 5;
modelSelectorA.value = 'ERRM';
modelSelectorB.value = 'CERRM';

function updateParams(){
    setBubblePlot(modelSelectorA.value,modelSelectorB.value,vpSelector.value,tResSelector.value);
}

vpSelector.addEventListener('change', updateParams, false);
tResSelector.addEventListener('change', updateParams, false);
modelSelectorA.addEventListener('change', updateParams, false);
modelSelectorB.addEventListener('change', updateParams, false);
});
