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
        .style("background", "#f2f3f4")
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
      let svgWidth = 380;
      let svgHeight = 150;
      let popupSvg = this.popup.append("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight);
      let cellWidth = 120;
      let cellHeight = 75;
      let previewInfo = [{type: "theme"}, {type: "set"}, {type: "set"}, {type: "theme"}, {type: "set"}, {type: "set"}, ];

      let chooseColor = function(d, i) {
        if(d.type === "theme") 
          return "#D85650"; 
        else 
          return "#265783"
      };

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
      .attr("fill", chooseColor);

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
      .attr("fill", chooseColor)

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
      let xSpacer = 15;
      
      let getX = function(d, i) {
        let x = 0;
        if(i >= 3) 
          x = ((i - 3) * cellWidth + cellWidth/2)
        else 
          x = (i * cellWidth + cellWidth/2)
        if(i == 0 || i == 3) x += xSpacer / 3;
        else if(i == 2 || i == 5) x += xSpacer;
        else if(i == 1 || i == 4) x += xSpacer * 2 / 3;
        return x;
      }

      //Display the preview header for each tile
      
      let headertexts = popupSvg.selectAll("text.headertext")
      .data(popupData)
      .text(d => (d.previewHeader))
      .attr('dx', getX)
      .attr('dy', (d, i) => {
        if(i >= 3) return cellHeight + 25; else return 25;
      })
      .attr('class', 'headertext');
      
      headertexts.enter().append("text")
      .text(d => (d.previewHeader))
      .attr('dx', getX)
      .attr('dy', (d, i) => {
        if(i >= 3) return cellHeight + 25; else return 25;
      })
      .attr('class', 'headertext');

      //Display the preview category for each tile
      
      let categoryTexts = popupSvg.selectAll("text.categorytext")
      .data(popupData)
      .text(d => (d.category))
      .attr('dx', getX)
      .attr('dy', (d, i) => {
        if(i >= 3) return cellHeight + 25 + spacer; else return 25 + spacer;
      })
      .attr('class', 'categorytext');
      
      categoryTexts.enter().append("text")
      .text(d => (d.category))
      .attr('dx', getX)
      .attr('dy', (d, i) => {
        if(i >= 3) return cellHeight + 25 + spacer; else return 25 + spacer;
      })
      .attr('class', 'categorytext');

      //Display the preview quantity for each tile
      
      let quantityTexts = popupSvg.selectAll("text.quantitytext")
      .data(popupData)
      .text(d => (d.quantity))
      .attr('dx', getX)
      .attr('dy', (d, i) => {
        if(i >= 3) return cellHeight + 25 + 2*spacer; else return 25 + 2*spacer;
      })
      .attr('class', 'quantitytext');
      
      quantityTexts.enter().append("text")
      .text(d => (d.quantity))
      .attr('dx', getX)
      .attr('dy', (d, i) => {
        if(i >= 3) return cellHeight + 25 + 2*spacer; else return 25 + 2*spacer;
      })
      .attr('class', 'quantitytext');

      headertexts.exit().remove();
      quantityTexts.exit().remove();
      categoryTexts.exit().remove();

      //show the popup
      this.popup.style("visibility", "visible");
    }
  
    mousemove(d) {
      let top = 0;
      let left = 0;
      console.log("window inner width: ", window.innerWidth);
      console.log("d3.event.pageX: ", d3.event.pageX);
      if(d3.event.pageX < window.innerWidth - 400) {
        top = (d3.event.pageY-220);
        left = (d3.event.pageX+20);
      } else {
        top = (d3.event.pageY-220);
        left = (d3.event.pageX-400);
      }
      this.popup.style("top", top + "px")
                .style("left", left + "px");
    }
  
    mouseout(d) {
      this.popup.style("visibility", "hidden");
    }
  
  };
  