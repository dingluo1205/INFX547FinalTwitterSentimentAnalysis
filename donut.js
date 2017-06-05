(function(d3) {
        'use strict';

        var width = 360+200;
        var height = 360;
        var radius = Math.min(width, height) / 2;
        var donutWidth = 75;
        var legendRectSize = 14;
        var legendSpacing = 2;

 //       var color = d3.scaleOrdinal(d3.schemeCategory20b);
        var color = d3.scaleOrdinal()
                      .domain(['positive','trust','surprise','joy','anticipation','negative','sadness','anger','fear','disgust'])
            //          .domain(['disgust','fear','anger','sadness','negative','anticipation','joy','surprise','trust','positive'])
                      .range(['#006837','#1a9850','#66bd63','#a6d96a','#d9ef8b','#fee08b','#fdae61','#f46d43','#d73027','#800026'])

        var svg = d3.select('#sentiment')
          .append('svg')
          .attr('width', width)
          .attr('height', height)
          .append('g')
          .attr('transform', 'translate(' + (width/3) +
            ',' + (height / 2) + ')');

     //   svg.append('g').attr('class', 'labelName');

        var arc = d3.arc()
          .innerRadius(radius - donutWidth)
          .outerRadius(radius);
        
         // this arc is used for aligning the text labels
        var outerArc = d3.arc()
            .outerRadius(radius * 0.9)
            .innerRadius(radius * 0.9);

        var pie = d3.pie()
          .value(function(d) { return d.count; })
          .sort(null);

        var tooltip = d3.select('#sentiment')
          .append('div')
          .attr('class', 'tooltip');
        
        tooltip.append('div')
            .attr('class','test')


        tooltip.append('div')
          .attr('class', 'labels');

        tooltip.append('div')
          .attr('class', 'count');

        tooltip.append('div')
          .attr('class', 'percent');
        

d3.select('#select').on('click',function(){

 
  //     svg.selectAll("*").remove()
       var date = this.value;
      // console.log(date)
//function draw_donut(date){
  svg.selectAll("*").remove()

        d3.csv('donut.csv', function(error, dataset) {
          dataset.forEach(function(d) {
            d.count = + d[date];
            d.enabled = true;                                         // NEW
          });
        

          var path = svg.selectAll('path')
            .data(pie(dataset))
            .enter()
            .append('path')
            .attr('d', arc)
         //   .attr('class','donut')
            .attr('fill', function(d, i) {
              return color(d.data.label);
            })                                                        // UPDATED (removed semicolon)
            .each(function(d) { this._current = d; });                // NEW

          path.on('mouseover', function(d) {
            tooltip.transition()
                   .duration(200)
                   .style('opacity',0.9)
            var total = d3.sum(dataset.map(function(d) {
              return (d.enabled) ? d.count : 0;                       // UPDATED
            }));
            var percent = Math.round(1000 * d.data.count / total) / 10;
            //  tooltip.style('top', (d3.event.pageY ) + 'px')
            //    .style('left', (d3.event.pageX ) + 'px');
            tooltip.select('.labels').html(d.data.label);
            tooltip.select('.count').html(d.data.count);
            tooltip.select('.percent').html(percent + '%');
            tooltip.style('display', 'block');

          });

          path.on('mouseout', function() {
            tooltip.style('display', 'none');
          });

          

          var legend = svg.selectAll('.legend')
            .data(color.domain())
            .enter()
            .append('g')
            .attr('class', 'legend')
            .attr('transform', function(d, i) {
              var height = legendRectSize + legendSpacing;
              var offset =  height * color.domain().length / 2;
              var horz = -2 * legendRectSize;
              var vert = i * height - offset;
              return 'translate(' + horz + ',' + vert + ')';
            });

          legend.append('rect')
            .attr('width', legendRectSize)
            .attr('height', legendRectSize)
            .style('fill', color)
            .style('stroke', color)                                   // UPDATED (removed semicolon)
            .on('click', function(label) {                            // NEW
              var rect = d3.select(this);                             // NEW
              var enabled = true;                                     // NEW
              var totalEnabled = d3.sum(dataset.map(function(d) {     // NEW
                return (d.enabled) ? 1 : 0;                           // NEW
              }));                                                    // NEW

              if (rect.attr('class') === 'disabled') {                // NEW
                rect.attr('class', '');                               // NEW
              } else {                                                // NEW
                if (totalEnabled < 2) return;                         // NEW
                rect.attr('class', 'disabled');                       // NEW
                enabled = false;                                      // NEW
              }                                                       // NEW

              pie.value(function(d) {                                 // NEW
                if (d.label === label) d.enabled = enabled;           // NEW
                return (d.enabled) ? d.count : 0;                     // NEW
              });                                                     // NEW

              path = path.data(pie(dataset));                         // NEW

              path.transition()                                       // NEW
                .duration(750)                                        // NEW
                .attrTween('d', function(d) {                         // NEW
                  var interpolate = d3.interpolate(this._current, d); // NEW
                  this._current = interpolate(0);                     // NEW
                  return function(t) {                                // NEW
                    return arc(interpolate(t));                       // NEW
                  };                                                  // NEW
                });                                                   // NEW
            });                                                       // NEW

          legend.append('text')
            .attr('x', legendRectSize + legendSpacing+5)
            .attr('y', legendRectSize - legendSpacing)
            .text(function(d) { return d; });
          

        });

})

      })(window.d3);