/** Class implementing the table. */
class MostExpensiveSetsBarChart {
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
      let mostExpensiveSets = this.lego.getMostExpensiveSets(sets, 25);
      let width = 500;
      let height = 260;
      let xPadding = 55;
      let yPadding = 0;
      let setNames = mostExpensiveSets.map(function(obj){return obj.Name});
      let yData = mostExpensiveSets.map(function(obj){return parseInt(obj.USD_MSRP)});
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
      .range(["#b3cde0", "#03396c"]);

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
          .transition()
          .duration(500)
          .attr("transform", "translate(" + xPadding + ",-" + yPadding + ")")
          .attr("x", d => xScale(d.Name))
          .attr("y", d => yScale(d.USD_MSRP))
          .attr("height", d => {return height - yScale(d.USD_MSRP)})
          .attr("width", xScale.bandwidth())
          .style("fill", function(d){
            if(selected != null){
              if(d.Name != selected.name.Name){
               return colorScale(d.USD_MSRP);
              }
              else{
                return "FF6666";
              }
            }
            else{
              return colorScale(d.USD_MSRP);
            }
          });
    
        rects.enter().append("rect")
          .attr("transform", "translate(" + xPadding + ",-" + yPadding + ")")
          .attr("width", xScale.bandwidth())
          .attr("height", function(d) {return height - yScale(d.USD_MSRP)})
          .attr("x", d => xScale(d.Name))
          .attr("y", d => yScale(d.USD_MSRP))
          .style("fill", function(d){
            if(selected != null){
              if(d.Name != selected.name.Name){
               return colorScale(d.USD_MSRP);
              }
              else{
                return "FF6666";
              }
            }
            else{
              return colorScale(d.USD_MSRP);
            }
          });

          rects
            .on('mouseover', function(d,i){
              d3.select(this)
              .style("fill", "#FF6666");
              ctx.tableChart.colorByName(sets, d);
            })
            .on('mouseout', function(d,i){
              d3.select(this)
              .style("fill", d => colorScale(d.USD_MSRP));
              ctx.tableChart.colorByName(sets);
            });

          rects.exit().remove();

        
    }

  }
  