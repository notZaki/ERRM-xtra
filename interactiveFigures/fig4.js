function updatePlot(chosenModel, chosenParam, chosenNoise, chosenTRes, chosenMax, useOwnMax){

  baseURL = 'https://raw.githubusercontent.com/notZaki/ERRM-xtra/master/mapDownsampleJSon/'
  fileName = 'errMap-' + chosenModel + '-Noise-' + chosenNoise + '-TRes-' + chosenTRes + '.json'
  chosenURL = baseURL + fileName;

  Plotly.d3.json(chosenURL, function(figure) {

    var myCScale = [
      ['0.0','rgb(24  79 162)'],
      ['0.1','rgb(70  99 174)'],
      ['0.2','rgb(109,153,206)'],
      ['0.3','rgb(160,190,225)'],
      ['0.4','rgb(207,226,240)'],
      ['0.5','rgb(241,244,245)'],
      ['0.6','rgb(244,218,200)'],
      ['0.7','rgb(248,184,139)'],
      ['0.8','rgb(225,146, 65)'],
      ['0.9','rgb(187,120, 54)'],
      ['1.0','rgb(144,100, 44)']
    ];

    var myCScaleB = [
      ['0.0','rgb(30,30,30)'],
      ['0.00000000001','rgb(24,79,162)'],
      ['0.1','rgb(70,99,174)'],
      ['0.2','rgb(109,153,206)'],
      ['0.3','rgb(160,190,225)'],
      ['0.4','rgb(207,226,240)'],
      ['0.5','rgb(241,244,245)'],
      ['0.6','rgb(244,218,200)'],
      ['0.7','rgb(248,184,139)'],
      ['0.8','rgb(225,146, 65)'],
      ['0.9','rgb(187,120, 54)'],
      ['0.99999999999','rgb(144,100, 44)'],
      ['1.0','rgb(0,0,0)']
    ];

    var valX = ['ve=0.1, vp=0.001','ve=0.2, vp=0.001','ve=0.3, vp=0.001','ve=0.4, vp=0.001','ve=0.5, vp=0.001',
    've=0.1, vp=0.005','ve=0.2, vp=0.005','ve=0.3, vp=0.005','ve=0.4, vp=0.005','ve=0.5, vp=0.005',
    've=0.1, vp=0.01','ve=0.2, vp=0.01','ve=0.3, vp=0.01','ve=0.4, vp=0.01','ve=0.5, vp=0.01',
    've=0.1, vp=0.05','ve=0.2, vp=0.05','ve=0.3, vp=0.05','ve=0.4, vp=0.05','ve=0.5, vp=0.05',
    've=0.1, vp=0.1','ve=0.2, vp=0.1','ve=0.3, vp=0.1','ve=0.4, vp=0.1','ve=0.5, vp=0.1',
    've=0.1, vp=0.2','ve=0.2, vp=0.2','ve=0.3, vp=0.2','ve=0.4, vp=0.2','ve=0.5, vp=0.2'];
    var valY = ['Kt=0.05','Kt=0.15','Kt=0.25','Kt=0.35','Kt=0.45','Kt=0.55'];

    switch(chosenParam) {
      case 've':
        chosenMap = figure.ve;
        break;
      case 'vp':
        chosenMap = figure.vp;
        break;
      case 'kep':
        chosenMap = figure.kep;
        break;
      default:
        chosenMap = figure.KTrans;
        break;
    }

    array = [].concat.apply([],chosenMap);
    maxVal = Math.max.apply(null, array.map(Math.abs));
    if (useOwnMax === false || chosenMax==0 ) {
      maxVal = maxVal;
    } else {
      maxVal = chosenMax;
      myCScale = myCScaleB;
    }

    trace1 = {
      z: chosenMap,
      x: valX,
      y: valY,
      colorscale: myCScale,
      type: 'heatmap',
      zmin:-maxVal,
      zmax:maxVal,
      xgap:2,
      ygap:2
    };

    var data = [trace1];

    var layout = {
      title: 'Percent error in ' + chosenParam + ' from ' + chosenModel,
      height: 600,
      width: 600,
      xaxis: {
        tickvals: ['ve=0.3, vp=0.001','ve=0.3, vp=0.005','ve=0.3, vp=0.01','ve=0.3, vp=0.05','ve=0.3, vp=0.1','ve=0.3, vp=0.2'],
        ticktext: ['vp=0.001','vp=0.005','vp=0.01','vp=0.05','vp=0.1','vp=0.2']
      }
    }

    Plotly.newPlot('plotdiv', data, layout);
  });
}

updatePlot('CERRM','KTrans',2, 1, 0, false)


var tResChoices = [];
for (var i = 1; i <= 60; i++) {
  tResChoices.push(i);
}

//var noiseChoices = [0,0.01,0.02,0.03,0.04,0.05,0.06,0.07,0.08,0.09,0.1]
var sigmaChoices = [];
for (var i = 1; i <= 11; i++) {
  sigmaChoices.push(i);
}

modelChoices = ['TM','RRM','ETM','ERRM','CERRM'];
paramChoices = ['KTrans','ve','kep','vp'];

var innerContainer = document.querySelector('[data-num="0"'),
plotEl = innerContainer.querySelector('.plot'),
modelSelector = innerContainer.querySelector('.modelChoice');
paramSelector = innerContainer.querySelector('.paramChoice');
sigmaSelector = innerContainer.querySelector('.sigmaChoice');
tResSelector = innerContainer.querySelector('.tResChoice');
climCheckbox = innerContainer.querySelector('.climCheckbox');
climTextbox = innerContainer.querySelector('.climTextbox');

function assignOptions(textArray, selector) {
  for (var i = 0; i < textArray.length;  i++) {
    var currentOption = document.createElement('option');
    currentOption.text = textArray[i];
    selector.appendChild(currentOption);
  }
}

assignOptions(modelChoices,modelSelector);
assignOptions(paramChoices,paramSelector);
assignOptions(sigmaChoices,sigmaSelector);
assignOptions(tResChoices,tResSelector);

modelSelector.value = 'CERRM';
paramSelector.value = 'KTrans';
sigmaSelector.value = 2;
tResSelector.value = 1;

function updateParams(){
  updatePlot(modelSelector.value,paramSelector.value,sigmaSelector.value,tResSelector.value,climTextbox.value,climCheckbox.checked);
}

function textboxCallBack(){
  climCheckbox.checked=true;
  updateParams()
}


modelSelector.addEventListener('change', updateParams, false);
paramSelector.addEventListener('change', updateParams, false);
sigmaSelector.addEventListener('change', updateParams, false);
tResSelector.addEventListener('change', updateParams, false);
climCheckbox.addEventListener('change', updateParams, false);
climTextbox.addEventListener('change', textboxCallBack, false);
