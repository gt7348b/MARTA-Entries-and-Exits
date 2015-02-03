console.log('Roscoe is a cutie');

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
          //console.log(sta);

          //return exit;

          //render the bar chart
        svg = d3.select('#div1').append('svg')

        w = 1000;
        h = 500;
        barPadding = 1;
        var max = d3.max(exit, function(d){return +d.ex; });
        var min = d3.min(exit, function(d){return +d.ex; });
        console.log(max);
        console.log(min);

        var yScale = d3.scale.linear()
                              .domain([0, max])
                              .range(0, h);


        //render the axes
        var x = d3.scale.ordinal()
                  .rangeRoundBands([0, w], .1)
                  .domain(sta.map(function(d){return d}));;
        var y = d3.scale.linear()
                  .range([h, 0])
                  .domain([min, max]);

        var xAxis = d3.svg.axis()
                    .scale(x)
                    .orient('bottom');
        var yAxis = d3.svg.axis()
                    .scale(y)
                    .orient('left');

        svg.selectAll('rect')
              .data(exit)
              .enter()
              .append('rect')
              .attr('x', function(d, i){
                return i * (w/exit.length);
              })
              .attr('y', function(d){
                return h - (d.ex);
              })
              .attr('width', w / exit.length - barPadding)
              .attr('height', function(d){
                console.log(yScale(d.ex));
                return d.ex;
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
                return h - (d.ex/2) + 10;
              })
              .attr('font-family', 'sans-serif')
              .attr('font-size', '11px')
              .attr('fill', 'white')
              .attr('text-anchor', 'middle');

              svg.append('g')
              .attr('class', 'x axis')
              .attr('transform', 'translate (0 ' + h + ')')
              .call(xAxis)
              .selectAll('text')
              .style('text-anchor', 'end')
              .style('font-size', '8')
              .attr('dx', '-8')
              .attr('dy', '15')
              .attr('transform' , function(d){
                return 'rotate(-65)'
              })
              .attr('fill', 'white');

          svg.append('g')
              .attr('class', 'y axis')
              .call(yAxis)
              .append('text')
                .attr('transform', 'rotate(-90)')
                .attr('y', 6)
                .attr('dy', '.71em')
                .style('text-anchor', 'end')
                .text('Where people exited')
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
