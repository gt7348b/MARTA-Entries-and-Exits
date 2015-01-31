console.log('Roscoe is a cutie');

//Call Data

var data = d3.csv('Total_Rail_Entry_Exit_Cleaned.csv', function(error, data){
      console.log(data);

      $('#station').on('click', function(event){
        event.preventDefault();
        station = $('#station').val();

        console.log(station);
});

      //Cleans data to process
      var exits = data.map(function(t, exit){

        var exit = d3.keys(data[0])
          .filter(function(key){ return key!=='Name'})
          .filter(function(key){ return key!=='WHERE GET ON'})
          .filter(function(key){ return key!==''});

        return {
          name: t.Name,
          exitst: exit.map(function(d){
            return {station: d, ex: t[d]}
          })
        }
      });

      console.log(exits);

      //render the bar chart
      d3.select('#div1').selectAll('p')
        .data(exits)
        .enter()
        .append('div')
        .attr('class', 'bar')
        .style('height', function (d){
          var barHeight = d.exitst[0].ex /3;
          return barHeight + 'px';
        })
        .append('text')
        .text(function (d){d.exitst[17].ex});

    
});