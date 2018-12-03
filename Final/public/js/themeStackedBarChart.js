
class ThemeStackedBarChart {
    /**
     * Constructor for the ThemeStackedBarChart
     *
     * @param type describes if the chart is for size or price it can be "Pieces" or "USD_MSRP"
     * @param svg is the are of the popup that we're adding this chart to
     */
    constructor(type, svg) {
        this.type = type;
        this.svg = svg;
        this.currentSetX = 5;
    };

    /**
     * Creates the stacked bar chart
     *
     * @param legoSets is an array of all the sets for a selected theme
     */

    update(legoSets) {
        let ctx = this;
        let setCount = 30;

        //Sort the sets by the type(size or price)
        legoSets = legoSets.filter(set => set[ctx.type] != "NA")
        let sortFunction = (a, b) => parseInt(b[ctx.type]) - parseInt(a[ctx.type])
        legoSets.sort(sortFunction);


        //Create the stacked bar chart.
        //Use the global color scale to color code the rectangles.
        //HINT: Use .themeStackSets class to style your bars.
        let mapFunc = function (obj) {
            return parseInt(obj[ctx.type])
        }
        let oneAttrLegoSets = legoSets.map(mapFunc);
        let sumFunc = function sum(tot, attr) { return tot + attr };
        let totalOfType = oneAttrLegoSets.reduce(sumFunc);
        this.stackScale = d3.scaleLinear()
            .domain([0, totalOfType])
            .range([0, (parseInt(ctx.svg.style("width")) - 10)]);
        let colorScale = d3.scaleLinear()
            .domain([0, Math.max(...oneAttrLegoSets)])
            .range(["#FF6666", "#8B3626"]);

        let padding = 5;

        let nameTooltip = new NameTooltip(this.type);

        let setRects = this.svg.selectAll("rect." + this.type + "-sets")
            .data(legoSets)
            .attr("width", function (d) {
                return ctx.stackScale(d[ctx.type]);
            })
            .attr("x", (d) => {
                let currentX = ctx.currentSetX;
                ctx.currentSetX = currentX + ctx.stackScale(d[ctx.type]);
                return currentX;
            })
            .attr("fill", (d) => { return colorScale(d[ctx.type]) })
            .on("mousemove", (d) => nameTooltip.mousemove(d))
            .on("mouseover", (d) => nameTooltip.mouseover(d))
            .on("mouseout", (d) => nameTooltip.mouseout(d));


        setRects.enter().append("rect")
            .attr("width", function (d) { return ctx.stackScale(d[ctx.type]); })
            .attr("height", 40)
            .attr("x", (d) => {
                let currentX = ctx.currentSetX;
                ctx.currentSetX = currentX + ctx.stackScale(d[ctx.type]);
                return currentX;
            })
            .attr("y", padding)
            .attr("class", this.type + "-sets")
            .attr("fill", (d) => { return colorScale(d[ctx.type]) })
            .on("mousemove", (d) => nameTooltip.mousemove(d))
            .on("mouseover", (d) => nameTooltip.mouseover(d))
            .on("mouseout", (d) => nameTooltip.mouseout(d));

    };


}
