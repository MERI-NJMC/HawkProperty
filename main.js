$(function () {

    var interval;
    var i = 0;
    var $picture = $('#picture');
    var isClicked = false;
    $picture.append("<img id='img' src='http://apps.njmeadowlands.gov/HawkProperty/pics/0.jpg' height='400' width='700' class='picture' />");

    var options = 
    {
    
        chart: 
        {
            renderTo: 'container',
            defaultSeriesType: 'spline',
            zoomType: 'x',
            panning: true,
            panKey: 'shift',
        
        
            events: 
            { 
                load: function()
                {
                    this.xAxis[0].setExtremes(0, 5); 
                }
            }
        },
        title: 
        {
            text: 'Hawk Property Inundation Model'
        },
        xAxis: 
        {

            tickInterval: 1,
            categories: []
        },
        yAxis: 
        {
            title: 
            {
                text: 'Elevation (NAVD88)'
            }
        
        },

        plotOptions: 
        {
            series: 
            {
                point: 
                {
                    events: 
                    {

                        click: function () //can be hover
                        { 
                            
                            var a = this.x;
                            //console.log(a);
                            
                            //console.log(img);
                            $('#img').attr('src', 'http://apps.njmeadowlands.gov/HawkProperty/pics/' + a + '.jpg');
                             
                        }

                    }
                },
                    
            }
        },

        tooltip: 
        {
            enabled: true,
            formatter: function()
            {
                return 'Time: <b>' + this.x + '</b> Height: <b>' + this.y + '</b>';
            }
        },

        series: []

    };

    $('#button1').click(function () 
    {
        var chart = $('#container').highcharts();
        chart.xAxis[0].options.tickInterval = 10;
        //$picture.html("");
        chart.xAxis[0].setExtremes(0,143);

    });

    $('#button2').click(function () 
    {
        var chart = $('#container').highcharts();
        chart.xAxis[0].options.tickInterval = 1;
        //$picture.html("");
        chart.xAxis[0].setExtremes(0,5);

    });

    
    $('#button3').click(function () 
    {

        
        if(!isClicked)
        {
            start();
        } 
        else 
        {   
            pause();      
        }

    });

    $('#button4').click(function()
    {

        i = 0;
        //chart.series[0].data[i].select();

    });

    function start()
    {
        var chart = $('#container').highcharts();
            
            interval = setInterval(function()
            {
               
                i++;
                $('#img').attr('src', 'http://apps.njmeadowlands.gov/HawkProperty/pics/' + i + '.jpg');
                chart.series[0].data[i].select();
                //console.log(i);
            }, 1000);
            
            $('#button3').html('Pause');
            isClicked = true;
    }

    function pause()
    {
        var chart = $('#container').highcharts();
        $('#button3').html('Run'); 
        isClicked = false;
        clearInterval(interval);
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    $.get('HAWKCSV.csv', function(data) 
    {
        // Split the lines
        var lines = data.split('\n'); // Splits based on the end of the line
        //console.log(lines);

        var series = 
        { 
            name: 'Elevation',
            data: [] //holds the series values 
            //color: 'FF0000'
        }; 

        $.each(lines, function(lineNo, line) //indexes each lineNo = 0, line = value associated
        { 
            var items = line.split(','); //split by commas
        
            if(items[0] !="Date")
            {
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


