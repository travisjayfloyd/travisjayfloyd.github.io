class Lego {

    constructor(legos) {
        this.legos = legos;
    }

    getSetsForTheme(themeName) {
        return this.legos.filter(legoset => legoset.Theme == themeName);
    }

    getTopThemes(legoEntries, howMany) {
        return this.getThemes(legoEntries, howMany, "biggest");
    }

    getThemes(legoEntries, howMany, size) {
        let sumThemes = [];
        legoEntries.reduce(function(groupTheme, legoEntry) {
            if (!groupTheme[legoEntry.Theme]) {
                groupTheme[legoEntry.Theme] = {
                    sum: 0,
                    Theme: legoEntry.Theme
                };
                sumThemes.push(groupTheme[legoEntry.Theme])
            }
            groupTheme[legoEntry.Theme].sum += 1
            return groupTheme;
        }, {});

        let sortFunction;
        if(size == "biggest")
            sortFunction = (a, b) => parseInt(b.sum) - parseInt(a.sum)
        else
            sortFunction = (a, b) => parseInt(a.sum) - parseInt(b.sum)
        
        sumThemes.sort(sortFunction);
        
        return sumThemes.slice(0, howMany);
    }

    getBiggestSets(sets, howMany) {
        return this.getSets(sets, howMany, "biggest");
    }

    getSets(sets, howMany, size) {
        let sortFunction;
        if(size == "biggest")
            sortFunction = function(a, b) {return (parseInt(b.Pieces) - parseInt(a.Pieces))}
        else if(size == "avg" && howMany == 1) {
            let filtered = sets.filter((set)=>set.Pieces != "NA")
            let sorted = filtered.sort(function(a, b) {return (parseInt(b.Pieces) - parseInt(a.Pieces))});
            return sorted[Math.floor(sorted.length/2)];
        }
        else
        sortFunction = function(a, b) {return (parseInt(a.Pieces) - parseInt(b.Pieces))}
        sets.sort(sortFunction);
        return sets.slice(0, howMany);
    }
    
    getMostExpensiveSets(sets, howMany) {
        return this.getSetsByPrice(sets, howMany, "expensive")
    }
    
    getSetsByPrice(sets, howMany, size) {
        let setsByPrice = sets.filter(function(set){return set.USD_MSRP != "NA"});
        let sortFunction;
        if(size == "expensive")
        sortFunction = function(a, b) {return (parseInt(b.USD_MSRP) - parseInt(a.USD_MSRP))}
        else if(size == "avg" && howMany == 1) {
            let filtered = setsByPrice.filter((set)=>set.USD_MSRP != "NA")
            let sorted = filtered.sort(function(a, b) {return (parseInt(b.USD_MSRP) - parseInt(a.USD_MSRP))});
            return sorted[Math.floor(sorted.length/2)];
        }
        else
            sortFunction = function(a, b) {return (parseInt(a.USD_MSRP) - parseInt(b.USD_MSRP))}
        setsByPrice.sort(sortFunction);
        return setsByPrice.slice(0, howMany);
    }

    getTopTheme(year) {
        let yearSets = this.legos.filter(legoset => legoset.Year == year);
        let topTheme = this.getTopThemes(yearSets, 1)[0];
        return topTheme;
    }
    
    getBiggestSet(year) {
        let yearSets = this.legos.filter(legoset => legoset.Year == year);
        let biggestSet = this.getBiggestSets(yearSets, 1)[0];
        return biggestSet;
    }

    getMostExpensiveSet(year) {
        let yearSets = this.legos.filter(legoset => legoset.Year == year);
        return this.getMostExpensiveSets(yearSets, 1)[0];
    }
    
    getSmallestTheme(year) {
        let yearSets = this.legos.filter(legoset => legoset.Year == year);
        return this.getThemes(yearSets, 1, "smallest")[0];
    }

    getSmallestSet(year) {
        let yearSets = this.legos.filter(legoset => legoset.Year == year);
        return this.getSets(yearSets, 1, "smallest")[0];
    }

    getLeastExpensiveSet(year) {
        let yearSets = this.legos.filter(legoset => legoset.Year == year);
        return this.getSetsByPrice(yearSets, 1, "cheapest")[0];
    }
    
    getAvgExpensiveSet(year) {
        let yearSets = this.legos.filter(legoset => legoset.Year == year);
        return this.getSetsByPrice(yearSets, 1, "avg");
    }
    
    getAvgSizeSet(year) {
        let yearSets = this.legos.filter(legoset => legoset.Year == year);
        return this.getSets(yearSets, 1, "avg");
    }
}