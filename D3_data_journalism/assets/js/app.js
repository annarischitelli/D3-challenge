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
    .domain([28, d3.max(Data, d => d.age)])
    .range([0, width]);

  var ySmokeScale = d3.scaleLinear()
    .domain(d3.extent(Data, d => d.smokes))
    .range([height, 0]);

  // Create axis functions
  var bottomAxis = d3.axisBottom(xAgeScale)
  var leftAxis = d3.axisLeft(ySmokeScale);

  // Add x-axis to the bottom of the display
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  chartGroup.append("text")
    .attr(
      "transform",
      "translate(" + width /2 + " ," + (height + margin.top + 30) + ")")
    .attr("atext", true)
    .text("Median Age (Years)");

  // Add y-axis to the left side of the display
  chartGroup.append("g")
    .call(leftAxis);

  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - height /1.5)
    .attr("dy", "1em")
    .attr("atext", true)
    .text("Percentage of Smokers (%)")

  // BUILD CHART

  // Create circles
  // Append circles to data points
  var circlesGroup = chartGroup.selectAll("circle")
    .data(Data)
    .enter()
    .append("circle")
    .attr("cx", d => xAgeScale(d.age))
    .attr("cy", d => ySmokeScale(d.smokes))
    .attr("r", "15")
    // .attr("fill", "lightblue")
    .classed("stateCircle", true);

  // Append text to data points
  var circlesGroup = chartGroup.selectAll(null)
    .data(Data)
    .enter()
    .append("text")
    .attr("x", d => xAgeScale(d.age))
    .attr("y", d => ySmokeScale(d.smokes))
    .attr("dy", ".35em")
    .text(d => d.abbr)
    .classed("stateText", true)
});

// transition on page load
chartGroup.selectAll("circle")
  .transition()
  .duration(50000)
  .attr("cx", d => xAgeScale(d.age))
  .attr("cy", d => ySmokeScale(d.smokes));



  // BONUS
// var toolTip = d3.select("body")
//   .append("div")
//   .classed("tooltip", true);

// // Step 2: Create "mouseover" event listener to display tooltip
//   chartGroup.on("mouseover", function (d) {
//     toolTip.style("display", "block")
//       .html(
//         `<strong>${d.state}<strong><hr>${d.age} Median Age`)
//       .style("left", d3.event.pageX + "px")
//       .style("top", d3.event.pageY + "px");
//   })
//     // Step 3: Create "mouseout" event listener to hide tooltip
//     .on("mouseout", function () {
//       toolTip.style("display", "none");
//     });
