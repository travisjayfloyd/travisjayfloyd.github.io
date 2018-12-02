// Load the lego data.
d3.csv("data/legosets.csv").then(function(legoSets) {
    legoSets.forEach(function (d){
      d.Year = Number(d.Year);
    })
    let biggestSetsBarChart = new BiggestSetsBarChart(legoSets);
    biggestSetsBarChart.update(legoSets);
    let mostExpensiveSetsBarChart = new MostExpensiveSetsBarChart(legoSets);
    mostExpensiveSetsBarChart.update(legoSets);
    let priceVTimeChart = new SetsOverTimeChart(legoSets, "USD_MSRP");
    // priceVTimeChart.update(years);
    let sizeVTimeChart = new SetsOverTimeChart(legoSets, "Pieces");
    // sizeVTimeChart.update(years);
    let table = new TableChart(legoSets, mostExpensiveSetsBarChart, biggestSetsBarChart);
    let topThemesBarChart = new TopThemesBarChart(legoSets, table, mostExpensiveSetsBarChart, biggestSetsBarChart);
    topThemesBarChart.update(legoSets);
    table.addTopThemesChart(topThemesBarChart);
    biggestSetsBarChart.addTableChart(table);
    mostExpensiveSetsBarChart.addTableChart(table);
    let yearChart = new YearChart(legoSets, table, topThemesBarChart, biggestSetsBarChart, mostExpensiveSetsBarChart, priceVTimeChart, sizeVTimeChart);
    yearChart.update(legoSets);
});

