/** Class implementing the table. */
class BiggestSetsBarChart {
  /**
   * Creates a Table Object
   */
  constructor(data) {
    this.legoData = data;
    this.lego = new Lego(data);

  }

  addTableChart(tableChart) {
    this.tableChart = tableChart;
  }

  //This function accepts a list of set objects
  update(sets, selected) {
    let ctx = this;
    let biggestSets = this.lego.getBiggestSets(sets, 20);
    let width = 500;
    let height = 260;
    let xPadding = 55;
    let yPadding = 0;
    let setNames = biggestSets.map(function (obj) { return obj.Name });
    let yData = biggestSets.map(function (obj) { return parseInt(obj.Pieces) });
    let yDataMax = d3.max(yData);
    let yDataMin = d3.min(yData);

    // Create the x and y scales; make
    // sure to leave room for the axes
    let xScale = d3.scaleBand()
      .domain(setNames)
      .range([0, width - 2 * xPadding])
      .padding(0.1);
    let yScale = d3.scaleLinear()
      .domain([0, yDataMax])//data set
      .range([height, 0]);//pixels
      
    // Create colorScale
    let colorScale = d3.scaleLinear()
      .domain([yDataMax, yDataMin])
      .range(["#b3cde0", "#03396c"]);

    // Create the axes (hint: use #xAxisBiggestSets and #yAxisBiggestSets)
    let xAxisBiggestSets = d3.axisBottom().scale(xScale);
    d3.select("#xAxisBiggestSets")
      .attr("transform", "translate(" + xPadding + "," + (height - yPadding) + ")")
      .call(xAxisBiggestSets)
      .selectAll("text")
      .attr("y", 0)
      .attr("x", 10)
      .attr("transform", "rotate(90)")
      .style("text-anchor", "start");

    let yAxisBiggestSets = d3.axisLeft(yScale);
    d3.select("#yAxisBiggestSets")
      .attr("transform", "translate(" + xPadding + ",-" + yPadding + ")")
      .call(yAxisBiggestSets);


    //Set transition of bars also sets bar fills dependent on input
    let bars = d3.select("#biggestSetsBars")
    let rects = bars.selectAll("rect").data(biggestSets);
    rects
      .transition()
      .duration(500)
      .attr("transform", "translate(" + xPadding + ",-" + yPadding + ")")
      .attr("x", d => xScale(d.Name))
      .attr("y", d => yScale(d.Pieces))
      .attr("height", d => { return height - yScale(d.Pieces) })
      .attr("width", xScale.bandwidth())
      .style("fill", function (d) {
        if (selected != null) {
          if (selected.name && d.Name != selected.name.Name) {
            return colorScale(d.Pieces);
          } else if(d.Name != selected.Name) {
            return colorScale(d.Pieces);
          } else {
            return "FF6666";
          }
        }
        else {
          return colorScale(d.Pieces);
        }
      });

    rects.enter().append("rect")
      .attr("transform", "translate(" + xPadding + ",-" + yPadding + ")")
      .attr("width", xScale.bandwidth())
      .attr("height", function (d) { return height - yScale(d.Pieces) })
      .attr("x", d => xScale(d.Name))
      .attr("y", d => yScale(d.Pieces))
      .style("fill", function (d) {
        if (selected != null) {
          if (d.Name != selected.name.Name) {
            return colorScale(d.Pieces);
          }
          else {
            return "FF6666";
          }
        }
        else {
          return colorScale(d.Pieces);
        }
      })
      .on('mouseover', function (d, i) {
        d3.select(this)
          .style("fill", "#FF6666");
        ctx.tableChart.colorByName(sets, d);
      })
      .on('mouseout', function (d, i) {
        d3.select(this)
          .style("fill", d => colorScale(d.Pieces));
        ctx.tableChart.colorByName(sets);
      });

    //Sets mouse actions on biggest sets bar chart
    rects
      .on('mouseover', function (d, i) {
        d3.select(this)
          .style("fill", "#FF6666");
        ctx.tableChart.colorByName(sets, d);
      })
      .on('mouseout', function (d, i) {
        d3.select(this)
          .style("fill", d => colorScale(d.Pieces));
        ctx.tableChart.colorByName(sets);
      });

    rects.exit().remove();


  }

  getBiggestSets(sets, howMany) {
    sets.sort(function (a, b) {
      return parseInt(b.Pieces) - parseInt(a.Pieces);
    });
    return sets.slice(0, howMany - 1);
  }

}