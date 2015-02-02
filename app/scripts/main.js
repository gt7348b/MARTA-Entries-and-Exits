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
          d3.select('#div1').selectAll('p')
          .data(exit)
          .enter()
          //.append('svg')
          .append('div')
          .attr('class', 'bar')
          .style('height', function (d){
            var barHeight = d.ex /3;
            return barHeight + 'px';
          })
          .append('text')
          .text(function (d){d.ex});

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
