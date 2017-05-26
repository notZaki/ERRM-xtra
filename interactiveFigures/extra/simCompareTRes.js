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

  var currentSigma = allSigmaC.filter(function(item, i, ar){ return ar.indexOf(item) === i; });
  var tResChoices = allTemporalRes.filter(function(item, i, ar){ return ar.indexOf(item) === i; });
  var modelChoices = fitMethods.filter(function(item, i, ar){ return ar.indexOf(item) === i; })

  currentSigmaE = [];
  currentSigmaT = [];
  for (var i = 0, len = currentSigma.length; i < len; i++) {
    currentSigmaE[i]=currentSigma[i]+0.001;
    currentSigmaT[i]=currentSigma[i]-0.001;
  }

  function getParamData(chosenModel,chosenBlue, chosenNoir, chosenOrange) {
    currentErrKt1 = [];
    currentErrKep1 = [];
    currentErrVe1 = [];
    currentErrVp1 = [];

    currentErrKt2 = [];
    currentErrKep2 = [];
    currentErrVe2 = [];
    currentErrVp2 = [];

    currentErrKt3 = [];
    currentErrKep3 = [];
    currentErrVe3 = [];
    currentErrVp3 = [];

    currentStdKt1 = [];
    currentStdKep1 = [];
    currentStdVe1 = [];
    currentStdVp1 = [];

    currentStdKt2 = [];
    currentStdKep2 = [];
    currentStdVe2 = [];
    currentStdVp2 = [];

    currentStdKt3 = [];
    currentStdKep3 = [];
    currentStdVe3 = [];
    currentStdVp3 = [];

    for (var i = 0 ; i < allSigmaC.length ; i++){
      if ( fitMethods[i] === chosenModel && allTemporalRes[i]==chosenBlue) {
        currentErrKt1.push(allErrKt[i]);
        currentStdKt1.push(allStdKt[i]);
        currentErrKep1.push(allErrKep[i]);
        currentStdKep1.push(allStdKep[i]);
        currentErrVe1.push(allErrVe[i]);
        currentStdVe1.push(allStdVe[i]);
        currentErrVp1.push(allErrVp[i]);
        currentStdVp1.push(allStdVp[i]);
      } if ( fitMethods[i] === chosenModel && allTemporalRes[i]==chosenNoir) {
        currentErrKt2.push(allErrKt[i]);
        currentStdKt2.push(allStdKt[i]);
        currentErrKep2.push(allErrKep[i]);
        currentStdKep2.push(allStdKep[i]);
        currentErrVe2.push(allErrVe[i]);
        currentStdVe2.push(allStdVe[i]);
        currentErrVp2.push(allErrVp[i]);
        currentStdVp2.push(allStdVp[i]);
      } if ( fitMethods[i] === chosenModel && allTemporalRes[i]==chosenOrange) {
        currentErrKt3.push(allErrKt[i]);
        currentStdKt3.push(allStdKt[i]);
        currentErrKep3.push(allErrKep[i]);
        currentStdKep3.push(allStdKep[i]);
        currentErrVe3.push(allErrVe[i]);
        currentStdVe3.push(allStdVe[i]);
        currentErrVp3.push(allErrVp[i]);
        currentStdVp3.push(allStdVp[i]);
      }
    }
  };

var col1 = '#00ccff';
var col2 = '#4d4d4d';
var col3 = '#ff9955';

var lineW = 3;
var errW = 10;

setBubblePlot('CERRM',5,10,15);

function setBubblePlot(chosenModel,chosenBlue,chosenNoir,chosenOrange) {
    getParamData(chosenModel,chosenBlue,chosenNoir,chosenOrange);

    var Leg1 = 'TRes: ' + chosenBlue + 's'
    var Leg2 = 'TRes: ' + chosenNoir + 's'
    var Leg3 = 'TRes: ' + chosenOrange + 's'

    var trace11 = {
      name: Leg1,
      legendgroup: Leg1,
      x: currentSigmaT,
      y: currentErrKt1,
      mode: 'lines+markers',
      type: 'scatter',
      line: {
        color: col1,
        width: lineW
      },
      error_y:{
        type: 'data',
        array: currentStdKt1,
        color: col1,
        thickness : lineW,
        width : errW,
        visible:true
      }
    };

    var trace12 = {
      name: Leg2,
      legendgroup: Leg2,
      x: currentSigma,
      y: currentErrKt2,
      mode: 'lines+markers',
      type: 'scatter',
      line: {
        color: col2,
        width: lineW
      },
      error_y:{
        type: 'data',
        array: currentStdKt2,
        color: col2,
        thickness : lineW,
        width : errW,
        visible:true
      }
    };

    var trace13 = {
      name: Leg3,
      legendgroup: Leg3,
      x: currentSigmaE,
      y: currentErrKt3,
      mode: 'lines+markers',
      type: 'scatter',
      line: {
        color: col3,
        width: lineW
      },
      error_y:{
        type: 'data',
        array: currentStdKt3,
        color: col3,
        thickness : lineW,
        width : errW,
        visible:true
      }
    };

    var trace21 = {
      name: Leg1,
      legendgroup: Leg1,
      x: currentSigmaT,
      y: currentErrKep1,
      mode: 'lines+markers',
      type: 'scatter',
      xaxis:'x2',
      yaxis:'y2',
      showlegend: false,
      line: {
        color: col1,
        width: lineW
      },
      error_y:{
        type: 'data',
        array: currentStdKep1,
        color: col1,
        thickness : lineW,
        width : errW,
        visible:true
      }
    };

    var trace22 = {
      name: Leg2,
      legendgroup: Leg2,
      x: currentSigma,
      y: currentErrKep2,
      mode: 'lines+markers',
      type: 'scatter',
      xaxis:'x2',
      yaxis:'y2',
      showlegend: false,
      line: {
        color: col2,
        width: lineW
      },
      error_y:{
        type: 'data',
        array: currentStdKep2,
        color: col2,
        thickness : lineW,
        width : errW,
        visible:true
      }
    };

    var trace23 = {
      name: Leg3,
      legendgroup: Leg3,
      x: currentSigmaE,
      y: currentErrKep3,
      mode: 'lines+markers',
      type: 'scatter',
      xaxis:'x2',
      yaxis:'y2',
      showlegend: false,
      line: {
        color: col3,
        width: lineW
      },
      error_y:{
        type: 'data',
        array: currentStdKep3,
        color: col3,
        thickness : lineW,
        width : errW,
        visible:true
      }
    };

    var trace31 = {
      name: Leg1,
      legendgroup: Leg1,
      x: currentSigmaT,
      y: currentErrVe1,
      mode: 'lines+markers',
      type: 'scatter',
      xaxis:'x3',
      yaxis:'y3',
      showlegend: false,
      line: {
        color: col1,
        width: lineW
      },
      error_y:{
        type: 'data',
        array: currentStdVe1,
        color: col1,
        thickness : lineW,
        width : errW,
        visible:true
      }
    };

    var trace32 = {
      name: Leg2,
      legendgroup: Leg2,
      x: currentSigma,
      y: currentErrVe2,
      mode: 'lines+markers',
      type: 'scatter',
      xaxis:'x3',
      yaxis:'y3',
      showlegend: false,
      line: {
        color: col2,
        width: lineW
      },
      error_y:{
        type: 'data',
        array: currentStdVe2,
        color: col2,
        thickness : lineW,
        width : errW,
        visible:true
      }
    };

    var trace33 = {
      name: Leg3,
      legendgroup: Leg3,
      x: currentSigmaE,
      y: currentErrVe3,
      mode: 'lines+markers',
      type: 'scatter',
      xaxis:'x3',
      yaxis:'y3',
      showlegend: false,
      line: {
        color: col3,
        width: lineW
      },
      error_y:{
        type: 'data',
        array: currentStdVe3,
        color: col3,
        thickness : lineW,
        width : errW,
        visible:true
      }
    };

    var trace41 = {
      name: Leg1,
      legendgroup: Leg1,
      x: currentSigmaT,
      y: currentErrVp1,
      mode: 'lines+markers',
      type: 'scatter',
      xaxis:'x4',
      yaxis:'y4',
      showlegend: false,
      error_y:{
        type: 'data',
        array: currentStdVp1,
        color: col1,
        thickness : lineW,
        width : errW,
        visible:true
      },
      line: {
        color: col1,
        width: lineW
      }
    };

    var trace42 = {
      name: Leg2,
      legendgroup: Leg2,
      x: currentSigma,
      y: currentErrVp2,
      mode: 'lines+markers',
      type: 'scatter',
      xaxis:'x4',
      yaxis:'y4',
      showlegend: false,
      error_y:{
        type: 'data',
        array: currentStdVp2,
        color: col2,
        thickness : lineW,
        width : errW,
        visible:true
      },
      line: {
        color: col2,
        width: lineW
      }
    };

    var trace43 = {
      name: Leg3,
      legendgroup: Leg3,
      x: currentSigmaE,
      y: currentErrVp3,
      mode: 'lines+markers',
      type: 'scatter',
      xaxis:'x4',
      yaxis:'y4',
      showlegend: false,
      error_y:{
        type: 'data',
        array: currentStdVp3,
        color: col3,
        thickness : lineW,
        width : errW,
        visible:true
      },
      line: {
        color: col3,
        width: lineW
      }
    };


    var data = [trace13,trace12,trace11,trace23,trace22,trace21,trace33,trace32,trace31,trace43,trace42,trace41];

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
      title: 'Percent Error for ' + chosenModel
    };

    Plotly.newPlot('plotdiv', data, layout);
};


var innerContainer = document.querySelector('[data-num="0"'),
    plotEl = innerContainer.querySelector('.plot'),
    modelSelector = innerContainer.querySelector('.modelChoice');
    orangeSelector = innerContainer.querySelector('.orangeChoice');
    noirSelector = innerContainer.querySelector('.noirChoice');
    blueSelector = innerContainer.querySelector('.blueChoice');

function assignOptions(textArray, selector) {
  for (var i = 0; i < textArray.length;  i++) {
      var currentOption = document.createElement('option');
      currentOption.text = textArray[i];
      selector.appendChild(currentOption);
  }
}

assignOptions(modelChoices,modelSelector);
assignOptions(tResChoices,orangeSelector);
assignOptions(tResChoices,noirSelector);
assignOptions(tResChoices,blueSelector);

modelSelector.value = 'CERRM';
orangeSelector.value = 15;
noirSelector.value = 10;
blueSelector.value = 5;

function updateParams(){
    setBubblePlot(modelSelector.value,blueSelector.value,noirSelector.value,orangeSelector.value);
}

modelSelector.addEventListener('change', updateParams, false);
orangeSelector.addEventListener('change', updateParams, false);
noirSelector.addEventListener('change', updateParams, false);
blueSelector.addEventListener('change', updateParams, false);
});
