class NameTooltip {

    constructor(type) {
      this.type = type;
      //----------------------------------------
      // NameTooltip
      //----------------------------------------
      this.nameTooltip = d3.select("body")
        .append("div")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .style("background", "#DCDCDC")
        .style("border-radius", "20px")
        .style("font-size", "12px")
        .attr('id', 'nameTooltip')
        .classed('nameTooltipDiv', true)
      ;
    };
  
    /**
     * Gets the HTML content for a nameTooltip.
     */
    nameTooltip_html(set) {
      let typeStr = "";
      if(this.type == "USD_MSRP") 
        typeStr = "Dollars"
      else 
        typeStr = this.type
      let text = "<div class='nameTooltip'>"
      text += "<h2>" + set.Name + "</h2>";
      text += "<h2>" + set[this.type] + " " + typeStr +  "</h2>";
  
      text += "</div>"
      return text;
    }
  
    mouseover(set) {
        console.log("name tooltip: ", set)
      this.nameTooltip
        .html(this.nameTooltip_html(set))
        .classed('popup-title', true)
      ;

      //show the nameTooltip
      this.nameTooltip.style("visibility", "visible");
    }
  
    mousemove(d) {
      this.nameTooltip.style("top", (d3.event.pageY-50) + "px")
                .style("left", (d3.event.pageX+10) + "px");
    }
  
    mouseout(d) {
      this.nameTooltip.style("visibility", "hidden");
    }
  
  };
  