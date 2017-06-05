// First Part: Create line chart 

// Set the dimensions of the canvas / graph
function draw1(){
var	margin = {top: 30, right: 80, bottom: 30, left: 80},
	width = 1300 - margin.left - margin.right,
	height = 270 - margin.top - margin.bottom;
 
// Parse the date / time
//var	parseDate = d3.timeParse("%Y-%m-%d");

var parseDate1 = d3.timeParse("%d-%b-%y");


//var	parseDate = d3.timeParse("%m/%d/%y");
var formatTime = d3.timeFormat("%e %B");
 
// Set the ranges
var	x1 = d3.scaleTime().range([0, width]);
var	y = d3.scaleLinear().range([height, 0]);
 
// Define the axes
// var	xAxis = d3.svg.axis().scale(x)
// 	.orient("bottom").ticks(5);
 
// var	yAxis = d3.svg.axis().scale(y)
// 	.orient("left").ticks(5);
 
// Define the line
var	valueline = d3.line()
	.x(function(d) { return x1(d.date); })
	.y(function(d) { return y(d.box); });


var	valueline4 = d3.line()
	.x(function(d) { return x1(d.date); })
	.y(function(d) { return y(d.pred); });

    
// Adds the svg canvas
var	svg = d3.select("#line1")
	.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var div = d3.select("#line1").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);

// Get the data
d3.csv("BoxOffice.csv", function(error, data) {
	data.forEach(function(d) {

		d.date = parseDate1(d.date);

	   // d.date = d.date;
	   console.log(d.date)
		d.box = +d.box;
		d.pred = +d.pred;
	});
    
 
	// Scale the range of the data
	x1.domain(d3.extent(data, function(d) { return d.date; }));
//	y.domain([0, d3.max(data, function(d) { return d.box; })]);
	y.domain([0,56078520]);
//	y1.domain([0, d3.max(data, function(d) { return d.positive; })]);
 //   y1.domain([0, 100]);
//	y2.domain([0, d3.max(data, function(d) { return d.negative; })]);
//    y2.domain([0,100]);


    // svg.append('text')
    // .attr("x",margin.left+250)
    // .attr("y",0)
    // .attr("font-size","16px")
    // .text("Performance Timeline");

	// Add the valueline path.
	
	line1 = svg.append("path")	
	   .data([data])
	   .style('stroke','black')
		.attr("class", "line")
        .attr("d", valueline)
	dot11=svg.selectAll('dot')
		 .data(data)
         .enter().append('circle')
         .attr("r", 3)
         .attr("cx", function(d) { return x1(d.date); })
         .attr("cy", function(d) { return y(d.box); })
		.on("mouseover", function(d) {		
			d3.select(this).attr('r',10)
            div.transition()		
                .duration(100)		
                .style("opacity", .9);	
			div.html(formatTime(d.date) + "<br/>"  + "Box Office: "+d.box)	
                .style("left", (d3.event.pageX) + "px")		
                .style("top", (d3.event.pageY - 28) + "px");
		
            })					
        .on("mouseout", function(d) {	
			dot11.attr('r',3);	
            div.transition()		
                .duration(400)		
                .style("opacity", 0);	
        });
	
	line4 = svg.append("path")	
       .data([data])
		.attr("class", "line")
		.style("stroke-dasharray", ("3, 3"))
		.style('stroke','grey')
		.attr('fill','none')
		.attr("d", valueline4);

// line1.on("mouseover", function(d) {		
//             div.transition()		
//                 .duration(100)		
//                 .style("opacity", .9);		
//             div.html(d.date + "<br/>"  + d.box)	
//                 .style("left", (d3.event.pageX) + "px")		
//                 .style("top", (d3.event.pageY - 28) + "px");
// 			console.log(d.box)	
//             })					
//         .on("mouseout", function(d) {		
//             div.transition()		
//                 .duration(400)		
//                 .style("opacity", 0);	
//         });


	dot4=svg.selectAll('dot')
		 .data(data)
         .enter().append('circle')
         .attr("r", 3)
         .attr("cx", function(d) { return x1(d.date); })
         .attr("cy", function(d) { return y(d.pred); })
		 .attr('fill','grey')
		.on("mouseover", function(d) {	
			d3.select(this).attr('r',10)	
            div.transition()		
                .duration(100)		
                .style("opacity", .9);	
			div.html(formatTime(d.date)+ "<br/>" +'Predicted Value: ' + d.pred)	
                .style("left", (d3.event.pageX) + "px")		
                .style("top", (d3.event.pageY - 28) + "px");
		
            })					
        .on("mouseout", function(d) {	
			dot4.attr('r',3);	
            div.transition()		
                .duration(400)		
                .style("opacity", 0);	
        });
 
	// Add the X Axis
	svg.append("g")		
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(d3.axisBottom(x1));
 
	// Add the Y Axis
	svg.append("g")		
		//.attr("class", "axisSteelBlue")
		.attr('fill','black')
		.call(d3.axisLeft(y));
	
	

var legend1 = svg.append('rect')
  .attr('width', 12)
  .attr('height', 12)
.attr("x",width-120)
  .attr("y",5)
  .style('fill','black')
  .style('stroke', 'black');



  var legend4 = svg.append('rect')
  .attr('width', 12)
  .attr('height', 12)
.attr("x",width-120)
  .attr("y",15+6)
  .style('fill','grey')
  .style('stroke', 'grey');

legend1.on('click',function(d){
	 line1.style('opacity',1)
	 line4.style('opacity',0.2)
	 dot11.style('opacity',1)
	 dot4.style('opacity',0.2)
})

legend4.on('click',function(d){
	 line4.style('opacity',1)
	 line1.style('opacity',0.2)
	 dot4.style('opacity',1)
	 dot11.style('opacity',0.2)
})

legend1.on('dblclick',function(d){
	 line1.style('opacity',1)
	 line4.style('opacity',1)
	 dot11.style('opacity',1)
	 dot4.style('opacity',1)
})

legend4.on('dblclick',function(d){
	 line4.style('opacity',1)
	 line1.style('opacity',1)
	 dot11.style('opacity',1)
	 dot4.style('opacity',1)
})


svg.append("text")

     .attr("x",width-100)
     .attr("y",5+10)
     .attr("font-size",10)
     .attr("opacity",0.8)
	 .text('Box Office');



svg.append("text")
     .attr("x",width-100)
     .attr("y",15+10+5)
     .attr("font-size",10)
     .attr("opacity",0.8)
	 .text('Predicted Box Office');

svg.append('text')
   .attr('x',10)
   .attr('y',0)
   .attr("font-size",10)
   .style('fill','black')
   .text('BoxOffice')




        });


};
