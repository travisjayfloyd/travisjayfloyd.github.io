class ThemePopup {

    constructor(legos) {
      //----------------------------------------
      // themePopup
      //----------------------------------------
      this.lego = new Lego(legos);
      this.themePopup = d3.select("body")
        .append("div")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .style("background", "#f2f3f4")
        .style("border-radius", "20px")
        .style("font-size", "12px")
        .attr('id', 'themePopup')
        .classed('themePopupDiv', true)
      ;
    };
  
    /**
     * Gets the HTML content for a themePopup.
     */
    themePopup_html(themeObj) {
      let text = "<div class='theme-popup'>"
      text += "<h2>" + themeObj.Theme + "</h2>";
  
      text += "</div>"
      return text;
    }
  
    mouseover(themeObj) {
      this.themePopup
        .html(this.themePopup_html(themeObj))
        .classed('popup-title', true)
      ;
      let svgWidth = 600;
      let svgHeight = 150;
      let sizeStackedSvg = this.themePopup.append("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight)
      .style("display", "block");
      let priceStackedSvg = this.themePopup.append("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight)
      .style("display", "block");
      let sizeChart = new ThemeStackedBarChart("Pieces", sizeStackedSvg);
      let priceChart = new ThemeStackedBarChart("USD_MSRP", priceStackedSvg);

      let legosets = this.lego.getSetsForTheme(themeObj.Theme);

      sizeChart.update(legosets);
      priceChart.update(legosets);

      this.themePopup.style("visibility", "visible");
    }
  
    mousemove(d) {
      this.themePopup.style("top", (d3.event.pageY-220) + "px")
                    .style("left", (d3.event.pageX+20) + "px");
    }
  
    mouseout(d) {
      this.themePopup.style("visibility", "hidden");
    }
  
  };
  