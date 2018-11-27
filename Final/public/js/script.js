// Load the lego data.
d3.csv("data/legosets.csv").then(function(legoSets) {
    // console.log("legoSets:", legoSets);
    legoSets.forEach(function (d){
      d.Year = Number(d.Year);
    })
    // console.log("legoSets:", legoSets);
    let table = new TableChart(legoSets);
    // table.update(null, legos)
    let topThemesBarChart = new TopThemesBarChart(legoSets);
    topThemesBarChart.update(legoSets);
    let biggestSetsBarChart = new BiggestSetsBarChart(legoSets);
    biggestSetsBarChart.update(legoSets);
    let mostExpensiveSetsBarChart = new MostExpensiveSetsBarChart(legoSets);
    mostExpensiveSetsBarChart.update(legoSets);
    let yearChart = new YearChart(legoSets, table, topThemesBarChart, biggestSetsBarChart, mostExpensiveSetsBarChart);
    yearChart.update(legoSets);
});

