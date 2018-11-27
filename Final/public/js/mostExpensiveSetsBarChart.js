/** Class implementing the table. */
class MostExpensiveSetsBarChart {
    /**
     * Creates a Table Object
     */
    constructor(data) {
      this.legoData = data;
  
    }

    //This function accepts a list of set objects
    update(sets) {
      let mostExpensiveSets = this.getMostExpensiveSets(sets, 25);
    //   console.log("most expensive sets: ", mostExpensiveSets);
      let width = 500;
      let height = 260;
      let xPadding = 55;
      let yPadding = 0;
      let setNames = mostExpensiveSets.map(function(obj){return obj.Name});
      let yData = mostExpensiveSets.map(function(obj){return parseInt(obj.USD_MSRP)});
    //   console.log("yData: ", yData);
      let yDataMax = d3.max(yData);
      let yDataMin = d3.min(yData);

      // Create the x and y scales; make
      // sure to leave room for the axes
      let xScale = d3.scaleBand()
      .domain(setNames)
      .range([0, width-2*xPadding])
      .padding(0.1);
      let yScale = d3.scaleLinear()
      .domain([0, yDataMax])//data set
      .range([height, 0]);//pixels
      // Create colorScale
      let colorScale = d3.scaleLinear()
      .domain([yDataMax, yDataMin])
      .range(["lightblue", "darkblue"]);

      // Create the axes (hint: use #xAxisMostExpensiveSets and #yAxisMostExpensiveSets)
      let xAxisMostExpensiveSets = d3.axisBottom().scale(xScale);
      d3.select("#xAxisMostExpensiveSets")
        .attr("transform", "translate(" + xPadding + "," + (height - yPadding) + ")")
        .call(xAxisMostExpensiveSets)
        .selectAll("text")
        .attr("y", 0)
        .attr("x", 10)
        .attr("transform", "rotate(90)")
        .style("text-anchor", "start");

      let yAxisMostExpensiveSets = d3.axisLeft(yScale);
      d3.select("#yAxisMostExpensiveSets")
        .attr("transform", "translate(" + xPadding + ",-" + yPadding + ")")
        .call(yAxisMostExpensiveSets);

        let bars = d3.select("#mostExpensiveSetsBars")
        let rects = bars.selectAll("rect").data(mostExpensiveSets);
        rects
          .attr("transform", "translate(" + xPadding + ",-" + yPadding + ")")
          .attr("x", d => xScale(d.Name))
          .attr("y", d => yScale(d.USD_MSRP))
          .attr("height", d => {return height - yScale(d.USD_MSRP)})
          .attr("width", xScale.bandwidth())
          .style("fill", d => colorScale(d.USD_MSRP))
    
        rects.enter().append("rect")
          .attr("transform", "translate(" + xPadding + ",-" + yPadding + ")")
          .attr("width", xScale.bandwidth())
          .attr("height", function(d) {return height - yScale(d.USD_MSRP)})
          .attr("x", d => xScale(d.Name))
          .attr("y", d => yScale(d.USD_MSRP))
          .style("fill", d => colorScale(d.USD_MSRP))
          rects.exit().remove();

        
    }

    getMostExpensiveSets(sets, howMany) {
      let mostExpensiveSets = sets.filter(set=>set.USD_MSRP != "NA");
      mostExpensiveSets.sort(function(a, b) {
        return parseInt(b.USD_MSRP) - parseInt(a.USD_MSRP);
      });
      return mostExpensiveSets.slice(0, howMany);
    }

  }
  