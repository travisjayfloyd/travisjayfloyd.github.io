/** Class implementing the table. */

class TableChart {
    /**
     * Creates a Table Object
     */
    constructor(data) {
  
      // Create list of all elements that will populate the table
      // Initially, the tableElements will be identical to the legoData
      this.tableElements = data.slice();
      this.legoData = data;
  
      // Default values for the Table Headers
      this.tableHeaders = ["Name", "Subtheme", "Release Year", "Pieces", "Price"];
  
      // To be used when sizing the svgs in the table cells.
      this.cell = {
        "width": 70,
        "height": 20,
        "buffer": 15
      };
  
      this.bar = {
        "height": 20
      };
  
    }
  
  
    /**
     * Updates the table contents with a row for each element in the global
     * variable tableElements.
     */
    update(fullarray) {

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


    //********* - START TABLE - *********
    var sortAscending = true;
    var table = d3.select('#legoTable').append('table');
    var titles = d3.keys(legos[0]);
    var titles = ["Name","Theme", "Subtheme", "Release_Year", "Pieces", "Price"]
    var headers = table.append('thead').append('tr')
      .selectAll('th')
      .data(titles).enter()
      .append('th')
      .text(function(d) {
        return d
      })
      .on('click', function(d) {
        headers.attr('class', 'header');
        if (d == "Name" || d == "Subtheme") { //alphabetical sort
          if (sortAscending) {
            rows.sort(function(a, b) {
              return d3.ascending(a[d], b[d]);
            });
            sortAscending = false;
            this.className = 'aes';
          } else {
            rows.sort(function(a, b) {
              return d3.descending(a[d], b[d]);
            });
            sortAscending = true;
            this.className = 'des';
          }
        } else { 
          if (sortAscending) {
            rows.sort(function(a, b) {
              return b[d] - a[d];
            });
            sortAscending = false;
            this.className = 'aes';
          } else {
            rows.sort(function(a, b) {
              return a[d] - b[d];
            });
            sortAscending = true;
            this.className = 'des';
          }
        }
      });
      
     
    let rows = table.append('tbody').selectAll('tr')
      .data(legos)
      .enter()
      .append('tr');

    table.exit().remove();
      

    let enterSet = rows.enter();
    rows.exit().remove();
    enterSet.append("tr").attr('class', 'dataRow');


    rows.selectAll('td')
      .data(function(d) {
        return titles.map(function(key, i) {
          return {
            'value': d[key],
            'name': d
          };
        });
      })
      .enter()
      .append('td')
      .attr('data-th', function(d) {
        return d.Name;
      })
      .text(function(d) {
          return d.value
      });


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


  