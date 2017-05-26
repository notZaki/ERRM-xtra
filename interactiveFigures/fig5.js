Plotly.d3.csv('https://raw.githubusercontent.com/MPUmri/ERRM/master/dataResults/e03b-downsampleMapResultsQuantiles.csv', function(err, rows){

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

  var sigmaChoices = allSigmaC.filter(function(item, i, ar){ return ar.indexOf(item) === i; });
  var tResChoices = allTemporalRes.filter(function(item, i, ar){ return ar.indexOf(item) === i; });
  var modelChoices = fitMethods.filter(function(item, i, ar){ return ar.indexOf(item) === i; })

  function getParamData(chosenModelA,chosenModelB,chosenSigma) {

    currentErrKtCE = [];
    currentErrKepCE = [];
    currentErrVeCE = [];
    currentErrVpCE = [];

    currentErrKtT = [];
    currentErrKepT = [];
    currentErrVeT = [];
    currentErrVpT = [];

    current25KtCE = [];
    current25KepCE = [];
    current25VeCE = [];
    current25VpCE = [];

    current75KtCE = [];
    current75KepCE = [];
    current75VeCE = [];
    current75VpCE = [];

    current25KtT = [];
    current25KepT = [];
    current25VeT = [];
    current25VpT = [];

    current75KtT = [];
    current75KepT = [];
    current75VeT = [];
    current75VpT = [];

    for (var i = 0 ; i < fitMethods.length ; i++){
      if ( fitMethods[i] === chosenModelA && allSigmaC[i] == chosenSigma) {
        currentErrKtCE.push(allErrKt[i]);
        currentErrKepCE.push(allErrKep[i]);
        currentErrVeCE.push(allErrVe[i]);
        currentErrVpCE.push(allErrVp[i]);

        current25KtCE.push(allq25Kt[i]);
        current25KepCE.push(allq25Kep[i]);
        current25VeCE.push(allq25Ve[i]);
        current25VpCE.push(allq25Vp[i]);

        current75KtCE.push(allq75Kt[i]);
        current75KepCE.push(allq75Kep[i]);
        current75VeCE.push(allq75Ve[i]);
        current75VpCE.push(allq75Vp[i]);

      } if ( fitMethods[i] === chosenModelB && allSigmaC[i] == chosenSigma) {
        currentErrKtT.push(allErrKt[i]);
        currentErrKepT.push(allErrKep[i]);
        currentErrVeT.push(allErrVe[i]);
        currentErrVpT.push(allErrVp[i]);

        current25KtT.push(allq25Kt[i]);
        current25KepT.push(allq25Kep[i]);
        current25VeT.push(allq25Ve[i]);
        current25VpT.push(allq25Vp[i]);

        current75KtT.push(allq75Kt[i]);
        current75KepT.push(allq75Kep[i]);
        current75VeT.push(allq75Ve[i]);
        current75VpT.push(allq75Vp[i]);
      }
    }
  };

  var CERRMcolour = '#7e2f8e';
  var ETMcolour = '#47bc94';

  var lineW = 3;

  // Default Country Data
  setBubblePlot('CERRM','ETM',0.01);

  function setBubblePlot(chosenModelA,chosenModelB,chosenSigma) {
    getParamData(chosenModelA,chosenModelB,chosenSigma);

    var trace10 = {
      name: chosenModelA + ' - 1st Quartile',
      legendgroup: 'CERRM',
      x: tResChoices,
      y: current25KtCE,
      mode: 'lines',
      type: 'scatter',
      line: {
        color: CERRMcolour,
        width: 0
      }
    };

    var trace11 = {
      name: chosenModelA + ' - Median',
      legendgroup: 'CERRM',
      x: tResChoices,
      y: currentErrKtCE,
      mode: 'lines',
      type: 'scatter',
      fill: 'tonexty',
      line: {
        color: CERRMcolour,
        width: lineW
      }
    };

    var trace12 = {
      name: chosenModelA + ' - 3rd Quartile',
      legendgroup: 'CERRM',
      x: tResChoices,
      y: current75KtCE,
      mode: 'lines',
      type: 'scatter',
      fill: 'tonexty',
      line: {
        color: CERRMcolour,
        width: 0
      }
    };

    var trace20 = {
      name: chosenModelB + ' - 1st Quartile',
      legendgroup: 'ETM',
      x: tResChoices,
      y: current25KtT,
      mode: 'lines',
      type: 'scatter',
      line: {
        color: ETMcolour,
        width: 0
      }
    };

    var trace21 = {
      name: chosenModelB + ' - Median',
      legendgroup: 'ETM',
      x: tResChoices,
      y: currentErrKtT,
      mode: 'lines',
      type: 'scatter',
      fill: 'tonexty',
      line: {
        color: ETMcolour,
        dash: 'dash',
        width: lineW
      }
    };

    var trace22 = {
      name: chosenModelB + ' - 3rd Quartile',
      legendgroup: 'ETM',
      x: tResChoices,
      y: current75KtT,
      mode: 'lines',
      type: 'scatter',
      fill: 'tonexty',
      line: {
        color: ETMcolour,
        width: 0
      }
    };

    var trace30 = {
      name: chosenModelA + ' - 1st Quartile',
      legendgroup: 'CERRM',
      x: tResChoices,
      y: current25KepCE,
      xaxis:'x2',
      yaxis:'y2',
      showlegend: false,
      mode: 'lines',
      type: 'scatter',
      line: {
        color: CERRMcolour,
        width: 0
      }
    };

    var trace31 = {
      name: chosenModelA + ' - Median',
      legendgroup: 'CERRM',
      x: tResChoices,
      y: currentErrKepCE,
      xaxis:'x2',
      yaxis:'y2',
      showlegend: false,
      mode: 'lines',
      type: 'scatter',
      fill: 'tonexty',
      line: {
        color: CERRMcolour,
        width: lineW
      }
    };

    var trace32 = {
      name: chosenModelA + ' - 3rd Quartile',
      legendgroup: 'CERRM',
      x: tResChoices,
      y: current75KepCE,
      xaxis:'x2',
      yaxis:'y2',
      showlegend: false,
      mode: 'lines',
      type: 'scatter',
      fill: 'tonexty',
      line: {
        color: CERRMcolour,
        width: 0
      }
    };

    var trace40 = {
      name: chosenModelB + ' - 1st Quartile',
      legendgroup: 'ETM',
      x: tResChoices,
      y: current25KepT,
      xaxis:'x2',
      yaxis:'y2',
      showlegend: false,
      mode: 'lines',
      type: 'scatter',
      line: {
        color: ETMcolour,
        width: 0
      }
    };

    var trace41 = {
      name: chosenModelB + ' - Median',
      legendgroup: 'ETM',
      x: tResChoices,
      y: currentErrKepT,
      xaxis:'x2',
      yaxis:'y2',
      showlegend: false,
      mode: 'lines',
      type: 'scatter',
      fill: 'tonexty',
      line: {
        color: ETMcolour,
        dash: 'dash',
        width: lineW
      }
    };

    var trace42 = {
      name: chosenModelB + ' - 3rd Quartile',
      legendgroup: 'ETM',
      x: tResChoices,
      y: current75KepT,
      xaxis:'x2',
      yaxis:'y2',
      showlegend: false,
      mode: 'lines',
      type: 'scatter',
      fill: 'tonexty',
      line: {
        color: ETMcolour,
        width: 0
      }
    };

    var trace50 = {
      name: chosenModelA + ' - 1st Quartile',
      legendgroup: 'CERRM',
      x: tResChoices,
      y: current25VeCE,
      xaxis:'x3',
      yaxis:'y3',
      showlegend: false,
      mode: 'lines',
      type: 'scatter',
      line: {
        color: CERRMcolour,
        width: 0
      }
    };

    var trace51 = {
      name: chosenModelA + ' - Median',
      legendgroup: 'CERRM',
      x: tResChoices,
      y: currentErrVeCE,
      xaxis:'x3',
      yaxis:'y3',
      showlegend: false,
      mode: 'lines',
      type: 'scatter',
      fill: 'tonexty',
      line: {
        color: CERRMcolour,
        width: lineW
      }
    };

    var trace52 = {
      name: chosenModelA + ' - 3rd Quartile',
      legendgroup: 'CERRM',
      x: tResChoices,
      y: current75VeCE,
      xaxis:'x3',
      yaxis:'y3',
      showlegend: false,
      mode: 'lines',
      type: 'scatter',
      fill: 'tonexty',
      line: {
        color: CERRMcolour,
        width: 0
      }
    };

    var trace60 = {
      name: chosenModelB + ' - 1st Quartile',
      legendgroup: 'ETM',
      x: tResChoices,
      y: current25VeT,
      xaxis:'x3',
      yaxis:'y3',
      showlegend: false,
      mode: 'lines',
      type: 'scatter',
      line: {
        color: ETMcolour,
        width: 0
      }
    };

    var trace61 = {
      name: chosenModelB + ' - Median',
      legendgroup: 'ETM',
      x: tResChoices,
      y: currentErrVeT,
      xaxis:'x3',
      yaxis:'y3',
      showlegend: false,
      mode: 'lines',
      type: 'scatter',
      fill: 'tonexty',
      line: {
        color: ETMcolour,
        dash: 'dash',
        width: lineW
      }
    };

    var trace62 = {
      name: chosenModelB + ' - 3rd Quartile',
      legendgroup: 'ETM',
      x: tResChoices,
      y: current75VeT,
      xaxis:'x3',
      yaxis:'y3',
      showlegend: false,
      mode: 'lines',
      type: 'scatter',
      fill: 'tonexty',
      line: {
        color: ETMcolour,
        width: 0
      }
    };

    var trace70 = {
      name: chosenModelA + ' - 1st Quartile',
      legendgroup: 'CERRM',
      x: tResChoices,
      y: current25VpCE,
      xaxis:'x4',
      yaxis:'y4',
      showlegend: false,
      mode: 'lines',
      type: 'scatter',
      line: {
        color: CERRMcolour,
        width: 0
      }
    };

    var trace71 = {
      name: chosenModelA + ' - Median',
      legendgroup: 'CERRM',
      x: tResChoices,
      y: currentErrVpCE,
      xaxis:'x4',
      yaxis:'y4',
      showlegend: false,
      mode: 'lines',
      type: 'scatter',
      fill: 'tonexty',
      line: {
        color: CERRMcolour,
        width: lineW
      }
    };

    var trace72 = {
      name: chosenModelA + ' - 3rd Quartile',
      legendgroup: 'CERRM',
      x: tResChoices,
      y: current75VpCE,
      xaxis:'x4',
      yaxis:'y4',
      showlegend: false,
      mode: 'lines',
      type: 'scatter',
      fill: 'tonexty',
      line: {
        color: CERRMcolour,
        width: 0
      }
    };

    var trace80 = {
      name: chosenModelB + ' - 1st Quartile',
      legendgroup: 'ETM',
      x: tResChoices,
      y: current25VpT,
      xaxis:'x4',
      yaxis:'y4',
      showlegend: false,
      mode: 'lines',
      type: 'scatter',
      line: {
        color: ETMcolour,
        width: 0
      }
    };

    var trace81 = {
      name: chosenModelB + ' - Median',
      legendgroup: 'ETM',
      x: tResChoices,
      y: currentErrVpT,
      xaxis:'x4',
      yaxis:'y4',
      showlegend: false,
      mode: 'lines',
      type: 'scatter',
      fill: 'tonexty',
      line: {
        color: ETMcolour,
        dash: 'dash',
        width: lineW
      }
    };

    var trace82 = {
      name: chosenModelB + ' - 3rd Quartile',
      legendgroup: 'ETM',
      x: tResChoices,
      y: current75VpT,
      xaxis:'x4',
      yaxis:'y4',
      showlegend: false,
      mode: 'lines',
      type: 'scatter',
      fill: 'tonexty',
      line: {
        color: ETMcolour,
        width: 0
      }
    };


    var data = [trace10,trace11,trace12,trace20,trace21,trace22,
                trace30,trace31,trace32,trace40,trace41,trace42,
                trace50,trace51,trace52,trace60,trace61,trace62,
                trace70,trace71,trace72,trace80,trace81,trace82
               ];

    var layout = {
      height: 800,
      xaxis: {domain: [0, 0.45],hoverformat: '.0f'},
      yaxis: {domain: [0.55, 1],hoverformat: '.2f',title: '%Error in K<sup>Trans</sup>'},
      xaxis4: {
        domain: [0.55, 1],
        hoverformat: '.0f',
        title: 'Temporal Resolution [s]',
        anchor: 'y4'
      },
      xaxis3: {
        domain: [0, 0.45],
        hoverformat: '.0f',
        title: 'Temporal Resolution [s]',
        anchor: 'y3'
      },
      xaxis2: {domain: [0.55, 1],hoverformat: '.0f'},
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
      title: 'Percent Error'
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
