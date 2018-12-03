
class SetsOverTimeChart {
    /**
     * Constructor for the SetsOverTimeChart
     *
     * @param type describes if the chart is for size or price it can be "Pieces" or "USD_MSRP"
     */
    constructor (legoSets, type){
      let ctx = this;
      this.lego = new Lego(legoSets);
      this.type = type;
      let years = [];
      for(var i = 1971; i < 2016; i++){
        years.push(i);
      }
      this.width = 500;
      this.height = 260;
      this.xPadding = 55;
      this.yPadding = 0;
      this.mostArray = [];
      this.avgArray = [];
      if(this.type == "Pieces") {
        years.forEach(year=>ctx.mostArray.push(ctx.lego.getBiggestSet(year)))
        years.forEach(year=>ctx.avgArray.push(ctx.lego.getAvgSizeSet(year)))
      } else {
        years.forEach(year=>ctx.mostArray.push(ctx.lego.getMostExpensiveSet(year)))
        years.forEach(year=>ctx.avgArray.push(ctx.lego.getAvgExpensiveSet(year)))
      }
      let yDataMost = ctx.mostArray.map(function(obj){return parseInt(obj[ctx.type])});
      let yDataLeast = ctx.avgArray.map(function(obj){return parseInt(obj[ctx.type])});
      let yDataMax = d3.max(yDataMost);
      let yDataMin = d3.min(yDataLeast);
      // Create the x and y scales; make
      // sure to leave room for the axes
      this.xScale = d3.scaleBand()
      .domain(years)
      .range([0, this.width-2*this.xPadding])
      .padding(0.1);
      this.xStart = this.xScale(1971);
      this.yScale = d3.scaleLinear()
      .domain([0, yDataMax])//data set
      .range([this.height, 0]);//pixels

      // Create the axes (hint: use #xAxisSetsOverTime and #yAxisSetsOverTime)
      this.xAxisSetsOverTime = d3.axisBottom().scale(ctx.xScale);
      this.xId = "";
      this.yId = "";
      let chartId = "";
      if(this.type == "Pieces") {
        this.xId = "#xAxisSizeVTime";
        this.yId = "#yAxisSizeVTime";
        chartId = "#sizeVTimeChart";
      }else {
        this.xId = "#xAxisPriceVTime";
        this.yId = "#yAxisPriceVTime";
        chartId = "#priceVTimeChart";
      }
      d3.select(this.xId)
        .attr("transform", "translate(" + this.xPadding + "," + (this.height - this.yPadding) + ")")
        .call(ctx.xAxisSetsOverTime)
        .selectAll("text")
        .attr("y", 0)
        .attr("x", 10)
        .attr("transform", "rotate(90)")
        .style("text-anchor", "start");

      this.yAxisSetsOverTime = d3.axisLeft(ctx.yScale);
      d3.select(this.yId)
        .attr("transform", "translate(" + this.xPadding + ",-" + this.yPadding + ")")
        .call(ctx.yAxisSetsOverTime);

      this.line = d3.line()
        .x(function(d, i) {
          return (ctx.xScale(d.Year) + ctx.xStart);
        })
        .y(function(d) { 
          return ctx.yScale(d[ctx.type]); })

      this.svg = d3.select(chartId);
      
      this.svg.append("path")
      .datum(ctx.mostArray)
      .attr("class", "mostline")
      .attr("d", this.line)
      .attr("transform", "translate(" + this.xPadding + ",-" + this.yPadding + ")");

      // this.svg.append("path")
      // .datum(ctx.avgArray)
      // .attr("class", "leastline")
      // .attr("d", this.line)
      // .attr("transform", "translate(" + this.xPadding + ",-" + this.yPadding + ")");
    };  
  
    /**
     * Creates the stacked bar chart
     *
     * @param legoSets is an array of all the sets for a selected theme
     */
  
    update (years){
      if(years.length > 1){
        let ctx = this;
        ctx.mostArray = [];
        ctx.avgArray = [];
        let svgId = "";
        let h2Id = "";
        let displayType = "";
        
        if(this.type == "Pieces") {
          years.forEach(year=>ctx.mostArray.push(ctx.lego.getBiggestSet(year)))
          years.forEach(year=>ctx.avgArray.push(ctx.lego.getAvgSizeSet(year)))
          svgId = "#size-vs-time-svg";
          h2Id = "size-vs-time-title";
          displayType = "Size";
        } else {
          years.forEach(year=>ctx.mostArray.push(ctx.lego.getMostExpensiveSet(year)))
          years.forEach(year=>ctx.avgArray.push(ctx.lego.getAvgExpensiveSet(year)))
          svgId = "#price-vs-time-svg";
          h2Id = "price-vs-time-title";
          displayType = "Price";
        }
        let yDataMost = ctx.mostArray.map(function(obj){return parseInt(obj[ctx.type])});
        let yDataLeast = ctx.avgArray.map(function(obj){return parseInt(obj[ctx.type])});
        let yDataMax = d3.max(yDataMost);
        let yDataMin = d3.min(yDataLeast);
        
        let yearStr = ""
        yearStr = Math.min(...years) + " - " + Math.max(...years)
        
        document.getElementById(h2Id).innerHTML = displayType + " of Sets Over the Years " + yearStr;
        
        this.xScale
        .domain(years);
        this.yScale
        .domain([0, yDataMax]);
        // console.log("xscale", this.xScale);
        // this.xStart = this.xScale(1971);

        this.svg = d3.select(svgId);

        this.svg.select(".mostline")
          .transition()
          .duration(800)
          .attr("d", this.line(ctx.mostArray));
          // this.svg.select(".leastline")
          // .transition()
          // .duration(800)
          // .attr("d", this.line(ctx.avgArray));
        this.svg.select(this.xId)
          .attr("transform", "translate(" + this.xPadding + "," + (this.height - this.yPadding) + ")")
          .transition()
          .duration(800)
          .call(this.xAxisSetsOverTime)
          .selectAll("text")
          .attr("y", 0)
          .attr("x", 10)
          .attr("transform", "rotate(90)")
          .style("text-anchor", "start");;
        this.svg.select(this.yId)
          .attr("transform", "translate(" + this.xPadding + ",-" + this.yPadding + ")")
          .transition()
          .duration(800)
          .call(this.yAxisSetsOverTime);
      }
        
    };
  
    
  }
  