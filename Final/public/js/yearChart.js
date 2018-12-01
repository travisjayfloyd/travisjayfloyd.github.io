
class YearChart {

  /**
   * Constructor for the Year Chart
   * @param legos instance of Legos
   * @param tableChart instance of the tableChart
   * @param topThemesChart instance of the topThemesChart
   * @param biggestSetsChart instance of the biggestSetsChart
   * @param mostExpensiveSetsChart instance of the mostExpensiveSetsChart
   */
  constructor (legos, tableChart, topThemesChart, biggestSetsChart, mostExpensiveSetsChart) {

    this.legos = legos;
    this.years = new Array();
    for(var i = 1971; i < 2016; i++){
      this.years.push(i);
    }
    this.firstTime = true;
    this.tableChart = tableChart;
    this.biggestSetsChart = biggestSetsChart;
    this.topThemesChart = topThemesChart;
    this.mostExpensiveSetsChart = mostExpensiveSetsChart;

    this.updateCharts(this.years);
    
    // Initializes the svg elements required for this chart
    this.margin = {top: 10, right: 20, bottom: 30, left: 50};
    let divyearChart = d3.select("#year-chart").classed("fullView", true);

    //fetch the svg bounds
    this.svgBounds = divyearChart.node().getBoundingClientRect();
    this.svgWidth = this.svgBounds.width - this.margin.left - this.margin.right;
    this.svgHeight = 120;

    //add the svg to the div
    this.svg = divyearChart.append("svg")
      .attr("width", this.svgWidth)
      .attr("height", this.svgHeight);

    this.selected = null;
  }

  updateYearSelStr(selectedYears){
    let yearStr = ""
      if(selectedYears.length == 0)
        yearStr = "of All Time";
      else if(selectedYears.length == 1)
        yearStr = selectedYears[0]
      else 
        yearStr = Math.min(...selectedYears) + " - " + Math.max(...selectedYears)
      document.getElementById("top-themes-title").innerHTML = "Top Themes for " + yearStr;
      document.getElementById("biggest-sets-title").innerHTML = "Biggest Sets for " + yearStr;
      document.getElementById("most-expensive-sets-title").innerHTML = "Most Expensive Sets for " + yearStr;
  }

  updateCharts(selectedYears) {
    let yearSets = [];
    selectedYears.forEach(year => {
      this.legos.filter(legoset => legoset.Year == year).forEach(set=>yearSets.push(set));
    });
    this.topThemesChart.update(yearSets);
    this.biggestSetsChart.update(yearSets);
    this.mostExpensiveSetsChart.update(yearSets);
    if(!this.firstTime) {
      this.tableChart.update(yearSets);
    } else {
      this.firstTime = false;
    }
  }

  /**
   * Creates a chart with circles representing each election year, populates text content and other required elements for the Year Chart
   */
  update (data) {

    

    let ctx = this;
    let width = this.svgWidth;
    let height = this.svgHeight;
    let setsperyear = new Array();
    
    for(var i = 0; i < 45; i++){
      setsperyear[i] = 0;
    }
    for(var i = 0; i < data.length; i ++){
      for(var j = 0; j < this.years.length; j++){
        if(data[i].Year == this.years[j]){
          setsperyear[j] ++;
        }
      }
    }
    
    var onclickdata;

    let brushed = function(){
      let selectedYears = [];
      if(d3.event.selection != null && !(d3.event.selection[0] == 0 && d3.event.selection[1] == 0)){
        console.log("brushed");
        console.log("d3.event.selection[0]: ", d3.event.selection[0]);
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

    let yearPopup = new YearPopup(this.legos);
    
    let mouseMove = function(d){
      yearPopup.mousemove(d)
    };
    
    this.svg.attr("class", "brush").call(brush);

    let colorScale = d3.scaleLinear()
      .domain([220, 0])
      .range(["#FF6666", "#8B3626"]);
    
    // Create the chart by adding circle elements representing each election year
    this.svg.append('line')
    .attr("x1", 0)
        .attr("y1", (this.svgHeight / 2)-10)
        .attr("x2", width)
        .attr("y2", (this.svgHeight / 2)-10)
        .style("stroke", "#A0A0A0")
        .style("stroke-dasharray", "2,2");
        
    this.svg.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .data(setsperyear)
        .style("fill", d => colorScale(d))
        .style("stroke", "black")
        .style("stroke-width", "1")
        .data(data)
        .attr("cx", function(d,i) {
          return (width / 45  ) * i + 10;
        })
        .attr("cy", (this.svgHeight / 2) - 10)
        .data(setsperyear)
        .attr("r", d => Math.log(d) *3)
        .data(this.years)
        .on("mousemove", mouseMove)
        .on('mouseover', function(d,i){
          d3.select(this)
          .transition()
          .style("stroke", "black")
          .style("stroke-width", "3");
          yearPopup.mouseover(d);
        })
        .on('mouseout', function(d,i){
          d3.select(this)
          .transition()
          .style("stroke", "black")
          .style("stroke-width", "1");
          yearPopup.mouseout(d)
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

        this.svg.selectAll('text')
          .data(this.years)
          .enter()
          .append('text')
          .attr("text-anchor", "middle")
          .attr("transform", function(d, i){
              let xval = (width / 45) * i + 6;
              let yval = ((height/ 2)+ 23);
              return "translate(" +xval+","+yval+")rotate(90)"
          })
          .style("font-size", "12px")
          .style("stroke", "black")
          .html(d => d);
        d3.select(".brush").call(brush.move, [[0], [0]], [[0], [0]]);

        let legend = d3.select('#year-chart').append('svg')
          .attr("id", "legolegend")
          .attr("width", width)
          .attr("height", "50")
          .append('rect')
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", 190)
          .attr("height", 50)
          .style("stroke", "black")
          .style("stroke-width", "2")
          .style("fill", "white");

        let smallcircle = d3.select('#legolegend').append('circle')
          .attr("cx", "12")
          .attr("cy", "25")
          .attr("r", "7")
          .style("fill", "#8B3626")
          .style("stroke", "black")
          .style("stroke-width", "1");
          
        let smalltext = d3.select('#legolegend').append('text')
          .attr("x", "49")
          .attr("y", "29")
          .attr("text-anchor", "middle")
          .style("font-size", "12px")
          .style("stroke", "black")
          .style("stroke-width", "1")
          .html("Fewer Sets");

        let largecircle = d3.select('#legolegend').append('circle')
          .attr("cx", "100")
          .attr("cy", "25")
          .attr("r", "15")
          .style("fill", "#FF6666")
          .style("stroke", "black")
          .style("stroke-width", "1");

        let moretext = d3.select('#legolegend').append('text')
          .attr("x", "145")
          .attr("y", "29")
          .attr("text-anchor", "middle")
          .style("font-size", "12px")
          .style("stroke", "black")
          .style("stroke-width", "1")
          .html("More Sets");
        
        
    }
    
}
