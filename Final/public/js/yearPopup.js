class YearPopup {

    constructor(legos) {
      //----------------------------------------
      // yearPopup
      //----------------------------------------
      this.lego = new Lego(legos);
      this.yearPopup = d3.select("body")
        .append("div")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .style("background", "#f2f3f4")
        .style("border-radius", "20px")
        .style("font-size", "12px")
        .attr('id', 'yearPopup')
        .classed('yearPopupDiv', true)
      ;
    };
  
    /**
     * Gets the HTML content for a yearPopup.
     */
    yearPopup_html(year) {
      let yearSets = [];
      // this.legos.filter(legoset => legoset.Year == d).forEach(set=> yearSets.push(set));
      console.log(yearSets);
      let text = "<div class='year-popup'>"
      text += "<h2>" + year + "</h2>";
  
      text += "</div>"
      return text;
    }
  
    mouseover(year) {
      this.yearPopup
        .html(this.yearPopup_html(year))
        .classed('popup-title', true)
      ;
      let svgWidth = 380;
      let svgHeight = 150;
      let yearPopupSvg = this.yearPopup.append("svg")
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

      let tileRects = yearPopupSvg.selectAll("Rect")
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

      //Create the data for the yearPopup

      let shorterLegoEntry = function(set){
        let textLength = 15;
        if(set.Name && set.Name.length > textLength) set.Name = set.Name.substring(0, textLength) + "...";
        if(set.Theme && set.Theme.length > textLength) set.Theme = set.Theme.substring(0, textLength) + "...";
        return set;
      };

      let topTheme = shorterLegoEntry(this.lego.getTopTheme(year));
      let smallTheme = shorterLegoEntry(this.lego.getSmallestTheme(year));
      let biggestSet = shorterLegoEntry(this.lego.getBiggestSet(year));
      let mostExpensiveSet = shorterLegoEntry(this.lego.getMostExpensiveSet(year));
      let smallestSet = shorterLegoEntry(this.lego.getSmallestSet(year));
      let leastExpensiveSet = shorterLegoEntry(this.lego.getLeastExpensiveSet(year));

      let yearPopupData = [
        {previewHeader: "Top Theme", category: topTheme.Theme, quantity: topTheme.sum + " sets"},
        {previewHeader: "Biggest Set", category: biggestSet.Name, quantity: biggestSet.Pieces + " pieces"},
        {previewHeader: "Most $$ Set", category: mostExpensiveSet.Name, quantity: mostExpensiveSet.Pieces + " pieces"},
        {previewHeader: "Lowest Theme", category: smallTheme.Theme, quantity: smallTheme.sum + " sets"},
        {previewHeader: "Smallest Set", category: smallestSet.Name, quantity: smallestSet.Pieces + " pieces"},
        {previewHeader: "Least $$ Set", category: leastExpensiveSet.Name, quantity: leastExpensiveSet.Pieces + " pieces"},
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
      
      let headertexts = yearPopupSvg.selectAll("text.headertext")
      .data(yearPopupData)
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
      
      let categoryTexts = yearPopupSvg.selectAll("text.categorytext")
      .data(yearPopupData)
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
      
      let quantityTexts = yearPopupSvg.selectAll("text.quantitytext")
      .data(yearPopupData)
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

      //show the yearPopup
      this.yearPopup.style("visibility", "visible");
    }
  
    mousemove(d) {
      let top = 0;
      let left = 0;
      if(d3.event.pageX < window.innerWidth - 400) {
        top = (d3.event.pageY-220);
        left = (d3.event.pageX+20);
      } else {
        top = (d3.event.pageY-220);
        left = (d3.event.pageX-400);
      }
      this.yearPopup.style("top", top + "px")
                .style("left", left + "px");
    }
  
    mouseout(d) {
      this.yearPopup.style("visibility", "hidden");
    }
  
  };
  