console.log('Roscoe is a cutie');
(function(){
    //Call Data

    var data = d3.csv('Total_Rail_Entry_Exit_Cleaned.csv', function(error, data){
      console.log(data);

      $('#submit').on('click', function(event){
        event.preventDefault();
        station = $('#station').val();

        console.log(station);

        d3.select('svg').remove()

        var response = [];

        sel_station = data.filter(function(entry){
          if (entry.Name == station){
            response.push(entry);
          }
        });

        console.log(response);

        var exits = response.map(function(t, exit){

          var sta = d3.keys(data[0])
          .filter(function(key){ return key!=='Name'})
          .filter(function(key){ return key!=='WHERE GET ON'})
          .filter(function(key){ return key!==''});

          var exit = sta.map(function(d){
              return {station: d, ex: t[d]}
            });
          console.log(exit);
          console.log(sta);

          //return exit;

          //render the bar chart
        svg = d3.select('#div1').append('svg')

        var margin = {top: 50, right: 50, bottom: 50, left:60},
        w = 1000 - margin.left,
        h = 500- margin.top - margin.bottom;
        barPadding = 1;
        var max = d3.max(exit, function(d){return +d.ex; });
        var min = d3.min(exit, function(d){return +d.ex; });
        console.log(max);
        console.log(min);

        //Defining the axes
        var x = d3.scale.ordinal()
                  .rangeRoundBands([0, w])
                  .domain(sta.map(function(d){return d}));;

        var y = d3.scale.linear()
                  .range([h, 0])
                  .domain([min, max]);

        var xAxis = d3.svg.axis()
                    .scale(x)
                    .orient('bottom')
                    .ticks(37);
        var yAxis = d3.svg.axis()
                    .scale(y)
                    .orient('left');

        var line = d3.svg.line()
                      .interpolate('cardinal')
                      .x(function(d){ return x(d.station) + x.rangeBand(); })
                      .y(function(d){ return y(d.ex); });

        //Render Grid
        svg.selectAll('line.y')
        .data(y.ticks(10))
        .enter().append('line')
        .attr('class', 'y')
        .attr('x1', 0)
        .attr('x2', w)
        .attr('y1', y)
        .attr('y2', y)
        .style('stroke', '#ccc');

        // This renders the bar chart

        svg.selectAll('rect')
              .data(exit)
              .enter()
              .append('rect')
              .attr('x', function(d, i){
                return i * (w/exit.length);
              })
              .attr('y', function(d){
                return y((d.ex));
              })
              .attr('width', w / exit.length - barPadding)
              .attr('height', function(d){
                return h - y(d.ex);
              })
              .attr('fill', 'teal');

            svg.selectAll('text')
              .data(exit)
              .enter()
              .append('text')
              .text(function(d){
                return d.station;
              })
              .attr('x', function(d, i){
                return i * (w/exit.length) + 10;
              })
              .attr('y', function(d){
                return y(d.ex) + 10;
              })
              .attr('font-family', 'sans-serif')
              .attr('font-size', '11px')
              .attr('fill', 'white')
              .attr('text-anchor', 'middle');

              //Render X axis
              svg.append('g')
              .attr('class', 'x axis')
              .attr('transform', 'translate (0 ' + h + ')')
              .call(xAxis)
              // .selectAll('text')
              // .style('text-anchor', 'end')
              // .style('font-size', '12')
              // .attr('dx', '-15')
              // .attr('dy', '0')
              // .attr('transform' , function(d){
              //   return 'rotate(-65)'
              // })
              // .attr('fill', 'white');

              //Render y axis
          svg.append('g')
              .attr('class', 'y axis')
              .call(yAxis)
              .append('text')
                .attr('transform', 'rotate(-90)')
                .attr('y', 6)
                .attr('dy', '.71em')
                .style('text-anchor', 'end')
                .attr('fill', 'white');

        //   d3.select('#div1').selectAll('p')
        //   .data(exit)
        //   .enter()
        //   .append('div')
        //   .attr('class', 'bar')
        //   .style('height', function (d){
        //     var barHeight = d.ex /3;
        //     return barHeight + 'px';
        //   })
        //   .append('text')
        //   .text(function (d){d.ex});
        //
       });


      // //Cleans data to process
      // var exits = data.map(function(t, exit){
      //
      //   var exit = d3.keys(data[0])
      //     .filter(function(key){ return key!=='Name'})
      //     .filter(function(key){ return key!=='WHERE GET ON'})
      //     .filter(function(key){ return key!==''});
      //
      //   return {
      //     name: t.Name,
      //     exitst: exit.map(function(d){
      //       return {station: d, ex: t[d]}
      //     })
      //   }
      // });
      //
      // console.log(exits);

      // //render the bar chart
      // d3.select('#div1').selectAll('p')
      //   .data(exits)
      //   .enter()
      //   .append('div')
      //   .attr('class', 'bar')
      //   .style('height', function (d){
      //     var barHeight = d.ex /3;
      //     return barHeight + 'px';
      //   })
      //   .append('text')
      //   .text(function (d){d.ex});
      });

    });

    // This section call the AM Data
    var AMdata = d3.csv('AM_Rail_Entry_Exit_Cleaned.csv', function (error, data){
      console.log(data);

      $('#submit').on('click', function(event){
        event.preventDefault();
        station = $('#station').val();

        console.log(station);

        d3.select('svg').remove()

        var response = [];

        sel_station = data.filter(function(entry){
          if (entry.Name == station){
            response.push(entry);
          }
        });

        console.log(response);

        var exits = response.map(function(t, exit){

          var sta = d3.keys(data[0])
          .filter(function(key){ return key!=='Name'})
          .filter(function(key){ return key!=='WHERE GET ON'})
          .filter(function(key){ return key!==''});

          var exit = sta.map(function(d){
            return {station: d, ex: t[d]}
          });
          console.log(exit);
          console.log(sta);

          //return exit;

          //render the bar chart
          svg = d3.select('#div2').append('svg')

          var margin = {top: 50, right: 50, bottom: 50, left:60},
          w = 1000 - margin.left,
          h = 500- margin.top - margin.bottom;
          barPadding = 1;
          var max = d3.max(exit, function(d){return +d.ex; });
          var min = d3.min(exit, function(d){return +d.ex; });
          console.log(max);
          console.log(min);

          //Defining the axes
          var x = d3.scale.ordinal()
          .rangeRoundBands([0, w])
          .domain(sta.map(function(d){return d}));;

          var y = d3.scale.linear()
          .range([h, 0])
          .domain([min, max]);

          var xAxis = d3.svg.axis()
          .scale(x)
          .orient('bottom')
          .ticks(37);
          var yAxis = d3.svg.axis()
          .scale(y)
          .orient('left');

          var line = d3.svg.line()
          .interpolate('cardinal')
          .x(function(d){ return x(d.station) + x.rangeBand(); })
          .y(function(d){ return y(d.ex); });

          //Render Grid
          svg.selectAll('line.y')
          .data(y.ticks(10))
          .enter().append('line')
          .attr('class', 'y')
          .attr('x1', 0)
          .attr('x2', w)
          .attr('y1', y)
          .attr('y2', y)
          .style('stroke', '#ccc');

          // This renders the bar chart

          svg.selectAll('rect')
          .data(exit)
          .enter()
          .append('rect')
          .attr('x', function(d, i){
            return i * (w/exit.length);
          })
          .attr('y', function(d){
            return y((d.ex));
          })
          .attr('width', w / exit.length - barPadding)
          .attr('height', function(d){
            return h - y(d.ex);
          })
          .attr('fill', 'teal');

          svg.selectAll('text')
          .data(exit)
          .enter()
          .append('text')
          .text(function(d){
            return d.station;
          })
          .attr('x', function(d, i){
            return i * (w/exit.length) + 10;
          })
          .attr('y', function(d){
            return y(d.ex) + 10;
          })
          .attr('font-family', 'sans-serif')
          .attr('font-size', '11px')
          .attr('fill', 'white')
          .attr('text-anchor', 'middle');

          //Render X axis
          svg.append('g')
          .attr('class', 'x axis')
          .attr('transform', 'translate (0 ' + h + ')')
          .call(xAxis)
          // .selectAll('text')
          // .style('text-anchor', 'end')
          // .style('font-size', '12')
          // .attr('dx', '-15')
          // .attr('dy', '0')
          // .attr('transform' , function(d){
          //   return 'rotate(-65)'
          // })
          // .attr('fill', 'white');

          //Render y axis
          svg.append('g')
          .attr('class', 'y axis')
          .call(yAxis)
          .append('text')
          .attr('transform', 'rotate(-90)')
          .attr('y', 6)
          .attr('dy', '.71em')
          .style('text-anchor', 'end')
          .attr('fill', 'white');

          //   d3.select('#div1').selectAll('p')
          //   .data(exit)
          //   .enter()
          //   .append('div')
          //   .attr('class', 'bar')
          //   .style('height', function (d){
          //     var barHeight = d.ex /3;
          //     return barHeight + 'px';
          //   })
          //   .append('text')
          //   .text(function (d){d.ex});
          //
        });


        // //Cleans data to process
        // var exits = data.map(function(t, exit){
        //
        //   var exit = d3.keys(data[0])
        //     .filter(function(key){ return key!=='Name'})
        //     .filter(function(key){ return key!=='WHERE GET ON'})
        //     .filter(function(key){ return key!==''});
        //
        //   return {
        //     name: t.Name,
        //     exitst: exit.map(function(d){
        //       return {station: d, ex: t[d]}
        //     })
        //   }
        // });
        //
        // console.log(exits);

        // //render the bar chart
        // d3.select('#div1').selectAll('p')
        //   .data(exits)
        //   .enter()
        //   .append('div')
        //   .attr('class', 'bar')
        //   .style('height', function (d){
        //     var barHeight = d.ex /3;
        //     return barHeight + 'px';
        //   })
        //   .append('text')
        //   .text(function (d){d.ex});
      });
    });


    // This section calls the PM Data
    var PMdata = d3.csv('PM_Rail_Entry_Exit_Cleaned.csv', function(error, data){
      console.log(data);
    });

    // This section calls the Off Peak Data
    var OPdata = d3.csv('Off_Peak_Rail_Entry_Exit_Cleaned.csv', function(error, data){
      console.log(data);
    });

}());
