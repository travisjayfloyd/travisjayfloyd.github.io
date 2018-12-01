// Load the lego data.
d3.csv("data/legosets.csv").then(function(legoSets) {
    legoSets.forEach(function (d){
      d.Year = Number(d.Year);
    })
    let table = new TableChart(legoSets);
    let topThemesBarChart = new TopThemesBarChart(legoSets);
    topThemesBarChart.update(legoSets);
    let biggestSetsBarChart = new BiggestSetsBarChart(legoSets);
    biggestSetsBarChart.update(legoSets);
    let mostExpensiveSetsBarChart = new MostExpensiveSetsBarChart(legoSets);
    mostExpensiveSetsBarChart.update(legoSets);
    let yearChart = new YearChart(legoSets, table, topThemesBarChart, biggestSetsBarChart, mostExpensiveSetsBarChart);
    yearChart.update(legoSets);
});

