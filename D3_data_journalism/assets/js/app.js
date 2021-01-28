// @TODO: YOUR CODE HERE!
// You need to create a scatter plot between two of the data variables such as:
// Healthcare vs. Poverty or Smokers vs. Age.
// Using the D3 techniques we taught you in class, 
// Create a scatter plot that represents each state with circle elements. 
// You'll code this graphic in the app.js file of your homework directory—make sure you pull in the data from data.csv by using the d3.csv function. 
// Your scatter plot should ultimately appear like the image at the top of this section.

// Create chart area and set dimensions
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Pull in D3 File from CVS
d3.csv("assets/data/data.csv").then(function (Data) {
  // Make sure data is working
  console.log(Data);

  // Create function that will pull required chart data (Smokers vs. Age)
  Data.forEach(function (data) {
    data.age = +data.age;
    data.smokes = +data.smokes;
  });
  // console.log(Data)

  // Create scaling functions
  var xAgeScale = d3.scaleLinear()
    .domain([0, d3.max(Data, d => d.age)])
    .range([0, width]);

  var ySmokeScale = d3.scaleLinear()
    .domain(d3.extent(Data, d => d.smokes))
    .range([height, 0]);

  // Create axis functions
  var bottomAxis = d3.axisBottom(xAgeScale)
  // .tickFormat(d3.timeFormat("%d-%b-%Y"));
  var leftAxis = d3.axisLeft(ySmokeScale);

  // Add x-axis
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // Add y1-axis to the left side of the display
  chartGroup.append("g")
    // Define the color of the axis text
    .classed("green", true)
    .call(leftAxis);

  // Format chart
  // Append axes titles
  chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 20})`)
    // .classed("age text", true)
    .text("Age");

  chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 37})`)
    // .classed("smokes text", true)
    .text("Smokers");

  // Create circles
  // append circles to data points
  // Note that I've saved these into a new variable - now I
  // can reference these elements and their bound data when needed!
  var circlesGroup = chartGroup.selectAll("circle")
    .data(Data)
    .enter()
    .append("circle")
    .attr("cx", (d, i) => xAgeScale(i))
    .attr("cy", d => ySmokeScale(d))
    .attr("r", "5")
    .attr("fill", "blue");
});


  // Label axis




// BONUS
//    // Step 1: Initialize Tooltip
//    var toolTip = d3.tip()
//    .attr("class", "tooltip")
//    .offset([80, -60])
//    .html(function(d) {
//      return (`<strong>${dateFormatter(d.date)}<strong><hr>${d.medals}
//      medal(s) won`);
//    });
//  // Step 2: Create the tooltip in chartGroup.
//  chartGroup.call(toolTip);
//  // Step 3: Create "mouseover" event listener to display tooltip
//  circlesGroup.on("mouseover", function(d) {
//    toolTip.show(d, this);
//  })
//  // Step 4: Create "mouseout" event listener to hide tooltip
//    .on("mouseout", function(d) {
//      toolTip.hide(d);
//    });