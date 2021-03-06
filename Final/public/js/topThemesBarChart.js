/** Class implementing the table. */
class TopThemesBarChart {
  /**
   * Creates a Table Object
   */
  constructor(data, tableChart, mostExpensiveSetsBarChart, biggestSetsBarChart) {
    this.legoData = data;
    console.log("legodata", data);
    this.tableChart = tableChart;
    this.mostExpensiveSetsBarChart = mostExpensiveSetsBarChart;
    this.biggestSetsBarChart = biggestSetsBarChart;
    this.lego = new Lego(data);

  }

  //This function accepts a list of lego data set entries. (When the page first loads, it will get all the entries, otherwise it'll get whatever their brush selection or their year selection is). 
  update(legoEntries, selected) {
    let ctx = this;
    let topThemes = this.lego.getTopThemes(legoEntries, 20);
    console.log("table chart update");
    // let tableChart = new TableChart();
    // let mostExpensiveSetsBarChart = new MostExpensiveSetsBarChart();
    // let biggestSetsBarChart = new BiggestSetsBarChart();
    // console.log(topThemes);
    let width = 500;
    let height = 260;
    let xPadding = 55;
    let yPadding = 0;
    let themes = topThemes.map(function (obj) { return obj.Theme });
    let yData = topThemes.map(function (obj) { return obj.sum });
    let yDataMax = d3.max(yData);

    // Create the x and y scales; make
    // sure to leave room for the axes
    let xScale = d3.scaleBand()
      .domain(themes)
      .range([0, width - 2 * xPadding])
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

    let themePopup = new ThemePopup(this.legoData);
    let bars = d3.select("#topThemesBars")
    let rects = bars.selectAll("rect").data(topThemes);
    rects
      .transition()
      .duration(500)
      .attr("transform", "translate(" + xPadding + ",-" + yPadding + ")")
      .attr("x", d => xScale(d.Theme))
      .attr("y", d => yScale(d.sum))
      .attr("height", d => { return height - yScale(d.sum) })
      .attr("width", xScale.bandwidth())
      //.style("fill", d => colorScale(d.sum));
      .style("fill", function (d) {
        if (selected != null) {
          if (selected.name && d.Name != selected.name.Name) {
            return colorScale(d.sum);
          } else if(d.Name != selected.Name) {
            return colorScale(d.sum);
          } else {
            return "FF6666";
          }
        }
        else {
          return colorScale(d.sum);
        }
      });

    rects
      .on("click", (d) => themePopup.click(d))
      //.data(legoEntries)
      .on('mouseover', function (d, i) {
        d3.select(this)
          .style("fill", "#b3cde0");
        if(legoEntries.length > 150) legoEntries = legoEntries.slice(0, 150);
        ctx.tableChart.colorByTheme(legoEntries, d);
      })
      .on('mouseout', function (d, i) {
        d3.select(this)
          .style("fill", d => colorScale(d.sum));
        if(legoEntries.length > 150) legoEntries = legoEntries.slice(0, 150);
        ctx.tableChart.colorByTheme(legoEntries);
      });
    // .on("mousemove", (d)=>themePopup.mousemove(d))
    // .on("mouseover", (d)=>themePopup.mouseover(d))
    // .on("mouseout", (d)=>themePopup.mouseout(d));

    rects.enter().append("rect")
      .attr("transform", "translate(" + xPadding + ",-" + yPadding + ")")
      .attr("width", xScale.bandwidth())
      .attr("height", function (d) { return height - yScale(d.sum) })
      .attr("x", d => xScale(d.Theme))
      .attr("y", d => yScale(d.sum))
      //.style("fill", d => colorScale(d.sum));
      .style("fill", function (d) {
        if (selected != null) {
          if (d.Theme != selected.Theme) {
            return colorScale(d.sum);
          }
          else {
            return "#b3cde0";
          }
        }
        else {
          return colorScale(d.sum);
        }
      })
      .on('mouseover', function (d, i) {
        d3.select(this)
          .style("fill", "#b3cde0");
        if(legoEntries.length > 150) legoEntries = legoEntries.slice(0, 150);
        ctx.tableChart.colorByTheme(legoEntries, d);
      })
      .on('mouseout', function (d, i) {
        d3.select(this)
          .style("fill", d => colorScale(d.sum));
        if(legoEntries.length > 150) legoEntries = legoEntries.slice(0, 150);
        ctx.tableChart.colorByTheme(legoEntries);
      })
      .on("click", (d) => themePopup.click(d));
    rects
      .on("click", (d) => themePopup.click(d))
    // .on("mousemove", (d)=>themePopup.mousemove(d))
    // .on("mouseover", (d)=>themePopup.mouseover(d))
    // .on("mouseout", (d)=>themePopup.mouseout(d));
    rects.exit().remove();


  }
}
