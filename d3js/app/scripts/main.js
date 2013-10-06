d3.select("body").append("h3").text("Start!");
d3.select("body")
	.append("p")
	.text("Hello World!")


//=====================================================================================================================


d3.select("body").append("h3").text("Bar Chart using DIVs")
var dataset = [ 5, 10, 15, 20, 25 ];
d3.select("body").append("div").selectAll("div")
	.data(dataset)
	.enter()
	.append("div")
    .text(function(d) { return d; })
    .style("display", "inline-block")
    .style("margin-right", "10px")
    .style("width", "20px")
    .style("text-align", "center")
    .style("vertical-align", "bottom")
    .style("background-color", "green")
    .style("border", "1px solid darkgreen")
    .style("height", function(d) { return (d*5) + "px"; });


//=====================================================================================================================


d3.select("body").append("h3").text("Bar Chart using SVG");

var dataset = [ 5, 10, 15, 20, 25 ];
var h = 150, w =200, barPadding = 2,
    svg = d3.select("body").append("div").append("svg").attr("width", w).attr("height", h);

svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", function(d, i){ return (i * (w/dataset.length))})
    .attr("y", function(d){ return h - (d * 5) })
    .attr("height", function(d) { return d * 5 })
    .attr("width", function(d, i){ return w/dataset.length - barPadding})
    .attr("fill", "green")
    .attr("stroke", "darkgreen")

svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .attr("x", function(d, i){ return (i * (w/dataset.length) + (w/dataset.length - barPadding) / 2)})
    .attr("y", function(d){ return /*h - 5*/ h - (d * 5) + 17 })
    .attr("text-anchor", "middle")
    .text(function(d){ return d })


//=====================================================================================================================


d3.select("body").append("h3").text("Bar Chart using SVG with scale");

var dataset = [ 250, 350, 1000, 400, 200 ];
var h = 250, w =200, barPadding = 2,
    svg = d3.select("body").append("div").append("svg").attr("width", w).attr("height", h);

var yScale = d3.scale.linear().domain([0, d3.max(dataset, function(d){ return d })]).range([h, 0]);
var yScale2 = d3.scale.linear().domain([0, d3.max(dataset, function(d){ return d })]).range([0, h]);

svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", function(d, i){ return (i * (w/dataset.length) + (w/dataset.length - barPadding) / 2) - 19})
    .attr("y", function(d){ return yScale(d) })
    .attr("height", function(d) { return yScale2(d) })
    .attr("width", function(d, i){ return w/dataset.length - barPadding})
    .attr("fill", "green")
    .attr("stroke", "darkgreen");

svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .attr("x", function(d, i){ return (i * (w/dataset.length) + (w/dataset.length - barPadding) / 2)})
    .attr("y", function(d){ return yScale(d) + 20})
    .attr("text-anchor", "middle")
    .text(function(d){ return d });


//=====================================================================================================================


d3.select("body").append("h3").text("Scatter plot using SVG with scale");

var dataset = [
                [5, 20], [480, 90], [250, 50], [100, 33], [330, 95], [410, 12], [475, 44], [25, 67], [85, 21], [220, 88]
              ];
var h = 250, w =400, padding = 40,
    svg = d3.select("body").append("div").append("svg").attr("width", w).attr("height", h);

var xScale = d3.scale.linear().domain([0, d3.max(dataset, function(d){ return d[0] })]).range([padding, w-padding]);
var yScale = d3.scale.linear().domain([0, d3.max(dataset, function(d){ return d[1] })]).range([h-padding, padding]);

svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", function(d){ return xScale(d[0]) })
    .attr("cy", function(d){ return yScale(d[1]) })
    .attr("r", "5")
    .attr("fill", "green")
    .attr("stroke", "darkgreen");

svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .attr("x", function(d){ return xScale(d[0]) + 5 })
    .attr("y", function(d){ return yScale(d[1]) - 5 })
    .text(function(d){ return d })
    .attr("font-size", "10px");


//=====================================================================================================================

d3.select("body").append("h3").text("Scatter plot using SVG with scale and axis");

var dataset = [
                [5, 20], [480, 90], [250, 50], [100, 33], [330, 95], [410, 12], [475, 44], [25, 67], [85, 21], [220, 88]
              ];

var dataset = [];
var numDataPoints = 20;
var xRange = Math.random() * 1000;
var yRange = Math.random() * 1000;
for (var i = 0; i < numDataPoints; i++) {
    var newNumber1 = Math.round(Math.random() * xRange);
    var newNumber2 = Math.round(Math.random() * yRange);
    dataset.push([newNumber1, newNumber2]);
}

var h = 250, w =400, padding = 40,
    svg = d3.select("body").append("div").append("svg").attr("width", w).attr("height", h);

var xScale = d3.scale.linear().domain([0, d3.max(dataset, function(d){ return d[0] })]).range([padding, w-padding]);
var yScale = d3.scale.linear().domain([0, d3.max(dataset, function(d){ return d[1] })]).range([h-padding, padding]);

var xAxis = d3.svg.axis().scale(xScale).orient("bottom").ticks(5);
var yAxis = d3.svg.axis().scale(yScale).orient("left").ticks(5);

svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + (h - padding) + ")")
    .call(xAxis);

svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + padding + ", 0)")
    .call(yAxis);

svg.append("g").selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", function(d){ return xScale(d[0]) })
    .attr("cy", function(d){ return yScale(d[1]) })
    .attr("r", "5")
    .attr("fill", "green")
    .attr("stroke", "darkgreen");

svg.append("g").selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .attr("x", function(d){ return xScale(d[0]) + 5 })
    .attr("y", function(d){ return yScale(d[1]) - 5 })
    .text(function(d){ return d })
    .attr("font-size", "10px");


//=====================================================================================================================

