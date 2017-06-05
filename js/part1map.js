

var mapwidth = 600,
    mapheight = 320;

var projection = d3.geoAlbersUsa()
                    .translate([mapwidth/2,mapheight/2])
                    .scale(650)


var path = d3.geoPath()
	.projection(projection);

var mapsvg = d3.select("#mmmm").append("svg")
    .attr("width", mapwidth)
    .attr("height", mapheight);

var specsvg = d3.select("#bb").append("svg").attr("id","bbspec").attr("width",600).attr("height",320).attr("class","sp")
                    .append("g").attr("transform", "translate(" + 20 + "," + 20 + ")");

var dataset;
var arr = [];

var tip = d3.select("body").append("div")
  .attr("class", "toolTip")
  .style("opacity",0)
  

// load up the json files, and when we're done, call ready
d3.queue()
    .defer(d3_request.json, "states.json")
    .defer(function(name,callback){
        d3.csv(name, function(error,data){
            data.forEach(function(d){
                d["Alcohol-Impaired"] = +d["Alcohol-Impaired"];
                d["CarInsurancePremiums"] = +d["CarInsurancePremiums"];
                d["InsuranceIncurredPerDriver"] = +d["InsuranceIncurredPerDriver"];
                d["NoPreviousAccidents"] = +d["NoPreviousAccidents"];
                d["NotDistracted"] = +d["NotDistracted"];
                d["Speeding"] = +d["Speeding"];
                d["fatalPerBillionMiles"] = +d["fatalPerBillionMiles"];
                d["Longtitude"] = +d["Longtitude"];
                d["Langtitude"] = +d["Langtitude"];
            })
            callback(error,data)
            dataset = data;

        })
    }, "bad-drivers1.csv")
    .await(ready);


// d3.queue()
//     .await(change);
// keep these around for later
var us,centroid;
var data;
var l;
var minf = 0, maxf = 1;


function ready(error, jsonData, dataset) {

            pers = ["Speeding","Alcohol-Impaired","Distracted"]
            minf = d3.min(dataset,function(d){return d.fatalPerBillionMiles})
            maxf = d3.max(dataset,function(d){return d.fatalPerBillionMiles})
            mini = d3.min(dataset,function(d){return d.InsuranceIncurredPerDriver})
            maxi = d3.max(dataset,function(d){return d.InsuranceIncurredPerDriver})
            maxspec = d3.max(dataset,function(d){return d3.max(pers, function(per){return d[per]/100*d.fatalPerBillionMiles})})
            
            colormap = d3.scaleLinear()
                 .domain([minf,(minf+maxf)/2,maxf])
                 
                 .range(["green","white","red"])
            
            sizemap = d3.scalePow()
                .domain([mini,maxi])
                .exponent(1.5)
                .range([2,20])
            
        var c1 = d3.scaleOrdinal()
        .domain(["cw","ne","s","w"])
        .range(["#efedf5","#fee6ce","#deebf7","#e5f5e0"])

        var c2 = d3.scaleOrdinal()
        .domain(["cw","ne","s","w"])
        .range(["#bcbddc","#fdae6b","#9ecae1","#a1d99b"])

        var c3 = d3.scaleOrdinal()
        .domain(["cw","ne","s","w"])
        .range(["#756bb1","#e6550d","#3182bd","#31a354"])


  // store the values so we can use them later
  states = jsonData
   
  var circle = mapsvg.selectAll(".symbol")
      		.data(dataset)

  // draw the states
  mapsvg.append("path")
      .attr("class", "states")
      .datum(topojson.feature(states, states.objects.usStates))
      .attr("d", path)
      .attr("fill",function(d){return c1(d.geotype);});


var legend1 = mapsvg.append("rect")
                    .attr("x",20)
                    .attr("y",200)
                    .attr("width",10)
                    .attr("height",10)
                    .attr("fill",colormap(minf))
                    .attr("stroke","#000")
var legend1 = mapsvg.append("rect")
                    .attr("x",20)
                    .attr("y",215)
                    .attr("width",10)
                    .attr("height",10)
                    .attr("fill",colormap(((minf+maxf)/2+minf)/2))
                    .attr("stroke","#000")                    
var legend1 = mapsvg.append("rect")
                    .attr("x",20)
                    .attr("y",230)
                    .attr("width",10)
                    .attr("height",10)
                    .attr("fill",colormap((minf+maxf)/2))
                    .attr("stroke","#000") 
var legend1 = mapsvg.append("rect")
                    .attr("x",20)
                    .attr("y",245)
                    .attr("width",10)
                    .attr("height",10)
                    .attr("fill",colormap(((minf+maxf)/2+maxf)/2))
                    .attr("stroke","#000")                   
var legend1 = mapsvg.append("rect")
                    .attr("x",20)
                    .attr("y",260)
                    .attr("width",10)
                    .attr("height",10)
                    .attr("fill",colormap(maxf))
                    .attr("stroke","#000")

var legend1 = mapsvg.append("text")
                    .attr("x",35)
                    .attr("y",207.5)
                    .text("5.9 (Minimun)")
                    .attr("font-size",8)
                    .attr("font-family","sans-serif")
var legend1 = mapsvg.append("text")
                    .attr("x",35)
                    .attr("y",222.5)
                    .text("10.4")
                    .attr("font-size",8)
                    .attr("font-family","sans-serif")
var legend1 = mapsvg.append("text")
                    .attr("x",35)
                    .attr("y",237.5)
                    .text("14.9 (Average)")
                    .attr("font-size",8)
                    .attr("font-family","sans-serif")
var legend1 = mapsvg.append("text")
                    .attr("x",35)
                    .attr("y",252.5)
                    .text("19.4")
                    .attr("font-size",8)
                    .attr("font-family","sans-serif")
var legend1 = mapsvg.append("text")
                    .attr("x",35)
                    .attr("y",267.5)
                    .text("23.9 (Maximun)")
                    .attr("font-size",8)
                    .attr("font-family","sans-serif")
var legend1 = mapsvg.append("text")
                    .attr("x",0)
                    .attr("y",192.5)
                    .text("Number of Fatal Collisions/per billion miles")
                    .attr("font-size",8)
                    .attr("font-family","sans-serif")


  circle.exit().remove();

  // draw the symbols on top
  circle
            .enter().append("circle",".symbol")
      		.attr("class", function(d){return 'symbol map-' + d.State.replace('/ /g', '-')})
      		.attr("fill",function(d){return colormap(d.fatalPerBillionMiles)})
            .on("mouseover",function(d){
                d3.select(this)
                .attr("fill","black")
                tip
                .style("opacity",0.9)
                .html(d.State+ "<br>" + "<br>"+"Number of fatals Per Billion Miles: " + d.fatalPerBillionMiles
                                    +"<br>"+ "Insurance Incurred Per Driver: $" + d.InsuranceIncurredPerDriver)
                .style("left", (d3.event.pageX -50) + "px")
                .style("top", (d3.event.pageY - 70) + "px");

                // spec(d);

            })
            .on("mouseout",function(){
                d3.select(this).attr("fill",function(d){return colormap(d.fatalPerBillionMiles)})
                tip
                .style("opacity",0)
                
                
                
            })
            .on('click', function(d){
                // curSelect = d3.selectAll('.bar-' + d.State.replace('/ /g', '-'));
                // ifSelect = curSelect.classed('selectedName') == false;
                // d3.selectAll('.name').classed('selectedName', false);
                // curSelect.classed('selectedName', ifSelect);
                tip
                .style("opacity",0.9)
                .html(d.State+ "<br>" + "<br>"+"Number of fatals Per Billion Miles: " + d.fatalPerBillionMiles
                                    +"<br>"+ "Insurance Incurred Per Driver: $" + d.InsuranceIncurredPerDriver)
                .style("left", (d3.event.pageX -50) + "px")
                .style("top", (d3.event.pageY - 70) + "px");
                spec(d);

            })
      		.attr("r", function(d){return sizemap(d.InsuranceIncurredPerDriver)})
            .attr("transform", function(d){return "translate(" + projection([d.Longtitude,d.Langtitude]) + ")";})
            // .append("svg:title")
            //     .text(function(d){return d.State + "\nNumber of fatals Per Billion Miles: " + d.fatalPerBillionMiles
            //                         + "\nInsurance Incurred Per Driver: " + d.InsuranceIncurredPerDriver});   

}


function spec(d){
    d3.selectAll(".sp").remove()
    var specsvg = d3.select("#bb").append("svg").attr("id","bbspec").attr("width",600).attr("height",320).attr("class","sp")
                    .append("g").attr("transform", "translate(" + 20 + "," + 20 + ")");

        var xspec = d3.scalePoint()
                        .domain(pers)
                        .range([0,560])
                        .padding(0.5)

        var yspec = d3.scaleLinear()
                        .domain([0,maxspec])
                        .range([280,0])
        
        var no1 = Number(Math.round((d["Speeding"]/100*d.fatalPerBillionMiles)+"e2")+"e-2");
        var no2 = Number(Math.round((d["Alcohol-Impaired"]/100*d.fatalPerBillionMiles)+"e2")+"e-2");
        var no3 = Number(Math.round((d["Distracted"]/100*d.fatalPerBillionMiles)+"e2")+"e-2");
        var nos = [no1,no2,no3]


        specsvg.append("g")
        .attr("transform", "translate(0," + 280 + ")")
        .call(d3.axisBottom(xspec))

        specsvg.append("g")
        .attr("transform", "translate(0," + 0 + ")")
        .call(d3.axisLeft(yspec))

        specsvg.append("text")
        .text(d.State)
        .attr("x",10)
        .attr("y",25)
        .attr("font-size",35)
        .attr("opacity",1)
        .attr("fill",c2(d.geotype))
        .attr("font-family","sans-serif")
        .on("click",function(){
            d3.select(this)
            .attr("fill",c3(d.geotype))
        })

console.log((d.Speeding/100*d.fatalPerBillionMiles))
for(i=0;i<pers.length;i++){
    var no = Number(Math.round((d[pers[i]]/100*d.fatalPerBillionMiles)+"e2")+"e-2");
    specsvg.append("rect")
                .attr("class","meanpercent")
                .attr("x",xspec(pers[i])-20)
                .attr("width",40)
                .attr("fill",c2(d.geotype))
                .attr("y",yspec(d[pers[i]]/100*d.fatalPerBillionMiles))
                .attr("height",280-yspec(d[pers[i]]/100*d.fatalPerBillionMiles))
                
                
                .on("mouseover",function(){
                    d3.select(this)
                    .attr("fill",c3(d.geotype))
                    
                })
                .on("mouseout",function(){
                    d3.select(this)
                    .attr("fill",c2(d.geotype))
                })

}

        specsvg.append("text")
        .text("Speeding-Fatals: " + no1)
        .attr("x",10)
        .attr("y",45)
        .attr("font-size",12)
        .attr("fill","#ccc")
        .attr("font-family","sans-serif")
        .on("click",function(){
            d3.select(this)
            .attr("fill","#000")
        })

        specsvg.append("text")
        .text("Alcohol-Fatals: " + no2)
        .attr("x",10)
        .attr("y",65)
        .attr("font-size",12)
        .attr("fill","#ccc")
        .on("click",function(){
            d3.select(this)
            .attr("fill","#000")
        })

        specsvg.append("text")
        .text("Distracted-Fatals: " + no3)
        .attr("class","distracted")
        .attr("x",10)
        .attr("y",85)
        .attr("font-size",12)
        .attr("fill","#ccc")
        .attr("font-family","sans-serif")
        .on("click",function(){
            d3.select(this)
            .attr("fill","#000")
        })

specsvg.append("rect")
                        .attr("class","scatterlegend")
                        .attr("x",450).attr("y",5)
                        .attr("width",10)
                        .attr("height",10)
                        .attr("fill","#bcbddc")
specsvg.append("rect")
                        .attr("class","scatterlegend")
                        .attr("x",450).attr("y",20)
                        .attr("width",10)
                        .attr("height",10)
                        .attr("fill","#fdae6b")
specsvg.append("rect")
                        .attr("class","scatterlegend")
                        .attr("x",450).attr("y",35)
                        .attr("width",10)
                        .attr("height",10)
                        .attr("fill","#9ecae1")                        
specsvg.append("rect")
                        .attr("class","scatterlegend")
                        .attr("x",450).attr("y",50)
                        .attr("width",10)
                        .attr("height",10)
                        .attr("fill","#a1d99b")     
specsvg.append("text")
                        .attr("class","scatterlegend1")
                        .attr("x",465).attr("y",12.5)
                        .text("Central Western")
                        .attr("font-size",10)   
                        .attr("font-family","sans-serif") 
specsvg.append("text")
                        .attr("class","scatterlegend1")
                        .attr("x",465).attr("y",27.5)
                        .text("Northeastern")
                        .attr("font-size",10)    
                        .attr("font-family","sans-serif")                               
specsvg.append("text")
                        .attr("class","scatterlegend1")
                        .attr("x",465).attr("y",42.5)
                        .text("Southern")
                        .attr("font-size",10)  
                        .attr("font-family","sans-serif")
specsvg.append("text")
                        .attr("class","scatterlegend1")
                        .attr("x",465).attr("y",57.5)
                        .text("Western")
                        .attr("font-size",10)  
                        .attr("font-family","sans-serif")
        // specsvg.append("rect")
        //         .attr("class","meanpercent")
        //         .attr("x",xspec("Speeding")-20)
        //         .attr("y",280-yspec(d.Speeding/100*d.fatalPerBillionMiles))
        //         .attr("height",yspec(d.Speeding/100*d.fatalPerBillionMiles))
        //         .attr("width",40)
        //         .attr("fill","#ccc")


}
