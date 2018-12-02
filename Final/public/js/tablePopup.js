class TablePopup {

    constructor() {
      //----------------------------------------
      // TablePopup
      //----------------------------------------
      this.tablePopup = d3.select("body")
        .append("div")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .style("background", "#DCDCDC")
        .style("border-radius", "20px")
        .style("font-size", "12px")
        .attr('id', 'tablePopup')
        .classed('tablePopupDiv', true)
      ;
    };
  
    /**
     * Gets the HTML content for a tablePopup.
     */
    tablePopup_html(set) {
        console.log("table popup html: ", set);
      let text = "<div class='table-popup'>"
      text += "<h2>" + set.name.Name + "</h2>";
      text += "<img src='" + set.name.Image_URL + "' alt='legoSet' height='100' width='100'>";
  
      text += "</div>"
      return text;
    }
  
    mouseover(set) {
      this.tablePopup
        .html(this.tablePopup_html(set))
        .classed('popup-title', true)
      ;

      //show the tablePopup
      this.tablePopup.style("visibility", "visible");
    }
  
    mousemove(d) {
      this.tablePopup.style("top", (d3.event.pageY-50) + "px")
                .style("left", (d3.event.pageX+10) + "px");
    }
  
    mouseout(d) {
      this.tablePopup.style("visibility", "hidden");
    }
  
  };
  