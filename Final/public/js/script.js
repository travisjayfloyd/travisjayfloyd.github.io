// Load the lego data.
d3.csv("data/legosets.csv").then(function(sets) {
  sets.forEach(function (d){
      d.Year = Number(d.Year);
    })
    //Get distinct names
    var unique = {};
    var legoSets = [];
    sets.forEach(function (obj) {
      var key = obj.Name;
      if (!unique[key]) {
        legoSets.push(obj);
        unique[key] = true;
      }
    });
    let biggestSetsBarChart = new BiggestSetsBarChart(legoSets);
    biggestSetsBarChart.update(legoSets);
    let mostExpensiveSetsBarChart = new MostExpensiveSetsBarChart(legoSets);
    mostExpensiveSetsBarChart.update(legoSets);
    let priceVTimeChart = new SetsOverTimeChart(legoSets, "USD_MSRP");
    let sizeVTimeChart = new SetsOverTimeChart(legoSets, "Pieces");
    let table = new TableChart(legoSets, mostExpensiveSetsBarChart, biggestSetsBarChart);
    let topThemesBarChart = new TopThemesBarChart(legoSets, table, mostExpensiveSetsBarChart, biggestSetsBarChart);
    topThemesBarChart.update(legoSets);
    table.addTopThemesChart(topThemesBarChart);
    biggestSetsBarChart.addTableChart(table);
    mostExpensiveSetsBarChart.addTableChart(table);
    let yearChart = new YearChart(legoSets, table, topThemesBarChart, biggestSetsBarChart, mostExpensiveSetsBarChart, priceVTimeChart, sizeVTimeChart);
    yearChart.update(legoSets);
});

