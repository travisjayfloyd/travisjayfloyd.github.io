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

      // Set variables for commonly accessed data columns
      // this.goalsMadeHeader = 'Goals Made';
      // this.goalsConcededHeader = 'Goals Conceded';

      // // Setup the scales 
      // this.goalScale = d3.scaleLinear();
      // this.barChartScale = d3.scaleLinear();
      // this.colorScale = d3.scaleLinear()

      // this.goalScaleWidth = 180;
      // this.goalScaleHeight = 30;
      // this.oldXRows = [];
  
    }
  
  
    /**
     * Creates a table skeleton including headers that when clicked allow
     * you to sort the table by the chosen attribute.
     * Also calculates aggregate values of goals, wins, losses and total
     * games as a function of country.
     */
    createTable() {
  
      
      
    }
  
  
    /**
     * Updates the table contents with a row for each element in the global
     * variable tableElements.
     */
    update(year) {
      console.log("in the table");
      console.log(year);
      console.log(this.legoData);

    let fullarray = new Array();

    if(year == null){
        for(var i = 0; i < this.legoData.length; i++){
            let obj = {};
            obj['Name'] = this.legoData[i].Name;
            obj['Theme'] = this.legoData[i].Theme;
            obj['Subtheme'] = this.legoData[i].Subtheme;
            obj['ReleaseYear'] = this.legoData[i].Year;
            obj['Pieces'] = this.legoData[i].Pieces;
            obj['Price'] = this.legoData[i].USD_MSRP;
            fullarray.push(obj);
        }
    }
    else{
        for(var i = 0; i < this.legoData.length; i++){
            if(this.legoData[i].Year == year){
                let obj = {};
                obj['Name'] = this.legoData[i].Name;
                obj['Theme'] = this.legoData[i].Theme;
                obj['Subtheme'] = this.legoData[i].Subtheme;
                obj['ReleaseYear'] = this.legoData[i].Year;
                obj['Pieces'] = this.legoData[i].Pieces;
                obj['Price'] = this.legoData[i].USD_MSRP;
                fullarray.push(obj);
            }
            else{
                
            }
        }
    }

    console.log(fullarray);

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
  