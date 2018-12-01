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
    .text(d => d.value);
    // .html(d => d)
  ;
///////////////////////////////////////////////////////////////////////////////////////     
    // rows.selectAll('td')
    //   .data(function(d) {
    //     return titles.map(function(key, i) {
    //       return {
    //         'value': d[key],
    //         'name': d
    //       };
    //     });
    //   })
    //   .enter()
    //   .append('td')
    //   .attr('data-th', function(d) {
    //     return d.Name;
    //   })
    //   .text(function(d) {
    //       return d.value
    //   });


    /*
    
    // Create table rows

    let rows = d3.select("#legoTable").select("tbody").selectAll("tr")
      .data(legos);

    let enterSet = rows.enter();
    let updateSet = rows;

    rows.exit().remove();

    enterSet.append("tr").attr('class', 'dataRow');

    d3.selectAll('.dataRow').html("");

    d3.selectAll('.dataRow')
      .selectAll("th")
      .data(function(d) {
        return [d.Name];
      })
      .enter()
      .append("td")
      .html(d => d)
    ;

    d3.selectAll('.dataRow')
      .selectAll("th")
      .data(function(d) {
        return [d.Theme];
      })
      .enter()
      .append("td")
      .html(d => d)
    ;

    d3.selectAll('.dataRow')
      .selectAll("th")
      .data(function(d) {
        return [d.Subtheme];
      })
      .enter()
      .append("td")
      .html(d => d)
    ;

    d3.selectAll('.dataRow')
      .selectAll("th")
      .data(function(d) {
        return [d.Release_Year];
      })
      .enter()
      .append("td")
      .html(d => d)
    ;
      
    d3.selectAll('.dataRow')
      .selectAll("th")
      .data(function(d) {
        return [d.Pieces];
      })
      .enter()
      .append("td")
      .html(d => d)
    ;

    d3.selectAll('.dataRow')
      .selectAll("th")
      .data(function(d) {
        return [d.USD_MSRP];
      })
      .enter()
      .append("td")
      .html(d => d)
    ;
  
    };
    */
  }
}


  