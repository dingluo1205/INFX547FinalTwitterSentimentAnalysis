// First Part: Create line chart 

// Set the dimensions of the canvas / graph
var	margin = {top: 30, right: 100, bottom: 30, left: 150},
	width = 1300 - margin.left - margin.right,
	height = 270 - margin.top - margin.bottom;
 
// Parse the date / time
var	parseDate = d3.timeParse("%Y-%m-%d");
 
// Set the ranges
var	x = d3.scaleTime().range([0, width]);
var	y = d3.scaleLinear().range([height, 0]);
 
// Define the axes
// var	xAxis = d3.svg.axis().scale(x)
// 	.orient("bottom").ticks(5);
 
// var	yAxis = d3.svg.axis().scale(y)
// 	.orient("left").ticks(5);
 
// Define the line
var	valueline = d3.line()
	.x(function(d) { return x(d.date); })
	.y(function(d) { return y(d.close); });
    
// Adds the svg canvas
var	svg = d3.select("#line")
	.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
 
// Get the data
d3.csv("BoxOffice.csv", function(error, data) {
	data.forEach(function(d) {
		d.date = parseDate(d.date);
		d.close = +d.box;
        
	});
    
 
	// Scale the range of the data
	x.domain(d3.extent(data, function(d) { return d.date; }));
	y.domain([0, d3.max(data, function(d) { return d.close; })]);

    svg.append('text')
    .attr("x",margin.left+250)
    .attr("y",0)
    .attr("font-size","16px")
    .text("Performance Timeline");

	// Add the valueline path.
	svg.append("path")	
       .data([data])
		.attr("class", "line")
        .attr("d", valueline);
 
	// Add the X Axis
	svg.append("g")		
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(d3.axisBottom(x));
 
	// Add the Y Axis
	svg.append("g")		
		.attr("class", "y axis")
		.call(d3.axisLeft(y));


        });

