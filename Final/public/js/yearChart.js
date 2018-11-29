
class YearChart {

  /**
   * Constructor for the Year Chart
   * @param table instance of the tablechart
   * @param legos instance of Legos
   */
  constructor (legos, table, topThemesChart, biggestSetsChart, mostExpensiveSetsChart) {

    this.table = table;
    this.legos = legos;
    this.tablechart = new TableChart(legos);
    this.biggestSetsChart = biggestSetsChart;
    this.topThemesChart = topThemesChart;
    this.mostExpensiveSetsChart = mostExpensiveSetsChart;
    
    // Initializes the svg elements required for this chart
    this.margin = {top: 10, right: 20, bottom: 30, left: 50};
    let divyearChart = d3.select("#year-chart").classed("fullView", true);

    //fetch the svg bounds
    this.svgBounds = divyearChart.node().getBoundingClientRect();
    this.svgWidth = this.svgBounds.width - this.margin.left - this.margin.right;
    this.svgHeight = 70;

    //add the svg to the div
    this.svg = divyearChart.append("svg")
      .attr("width", this.svgWidth)
      .attr("height", this.svgHeight);

    this.selected = null;
  }

  updateYearSelStr(selectedYears){
    let yearStr = ""
      if(selectedYears.length == 0)
        yearStr = "No Year Selected";
      else if(selectedYears.length == 1)
        yearStr = selectedYears[0]
      else 
        yearStr = Math.min(...selectedYears) + " - " + Math.max(...selectedYears)
      document.getElementById("year-list").innerHTML = "Years Selected: " + yearStr;
  }

  updateCharts(selectedYears) {
    console.log("update charts: ", selectedYears);
    let yearSets = [];
    selectedYears.forEach(year => {
      this.legos.filter(legoset => legoset.Year == year).forEach(set=>yearSets.push(set));
    });
    console.log(yearSets);
    this.topThemesChart.update(yearSets);
    this.biggestSetsChart.update(yearSets);
    this.mostExpensiveSetsChart.update(yearSets);
    this.tablechart.update(yearSets);
  }

  /**
   * Creates a chart with circles representing each election year, populates text content and other required elements for the Year Chart
   */
  update (data) {
    let ctx = this;

    let years = new Array();
    for(var i = 1971; i < 2016; i++){
      years.push(i);
    }
    let width = this.svgWidth;
    let setsperyear = new Array();
    
    for(var i = 0; i < 45; i++){
      setsperyear[i] = 0;
    }
    for(var i = 0; i < data.length; i ++){
      for(var j = 0; j < years.length; j++){
        if(data[i].Year == years[j]){
          setsperyear[j] ++;
        }
      }
    }
    
    var onclickdata;

    let brushed = function(){
      let selectedYears = [];
      console.log("in brush function");
      if(d3.event.selection != null && !(d3.event.selection[0] == 0 && d3.event.selection[1] == 0)){
        let lowBound = d3.event.selection[0];
        let highBound = d3.event.selection[1];
        let circles = d3.select("#year-chart").select("svg").selectAll("circle");
        let xVals = circles.nodes().map((d)=>d.getAttribute("cx"));
        let indices = [];
        for(let i = 0; i < xVals.length; i++){
          if(xVals[i] > lowBound && xVals[i] < highBound){
            indices.push(i);
          }
        }
        indices.forEach(function(index){
          selectedYears.push(1971 + index);
        });
        ctx.updateYearSelStr(selectedYears);
        ctx.updateCharts(selectedYears);
      }
    }
    let brush = d3.brushX().extent([[0, 0], [ctx.svgWidth, ctx.svgHeight]])
    .on("end", brushed);

    let popup = new Popup(this.legos);
    
    let mouseMove = function(d){
      popup.mousemove(d)
    };
    
    this.svg.attr("class", "brush").call(brush);
    
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
        .on("mousemove", mouseMove)
        .on('mouseover', function(d,i){
          d3.select(this)
          .transition()
          .style("stroke", "black")
          .style("stroke-width", "3");
          popup.mouseover(d);
        })
        .on('mouseout', function(d,i){
          d3.select(this)
          .transition()
          .style("stroke", "")
          .style("stroke-width", "0");
          popup.mouseout(d)
        })
        .on('click', function(d, i) {
          
          ctx.updateYearSelStr([d]);
          ctx.updateCharts([d]);
          
          d3.select(this)
            .transition()
            .style("stroke", "black")
            .style("stroke-width", "3");
          d3.select("rect.selection")
            .attr("width", 0);
          
        })
        .attr("pointer-events", "all")
        ;
        d3.select(".brush").call(brush.move, [[0], [0]], [[0], [0]]);
    }
    
}
