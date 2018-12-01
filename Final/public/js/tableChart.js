/** Class implementing the table. */

class TableChart {
    /**
     * Creates a Table Object
     */
    constructor(data) {
      let ctx = this;
      this.legoData = data;
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

        let shortData = this.legoData.slice(0, 150);
        shortData.push({"Name":"See More Entries By Selecting Years At Top"})

        this.update(shortData);

        // this.table.style("visibility", "hidden");
    }
  
  
    /**
     * Updates the table contents with a row for each element in the global
     * variable tableElements.
     */
    update(fullarray) {
      let ctx = this;
      this.table.style("visibility", "visible");

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

    enterRows.append("tr").attr('class', 'dataRow');
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
    .text(d => {
      if(d.value == NaN) {
        d.value = "";
      }
        
      return d.value
    });
  ;
  }
}


  