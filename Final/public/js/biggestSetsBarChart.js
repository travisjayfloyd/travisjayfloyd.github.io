/** Class implementing the table. */
class BiggestSetsBarChart {
    /**
     * Creates a Table Object
     */
    constructor(data) {
      this.legoData = data;
  
    }

    //This function accepts a list of set objects
    update(sets) {
      let biggestSets = this.getBiggestSets(sets, 10);
      console.log("biggest sets: ", biggestSets);
      let width = 500;
      let height = 260;
      let xPadding = 55;
      let yPadding = 0;
      let setNames = biggestSets.map(function(obj){return obj.Name});
      let yData = biggestSets.map(function(obj){return obj.Pieces});
      console.log("yData: ", yData);
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

        let bars = d3.select("#biggestSetsBars")
        let rects = bars.selectAll("rect").data(biggestSets);
        rects
          .attr("transform", "translate(" + xPadding + ",-" + yPadding + ")")
          .attr("x", d => xScale(d.Name))
          .attr("y", d => yScale(d.Pieces))
          .attr("height", d => {return height - yScale(d.Pieces)})
          .attr("width", xScale.bandwidth())
          .style("fill", d => colorScale(d.Pieces))
    
        rects.enter().append("rect")
          .attr("transform", "translate(" + xPadding + ",-" + yPadding + ")")
          .attr("width", xScale.bandwidth())
          .attr("height", function(d) {return height - yScale(d.Pieces)})
          .attr("x", d => xScale(d.Name))
          .attr("y", d => yScale(d.Pieces))
          .style("fill", d => colorScale(d.Pieces))
          rects.exit().remove();

        
    }

    getBiggestSets(sets, howMany) {
      sets.sort(function(a, b) {
        return parseInt(b.Pieces) - parseInt(a.Pieces);
      });
      return sets.slice(0, howMany - 1);
    }

  }
  