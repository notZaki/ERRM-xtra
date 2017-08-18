Plotly.d3.csv('https://raw.githubusercontent.com/notZaki/ERRM/master/dataResults/e03b-downsampleMapResultsQuantiles.csv?token=AImhIZxq4tSgsBXxNcR1Vefz9vXX-mooks5ZnLfUwA%3D%3D', function(err, rows){

    function unpack(rows, key) {
        return rows.map(function(row) { return row[key]; });
    }

    function unpackNum(rows, key) {
        return rows.map(function(row) { return Number(row[key]); });
    }

  var fitMethods = unpack(rows,'FitMethod'),
    allTemporalRes = unpackNum(rows,'TemporalRes'),
    allErrKt = unpack(rows, 'q50Kt'),
    allErrKep = unpack(rows, 'q50Kep'),
    allErrVe = unpack(rows, 'q50Ve'),
    allErrVp = unpack(rows, 'q50Vp'),
    allq25Kt = unpack(rows, 'q25Kt'),
    allq75Kt = unpack(rows, 'q75Kt'),
    allq25Kep = unpack(rows, 'q25Kep'),
    allq75Kep = unpack(rows, 'q75Kep'),
    allq25Ve = unpack(rows, 'q25Ve'),
    allq75Ve = unpack(rows, 'q75Ve'),
    allq25Vp = unpack(rows, 'q25Vp'),
    allq75Vp = unpack(rows, 'q75Vp'),
    allSigmaC = unpackNum(rows,'sigmaC')
    listofParams = ['KTrans','kep','ve','vp'];

  var currentSigma = allSigmaC.filter(function(item, i, ar){ return ar.indexOf(item) === i; });
  var tResChoices = allTemporalRes.filter(function(item, i, ar){ return ar.indexOf(item) === i; });
  var modelChoices = fitMethods.filter(function(item, i, ar){ return ar.indexOf(item) === i; })

  currentSigma2 = [];
  for (var i = 0, len = currentSigma.length; i < len; i++) {
    currentSigma2[i]=currentSigma[i]+0.001;
  }

  function AminusB(A,B){
    apb = [];
    for (var i = 0, len = A.length; i < len; i++) {
      apb.push(A[i]-B[i]);
    }
    return(apb)
  }

  function getParamData(chosenModelA,chosenModelB,chosenTRes) {
    currentErrKt1 = [];
    currentErrKep1 = [];
    currentErrVe1 = [];
    currentErrVp1 = [];

    currentErrKt2 = [];
    currentErrKep2 = [];
    currentErrVe2 = [];
    currentErrVp2 = [];

    currentq25Kt1 = [];
    currentq25Kep1 = [];
    currentq25Ve1 = [];
    currentq25Vp1 = [];

    currentq25Kt2 = [];
    currentq25Kep2 = [];
    currentq25Ve2 = [];
    currentq25Vp2 = [];

    currentq75Kt1 = [];
    currentq75Kep1 = [];
    currentq75Ve1 = [];
    currentq75Vp1 = [];

    currentq75Kt2 = [];
    currentq75Kep2 = [];
    currentq75Ve2 = [];
    currentq75Vp2 = [];

    for (var i = 0 ; i < allSigmaC.length ; i++){
      if ( fitMethods[i] === chosenModelA && allTemporalRes[i]==chosenTRes) {
        currentErrKt1.push(allErrKt[i]);
        currentq25Kt1.push(allq25Kt[i]);
        currentq75Kt1.push(allq75Kt[i]);
        currentErrKep1.push(allErrKep[i]);
        currentq25Kep1.push(allq25Kep[i]);
        currentq75Kep1.push(allq75Kep[i]);
        currentErrVe1.push(allErrVe[i]);
        currentq25Ve1.push(allq25Ve[i]);
        currentq75Ve1.push(allq75Ve[i]);
        currentErrVp1.push(allErrVp[i]);
        currentq25Vp1.push(allq25Vp[i]);
        currentq75Vp1.push(allq75Vp[i]);
      } if ( fitMethods[i] === chosenModelB && allTemporalRes[i]==chosenTRes) {
        currentErrKt2.push(allErrKt[i]);
        currentq25Kt2.push(allq25Kt[i]);
        currentq75Kt2.push(allq75Kt[i]);
        currentErrKep2.push(allErrKep[i]);
        currentq25Kep2.push(allq25Kep[i]);
        currentq75Kep2.push(allq75Kep[i]);
        currentErrVe2.push(allErrVe[i]);
        currentq25Ve2.push(allq25Ve[i]);
        currentq75Ve2.push(allq75Ve[i]);
        currentErrVp2.push(allErrVp[i]);
        currentq25Vp2.push(allq25Vp[i]);
        currentq75Vp2.push(allq75Vp[i]);
      }
    }

    currentq25Kt1 = AminusB(currentErrKt1,currentq25Kt1)
    currentq75Kt1 = AminusB(currentq75Kt1,currentErrKt1)
    currentq25Kep1 = AminusB(currentErrKep1,currentq25Kep1)
    currentq75Kep1 = AminusB(currentq75Kep1,currentErrKep1)
    currentq25Ve1 = AminusB(currentErrVe1,currentq25Ve1)
    currentq75Ve1 = AminusB(currentq75Ve1,currentErrVe1)
    currentq25Vp1 = AminusB(currentErrVp1,currentq25Vp1)
    currentq75Vp1 = AminusB(currentq75Vp1,currentErrVp1)

    currentq25Kt2 = AminusB(currentErrKt2,currentq25Kt2)
    currentq75Kt2 = AminusB(currentq75Kt2,currentErrKt2)
    currentq25Kep2 = AminusB(currentErrKep2,currentq25Kep2)
    currentq75Kep2 = AminusB(currentq75Kep2,currentErrKep2)
    currentq25Ve2 = AminusB(currentErrVe2,currentq25Ve2)
    currentq75Ve2 = AminusB(currentq75Ve2,currentErrVe2)
    currentq25Vp2 = AminusB(currentErrVp2,currentq25Vp2)
    currentq75Vp2 = AminusB(currentq75Vp2,currentErrVp2)
  };

var colA = '#ff9955';
var colB = '#7e2f8e';

var lineW = 3;
var errW = 10;

// Default Country Data
setBubblePlot('ERRM','CERRM',1);

function setBubblePlot(chosenModelA,chosenModelB,chosenTRes) {
    getParamData(chosenModelA,chosenModelB,chosenTRes);

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
        symmetric: false,
        array: currentq75Kt1,
        arrayminus: currentq25Kt1,
        color: colA,
        thickness : lineW,
        width : errW,
        visible: true
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
        symmetric: false,
        array: currentq75Kt2,
        arrayminus: currentq25Kt2,
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
        symmetric: false,
        array: currentq75Kep1,
        arrayminus: currentq25Kep1,
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
        symmetric: false,
        array: currentq75Kep2,
        arrayminus: currentq25Kep2,
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
        symmetric: false,
        array: currentq75Ve1,
        arrayminus: currentq25Ve1,
        color: colA,
        thickness : lineW,
        width : errW,
        visible:true
      }
    };

    var trace32 = {
      name: chosenModelB,
      legendgroup: chosenModelB,
      x: currentSigma2,
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
        symmetric: false,
        array: currentq75Ve2,
        arrayminus: currentq25Ve2,
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
        symmetric: false,
        array: currentq75Vp1,
        arrayminus: currentq25Vp1,
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
        symmetric: false,
        array: currentq75Vp2,
        arrayminus: currentq25Vp2,
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
      title: 'Percent Error for TRes = ' + chosenTRes
    };

    Plotly.newPlot('plotdiv', data, layout);
};

var innerContainer = document.querySelector('[data-num="0"'),
    plotEl = innerContainer.querySelector('.plot'),
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

assignOptions(tResChoices,tResSelector);
assignOptions(modelChoices,modelSelectorA);
assignOptions(modelChoices,modelSelectorB);
tResSelector.value = 1;
modelSelectorA.value = 'ERRM';
modelSelectorB.value = 'CERRM';

function updateParams(){
    setBubblePlot(modelSelectorA.value,modelSelectorB.value,tResSelector.value);
}

tResSelector.addEventListener('change', updateParams, false);
modelSelectorA.addEventListener('change', updateParams, false);
modelSelectorB.addEventListener('change', updateParams, false);
});
