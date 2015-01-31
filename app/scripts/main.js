console.log('Roscoe is a cutie');

//Call Data

var data = d3.csv('Total_Rail_Entry_Exit_Cleaned.csv', function(error, data){
      console.log(data);

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


});
