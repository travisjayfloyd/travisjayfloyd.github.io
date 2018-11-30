/** Class implementing the table. */
class TopThemesBarChart {
    /**
     * Creates a Table Object
     */
    constructor(data) {
      this.legoData = data;
      this.lego = new Lego(data);
  
    }

    //This function accepts a list of lego data set entries. (When the page first loads, it will get all the entries, otherwise it'll get whatever their brush selection or their year selection is). 
    update(legoEntries) {
      let topThemes = this.lego.getTopThemes(legoEntries, 20);
      // console.log(topThemes);
      let width = 500;
      let height = 260;
      let xPadding = 55;
      let yPadding = 0;
      let themes = topThemes.map(function(obj){return obj.Theme});
      let yData = topThemes.map(function(obj){return obj.sum});
      let yDataMax = d3.max(yData);

      // Create the x and y scales; make
      // sure to leave room for the axes
      let xScale = d3.scaleBand()
      .domain(themes)
      .range([0, width-2*xPadding])
      .padding(0.1);
      let yScale = d3.scaleLinear()
      .domain([0, yDataMax])//data set
      .range([height, 0]);//pixels
      // Create colorScale
      let colorScale = d3.scaleLinear()
      .domain([yDataMax, 0])
      .range(["#FF6666", "#8B3626"]);

      // Create the axes (hint: use #xAxisThemes and #yAxisThemes)
      let xAxisThemes = d3.axisBottom().scale(xScale);
      d3.select("#xAxisThemes")
        .attr("transform", "translate(" + xPadding + "," + (height - yPadding) + ")")
        .call(xAxisThemes)
        .selectAll("text")
        .attr("y", 0)
        .attr("x", 10)
        .attr("transform", "rotate(90)")
        .style("text-anchor", "start");

      let yAxisThemes = d3.axisLeft(yScale);
      d3.select("#yAxisThemes")
        .attr("transform", "translate(" + xPadding + ",-" + yPadding + ")")
        .call(yAxisThemes);

        let bars = d3.select("#topThemesBars")
        let rects = bars.selectAll("rect").data(topThemes);
        rects
          .transition()
          .duration(500)
          .attr("transform", "translate(" + xPadding + ",-" + yPadding + ")")
          .attr("x", d => xScale(d.Theme))
          .attr("y", d => yScale(d.sum))
          .attr("height", d => {return height - yScale(d.sum)})
          .attr("width", xScale.bandwidth())
          .style("fill", d => colorScale(d.sum))
    
        rects.enter().append("rect")
          .attr("transform", "translate(" + xPadding + ",-" + yPadding + ")")
          .attr("width", xScale.bandwidth())
          .attr("height", function(d) {return height - yScale(d.sum)})
          .attr("x", d => xScale(d.Theme))
          .attr("y", d => yScale(d.sum))
          .style("fill", d => colorScale(d.sum))
          rects.exit().remove();

        
    }
  }
  