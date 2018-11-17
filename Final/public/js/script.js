
// Load the lego data.
d3.csv("data/legosets.csv").then(function(legos) {
  legos.forEach(function (d){
    d.Year = Number(d.Year);
  })
  console.log(legos);
  let yearChart = new YearChart(legos);
  yearChart.update(legos);
});
