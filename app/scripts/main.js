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

          //return exit;

          //render the bar chart
        svg = d3.select('#div1').append('svg')

        w = 1000;
        h = 500;
        barPadding = 1;

        svg.selectAll('rect')
              .data(exit)
              .enter()
              .append('rect')
              .attr('x', function(d, i){
                return i * (w/exit.length);
              })
              .attr('y', function(d){
                return h - (d.ex/2);
              })
              .attr('width', w / exit.length - barPadding)
              .attr('height', function(d){
                return d.ex/2;
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
        console.log(exits);


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
