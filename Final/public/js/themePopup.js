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
      let ctx = this;

      d3.select("body")
        .on("click", function(d){
          console.log("clicked body", ctx);
          if(d3.event.pageX > ctx.x + ctx.svgWidth || d3.event.pageX < ctx.x - 20 || d3.event.pageY > ctx.y + ctx.svgHeight * 2 + 40 || d3.event.pageY < ctx.y)
            ctx.themePopup.style("visibility", "hidden");
        })
    };
  
    /**
     * Gets the HTML content for a themePopup.
     */
    themePopup_html(themeObj) {
      let text = "<div class='theme-popup'>"
      text += "<h1>" + themeObj.Theme + "</h1>";  
      text += "</div>"
      return text;
    }
  
    mouseover(themeObj) {
      this.themePopup
        .html(this.themePopup_html(themeObj))
        .classed('popup-title', true)
      ;
      this.svgWidth = 800;
      this.svgHeight = 150;
      this.themePopup.append("h2")
        .text("Each Bar Below Represents the Number of Pieces Per Set (Hover For the Name)");
      let sizeStackedSvg = this.themePopup.append("svg")
        .attr("width", this.svgWidth)
        .attr("height", this.svgHeight)
        .style("display", "block");
      this.themePopup.append("h2")
        .text("Each Bar Below Represents the Price Per Set (Hover For the Name)");
      let priceStackedSvg = this.themePopup.append("svg")
        .attr("width", this.svgWidth)
        .attr("height", this.svgHeight)
        .style("display", "block");
      let sizeChart = new ThemeStackedBarChart("Pieces", sizeStackedSvg);
      let priceChart = new ThemeStackedBarChart("USD_MSRP", priceStackedSvg);

      let legosets = this.lego.getSetsForTheme(themeObj.Theme);

      sizeChart.update(legosets);
      priceChart.update(legosets);

      this.themePopup.style("visibility", "visible");
    }
  
    mousemove(d) {
      this.y = (d3.event.pageY-220);
      this.x = (d3.event.pageX+20);
      this.themePopup.style("top", this.y + "px")
                    .style("left", this.x + "px");
    }
  
    mouseout(d) {
      console.log("mouse out");
      this.themePopup.style("visibility", "hidden");
    }

    click(d) {
      this.mousemove(d);
      this.mouseover(d);
    }
  
  };
  