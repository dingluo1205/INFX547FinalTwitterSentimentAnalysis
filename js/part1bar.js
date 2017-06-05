
    
    var tsvg = d3.select("#title2").append("svg").attr("width",1600).attr("height",50)

    var c1 = d3.scaleOrdinal()
        .domain(["cw","ne","s","w"])
        .range(["#efedf5","#fee6ce","#deebf7","#e5f5e0"])

    var c2 = d3.scaleOrdinal()
        .domain(["cw","ne","s","w"])
        .range(["#bcbddc","#fdae6b","#9ecae1","#a1d99b"])

    var c3 = d3.scaleOrdinal()
        .domain(["cw","ne","s","w"])
        .range(["#756bb1","#e6550d","#3182bd","#31a354"])

    var c4 = d3.scaleOrdinal()
        .domain(["Speeding","Alcohol-Impaired","Distracted"])
        .range(["#000","#525252","#ffeda0"])

tsvg.append("rect")
                        .attr("class","scatterlegend")
                        .attr("x",0).attr("y",5)
                        .attr("width",10)
                        .attr("height",10)
                        .attr("fill","#000")
tsvg.append("rect")
                        .attr("class","scatterlegend")
                        .attr("x",0).attr("y",20)
                        .attr("width",10)
                        .attr("height",10)
                        .attr("fill","#bdbdbd")                        
tsvg.append("rect")
                        .attr("class","scatterlegend")
                        .attr("x",0).attr("y",35)
                        .attr("width",10)
                        .attr("height",10)
                        .attr("fill","#ffeda0")  

tsvg.append("text")
                        .attr("class","scatterlegend1")
                        .attr("x",15).attr("y",12.5)
                        .text("Speeding-Fatals")
                        .attr("font-size",10)   
                        .attr("font-family","sans-serif")                                
tsvg.append("text")
                        .attr("class","scatterlegend1")
                        .attr("x",15).attr("y",27.5)
                        .text("Alcohol-Fatals")
                        .attr("font-size",10)  
                        .attr("font-family","sans-serif")
tsvg.append("text")
                        .attr("class","scatterlegend1")
                        .attr("x",15).attr("y",42.5)
                        .text("Distracted-Fatals")
                        .attr("font-size",10)  
                        .attr("font-family","sans-serif")



var bartip = d3.select("body").append("div")
                .attr("class","toolTip")
                .style("opacity",0)

    var key = "Speeding";
    var key1 = "NoPreviousAccidents";
    var ars = ["cw","ne","s","w"]
    var divs = ["#bbbb","#bbbb2","#bbbb3","#bbbb4"]



    // drawBar3();
document.getElementById("option1").onchange = 
        function(){
            key = this.value;
            d3.selectAll("#bbbb svg").remove()
            d3.selectAll("#bbbb2 svg").remove()
            d3.selectAll("#bbbb3 svg").remove()
            d3.selectAll("#bbbb4 svg").remove()
            for(i=0;i<divs.length;i++){
                
                drawBar1(divs[i],ars[i])
            }
            // drawBar2();
        }

// document.getElementById("option2").onchange = 
//         function(){
//             key1 = this.value;
//             drawBar2();
            
//         }

for(i=0;i<divs.length;i++){
    drawBar1(divs[i],ars[i])
}


function drawBar1(div,ar){

    d3.csv("bad-drivers1.csv",function(d,i,columns){
        for(var i=3,n = columns.length; i<n;i++) d[columns[i]] = +d[columns[i]];
        return d;
    }, function(error,data){
        if (error) throw error;

        if(div == "#bbbb" || div == "#bbbb2"){
            barsvg = d3.select(div).append("svg").attr("width",1100).attr("height",300)
        } else {
            barsvg = d3.select(div).append("svg").attr("width",1100).attr("height",400)
        }
        barmargin = {top:50,right:25,bottom:20,left:25},
        g = barsvg.append("g").attr("transform","translate("+barmargin.left+","+barmargin.top+")").attr("id","g1"),
        barwidth = +barsvg.attr("width")-barmargin.left-barmargin.right,
        barheight = +barsvg.attr("height")-barmargin.top-barmargin.bottom,
        barHeight = 20,
        spacing = 3;
        
///////// 
    var w1 = barwidth/2-12.5;

    var x = d3.scaleLinear()
        .rangeRound([0,w1])

    var x1 = d3.scaleLinear()
        .rangeRound([0,w1])

    var y0 = d3.scaleBand()
        .rangeRound([barheight,0])
        .paddingInner(0.1)


    //     var svgs = [barsvg1,barsvg2,barsvg3,barsvg4]
    // var gs = [g1,g2,g3,g4]

        var keys = ["Speeding","Alcohol-Impaired","Distracted"],
            keys1 = ["NoPreviousAccidents"]
        for(i=0;i<keys.length;i++){
            if(keys[i] != key){
                seckey = keys[i]
                break
            }
        }
        console.log(seckey)
        for(i=0;i<keys.length;i++){
            if(keys[i] != key && keys[i] != seckey){
                thrkey = keys[i]
                break
            }
        }
        console.log(thrkey)

        

        
        // y1.domain(keys).rangeRound([0,y0.bandwidth()]);
        // x.domain([0,d3.max(data,function(d){return d3.max(keys1,function(key){return d[key]})})])
        x.domain([0,24])
        // x.domain([0,d3.max(data,function(d){return d3.max(keys1,function(key){return d[key]})})])

        data = data.filter(function(d){return d.geotype==ar})
        data.sort(function(a,b){return b[key]/100*b.fatalPerBillionMiles-a[key]/100*a.fatalPerBillionMiles});
        
        y0.domain(data.map(function(d){return d.State}))
            .range([0,data.length*barHeight])

        

        g.append("g")
            .attr("class","x axis top1")
            .call(d3.axisTop(x))

        
        
        // g.append("g")
        //     .attr("class","x axis bottom1")
        //     .attr("transform","translate(0,"+barheight+")")
        //     .call(d3.axisBottom(x))



        //     g.selectAll(".bar")
        //     .data(data)
        //     .enter().append("rect")
        // .attr("class","background")
        // .attr("x",0)
        // .attr("y",function(d){return y0(d.State)})
        // .attr("height",y0.bandwidth())
        // .attr("width",w1)
        // .attr("fill",function(d){return c1(d.geotype)})
        if(ar == "cw"){
            re = "Central Western"
        }
        if(ar == "ne"){
            re = "Northeastern"
        }
        if(ar == "s"){
            re = "Southern"
        }
        if(ar == "w"){
            re = "Western"
        }

        barsvg.append("text")
        .text(re)
        .attr("x",0)
        .attr("y",25)
        .attr("fill",c3(ar))
        .attr("font-size",16)
        .attr("font-family","sans-serif")
        console.log(re)
        

        g.selectAll(".bar")
            .data(data)
            .enter().append("rect")
        .attr("class","percent")
        .attr("x",0)
        .attr("y",function(d){return y0(d.State)})
        .attr("height",y0.bandwidth())
        .attr("width",function(d){return x(d[key]/100*d.fatalPerBillionMiles)})
        .attr("fill",function(d){return c4(key)})
        .attr("opacity",0.7)
        .on("mouseover",function(d){
            d3.select(this)
            .attr("fill",function(d){return c4(key)})
            .attr("opacity",1)
            d3.select("#bbbb svg")
            .append("line")
            .attr("class","rline1")
            .attr("stroke", "#000")
			.attr("stroke-width", 2)
            .attr("x1",x(d[key]/100*d.fatalPerBillionMiles)+25)
            .attr("y1",0)
            .attr("x2",x(d[key]/100*d.fatalPerBillionMiles)+25)
            .attr("y2",400)

            d3.select("#bbbb2 svg")
            .append("line")
            .attr("class","rline2")
            .attr("stroke", "#000")
			.attr("stroke-width", 2)
            .attr("x1",x(d[key]/100*d.fatalPerBillionMiles)+25)
            .attr("y1",0)
            .attr("x2",x(d[key]/100*d.fatalPerBillionMiles)+25)
            .attr("y2",400)

            d3.select("#bbbb3 svg")
            .append("line")
            .attr("class","rline3")
            .attr("stroke", "#000")
			.attr("stroke-width", 2)
            .attr("x1",x(d[key]/100*d.fatalPerBillionMiles)+25)
            .attr("y1",0)
            .attr("x2",x(d[key]/100*d.fatalPerBillionMiles)+25)
            .attr("y2",400)

            d3.select("#bbbb4 svg")
            .append("line")
            .attr("class","rline4")
            .attr("stroke", "#000")
			.attr("stroke-width", 2)
            .attr("x1",x(d[key]/100*d.fatalPerBillionMiles)+25)
            .attr("y1",0)
            .attr("x2",x(d[key]/100*d.fatalPerBillionMiles)+25)
            .attr("y2",400)
            
            bartip
            .style("opacity",0.9)
            .html("["+d.State+"]" + "<br>"+"Number of fatals Per Billion Miles: " + d.fatalPerBillionMiles
                                    +"<br>"+ key + " Percentage: " + d[key]+"%")
            .style("left", (d3.event.pageX+34) + "px")
            .style("top", (d3.event.pageY-30) + "px")
            
        })
        .on("mouseout",function(){
            d3.select(this)
            .attr("fill",function(d){return c4(key)})
            .attr("opacity",0.7)
            d3.select(".rline1").remove()
            d3.select(".rline2").remove()
            d3.select(".rline3").remove()
            d3.select(".rline4").remove()
            bartip.style("opacity",0)
        })

        g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class","stackothers")
        .attr("x",function(d){return x(d[key]/100*d.fatalPerBillionMiles)})
        .attr("y",function(d){return y0(d.State)})
        .attr("height",y0.bandwidth())
        .attr("width",function(d){return x(d[seckey]/100*d.fatalPerBillionMiles)})
        .attr("fill",function(d){return c4(seckey)})
        .attr("opacity",0.7)
        .on("mouseover",function(d){
            d3.select(this)
            .attr("fill",function(d){return c4(seckey)})
            .attr("opacity",1)
            // d3.select("g")
            // .append("line")
            // .attr("class","rline")
            // .attr("stroke", "#000")
			// .attr("stroke-width", 2)
            // .attr("x1",x(d[key]))
            // .attr("y1",0)
            // .attr("x2",x(d[key]))
            // .attr("y2",barheight)
            // console.log(d[key])
            bartip
            .style("opacity",0.9)
            .html("["+d.State+"]" + "<br>"+"Number of fatals Per Billion Miles: " + d.fatalPerBillionMiles
                                    +"<br>"+ seckey + " Percentage: " + d[seckey]+"%")
            .style("left", d3.event.pageX +34 + "px")
            .style("top", (d3.event.pageY-30) + "px")
            
        })
        .on("mouseout",function(){
            d3.select(this)
            .attr("fill",function(d){return c4(seckey)})
            .attr("opacity",0.7)
            // d3.select(".rline").remove()
            bartip.style("opacity",0)
        })

        g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class","stackothers")
        .attr("x",function(d){return x((d.fatalPerBillionMiles)-(d[thrkey]/100*d.fatalPerBillionMiles))})
        .attr("y",function(d){return y0(d.State)})
        .attr("height",y0.bandwidth())
        .attr("width",function(d){return x(d[thrkey]/100*d.fatalPerBillionMiles)})
        .attr("fill",function(d){return c4(thrkey)})
        .attr("opacity",0.7)
        .on("mouseover",function(d){
            d3.select(this)
            .attr("fill",function(d){return c4(thrkey)})
            .attr("opacity",1)
            // d3.select("g")
            // .append("line")
            // .attr("class","rline")
            // .attr("stroke", "#000")
			// .attr("stroke-width", 2)
            // .attr("x1",x(d[key]))
            // .attr("y1",0)
            // .attr("x2",x(d[key]))
            // .attr("y2",barheight)
            // console.log(d[key])
            bartip
            .style("opacity",0.9)
            .html("["+d.State+"]" + "<br>"+"Number of fatals Per Billion Miles: " + d.fatalPerBillionMiles
                                    +"<br>"+ thrkey + " Percentage: " + d[thrkey]+"%")
            .style("left", d3.event.pageX +34 + "px")
            .style("top", (d3.event.pageY-30) + "px")
            
        })
        .on("mouseout",function(){
            d3.select(this)
            .attr("fill",function(d){return c4(thrkey)})
            .attr("opacity",0.7)
            // d3.select(".rline").remove()
            bartip.style("opacity",0)
        })


        g.selectAll(".bar")
        .data(data)
        .enter().append("text")
        .text(function(d){return d["State"]})
        .attr("id","te")
        .attr("class",function(d){
            return  'name bar-' + d.State.replace('/ /g', '-');
        })
        .attr("y",function(d){return y0(d.State)+15})
        .attr("x",spacing)
        .style("fill",function(d){return c2(d.geotype)})
        .attr("font-size",12)
        .attr("font-family","sans-serif")


        // var median = d3.median(data,function(d){return d[key]})
        // var medianLine = [[median,0,median,barheight]]

        // var medianR = g.selectAll(".median")
        //                 .data(medianLine)
        // console.log(medianLine)

        

        // medianR.enter()
        // .append("line")
        // .attr("class","median")
        // .attr("x1",function(d){return x(d[0])})
        // .attr("y1",function(d){return x(d[1])})
        // .attr("x2",function(d){return x(d[2])})
        // .attr("y2",function(d){return d[3]})
        // .attr("stroke", "#000")
		// 	.attr("stroke-width", 2)

        // median.remove()
        
    })
}

// function drawBar2(){

//     d3.csv("bad-drivers1.csv",function(d,i,columns){
//         for(var i=3,n = columns.length; i<n;i++) d[columns[i]] = +d[columns[i]];
//         return d;
//     }, function(error,data){
//         if (error) throw error;

//         data = data.sort(function(a,b){return b[key]/100*b["fatalPerBillionMiles"]-a[key]/100*a["fatalPerBillionMiles"]});

//         var keys = ["Speeding","Alcohol-Impaired","Distracted"],
//             keys1 = ["NoPreviousAccidents"]
        
        
//         y0.domain(data.map(function(d){return d.State}))
//             .range([0,data.length*barHeight])
//         // y1.domain(keys).rangeRound([0,y0.bandwidth()]);
//         x1.domain([0,25])
//         console.log(d3.max(data,function(d){return d.fatalPerBillionMiles}))
//         console.log(d3.min(data,function(d){return d3.max(keys1,function(key){return d[key]})}))
//         // x.domain([0,d3.max(data,function(d){return d3.max(keys1,function(key){return d[key]})})])

//         g.append("g")
//             .attr("class","x axis top2")
//             .attr("transform","translate(400,0)")
//             .call(d3.axisTop(x1))
        
//         g.append("g")
//             .attr("class","x axis bottom2")
//             .attr("transform","translate(400,"+barheight+")")
//             .call(d3.axisBottom(x1))



// var bars1 = g.selectAll(".bar")
//             .data(data)
//             .enter().append("rect")
//         .attr("class","background")
//         .attr("x",400)
//         .attr("y",function(d){return y0(d.State)})
//         .attr("height",y0.bandwidth())
//         .attr("width",function(d){return w1})
//         .attr("fill",function(d){return c1(d.geotype)})
        

//         g.selectAll(".bar")
//             .data(data)
//             .enter().append("rect")
//         .attr("class","percent")
//         .attr("x",400)
//         .attr("y",function(d){return y0(d.State)})
//         .attr("height",y0.bandwidth())
//         .attr("width",function(d){return x1(d[key])/100*d.fatalPerBillionMiles})
//         .attr("fill",function(d){return c4(key)})
//         .attr("opacity",0.7)
//         .on("mouseover",function(d){
//             d3.select(this)
//             .attr("fill",function(d){return c4(key)})
//             .attr("opacity",1)
//             d3.select("g")
//             .append("line")
//             .attr("class","rline")
//             .attr("stroke", "#000")
// 			.attr("stroke-width", 2)
//             .attr("x1",400+x1(d[key])/100*d.fatalPerBillionMiles)
//             .attr("y1",0)
//             .attr("x2",400+x1(d[key])/100*d.fatalPerBillionMiles)
//             .attr("y2",barheight)
//             // console.log(d[key])
//             bartip
//             .style("opacity",0.9)
//             .html("["+d.State+"]" + "<br>" + "Number of fatals per billion miles: " + d.fatalPerBillionMiles
//             + "<br>"+"Number of fatals due to "+ key+ ": " + Number(Math.round(d[key]/100*d.fatalPerBillionMiles + "e1")+"e-1")
//                                     +"<br>"+ "Percentage: " + d[key]+"%")
//             .style("left", (x1((d[key])/100*d.fatalPerBillionMiles)+434) + "px")
//             .style("top", (d3.event.pageY-30) + "px")
            
//         })
//         .on("mouseout",function(){
//             d3.select(this)
//             .attr("fill",function(d){return c4(key);console.log(c1(d.geotype))})
//             .attr("opacity",0.7)
//             d3.select(".rline").remove()
//             bartip.style("opacity",0)
//         })



// console.log(x(data[0].Speeding))
//         g.selectAll(".bar")
//         .data(data)
//         .enter().append("text")
//         .text(function(d){return d["State"]})
//         .attr("class",function(d){
//             return  'name bar-' + d.State.replace('/ /g', '-');
//         })
//         .attr("y",function(d){return y0(d.State)+15})
//         .attr("x",400+spacing)
//         .style("fill",function(d){return c2(d.geotype)})
        
//     })
// }

// function drawBar3(){
//     d3.csv("bad-drivers1.csv",function(d,i,columns){
//         for(var i=3,n = columns.length; i<n;i++) d[columns[i]] = +d[columns[i]];
//         return d;
//     }, function(error,data){
//         if (error) throw error;

//         // data = data.sort(function(a,b){return a[key1]-b[key1]});

//         // var keys = ["Speeding","Alcohol-Impaired","Distracted"],
//             keys1 = ["NoPreviousAccidents"];
//             per = ["Speeding","Alcohol-Impaired","Distracted"]
//             areas = ["cw","ne","s","w"]
//         // console.log(key)
//         y0.domain(data.map(function(d){return d.State}))
//             .range([0,data.length*barHeight])
//         // y1.domain(keys).rangeRound([0,y0.bandwidth()]);
//         // x.domain([0,d3.max(data,function(d){return d3.max(keys,function(key){return d[key]})})])
//         // x.domain([0,d3.max(data,function(d){return d3.max(keys1,function(key){return d[key]})})])
        
//         var ordix1 = d3.scalePoint()
//         .range([0,w1])
//         .domain(per)
//         .padding(0.5)

//         var xaxis = d3.axisBottom()
//                         .scale(ordix1)
        
//         var y = d3.scaleLinear()
//         .domain([0, 10])
//         .range([1/4*barheight, 0]);
//         var yaxis = d3.axisLeft()
//                     .scale(y)

//         g.append("g")
//             .attr("class","y axis1")
//             .attr("transform","translate(400,0)")
//             .call(yaxis)
        
//         g.append("g")
//             .attr("class","x axis bottom2")
//             .attr("transform","translate(400,"+(1/4) * barheight+")")
//             .call(xaxis)

        
//         function mean(data,area,cause){
//             f = data.filter(function(d){return d.geotype == area})
//             return d3.mean(f,function(d){return d[cause]/100*d["fatalPerBillionMiles"]})
//         }
        
//         var barw = 20
        
//         for(i in per){
//             for(j in areas){
//                 g.selectAll(".bar")
//                 .data(data)
//                 .enter().append("rect")
//                 .attr("class","meanpercent")
//                 .attr("x",400 + ordix1(per[i])-barw*(2-j))
//                 .attr("y",1/4*barheight-y(10-(mean(data,areas[j],per[i]))))
//                 .attr("height",y(10-(mean(data,areas[j],per[i]))))
//                 .attr("width",barw)
//                 .attr("fill",c2(areas[j]))
        
//             }
//         }
//         g.append("g").append("text")
//         .attr("x",400)
//         .attr("y",0)
//         .text("Fatal collisions for each cause")



// })}

