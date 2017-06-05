


var stip = d3.select("body").append("div")
            .attr("class", "toolTip")
            .style("opacity",0)

draw1();
var kkey = "all";
var xvar = "fatalPerBillionMiles";

function changex(xvariable){
    xvar = xvariable;
    draw();
}


document.getElementById("filter").onchange = 
        function(){
            kkey = this.value;
            draw();
        }

function draw1(){ 

    d3.csv("bad-drivers1.csv",function(error,data){
        data.forEach(function(d){
            d.CarInsurancePremiums = +d.CarInsurancePremiums;
            d.InsuranceIncurredPerDriver = +d.InsuranceIncurredPerDriver;
            d.fatalPerBillionMiles = +d.fatalPerBillionMiles;
            d.Speeding = +d.Speeding;
            d["Alcohol-Impaired"] = +d["Alcohol-Impaired"];
            d.Distracted = +d.Distracted
        })
if(kkey != "all"){
    data.filter(function(d){return kkey == d["geotype"]})
}

xvars = ["fatalPerBillionMiles","Speeding","Alcohol-Impaired","Distracted"]
if(xvar == "fatalPerBillionMiles"){
    var xvarname = "number of fatal collisions/per billion miles"
} else {
    xvarname = "insurance incurrend per drive"
}

function tell(data, xvar){
    if(xvar != "fatalPerBillionMiles" && xvar != "InsuranceIncurredPerDriver"){
        return data[xvar]/100*data["fatalPerBillionMiles"]
    } else {
        return data[xvar]
    }
}

console.log(tell(data[1],"Speeding"))

var margin = {top: 20, right: 20, bottom: 60, left: 40},
    width = 700 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var maxp = d3.max(data,function(d){return d.CarInsurancePremiums}),
    maxf = d3.max(data,function(d){return tell(d,xvar)}),
    minpd = d3.min(data,function(d){return d.InsuranceIncurredPerDriver}),
    maxpd = d3.max(data,function(d){return d.InsuranceIncurredPerDriver})

console.log(maxf)
var x = d3.scaleLinear()
    .range([0, width])
    .domain([0, maxf+5]);

var y = d3.scaleLinear()
    .range([height, 0])
    .domain([0, maxp+100]);

var z = d3.scaleLinear()
    .range([7,21])
    .domain([minpd,maxpd])

var colmap = d3.scaleLinear()
    .range(["white","red"])
    .domain([minpd,maxpd])

var c2 = d3.scaleOrdinal()
    .domain(["cw","ne","s","w"])
    .range(["#bcbddc","#fdae6b","#9ecae1","#a1d99b"])

var c3 = d3.scaleOrdinal()
    .domain(["cw","ne","s","w"])
    .range(["#756bb1","#e6550d","#3182bd","#31a354"])


var svg = d3.select("#ssss").append("div").append("svg")
.attr("id","hahaha")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("g")
    .attr("class", "x axis")
    .attr("clip-path", "url(#clip)")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

svg.append("g")
    .append("text")
    .attr("class","axis")
    .attr("x",550)
    .attr("y",460)
    .text(xvar)

svg.append("g")
    .append("text")
    .attr("class","axis")
    .attr("x",0)
    .attr("y",0)
    .text("Car Insurance Premiums($)")

var scatterTooltip = d3.select("#hahaha").append("text")
                        .attr("class","scatterTooltip")
                        .attr("x",60).attr("y",350)
                        .attr("font-size",55)
                        .attr("opacity",0.5)
                        .attr("font-family","sans-serif")

var scatterLegend1 = d3.select("svg").append("rect")
                        .attr("class","scatterlegend")
                        .attr("x",600).attr("y",375)
                        .attr("width",10)
                        .attr("height",10)
                        .attr("fill","#bcbddc")
var scatterLegend2 = d3.select("svg").append("rect")
                        .attr("class","scatterlegend")
                        .attr("x",600).attr("y",390)
                        .attr("width",10)
                        .attr("height",10)
                        .attr("fill","#fdae6b")
var scatterLegend3 = d3.select("svg").append("rect")
                        .attr("class","scatterlegend")
                        .attr("x",600).attr("y",405)
                        .attr("width",10)
                        .attr("height",10)
                        .attr("fill","#9ecae1")                        
var scatterLegend4 = d3.select("svg").append("rect")
                        .attr("class","scatterlegend")
                        .attr("x",600).attr("y",420)
                        .attr("width",10)
                        .attr("height",10)
                        .attr("fill","#a1d99b")     
var scatterlegend11 = d3.select("svg").append("text")
                        .attr("class","scatterlegend1")
                        .attr("x",615).attr("y",382.5)
                        .text("Central Western")
                        .attr("font-size",10)   
                        .attr("font-family","sans-serif") 
var scatterlegend21 = d3.select("svg").append("text")
                        .attr("class","scatterlegend1")
                        .attr("x",615).attr("y",397.5)
                        .text("Northeastern")
                        .attr("font-size",10)    
                        .attr("font-family","sans-serif")                               
var scatterlegend31 = d3.select("svg").append("text")
                        .attr("class","scatterlegend1")
                        .attr("x",615).attr("y",412.5)
                        .text("Southern")
                        .attr("font-size",10)  
                        .attr("font-family","sans-serif")
var scatterlegend41 = d3.select("svg").append("text")
                        .attr("class","scatterlegend1")
                        .attr("x",615).attr("y",427.5)
                        .text("Western")
                        .attr("font-size",10)  
                        .attr("font-family","sans-serif")

svg.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(y));

// svg.append("g")
//     .attr("class", "brush")
//     .call(brush)
//   .selectAll('rect')
//     .attr('height', height);

svg.append("defs").append("clipPath")
    .attr("id", "clip")
  .append("rect")
    .attr("width", width)
    .attr("height", height + 20);

var points = svg.selectAll(".point")
    .data(data)

points.exit().remove();

  points.enter().append("circle")
    .attr("class", "point")
    .attr("clip-path", "url(#clip)")
    .attr("r", 7)
    .attr("cx", function(d) { return x(tell(d,xvar)); })
    .attr("cy", function(d) { return y(d.CarInsurancePremiums); })
    .attr("fill",function(d){return c2(d.geotype)})
    .on("mouseover",function(d){
        d3.select(this)
        .attr("r",9)
        .attr("fill",function(d){return c3(d.geotype)});
        scatterTooltip
        .text(d.State);

        stip
                .style("opacity",0.9)
                .html(d.State+ "<br>" + "<br>"+ "Car Insurance Premiums: $" + d.InsuranceIncurredPerDriver + "<br>"+"Number of fatals Per Billion Miles: " + d.fatalPerBillionMiles
                + "<br>"+ "Percentage of Speeding-Fatals: " + d.Speeding +"%"
                + "<br>"+ "Percentage of Alcohol-Fatals: " + d["Alcohol-Impaired"]+"%"
                + "<br>"+ "Percentage of Distracted-Fatals: " + d.Distracted+"%")
                .style("left", (d3.event.pageX -110) + "px")
                .style("top", (d3.event.pageY - 90) + "px");
        
    })
    .on("mouseout",function(){
        d3.select(this)
        .attr("r",7)
        .attr("fill",function(d){return c2(d.geotype)})
        scatterTooltip.text("")
        stip
        .style("opacity",0)
    })
    // .append("svg:title")
    //     .text(function(d){return d.State + 
    //                             "\nInsurance Incurred Per Driver: " + d.InsuranceIncurredPerDriver});

// points.on('mousedown', function(){
//   brush_elm = svg.select(".brush").node();
//   new_click_event = new Event('mousedown');
//   new_click_event.pageX = d3.event.pageX;
//   new_click_event.clientX = d3.event.clientX;
//   new_click_event.pageY = d3.event.pageY;
//   new_click_event.clientY = d3.event.clientY;
//   brush_elm.dispatchEvent(new_click_event);
// });
        // dataSortedByFatal = data.sort(function(a,b){return a.fatalPerBillionMiles - b.fatalPerBillionMiles})
        
        // var xLabels = data.map(function(d){return d.fatalPerBillionMiles});
        // var xSeries = d3.range(1,data.length+1)
		// var ySeries = data.map(function(d) { return parseFloat(d.CarInsurancePremiums); });

        var xLabels = data.map(function(d){return tell(d,xvar)});
        var xSeries = d3.range(1,data.length+1)
		var ySeries = data.map(function(d) { return parseFloat(d.CarInsurancePremiums); });
		
		var leastSquaresCoeff = leastSquares(xLabels, ySeries);
		console.log(leastSquaresCoeff)
        console.log(xLabels)
        

		// apply the reults of the least squares regression
		var x1 = d3.min(data,function(d){return tell(d,xvar)})-5;
		var y1 = leastSquaresCoeff[0]*x1 + leastSquaresCoeff[1];
		var x2 = d3.max(data,function(d){return tell(d,xvar)})+5;
		var y2 = leastSquaresCoeff[0] *x2  + leastSquaresCoeff[1];
		var trendData = [[x1,y1,x2,y2]];
		console.log(trendData)
		var trendline = svg.selectAll(".trendline")
			.data(trendData);
			
		trendline.enter()
			.append("line")
			.attr("class", "trendline")
			.attr("x1", function(d) { return x(d[0]); })
			.attr("y1", function(d) { return y(d[1]); })
			.attr("x2", function(d) { return x(d[2]); })
			.attr("y2", function(d) { return y(d[3]); })
			.attr("stroke", "#000")
			.attr("stroke-width", 5);
		
        co0 = Number(Math.round(leastSquaresCoeff[0]+"e2")+"e-2")
        co1 = Number(Math.round(leastSquaresCoeff[1]+"e2")+"e-2")
        co2 = Number(Math.round(leastSquaresCoeff[2]+"e2")+"e-2")

		// display equation on the chart
		svg.append("text")
			.text("Equation: " + co0 + "x + " + co1)
			.attr("class", "text-label")
			// .attr("x", function(d) {return x(x1);})
			// .attr("y", function(d) {return y(y1) + 200;});
            .attr("x", function(d) {return 25;})
			.attr("y", function(d) {return 400;})
            .attr("font-family","sans-serif");

        svg.append("text")
			.text("Y: Car Insurance Premiums ~ X: " + xvarname)
			.attr("class", "text-label")
			// .attr("x", function(d) {return x(x1);})
			// .attr("y", function(d) {return y(y1) + 200;});
            .attr("x", function(d) {return 25;})
			.attr("y", function(d) {return 370;})
            .attr("font-family","sans-serif");
console.log("in")
		
		// display r-square on the chart
		// svg.append("text")
		// 	.text("r-sq: " + co2)
		// 	.attr("class", "text-label")
		// 	.attr("x", function(d) {return x(x2) - 60;})
		// 	.attr("y", function(d) {return y(y2) - 10;});


	
	// returns slope, intercept and r-square of the line
	function leastSquares(xSeries, ySeries) {
		var reduceSumFunc = function(prev, cur) { return prev + cur; };
		
		var xBar = xSeries.reduce(reduceSumFunc) * 1.0 / xSeries.length;
		var yBar = ySeries.reduce(reduceSumFunc) * 1.0 / ySeries.length;

		var ssXX = xSeries.map(function(d) { return Math.pow(d - xBar, 2); })
			.reduce(reduceSumFunc);
		
		var ssYY = ySeries.map(function(d) { return Math.pow(d - yBar, 2); })
			.reduce(reduceSumFunc);
			
		var ssXY = xSeries.map(function(d, i) { return (d - xBar) * (ySeries[i] - yBar); })
			.reduce(reduceSumFunc);
			
		var slope = ssXY / ssXX;
		var intercept = yBar - (xBar * slope);
		var rSquare = Math.pow(ssXY, 2) / (ssXX * ssYY);
		
		return [slope, intercept, rSquare];
	}


function transition_data() {
  svg.selectAll(".point")
    .data(data)
    .attr("cx", function(d) { return x(tell(d,xvar)); });

  svg.selectAll(".trendline")
    .data(trendData)
    .attr("x1", function(d) { return x(d[0]); })
			.attr("y1", function(d) { return y(d[1]); })
			.attr("x2", function(d) { return x(d[2]); })
			.attr("y2", function(d) { return y(d[3]); })
}

function reset_axis() {
  svg.transition().duration(500)
   .select(".x.axis")
   .call(xAxis);
}

});
}

///////////////////////////////////////////////////////////////////////////////////////////////

function draw(){ 
    
d3.select("#hahaha").remove()

    d3.csv("bad-drivers1.csv",function(error,data){
        data.forEach(function(d){
            d.CarInsurancePremiums = +d.CarInsurancePremiums;
            d.InsuranceIncurredPerDriver = +d.InsuranceIncurredPerDriver;
            d.fatalPerBillionMiles = +d.fatalPerBillionMiles
            d.Speeding = +d.Speeding;
            d["Alcohol-Impaired"] = +d["Alcohol-Impaired"];
            d.Distracted = +d.Distracted
        })
        
if(kkey != "all"){
    data = data.filter(function(d){return kkey == d["geotype"]})
}
console.log("in")

function tell(data, xvar){
    if(xvar != "fatalPerBillionMiles" && xvar != "InsuranceIncurredPerDriver"){
        return data[xvar]/100*data["fatalPerBillionMiles"]
    } else {
        return data[xvar]
    }
}


var margin = {top: 20, right: 20, bottom: 60, left: 40},
    width = 700 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var maxp = d3.max(data,function(d){return d.CarInsurancePremiums}),
    maxf = d3.max(data,function(d){return tell(d,xvar)}),
    minpd = d3.min(data,function(d){return d.InsuranceIncurredPerDriver}),
    maxpd = d3.max(data,function(d){return d.InsuranceIncurredPerDriver})

if(xvar == "fatalPerBillionMiles"){
    var xvarname = "number of fatal collisions/per billion miles"
} else {
    xvarname = "insurance incurrend per drive"
}

console.log(maxp)
var x = d3.scaleLinear()
    .range([0, width])
    .domain([0, maxf+5]);

var y = d3.scaleLinear()
    .range([height, 0])
    .domain([0, maxp+100]);

var z = d3.scaleLinear()
    .range([7,21])
    .domain([minpd,maxpd])

var colmap = d3.scaleLinear()
    .range(["white","red"])
    .domain([minpd,maxpd])

var c2 = d3.scaleOrdinal()
    .domain(["cw","ne","s","w"])
    .range(["#bcbddc","#fdae6b","#9ecae1","#a1d99b"])

var c3 = d3.scaleOrdinal()
    .domain(["cw","ne","s","w"])
    .range(["#756bb1","#e6550d","#3182bd","#31a354"])
    
console.log("in")
// var brush = d3.svg.brush()
//     .x(x)
//     .on("brush", brushmove)
//     .on("brushend", brushend);

// var xAxis = d3.svg.axis()
//     .scale(x)
//     .orient("bottom");

// var yAxis = d3.svg.axis()
//     .scale(y)
//     .orient("left");

var svg = d3.select("#ssss").append("svg")
.attr("id","hahaha")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("g")
    .attr("class", "x axis")
    .attr("clip-path", "url(#clip)")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

svg.append("g")
    .append("text")
    .attr("class","axis")
    .attr("x",550)
    .attr("y",460)
    .text(xvar)
    .attr("font-family","sans-serif")

svg.append("g")
    .append("text")
    .attr("class","axis")
    .attr("x",0)
    .attr("y",0)
    .text("Car Insurance Premiums($)")
    .attr("font-family","sans-serif")

var scatterTooltip = d3.select("#hahaha").append("text")
                        .attr("class","scatterTooltip")
                        .attr("x",60).attr("y",350)
                        .attr("font-size",55)
                        .attr("opacity",0.5)
                        .attr("font-family","sans-serif")

var scatterLegend1 = d3.select("svg").append("rect")
                        .attr("class","scatterlegend")
                        .attr("x",600).attr("y",375)
                        .attr("width",10)
                        .attr("height",10)
                        .attr("fill","#bcbddc")
var scatterLegend2 = d3.select("svg").append("rect")
                        .attr("class","scatterlegend")
                        .attr("x",600).attr("y",390)
                        .attr("width",10)
                        .attr("height",10)
                        .attr("fill","#fdae6b")
var scatterLegend3 = d3.select("svg").append("rect")
                        .attr("class","scatterlegend")
                        .attr("x",600).attr("y",405)
                        .attr("width",10)
                        .attr("height",10)
                        .attr("fill","#9ecae1")                        
var scatterLegend4 = d3.select("svg").append("rect")
                        .attr("class","scatterlegend")
                        .attr("x",600).attr("y",420)
                        .attr("width",10)
                        .attr("height",10)
                        .attr("fill","#a1d99b")     
var scatterlegend11 = d3.select("svg").append("text")
                        .attr("class","scatterlegend1")
                        .attr("x",615).attr("y",382.5)
                        .text("Central Western")
                        .attr("font-size",10)    
                        .attr("font-family","sans-serif")
var scatterlegend21 = d3.select("svg").append("text")
                        .attr("class","scatterlegend1")
                        .attr("x",615).attr("y",397.5)
                        .text("Northeastern")
                        .attr("font-size",10)    
                        .attr("font-family","sans-serif")                               
var scatterlegend31 = d3.select("svg").append("text")
                        .attr("class","scatterlegend1")
                        .attr("x",615).attr("y",412.5)
                        .text("Southern")
                        .attr("font-size",10)  
                        .attr("font-family","sans-serif")
var scatterlegend41 = d3.select("svg").append("text")
                        .attr("class","scatterlegend1")
                        .attr("x",615).attr("y",427.5)
                        .text("Western")
                        .attr("font-size",10)  
                        .attr("font-family","sans-serif")

svg.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(y));

// svg.append("g")
//     .attr("class", "brush")
//     .call(brush)
//   .selectAll('rect')
//     .attr('height', height);

svg.append("defs").append("clipPath")
    .attr("id", "clip")
  .append("rect")
    .attr("width", width)
    .attr("height", height + 20);

var points = svg.selectAll(".point")
    .data(data)

points.exit().remove();

  points.enter().append("circle")
    .attr("class", "point")
    .attr("clip-path", "url(#clip)")
    .attr("r", 7)
    .attr("cx", function(d) { return x(tell(d,xvar)); })
    .attr("cy", function(d) { return y(d.CarInsurancePremiums); })
    .attr("fill",function(d){return c2(d.geotype)})
    .on("mouseover",function(d){
        d3.select(this)
        .attr("r",9)
        .attr("fill",function(d){return c3(d.geotype)});
        scatterTooltip
        .text(d.State)
        stip
                .style("opacity",0.9)
                .html(d.State+ "<br>" + "<br>"+ "Car Insurance Premiums: $" + d.InsuranceIncurredPerDriver + "<br>"+"Number of fatals Per Billion Miles: " + d.fatalPerBillionMiles
                + "<br>"+ "Percentage of Speeding-Fatals: " + d.Speeding +"%"
                + "<br>"+ "Percentage of Alcohol-Fatals: " + d["Alcohol-Impaired"]+"%"
                + "<br>"+ "Percentage of Distracted-Fatals: " + d.Distracted+"%")
                .style("left", (d3.event.pageX -110) + "px")
                .style("top", (d3.event.pageY - 90) + "px")
    })
    .on("mouseout",function(){
        d3.select(this)
        .attr("r",7)
        .attr("fill",function(d){return c2(d.geotype)})
        scatterTooltip.text("")
        stip
        .style("opacity",0)
    })
    .append("svg:title")
        .text(function(d){return d.State + 
                                "\nInsurance Incurred Per Driver: " + d.InsuranceIncurredPerDriver});

// points.on('mousedown', function(){
//   brush_elm = svg.select(".brush").node();
//   new_click_event = new Event('mousedown');
//   new_click_event.pageX = d3.event.pageX;
//   new_click_event.clientX = d3.event.clientX;
//   new_click_event.pageY = d3.event.pageY;
//   new_click_event.clientY = d3.event.clientY;
//   brush_elm.dispatchEvent(new_click_event);
// });
        // dataSortedByFatal = data.sort(function(a,b){return a.fatalPerBillionMiles - b.fatalPerBillionMiles})
        
        var xLabels = data.map(function(d){return tell(d,xvar)});
        var xSeries = d3.range(1,data.length+1)
		var ySeries = data.map(function(d) { return parseFloat(d.CarInsurancePremiums); });
		
		var leastSquaresCoeff = leastSquares(xLabels, ySeries);
		console.log(leastSquaresCoeff)
        console.log(xLabels)
        

		// apply the reults of the least squares regression
		var x1 = d3.min(data,function(d){return tell(d,xvar)})-5;
		var y1 = leastSquaresCoeff[0]*x1 + leastSquaresCoeff[1];
		var x2 = d3.max(data,function(d){return tell(d,xvar)})+5;
		var y2 = leastSquaresCoeff[0] *x2  + leastSquaresCoeff[1];
		var trendData = [[x1,y1,x2,y2]];
		console.log(trendData)
		var trendline = svg.selectAll(".trendline")
			.data(trendData);
			
		trendline.enter()
			.append("line")
			.attr("class", "trendline")
			.attr("x1", function(d) { return x(d[0]); })
			.attr("y1", function(d) { return y(d[1]); })
			.attr("x2", function(d) { return x(d[2]); })
			.attr("y2", function(d) { return y(d[3]); })
			.attr("stroke", "#000")
			.attr("stroke-width", 5);
		
        co0 = Number(Math.round(leastSquaresCoeff[0]+"e2")+"e-2")
        co1 = Number(Math.round(leastSquaresCoeff[1]+"e2")+"e-2")
        co2 = Number(Math.round(leastSquaresCoeff[2]+"e2")+"e-2")

		// display equation on the chart
		svg.append("text")
			.text("Automatically calculated Equation: " + co0 + "x + " + co1)
			.attr("class", "p")
			// .attr("x", function(d) {return x(x1);})
			// .attr("y", function(d) {return y(y1) + 200;});
            .attr("x", function(d) {return 25;})
			.attr("y", function(d) {return 400;})
            .attr("font-family","sans-serif");

        svg.append("text")
			.text("Y: Car Insurance Premiums ~ X: " + xvarname)
			.attr("class", "text-label")
			// .attr("x", function(d) {return x(x1);})
			// .attr("y", function(d) {return y(y1) + 200;});
            .attr("x", function(d) {return 25;})
			.attr("y", function(d) {return 370;})
            .attr("font-family","sans-serif");
		
		// display r-square on the chart
		// svg.append("text")
		// 	.text("r-sq: " + co2)
		// 	.attr("class", "text-label")
		// 	.attr("x", function(d) {return x(x2) - 60;})
		// 	.attr("y", function(d) {return y(y2) - 10;});


	
	// returns slope, intercept and r-square of the line
	function leastSquares(xSeries, ySeries) {
		var reduceSumFunc = function(prev, cur) { return prev + cur; };
		
		var xBar = xSeries.reduce(reduceSumFunc) * 1.0 / xSeries.length;
		var yBar = ySeries.reduce(reduceSumFunc) * 1.0 / ySeries.length;

		var ssXX = xSeries.map(function(d) { return Math.pow(d - xBar, 2); })
			.reduce(reduceSumFunc);
		
		var ssYY = ySeries.map(function(d) { return Math.pow(d - yBar, 2); })
			.reduce(reduceSumFunc);
			
		var ssXY = xSeries.map(function(d, i) { return (d - xBar) * (ySeries[i] - yBar); })
			.reduce(reduceSumFunc);
			
		var slope = ssXY / ssXX;
		var intercept = yBar - (xBar * slope);
		var rSquare = Math.pow(ssXY, 2) / (ssXX * ssYY);
		
		return [slope, intercept, rSquare];
	}






// function brushmove() {
//   var extent = brush.extent();
//   points.classed("selected", function(d) {
//     is_brushed = extent[0] <= d[xvar] && d[xvar] <= extent[1];
//     return is_brushed;
//   });
// }

// function brushend() {
//   get_button = d3.select(".clear-button");
//   if(get_button.empty() === true) {
//     clear_button = svg.append('text')
//       .attr("y", 465)
//       .attr("x", 5)
//       .attr("class", "clear-button")
//       .text("Clear Brush");
//   }

//   x.domain(brush.extent());

//   transition_data();
//   reset_axis();

//   points.classed("selected", false);
//   d3.select(".brush").call(brush.clear());

//   clear_button.on('click', function(){
//     x.domain([0, maxf+5]);
//     transition_data();
//     reset_axis();
//     clear_button.remove();
//   });
// }

function transition_data() {
  svg.selectAll(".point")
    .data(data)
    .attr("cx", function(d) { return x(tell(d,xvar)); });

  svg.selectAll(".trendline")
    .data(trendData)
    .attr("x1", function(d) { return x(d[0]); })
			.attr("y1", function(d) { return y(d[1]); })
			.attr("x2", function(d) { return x(d[2]); })
			.attr("y2", function(d) { return y(d[3]); })
}

// function reset_axis() {
//   svg.transition().duration(500)
//    .select(".x.axis")
//    .call(xAxis);
// }

});
}