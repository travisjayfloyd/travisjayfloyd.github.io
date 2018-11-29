class Popup {

    constructor(legos) {
      //----------------------------------------
      // popup
      //----------------------------------------
      this.lego = new Lego(legos);
      this.popup = d3.select("body")
        .append("div")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .style("background", "#F5F5DC")
        .style("border-radius", "20px")
        .style("font-size", "12px")
        .attr('id', 'popup')
        .classed('popupDiv', true)
      ;
    };
  
    /**
     * Gets the HTML content for a popup.
     */
    popup_html(d) {
      //TODO also need to make the popup for the table since this stuff is all just for the year chart
      let yearSets = [];
      // this.legos.filter(legoset => legoset.Year == d).forEach(set=> yearSets.push(set));
      console.log(yearSets);
      let text = "<div class='year-popup'>"
      text += "<h2>" + d + "</h2>";
  
      text += "</div>"
      return text;
    }
  
    mouseover(d) {
      this.popup
        .html(this.popup_html(d))
        .classed('popup-title', true)
      ;
      let svgWidth = 320;
      let svgHeight = 150;
      let popupSvg = this.popup.append("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight);
      let cellWidth = 100;
      let cellHeight = 75;
      let previewInfo = [{type: "theme"}, {type: "set"}, {type: "set"}, {type: "theme"}, {type: "set"}, {type: "set"}, ];

      let tileRects = popupSvg.selectAll("Rect")
      .data(previewInfo)
      .attr("x", (d, i) => {
        if(i >= 3) 
          return ((i - 3) * (cellWidth + 5) + 5)
        else 
          return (i * (cellWidth + 5) + 5)
      })
      .attr("y", (d, i) => {
        if(i >= 3) return cellHeight; else 0;
      })
      .attr("fill", (d)=>{
        if(d.type === "theme") 
          return "#8B3626"; 
        else 
          return "#03396c"
      });

      tileRects.enter().append("rect")
      .attr("width", cellWidth)
      .attr("height", cellHeight)
      .attr("x", (d, i) => {
        if(i >= 3) 
          return ((i - 3) * (cellWidth + 5) + 5)
        else 
          return (i * (cellWidth + 5) + 5)
      })
      .attr("y", (d, i) => {
        if(i >= 3) return cellHeight; else 0;
      })
      .attr("class", "tile")
      .attr("fill", (d)=>{
        if(d.type === "theme") 
          return "#8B3626"; 
        else 
          return "#03396c"
      })

      //Create the data for the popup
      //TODO need to get categories and quantities and make sure they don't go more than about 10 characters
      let popupData = [
        {previewHeader: "Top Theme", category: "Town", quantity: "30 sets"},
        {previewHeader: "Biggest Set", category: "Town", quantity: "30 pieces"},
        {previewHeader: "Most $$ Set", category: "Town", quantity: "$30"},
        {previewHeader: "Lowest Theme", category: "Town", quantity: "30 sets"},
        {previewHeader: "Smallest Set", category: "Town", quantity: "30 pieces"},
        {previewHeader: "Least $$ Set", category: "Town", quantity: "$30"},
      ];
      
      let spacer = 15;

      //Display the preview header for each tile
      
      let previewTexts = popupSvg.selectAll("text.tilestext")
      .data(popupData)
      .text(d => (d.previewHeader))
      .attr('dx', (d, i) => {
        if(i >= 3) 
          return ((i - 3) * (cellWidth + 5) + 55)
        else 
          return (i * (cellWidth + 5) + 55)
      })
      .attr('dy', (d, i) => {
        if(i >= 3) return cellHeight + 25; else return 25;
      })
      .attr('class', 'tilestext');
      
      previewTexts.enter().append("text")
      .text(d => (d.previewHeader))
      .attr('dx', (d, i) => {
        if(i >= 3) 
          return ((i - 3) * (cellWidth + 5) + 55)
        else 
          return (i * (cellWidth + 5) + 55)
      })
      .attr('dy', (d, i) => {
        if(i >= 3) return cellHeight + 25; else return 25;
      })
      .attr('class', 'tilestext');

      //Display the preview category for each tile
      
      let categoryTexts = popupSvg.selectAll("text.categorytext")
      .data(popupData)
      .text(d => (d.category))
      .attr('dx', (d, i) => {
        if(i >= 3) 
          return ((i - 3) * (cellWidth + 5) + 20)
        else 
          return (i * (cellWidth + 5) + 20)
      })
      .attr('dy', (d, i) => {
        if(i >= 3) return cellHeight + 25 + spacer; else return 25 + spacer;
      })
      .attr('class', 'categorytext');
      
      categoryTexts.enter().append("text")
      .text(d => (d.category))
      .attr('dx', (d, i) => {
        if(i >= 3) 
          return ((i - 3) * (cellWidth + 5) + 20)
        else 
          return (i * (cellWidth + 5) + 20)
      })
      .attr('dy', (d, i) => {
        if(i >= 3) return cellHeight + 25 + spacer; else return 25 + spacer;
      })
      .attr('class', 'categorytext');

      //Display the preview quantity for each tile
      
      let quantityTexts = popupSvg.selectAll("text.quantitytext")
      .data(popupData)
      .text(d => (d.quantity))
      .attr('dx', (d, i) => {
        if(i >= 3) 
          return ((i - 3) * (cellWidth + 5) + 20)
        else 
          return (i * (cellWidth + 5) + 20)
      })
      .attr('dy', (d, i) => {
        if(i >= 3) return cellHeight + 25 + 2*spacer; else return 25 + 2*spacer;
      })
      .attr('class', 'quantitytext');
      
      quantityTexts.enter().append("text")
      .text(d => (d.quantity))
      .attr('dx', (d, i) => {
        if(i >= 3) 
          return ((i - 3) * (cellWidth + 5) + 20)
        else 
          return (i * (cellWidth + 5) + 20)
      })
      .attr('dy', (d, i) => {
        if(i >= 3) return cellHeight + 25 + 2*spacer; else return 25 + 2*spacer;
      })
      .attr('class', 'quantitytext');

      previewTexts.exit().remove();
      quantityTexts.exit().remove();
      categoryTexts.exit().remove();

      //show the popup
      this.popup.style("visibility", "visible");
    }
  
    mousemove(d) {
      this.popup.style("top", (d3.event.pageY-100)+"px")
        .style("left",(d3.event.pageX+10)+"px");
    }
  
    mouseout(d) {
      this.popup.style("visibility", "hidden");
    }
  
  };
  