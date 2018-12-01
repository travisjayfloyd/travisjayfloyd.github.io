
class ThemeStackedBarChart {
    /**
     * Constructor for the ThemeStackedBarChart
     *
     * @param type describes if the chart is for size or price it can be "Pieces" or "USD_MSRP"
     * @param svg is the are of the popup that we're adding this chart to
     */
    constructor (type, svg){
      this.type = type;
      this.svg = svg;
      this.currentSetX = 5;
    };  
  
    /**
     * Creates the stacked bar chart
     *
     * @param legoSets is an array of all the sets for a selected theme
     */
  
    update (legoSets){
        let ctx = this;
        let setCount = 30;

        //Sort the sets by the type(size or price)
        legoSets = legoSets.filter(set=>set[ctx.type]!="NA")
        let sortFunction = (a, b) => parseInt(b[ctx.type]) - parseInt(a[ctx.type])
        legoSets.sort(sortFunction);


        //Create the stacked bar chart.
        //Use the global color scale to color code the rectangles.
        //HINT: Use .themeStackSets class to style your bars.
        let mapFunc = function(obj){
            return parseInt(obj[ctx.type])
        }
        let oneAttrLegoSets = legoSets.map(mapFunc);
        let sumFunc = function sum(tot, attr){return tot + attr};
        let totalOfType = oneAttrLegoSets.reduce(sumFunc);
        this.stackScale = d3.scaleLinear()
            .domain([0, totalOfType])
            .range([0, (parseInt(ctx.svg.style("width")) - 10)]);
        let colorScale = d3.scaleLinear()
            .domain([0, Math.max(...oneAttrLegoSets)])
            .range(["#FF6666", "#8B3626"]);

        let padding = 5;
        
        //TODO maybe what I want to do here is filter out any that are less than like <10> of price or size and put the rest in other...

        // let displaySets = [];
        // if(legoSets.length > setCount)
        //     displaySets = legoSets.slice(0, setCount);
        // //Gets all the leftover sets to put into an 'other sets' section of stacked bar chart
        // let newLegoSets = legoSets.slice(setCount, legoSets.length)
        // oneAttrLegoSets = newLegoSets.map(mapFunc);
        // totalOfType = oneAttrLegoSets.reduce(sumFunc);

        // displaySets.push({"Name": "Other Sets", [ctx.type]: totalOfType})
        // console.log("display sets: ", displaySets);
        let nameTooltip = new NameTooltip(this.type);

        let setRects = this.svg.selectAll("rect." + this.type + "-sets")
        .data(legoSets)
        .attr("width", function(d) {  
            return ctx.stackScale(d[ctx.type]); 
        })
        .attr("x", (d) => {
            let currentX = ctx.currentSetX;
            ctx.currentSetX = currentX + ctx.stackScale(d[ctx.type]);
            return currentX;
        })
        .attr("fill", (d)=>{return colorScale(d[ctx.type])})
        .on("mousemove", (d)=>nameTooltip.mousemove(d))
        .on("mouseover", (d)=>nameTooltip.mouseover(d))
        .on("mouseout", (d)=>nameTooltip.mouseout(d));
        
        setRects.enter().append("rect")
        .attr("width", function(d) { return ctx.stackScale(d[ctx.type]); })
        .attr("height", 40)
        .attr("x", (d) => {
            let currentX = ctx.currentSetX;
            ctx.currentSetX = currentX + ctx.stackScale(d[ctx.type]);
            return currentX;
        })
        .attr("y", 40 + padding)
        .attr("class", this.type + "-sets")
        .attr("fill", (d)=>{return colorScale(d[ctx.type])})
        .on("mousemove", (d)=>nameTooltip.mousemove(d))
        .on("mouseover", (d)=>nameTooltip.mouseover(d))
        .on("mouseout", (d)=>nameTooltip.mouseout(d));

        // //Display a bar with minimal width in the center of the bar chart to indicate the 50% mark
        // //HINT: Use .middlePoint class to style this bar.
        // svg.append("rect")
        // .attr("width", 1)
        // .attr("height", 50)
        // .attr("x", ctx.svgWidth/2)
        // .attr("y", padding - 5)
        // .attr("class", "middlePoint")

        
        // //Display total count of electoral votes won by the Democrat and Republican party
        // //on top of the corresponding groups of bars.
        // //HINT: Use the .electoralVoteText class to style your text elements;  Use this in combination with
        // // chooseClass to get a color based on the party wherever necessary
        
        // //Just above this, display the text mentioning the total number of electoral votes required
        // // to win the elections throughout the country
        // //HINT: Use .electoralVotesNote class to style this text element
        // let textData = [
        // {
        //     text: totalRepEV,
        //     class: "R",
        //     xPos: ctx.svgWidth - 50
        // },
        // {
        //     text: totalDemEV,
        //     class: "D",
        //     xPos: ctx.firstDemX
        // },
        // {
        //     text: "Electoral Vote(" + parseInt(totalEV/2) + " needed to win)",
        //     class: "mid",
        //     xPos: ctx.svgWidth/2
        // }];

        // if(totalIndEV != 0)
        //     textData = [{
        //     text: totalIndEV,
        //     class: "I",
        //     xPos: 0
        //     }].concat(textData);

        // let evTexts = svg.selectAll("text.electoralVotesNote, text.electoralVoteText").data(textData)
        // .text((d)=>d.text)
        // .attr('dx', (d)=>d.xPos)
        // .attr("class", (d)=>{
        //                         if(d.class === "mid")
        //                         return "electoralVotesNote" 
        //                         else
        //                         return "electoralVoteText " + ctx.chooseClass(d.class)
        //                     });

        // evTexts.enter()
        // .append("text")
        // .text((d)=>d.text)
        // .attr('dx', (d)=>d.xPos)
        // .attr('dy', 30)
        // .attr("class", (d)=>{
        //                         if(d.class === "mid")
        //                         return "electoralVotesNote" 
        //                         else
        //                         return "electoralVoteText " + ctx.chooseClass(d.class)
        //                     });

        // evTexts.exit().remove();
        
        // ctx.evCurrent = 0;
        // ctx.firstDemX = 0;
        
    };
  
    
  }
  