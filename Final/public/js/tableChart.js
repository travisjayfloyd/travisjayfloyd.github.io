/** Class implementing the table. */

class TableChart {
    /**
     * Creates a Table Object
     */
    constructor(data) {
      let ctx = this;
      this.legoData = data;
      console.log("initial data: ", data);
      this.prevHeader = {className:""};
      // Default values for the Table Headers
      this.sortAscending = true;
      this.tableHeaders = ["Name", "Theme", "Subtheme", "Release Year", "Pieces", "Price"];
      this.table = d3.select('#legoTable').append('table');
      let tHead = this.table.append("thead");
      this.tBody = this.table.append("tbody");
      tHead.append("tr")
        .selectAll('th')
        .data(this.tableHeaders).enter()
        .append('th')
        .text(function(d) {
          return d
        })
        .on('click', function(d) {
          if(d == "Release Year")
            d = "Release_Year";
          tHead.attr('class', 'header');
          if (d == "Name" || d == "Subtheme" || d == "Theme") { //alphabetical sort
            if (this.sortAscending) {
              d3.selectAll('.dataRow').sort(function(a, b) {
                return d3.ascending(a[d], b[d]);
              });
              this.sortAscending = false;
              this.className = 'asc';
            } else {
              d3.selectAll('.dataRow').sort(function(a, b) {
                return d3.descending(a[d], b[d]);
              });
              this.sortAscending = true;
              this.className = 'des';
            }
          } else { 
            if (this.sortAscending) {
              d3.selectAll('.dataRow').sort(function(a, b) {
                return b[d] - a[d];
              });
              this.sortAscending = false;
              this.className = 'asc';
            } else {
              d3.selectAll('.dataRow').sort(function(a, b) {
                return a[d] - b[d];
              });
              this.sortAscending = true;
              this.className = 'des';
            }
          }
          if(ctx.prevHeader && ctx.prevHeader != this)
            ctx.prevHeader.className = 'noSort';
          ctx.prevHeader = this;
        });

        this.table.style("visibility", "hidden");
    }
  
  
    /**
     * Updates the table contents with a row for each element in the global
     * variable tableElements.
     */
    update(fullarray, selected) {
      let ctx = this;
      this.table.style("visibility", "visible").attr("width", "1000px");
      let mostExpensiveSetsBarChart = new MostExpensiveSetsBarChart();
      let biggestSetsBarChart = new BiggestSetsBarChart();
      let topThemesBarChart = new TopThemesBarChart();

      let legos = new Array();
      for(var i = 0; i < fullarray.length; i++){
        let obj = {}
        obj['Name'] = fullarray[i].Name;
        obj['Theme'] = fullarray[i].Theme;
        obj['Subtheme'] = fullarray[i].Subtheme;
        obj['Release_Year'] = parseInt(fullarray[i].Year, 10);
        obj['Pieces'] = parseInt(fullarray[i].Pieces, 10);
        obj['Price'] = Number(fullarray[i].USD_MSRP).toFixed(2);
        legos.push(obj);
      }


    // ********* - START TABLE - *********   
     
    let rows = this.tBody.selectAll('tr')
      .data(legos);
    let enterRows = rows.enter();

    rows.exit().remove();

    enterRows.append("tr")
      .style("background-color", "#FFE330")
      .attr('class', 'dataRow');
    d3.selectAll('.dataRow').html("");

    d3.selectAll('.dataRow')
    .selectAll("td")
    .data(function(d) {
      return ctx.tableHeaders.map(function(key, i) {
        if(key == "Release Year")
          key = "Release_Year";
        return {
          'value': d[key],
          'name': d
        };
      });
    })
    .enter()
    .append("td")
    .style("text-align", "center")
    .style("background-color", "#b3cde0")
    /*.style("backgroud-color", function(d){
      if(selected == null){
        return "#b3cde0";
      }
      else{
        if(d.name.Theme != selected.Theme){
          return "#b3cde0";
        }
        else{
          return "#FF6666";
        }
      }
    })*/
    .text(d => d.value)
    .on('mouseover', function(d,i){
      d3.select(this)
      .style("background-color", "#FF6666");
      mostExpensiveSetsBarChart.update(fullarray, d);
      biggestSetsBarChart.update(fullarray, d);
      topThemesBarChart.update(fullarray, d);
    })
    .on('mouseout', function(d,i){
      d3.select(this)
      .style("background-color", "#b3cde0");
    });
  
  }
}


  