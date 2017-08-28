
// Define the size of figure
var outerWidth = 325;
var outerHeight = 700;
// Define margins - use larger bottom margin to make room for legend
var margin = { left: 90, top: 30, right: 90, bottom: 140};
var innerWidth  = outerWidth  - margin.left - margin.right;
var innerHeight = outerHeight - margin.top  - margin.bottom;
// Padding between the 'boxes' - Used for both x- and y- padding
var barPadding = 0.05;
// Width of each element in the legend
var legendElementWidth = 20;

// Name of the parameter with sup/subscripts
var textKtrans = "Kᵗʳᵃⁿˢ";
var textVp = "vₚ";
var textVe = "vₑ";
var textKep = "kₑₚ";

// Create the svg canvas
var vis = d3.select("#plotdiv").append("svg")
  .attr("width",  outerWidth)
  .attr("height", outerHeight);

// Create a group object so we can easily transform our heatmap...
// ... and move it inside the margins
var g = vis.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// Define the X and Y index for the 120 boxes
var indX = [];
var indY = [];
for (var i = 1; i <= 120; i++) {
  indX.push(1+Math.floor((i-1)/20)); // X goes up by 1 for every 20 elements
  indY.push(i%20); // Y goes from 1-20 then repeats
}

// Define the colourscale, based on: Light, A., and Bartlein, J. (2004) EOS 85.40
var colourScale =  [
  'rgb(24,79,162)',
  'rgb(70,99,174)',
  'rgb(109,153,206)',
  'rgb(160,190,225)',
  'rgb(207,226,240)',
  'rgb(241,244,245)',
  'rgb(244,218,200)',
  'rgb(248,184,139)',
  'rgb(225,146, 65)',
  'rgb(187,120, 54)',
  'rgb(144,100, 44)'
];

// Define the index for each colour in the colourscale, as fraction values (e.g. 0.4 = 40% of max value)
var colourScaleInd = [-1.0, -0.8, -0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6, 0.8, 1.0];

// Use above information to define the X, Y, and colour scales to be used by D3
var xScale = d3.scaleBand()
  .rangeRound([0, innerWidth])
  .paddingInner(barPadding)
  .domain(indX);
var yScale = d3.scaleBand()
  .rangeRound([innerHeight, 0])
  .paddingInner(barPadding)
  .domain(indY);
var cScale = d3.scaleLinear()
  .domain(colourScaleInd)
  .interpolate(d3.interpolateHcl)
  .range(colourScale);
// Scale for the legend
var legendScale = d3.scaleLinear()
  .range([-legendElementWidth*5, legendElementWidth*6-1]);

// Define the tick labels for the axes
var ticksX = [0.05, 0.15, 0.25, 0.35, 0.45, 0.55];
var ticksYL = ["0.005", "0.01", "0.05", "0.10"];
var ticksYR = [0.1, 0.2, 0.3, 0.4, 0.5,
  0.1, 0.2, 0.3, 0.4, 0.5,
  0.1, 0.2, 0.3, 0.4, 0.5,
  0.1, 0.2, 0.3, 0.4, 0.5
];

// Define the scales for the axes
// X-Axis
axisScaleX = d3.scaleBand()
  .rangeRound([0, innerWidth])
  .domain(ticksX)
// Y-Axis - Left side - Ticks only
axisScaleYL = d3.scaleLinear()
  .range([innerHeight, 0])
  .domain([0, 20])
// Y-Axis - Left side - Tick labels only
axisScaleYL2 = d3.scaleBand()
  .rangeRound([innerHeight, 0])
  .domain(ticksYL)
// Y-Axis - Right side
axisScaleYR = d3.scaleBand()
.rangeRound([innerHeight, 0])
.domain(indY)

// Define the axes
var axisX = d3.axisBottom(axisScaleX)

var axisYL = d3.axisLeft(axisScaleYL)
  .tickValues([5.1,10,14.95])
  .tickSize(10)
var axisYL2 = d3.axisLeft(axisScaleYL2)
  .tickSize(0)
var axisYR = d3.axisRight(axisScaleYR)
  .tickSizeOuter(0)

var axisLegend = d3.axisBottom(legendScale)
  .tickSizeOuter(0)

// Make groups of the axes
var gAxisX = g.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + innerHeight + ")");

var gAxisYL = g.append("g")
  .attr("class", "y axis");
var gAxisYL2 = g.append("g")
  .attr("class", "y axis");

var gAxisYR = g.append("g")
  .attr("class", "y axis")
  .attr("transform", "translate(" + innerWidth + ",0)");

// Group for the axes labels and the title
var gText = g.append("g")

// Group for the legend
var gLegend = vis.append("g")
  .attr("class", "y axis")
  .attr("transform", "translate(" + 0.5*outerWidth + "," + (outerHeight-30) + ")");

// Function to render the figure
function renderFigure(chosenModel, chosenParam, chosenSigma, chosenTRes){

  // Separate function for creating/updating the heatmap
  updateFigure(chosenModel, chosenParam, chosenSigma, chosenTRes)
    
  // Create the axes
  gAxisX.call(axisX)
    .selectAll("text")
    .attr("x",-xScale.bandwidth()/3)
    .attr("transform","rotate(-45)")
    .attr("text-anchor","end");
  gAxisYL.call(axisYL)
    .selectAll("text").remove();
  gAxisYL2.call(axisYL2)
  gAxisYR.call(axisYR)
    .selectAll("text")
    .text(function(d, i){return ticksYR[i];})
    
  // Create axes labels
  gText.append("text")
    .attr("class", "label")
    .attr("transform", "translate(" + 0.4*innerWidth + "," + (innerHeight + 70) + ")")
    .text(textKtrans)
    
  gText.append("text")
    .attr("class", "label")
    .attr("transform", "translate(-70," + 0.5*innerHeight + ")")
    .text(textVp)
    
  gText.append("text")
    .attr("class", "label")
    .attr("transform", "translate(" + (innerWidth + 50) + "," + 0.5*innerHeight + ")")
    .text(textVe)
    
  // Create the colourbar of the legend - text is handled separately by updateFigure()
  gLegend.selectAll("rect").data(colourScaleInd).enter().append("rect")
    .attr("width", legendElementWidth)
    .attr("height", 20)
    .attr("x", function(d, i) {return d*legendElementWidth*5;})
    .attr("y", -20)
    .attr("fill", function (d,i) {return cScale(d/1.0);});
}

// Function to create/update the heatmap 
function updateFigure(chosenModel, chosenParam, chosenSigma, chosenTRes){
  baseURL = 'https://raw.githubusercontent.com/notZaki/ERRM-xtra/master/mapDownsampleJSon/'
  fileName = 'errMap-' + chosenModel + '-Noise-' + chosenSigma + '-TRes-' + chosenTRes + '.json'
  chosenURL = baseURL + fileName;
  
  d3.json(chosenURL, function(data){
    
    // Input is initially an array of arrays (6x20). Convert to a single long array (120 elements).
    myVals = [].concat.apply([], data[chosenParam]);
    
    // Find the maximum value
    maxVal = Math.max.apply(null, myVals.map(Math.abs));
    if (climCheckbox.checked === false ||climTextbox.value==0 ) {
      maxVal = maxVal;
    } else {
      maxVal = climTextbox.value;
    }
    
    // Delete any previous elements of heatmap
    //g.selectAll("rect").remove()
    
    // Create the boxes for the heatmap
    var boxes = g.selectAll("rect").data(myVals);

    boxes.enter().append("rect")
    .attr("width", xScale.bandwidth())
    .attr("height", yScale.bandwidth())
    .attr("x",      function (d, i){return xScale(indX[i]); })
    .attr("y",      function (d, i){return yScale(indY[i]); })
    .attr("fill",   function (d, i){return cScale(d/maxVal)})
    .attr("stroke", "white")
    .on("mouseover", function(d, i) {
      d3.select(this)
        // Outline selected box by grey outline
        .attr("stroke", "grey")
        // Assign value to text box 
        curValTextbox.value = d
        // Get the x and y positions of current point
        var curX = parseFloat(d3.select(this).attr("x"));
        var curY = parseFloat(d3.select(this).attr("y"));
        // Create text for tooltip
        // g.append("text")
        //   .attr("id", "tooltip")
        //   .attr("class", "tooltipText")
        //   .attr("x", curX)
        //   .attr("y", curY)
        //   .attr("font-weight", "bold")
        //   .attr("fill", "black")
        //   .attr("text-anchor", "middle")
        //   .text(d);
    })
    .on("mouseout", function(d) {
      // Remove tooltip when mouse hovers off item
      // d3.select("#tooltip").remove();
      // Smoothly fade out the grey outline when mouse hovers off
      d3.select(this)
        .transition()
        .duration(500)
        .attr("stroke", "#ffffff");
      });

    // When loading new data, smoothly update the heatmap colours
    boxes.transition().duration(1000)
      .style("fill", function (d, i){return cScale(d/maxVal)})

    // Determine title text
    switch(chosenParam){
      case "KTrans":
        titleText = textKtrans
        break;
      case "ve":
        titleText = textVe
        break;
      case "vp":
        titleText = textVp
        break;
      default:
        titleText = textKep
    }
    // Create title text
    d3.select("#titleText").remove();
    gText.append("text")
      .attr("id", 'titleText')
      .attr("class", "title")
      .text(chosenModel + " - " + titleText);

    // Update legend axis
    legendScale.domain([-maxVal, maxVal])
    axisLegend.tickValues([-maxVal, 0, maxVal])
    gLegend.call(axisLegend)
  });
}

modelChoices = ['TM','RRM','ETM','ERRM','CERRM','RTM','ERTM','CLRRM'];
paramChoices = ['KTrans','ve','kep','vp'];

var tResChoices = [];
for (var i = 1; i <= 60; i++) {
  tResChoices.push(i);
}

var sigmaChoices = ["0", "0.01", "0.02", "0.03", "0.04", "0.05"];
var sigmaScale = d3.scaleOrdinal()
.domain(sigmaChoices)
.range([1,2,3,4,5,6]);

chosenParam = 'kep'
chosenModel = 'ERRM'
chosenSigma = 0
chosenTRes = 1

var innerContainer = document.querySelector('.container'),
plotEl = innerContainer.querySelector('.plot'),
modelSelector = innerContainer.querySelector('.modelChoice');
paramSelector = innerContainer.querySelector('.paramChoice');
sigmaSelector = innerContainer.querySelector('.sigmaChoice');
tResSelector = innerContainer.querySelector('.tResChoice');
climCheckbox = innerContainer.querySelector('.climCheckbox');
climTextbox = innerContainer.querySelector('.climTextbox');
curValTextbox = innerContainer.querySelector('.curVal');

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

modelSelector.value = chosenModel;
paramSelector.value = chosenParam;
sigmaSelector.value = chosenSigma;
tResSelector.value = chosenTRes;

function updateParams(){
  updateFigure(modelSelector.value,paramSelector.value,sigmaScale(sigmaSelector.value),tResSelector.value);
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

renderFigure(chosenModel, chosenParam, sigmaScale(chosenSigma), chosenTRes)