// First Part: Create line chart 
function draw2(){
// Set the dimensions of the canvas / graph
var	margin = {top: 30, right: 30, bottom: 30, left: 80},
	width = 1300 - margin.left - margin.right,
	height = 270 - margin.top - margin.bottom;
 
// Parse the date / time
//var	parseDate = d3.timeParse("%Y-%m-%d");
var parseDate = d3.timeParse("%d-%b-%y");
// Set the ranges
var	x = d3.scaleTime().range([0, width]);
//var	y = d3.scaleLinear().range([height, 0]);
var	y1 = d3.scaleLinear().range([height, 0]);
var	y2 = d3.scaleLinear().range([height, 0]);
 
var color = d3.scaleOrdinal()
                      .domain(['positives','trust','surprise','joy','anticipation','negatives','sadness','anger','fear','disgust'])
                   .range(['#006837','#1a9850','#66bd63','#a6d96a','#d9ef8b','#fee08b','#fdae61','#f46d43','#d73027','#800026'])

var formatTime = d3.timeFormat("%e %B");
// Define the axes


var	valueline2 = d3.line()
	.x(function(d) {return x(d.date); })
	.y(function(d) { return y1(d.positive); });

var	valueline3 = d3.line()
	.x(function(d) { return x(d.date); })
	.y(function(d) { return y1(d.negative); });

valueline=[];
emotion = ['positives','trust','surprise','joy','anticipation','negatives','sadness','anger','fear','disgust']
for (i=0;i<=9;i++){
   valueline[i]= d3.line()
   .x(function(d){return x(d.date);})
   .y(function(d){return y2(d[emotion[i]]);})
}

// var	valueline4 = d3.line()
// 	.x(function(d) { return x(d.date); })
// 	.y(function(d) { return y(d.pred); });

    
// Adds the svg canvas
var	svg = d3.select("#secondline")
	.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
 var div = d3.select("#secondline").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);
// Get the data
d3.csv("BoxOffice.csv", function(error, data) {
	data.forEach(function(d) {
		d.date = parseDate(d.date);
		//d.box = +d.box;
		d.positive = +d.positive;
		d.negative = +d.negative;
		//d.pred = +d.pred;
        d.anger = +d.anger;
        d.anticipation = +d.anticipation;
        d.disgust = +d.disgust;
        d.fear = +d.fear;
        d.joy = +d.joy;
        d.negatives = +d.negatives;
        d.positives = +d.positives;
        d.sadness = +d.sadness;
        d.surprise = +d.surprise;
        d.trust = +d.trust;
        
	});
    
 
	// Scale the range of the data
	x.domain(d3.extent(data, function(d) { return d.date; }));
//	y.domain([0, d3.max(data, function(d) { return d.box; })]);
	// y.domain([0,56078520]);
//	y1.domain([0, d3.max(data, function(d) { return d.positive; })]);
    y1.domain([0, 100]);
    y2.domain([0,40]);


   line2 = svg.append("path")	
        .data([data])
		.attr("class", "line")
		.style('stroke','#66bd63')
        .attr("d", valueline2);

	dot1=svg.selectAll('dot')
		 .data(data)
         .enter().append('circle')
         .attr("r", 3)
         .attr("cx", function(d) { return x(d.date); })
         .attr("cy", function(d) { return y1(d.positive); })
         .attr('fill','#66bd63') 
		.on("mouseover", function(d) {		
            div.transition()		
                .duration(100)		
                .style("opacity", .9);	
			div.html(formatTime(d.date) + "<br/>"  + "Positivity: "+d.positive)	
                .style("left", (d3.event.pageX) + "px")		
                .style("top", (d3.event.pageY - 28) + "px");
		
            })
          .on("mouseout", function(d) {		
            div.transition()		
                .duration(400)		
                .style("opacity", 0);	
        });
	line3 = svg.append("path")	
        .data([data])
		.attr("class", "line")
		.style('stroke','#d73027')
        .attr("d", valueline3);

     line3.selectAll('g')
          .data(data)
          .enter().append('text')
         .attr("x",function(d) { return x(d.date);})
         .attr("y",function(d) { return y1(d.negative)-10; })
         .attr("font-size",10)
         .attr("dy", ".35em")
         .style('fill','black')
         .text(function(d){return (formatTime(d.date) + "<br/>"  + "Negativity: "+d.negative)});	

	dot2=svg.selectAll('dot')
		 .data(data)
         .enter().append('circle')
         .attr("r", 3)
         .attr("cx", function(d) { return x(d.date); })
         .attr("cy", function(d) { return y1(d.negative); })
         .attr('fill','#d73027');


	  dot2.on("mouseover", function(d) {		
            div.transition()		
                .duration(100)		
                .style("opacity", .9);	
			div.html(formatTime(d.date) + "<br/>"  + "Negativity: "+d.negative)	
                .style("left", (d3.event.pageX) + "px")		
                .style("top", (d3.event.pageY - 28) + "px");
		
            })
          .on("mouseout", function(d) {		
            div.transition()		
                .duration(400)		
                .style("opacity", 0);	
        });


	// Add the X Axis
	svg.append("g")		
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(d3.axisBottom(x));
 
	axis1 =svg.append("g")		
		.attr("class", "axisRed")
	//	.attr('transform','translate('+width+',0)')
		.call(d3.axisLeft(y1));

    axis2 =	svg.append("g")		
		.attr("class", "axisRed")
		.attr('transform','translate('+width+',0)')
		.call(d3.axisRight(y2));
	

var legend2 = svg.append('rect')
  .attr('width', 12)
  .attr('height', 12)
.attr("x",width-120-100)
  .attr("y",5)
  .style('fill','#66bd63')
  .style('stroke', '#66bd63');

  var legend3 = svg.append('rect')
  .attr('width', 12)
  .attr('height', 12)
.attr("x",width-120-100)
  .attr("y",15+6)
  .style('fill','#d73027')
  .style('stroke', '#d73027');

  var legend5 = svg.append('rect')
  .attr('width', 12)
  .attr('height', 12)
.attr("x",width-60-100+20)
  .attr("y",5)
  .style('fill','#66bd63')
  .style('stroke', '#66bd63');

  var legend6 = svg.append('rect')
  .attr('width', 12)
  .attr('height', 12)
.attr("x",width-60-100+20)
  .attr("y",21)
  .style('fill','#d73027')
  .style('stroke', '#d73027');

line_array = []
dot_array = []
for (i=0;i<=9;i++){
     line_array[i]=svg.append("path")	
        .data([data])
		.attr("class", "line")
		.style('stroke',function(){return color(emotion[i])})
        .style('opacity',0)
        .attr("d", valueline[i]);
    line_array[i].append("text")
		.attr("transform", "translate(" + (width-5) + "," + y2(data[0][emotion[i]]) + ")")
    //    .attr("transform", "translate(" + 0 + "," + y2(data[0][emotion[i]]) + ")")
		.attr("dy", ".35em")
		.attr("text-anchor", "start")
		.style("fill", color(emotion[i]))
		.text(emotion[i]);
    dot_array[i]=svg.selectAll('dot')
		 .data(data)
         .enter().append('circle')
         .attr("r", 3)
         .attr("cx", function(d) { return x(d.date); })
         .attr("cy", function(d) { return y2(d[emotion[i]]); })
         .attr('fill',color(emotion[i]))
         .style('opacity',0);
    }

legend5.on('click',function(d){
    for (i=0;i<=4;i++){
     line_array[i].style('opacity',1)
     dot_array[i].style('opacity',1)
    }
    line2.style('opacity',0)
    line3.style('opacity',0)
    axis1.style('opacity',0.2)
    axis2.style('opacity',1)
    dot1.style('opacity',0)
    dot2.style('opacity',0)
})

legend6.on('click',function(d){
    for (i=5;i<=9;i++){
     line_array[i].style('opacity',1)
     dot_array[i].style('opacity',1)
    }
    line2.style('opacity',0)
    line3.style('opacity',0)
    axis1.style('opacity',0.2)
    axis2.style('opacity',1)
    dot1.style('opacity',0)
    dot2.style('opacity',0)
})

legend2.on('click',function(d){
//	 line1.style('opacity',0.2)
	 line2.style('opacity',1)
	 line3.style('opacity',0.2)
     for (i=0;i<=9;i++){
         line_array[i].style('opacity',0);
         dot_array[i].style('opacity',0);
     }
     axis1.style('opacity',1)
     axis2.style('opacity',0.2)
    dot1.style('opacity',1)
    dot2.style('opacity',0)
})

legend3.on('click',function(d){
//	 line1.style('opacity',0.2)
	 line2.style('opacity',0.2)
	 line3.style('opacity',1)
//	 line4.style('opacity',0.2)
     for (i=0;i<=9;i++){
         line_array[i].style('opacity',0);
         dot_array[i].style('opacity',0);
     }
     axis1.style('opacity',1)
     axis2.style('opacity',0.2)
      dot1.style('opacity',0)
    dot2.style('opacity',1)
})


legend2.on('dblclick',function(d){
	 line1.style('opacity',1)
	 line2.style('opacity',1)
	 line3.style('opacity',1)
	 line4.style('opacity',1)
    dot1.style('opacity',1)
    dot2.style('opacity',1)
    for (i=0;i<=9;i++){
         line_array[i].style('opacity',0);
         dot_array[i].style('opacity',0);
     }
})

legend3.on('dblclick',function(d){
	 line1.style('opacity',1)
	 line2.style('opacity',1)
	 line3.style('opacity',1)
	 line4.style('opacity',1)
    dot1.style('opacity',1)
    dot2.style('opacity',1)
    for (i=0;i<=9;i++){
         line_array[i].style('opacity',0);
         dot_array[i].style('opacity',0);
     }
})

legend5.on('dblclick',function(d){

    for (i=0;i<=4;i++){
         line_array[i].style('opacity',0);
         dot_array[i].style('opacity',0);
     }
     line1.style('opacity',1)
	 line2.style('opacity',1)
	 line3.style('opacity',1)
	 line4.style('opacity',1)
    dot1.style('opacity',1)
    dot2.style('opacity',1)
    axis1.style('opacity',1)
    axis2.style('opacity',0.2)
})

legend6.on('dblclick',function(d){

    for (i=5;i<=9;i++){
         line_array[i].style('opacity',0);
         dot_array[i].style('opacity',0);
     }
     line1.style('opacity',1)
	 line2.style('opacity',1)
	 line3.style('opacity',1)
	 line4.style('opacity',1)
    dot1.style('opacity',1)
    dot2.style('opacity',1)
    axis1.style('opacity',1)
     axis2.style('opacity',0.2)
})



svg.append("text")

     .attr("x",width-100-100)
     .attr("y",5+10)
     .attr("font-size",10)
     .attr("opacity",0.8)
	 .text('Positivity');

svg.append("text")
//     .attr("class","legendtooltip")
     .attr("x",width-100-100)
     .attr("y",15+10+5)
     .attr("font-size",10)
     .attr("opacity",0.8)
	 .text('Negativity');

svg.append('text')
   .attr('x',10)
   .attr('y',0)
   .attr("font-size",10)
   .style('fill','black')
   .text('Sensitivity-P/N');

svg.append('text')
   .attr('x',width-70)
   .attr('y',0)
   .attr("font-size",10)
   .style('fill','black')
   .text('Sensitivity-Detail');

svg.append('text')
   .attr('x',width-50-100+30)
   .attr('y',15)
   .attr("font-size",10)
   .style('fill','black')
   .text('Positivity-Decompose');

svg.append('text')
   .attr('x',width-50-100+30)
   .attr('y',15+10+5)
   .attr("font-size",10)
   .style('fill','black')
   .text('Negativity-Decompose');




        });

};