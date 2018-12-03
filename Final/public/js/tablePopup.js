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
      let text = "<div class='table-popup'>"
      let nameStr = "";
      let imageUrl = "";
      if(set.name){
        nameStr = set.name.Name;
        imageUrl = set.name.Image_URL;
      }
      else {
        nameStr = set.Name;
        imageUrl = set.Image_URL;
      }
      text += "<h2>" + nameStr + "</h2>";
      text += "<img src='" + imageUrl + "' alt='legoSet' height='100' width='100'>";
  
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
  