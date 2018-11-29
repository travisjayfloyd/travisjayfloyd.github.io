class Popup {

    constructor(legos) {
      //----------------------------------------
      // popup
      //----------------------------------------
      this.legos = legos;
      this.popup = d3.select("body")
        .append("div")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .style("background", "#565656")
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
      let yearSets = [];
      this.legos.filter(legoset => legoset.Year == d).forEach(set=> yearSets.push(set));
      console.log(yearSets);
      let text = "";
      yearSets.forEach(yearSet => text += "<h2>" + yearSet.Name + "</h2>");
      
      //   text +=  "Electoral Votes: " + d.Total_EV;
    //   text += "<ul>"
    //   // Democrat
    //   text += "<li class = democrat>" +
    //     d.D_Nominee_prop+":\t\t"+d.D_Votes+"("+d.D_Percentage+"%)" + "</li>"
    //   // Republican
    //   text += "<li class = republican>" +
    //     d.R_Nominee_prop+":\t\t"+d.R_Votes+"("+d.R_Percentage+"%)" + "</li>"
    //   // Independent
    //   if (d.I_Percentage) {
    //     text += "<li class = independent>" +
    //       d.I_Nominee_prop+":\t\t"+d.I_Votes+"("+d.I_Percentage+"%)" + "</li>"
    //   }
    //   text += "</ul>";
  
      return text;
    }
  
    mouseover(d) {
      this.popup
        .html(this.popup_html(d))
        .classed('popup-title', true)
      ;
      this.popup.style("visibility", "visible");
    }
  
    mousemove(d) {
      this.popup.style("top", (d3.event.pageY-10)+"px")
        .style("left",(d3.event.pageX+10)+"px");
    }
  
    mouseout(d) {
      this.popup.style("visibility", "hidden");
    }
  
  };
  