/** Class implementing the table. */
class tableChart {
    /**
     * Creates a Table Object
     */
    constructor(year, data) {
  
      // Create list of all elements that will populate the table
      // Initially, the tableElements will be identical to the legoData
      this.tableElements = null; // 
      this.year = year;
      this.data = data;
  
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
     * Creates a table skeleton including headers that when clicked allow
     * you to sort the table by the chosen attribute.
     * Also calculates aggregate values of goals, wins, losses and total
     * games as a function of country.
     */
    createTable(year, data) {
  
      
      
    }
  
  
    /**
     * Updates the table contents with a row for each element in the global
     * variable tableElements.
     */
    updateTable(year, data) {
      console.log("in the table");
      console.log(year);
      console.log(data);

    let fullarray = new Array();

    if(year == null){
        for(var i = 0; i < data.length; i++){
            let obj = {};
            obj['Name'] = data[i].Name;
            obj['Theme'] = data[i].Theme;
            obj['Subtheme'] = data[i].Subtheme;
            obj['ReleaseYear'] = data[i].Year;
            obj['Pieces'] = data[i].Pieces;
            obj['Price'] = data[i].USD_MSRP;
            fullarray.push(obj);
        }
    }
    else{
        for(var i = 0; i < data.length; i++){
            if(data[i].Year == year){
                let obj = {};
                obj['Name'] = data[i].Name;
                obj['Theme'] = data[i].Theme;
                obj['Subtheme'] = data[i].Subtheme;
                obj['ReleaseYear'] = data[i].Year;
                obj['Pieces'] = data[i].Pieces;
                obj['Price'] = data[i].USD_MSRP;
                fullarray.push(obj);
            }
            else{
                
            }
        }
    }

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
  
    /**
     * Updates the global tableElements variable, with a row for each row
     * to be rendered in the table.
     */
    updateList(i) {
      // ******* TODO: PART IV *******
      console.log(i);
      // Only update list for aggregate clicks, not game clicks
    }
  
    /**
     * Collapses all expanded countries, leaving only rows for aggregate
     * values per country.
     */
    collapseList() {
      
      // ******* TODO: PART IV *******
  
    }
  }
  