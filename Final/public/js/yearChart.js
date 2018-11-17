
class YearChart {

  /**
   * Constructor for the Year Chart
   *
   * @param legos instance of Legos
   */
  constructor (legos) {

    this.legos = legos;
    
    // Initializes the svg elements required for this chart
    this.margin = {top: 10, right: 20, bottom: 30, left: 50};
    let divyearChart = d3.select("#year-chart").classed("fullView", true);

    //fetch the svg bounds
    this.svgBounds = divyearChart.node().getBoundingClientRect();
    this.svgWidth = this.svgBounds.width - this.margin.left - this.margin.right;
    this.svgHeight = 100;

    //add the svg to the div
    this.svg = divyearChart.append("svg")
      .attr("width", this.svgWidth)
      .attr("height", this.svgHeight);

    this.selected = null;
  }

  /**
   * Creates a chart with circles representing each election year, populates text content and other required elements for the Year Chart
   */
  update (data) {

    console.log(data);

    //Domain definition for global color scale
    let domain = [-60, -50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50, 60];

    //Color range for global color scale
    let range = ["#063e78", "#08519c", "#3182bd", "#6baed6", "#9ecae1", "#c6dbef", "#fcbba1", "#fc9272", "#fb6a4a", "#de2d26", "#a50f15", "#860308"];

    //ColorScale be used consistently by all the charts
    this.colorScale = d3.scaleQuantile()
      .domain(domain)
      .range(range);

    // ******* TODO: PART I *******

    let years = new Array();
    for(var i = 1971; i < 2016; i++){
      years.push(i);
    }
    let width = this.svgWidth;

    let setsperyear = new Array();
    
    for(var i = 0; i < 46; i++){
      setsperyear[i] = 0;
    }
    for(var i = 0; i < data.length; i ++){
      for(var j = 0; j < years.length; j++){
        if(data[i].Year == years[j]){
          setsperyear[j] ++;
        }
      }
    }
    console.log(setsperyear);
    let circlewidth = new Array();
    for(var i = 0; i < setsperyear.length; i++){

    }

    console.log(setsperyear);
    
    var onclickdata;

    // Create the chart by adding circle elements representing each election year
    this.svg.append('line')
        .attr("x1", 0)
        .attr("y1", (this.svgHeight / 2))
        .attr("x2", width)
        .attr("y2", (this.svgHeight / 2))
        .style("stroke", "#A0A0A0")
        .style("stroke-dasharray", "2,2");


    this.svg.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .style("fill" , function(d) {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      })
      .attr("cx", function(d,i) {
        return (width / 45  ) * i + 10;
      })
      .attr("cy", (this.svgHeight / 2))
      .data(setsperyear)
      .attr("r", d => Math.log(d) *3)
      .data(years)
      .on('mouseover', function(d,i){
        console.log(d);

        d3.select(this)
          .transition()
          .style("stroke", "black")
          .style("stroke-width", "3");
      })
      .on('mouseout', function(d,i){
        d3.select(this)
          .transition()
          .style("stroke", "")
          .style("stroke-width", "0");
      })
      .on('click', function(d, i) {
        d3.select(this)
          .transition()
          .style("stroke", "black")
          .style("stroke-width", "3");
        })
      ;
      /*
      this.svg.selectAll('text')
      .data(years)
      .enter()
      .append('text')
			.attr("x", function(d,i) {
        return (width / 45) * i +10;
      })
      .attr("y", (this.svgHeight / 2) + 20)
      .style("font-size", "10px")
      .html(d => d);
      */
    //The circles should be colored based on the winning party for that year
    //HINT: Use the .yearChart class to style your circle elements
    //HINT: Use the chooseClass method to choose the color corresponding to the winning party.

    //Append text information of each year right below the corresponding circle
    //HINT: Use .yeartext class to style your text elements

    //Style the chart by adding a dashed line that connects all these years.
    //HINT: Use .lineChart to style this dashed line

    //Clicking on any specific year should highlight that circle and  update the rest of the visualizations
    //HINT: You can get the d3 selection that was clicked on using
    //   d3.select(d3.event.target)
    //HINT: Use .highlighted class to style the highlighted circle

    //Election information corresponding to that year should be loaded and passed to
    // the update methods of other visualizations


    //******* TODO: EXTRA CREDIT *******

    //Implement brush on the year chart created above.
    //Implement a call back method to handle the brush end event.
    //Call the update method of shiftChart and pass the data corresponding to brush selection.
    //HINT: Use the .brush class to style the brush.

  }

}
