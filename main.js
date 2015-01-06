$(function () {

var $picture = $('#picture');

var options = {
    

    chart: {
        renderTo: 'container',
        defaultSeriesType: 'spline',
        zoomType: 'x',
        panning: true,
        panKey: 'shift',
        
        events: { 
                load: function(){
                    this.xAxis[0].setExtremes(0, 5); 
                    console.log('works');
                }
            }
        
        
    },
    title: {
        text: 'Hawk Property Inundation Model'
    },
    xAxis: {

        tickInterval: 1,
        categories: []

    },
    yAxis: {
        title: {
            text: 'Elevation (NAVD88)'
        }
    },
    plotOptions: {
            series: {
                point: {
                    events: {


                        click: function () { //can be hover
                            $picture.html(""); //clears out the div
                            
                            //var a = 2;
                            var a = this.x;
                            //reporting.appendChild(a);
                            //console.log(a);

                            var img = new Image();
                            
                            //img.src = "http://arcgis5.njmeadowlands.gov/municipal/dev/highchartsfloodlevel/pics/" + a + ".jpg";
                            img.src = "http://apps.njmeadowlands.gov/HawkProperty/pics/" + a + ".jpg";
                            img.height = "400";
                            img.width = "700";
                            picture.appendChild(img);

                            
                        }


                    }
                },
                // events: {
                    // mouseOut: function () {
                        // $picture.empty();
                    // }
                // }
            }
        },

    tooltip: {
            enabled: true,
            formatter: function(){
                return 'Time: <b>' + this.x + '</b> Height: <b>' + this.y + '</b>';
            }
    },

    series: []

};


    $('#button1').click(function () {
        var chart = $('#container').highcharts();
        chart.xAxis[0].options.tickInterval = 10;
        //$picture.html("");
        chart.xAxis[0].setExtremes(0,143);

    });

    $('#button2').click(function () {
        var chart = $('#container').highcharts();
        chart.xAxis[0].options.tickInterval = 1;
        //$picture.html("");
        chart.xAxis[0].setExtremes(0,5);

    });

    $('#button3').click(function () {
        var chart = $('#container').highcharts();
        var length = chart.series[0].data.length;
        
        
        i=0
        setInterval(function(){
               $picture.html("");
               chart.series[0].data[i].select(); 
               i++;
               var img = new Image();
                            
                            //img.src = "http://arcgis5.njmeadowlands.gov/municipal/dev/highchartsfloodlevel/pics/" + i + ".jpg";
                            img.src = "http://apps.njmeadowlands.gov/HawkProperty/pics/" + i + ".jpg";
                            img.height = "400";
                            img.width = "700";
                            picture.appendChild(img);


                }, 2000);
        

    });



$.get('HAWKCSV.csv', function(data) 
{
    // Split the lines
    var lines = data.split('\n'); // Splits based on the end of the line
    //console.log(lines);

    var series = { 
        name: 'Elevation',
        data: [] //holds the series values 
    }; 

    $.each(lines, function(lineNo, line) //indexes each lineNo = 0, line = value associated
    { 
        var items = line.split(','); //split by commas
        
        if(items[0] !="Date"){
            options.xAxis.categories.push(items[0]); 
        
        }
        
        series.data.push(parseFloat(items[1]));
  
    });
 
    series.data.splice(0,1);  //removes first element
    series.data.splice(143,1); //removes last undefined element from array
    
    options.series.push(series);
    
    // Create the chart
    var chart = new Highcharts.Chart(options);
    //console.log(chart);
});


});


