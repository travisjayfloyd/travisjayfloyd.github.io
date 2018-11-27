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

    // Create table rows

    let rows = d3.select("#legoTable").select("tbody").selectAll("tr")
      .data(fullarray);

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
        return [d.ReleaseYear];
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
        return [d.Price];
      })
      .enter()
      .append("td")
      .html(d => d)
    ;
  
    };
  }
  