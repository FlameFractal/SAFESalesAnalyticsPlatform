// anychart.onDocumentLoad(function () {

	// drawtop10regions();
	// drawtop10customers();
	// drawtop10categories();
	// drawSalesByMonth();
	// drawMap();

// 	$(".anychart-credits-text").hide(); // hide the trial version BS
// 	$(".anychart-credits-logo").hide(); // hide the anychart logo too

	// (function(){
		//   return Promise.resolve(function(){
			// 	drawtop10regions();
			// drawtop10customers();
			// drawtop10categories();
			// drawSalesByMonth();
		// 		}())
		// 	})().then(function(){
			// $(".anychart-credits-logo").hide(); // hide the anychart logo
			// $(".anychart-credits-text").hide(); // hide the trial version BS
		// })
// });

function drawtop10regions(){
	var top10regions = anychart.pie();
	// count orders for each state in a dictionary object
	arr = [], arr2 = []		
	$.each(superStoreData,function(){				// data variable is included from json file 
		if(arr[this["State"]]===undefined)
			arr[this["State"]] = this["Sales"]
		else
			arr[this["State"]] += this["Sales"]
	})
	// connvert it to arrays for anychart's format
	for (var k in arr) {
		arr2.push([k,arr[k]]);
	}
	// get only top 10
	arr3 = arr2.sort(function(p1, p2) { return p2[1] - p1[1] }).slice(0, 10);

	// set the data
	top10regions.data(arr3)
	top10regions.title("Top 10 Regions");
	top10regions.container("top10regions");

	top10regions.stroke('3 #fff');
    top10regions.radius('30%');
    top10regions.padding(0);
    top10regions.explode(0);
    top10regions.hovered().stroke(null);
    top10regions.labels().fontSize(11).position('outside');
    top10regions.labels().format(function(){return this.x});
    top10regions.legend().enabled(false);
    top10regions.tooltip().useHtml(true).format(function () {
        return 'Total Sales: $'+ parseInt(this.value).toLocaleString();
	});
	// top10regions.animation(true)

	top10regions.draw();
}

function drawtop10customers(){
	var top10customers = anychart.pie();
	// count orders for each state in a dictionary object
	arr = [], arr2 = []		
	$.each(superStoreData,function(){				// data variable is included from json file 
		if(arr[this["Customer Name"]]===undefined)
			arr[this["Customer Name"]] = this["Sales"]
		else
			arr[this["Customer Name"]] += this["Sales"]
	})
	// connvert it to arrays for anychart's format
	for (var k in arr) {
		arr2.push([k,arr[k]]);
	}
	// get only the top 10
	arr3 = arr2.sort(function(p1, p2) { return p2[1] - p1[1] }).slice(0, 10);

	// set the data
	top10customers.data(arr3)
	top10customers.title("Top 10 Customers");
	top10customers.container("top10customers");

	top10customers.stroke('3 #fff');
    top10customers.radius('30%');
    top10customers.padding(0);
    top10customers.explode(0);
    top10customers.hovered().stroke(null);
    top10customers.labels().fontSize(11).position('outside');
    top10customers.labels().format(function(){return this.x});
    top10customers.legend().enabled(false);
    top10customers.tooltip().useHtml(true).format(function () {
        return 'Sales: $'+ parseInt(this.value).toLocaleString();
	});
	// top10customers.animation(true)

	top10customers.draw();
}

function drawtop10categories(){
	var top10categories = anychart.pie();
	// count orders for each state in a dictionary object
	arr = [], arr2 = []		
	$.each(superStoreData,function(){				// data variable is included from json file 
		if(arr[this["Sub-Category"]]===undefined)
			arr[this["Sub-Category"]] = this["Sales"]
		else
			arr[this["Sub-Category"]] += this["Sales"]
	})
	// connvert it to arrays for anychart's format
	for (var k in arr) {
		arr2.push([k,arr[k]]);
	}
	// get only the top 10
	arr3 = arr2.sort(function(p1, p2) { return p2[1] - p1[1] }).slice(0, 10);

	// set the data
	top10categories.data(arr3)
	top10categories.title("Top 10 Categories");
	top10categories.container("top10categories");

	top10categories.stroke('3 #fff');
    top10categories.radius('30%');
    top10categories.padding(0);
    top10categories.explode(0);
    top10categories.hovered().stroke(null);
    top10categories.labels().fontSize(11).position('outside');
    top10categories.labels().format(function(){return this.x});
    top10categories.legend().enabled(false);
    top10categories.tooltip().useHtml(true).format(function () {
        return 'Total Sales: $'+ parseInt(this.value).toLocaleString();
	});
	// top10categories.animation(true)
	
	top10categories.draw();
}

function drawSalesByMonth(){
	
	var salesByMonth = anychart.column();


	
	// count orders for each state in a dictionary object
	arr = {"January":[0,0], "February":[0,0], "March":[0,0], "April":[0,0], "May":[0,0], "June":[0,0], "July":[0,0], "August":[0,0], "September":[0,0], "October":[0,0], "November":[0,0], "December":[0,0]} // this will make sure object keys remains in this order for plotting purpose, instead of haphazard or sorted
	arr2 = []		
	monthNames={01:"January", 02:"February", 03:"March", 04:"April", 05:"May", 06:"June", 07:"July", 08:"August", 09:"September", 10:"October", 11:"November", 12:"December"}
	$.each(superStoreData,function(){				// data variable is included from json file 
		month = monthNames[parseInt(this["Order Date"][3]+this["Order Date"][4])] // extract month from order date
		arr[month][0] += this["Sales"] // remove the decimal part of Sales
		arr[month][1] += this["Profit"] // remove the decimal part of Sales
	})
	
	// connvert it to arrays for anychart's format
	for (var k in arr) {
		arr2.push([k,arr[k][0], arr[k][1]]);
	}

	// set the data
	var dataSet = anychart.data.set(arr2)

	// create column series
	var lineSeriesData = dataSet.mapAs({'x': 0,'value': 1});
	var lineSeriesData2 = dataSet.mapAs({'x': 0,'value': 2});
	
	// create line series
	var lineSeries = salesByMonth.spline(lineSeriesData);
	var lineSeries2 = salesByMonth.splineArea(lineSeriesData2);

	lineSeries.name('Total Sales: $').stroke('2.5 #ef6c00');
	lineSeries2.name('Total Profits: $').stroke('2.5 #ef6c00');

	salesByMonth.title('Sales VS Profits by Month');
	salesByMonth.container("salesByMonth");
	salesByMonth.interactivity().hoverMode('by-x');
	salesByMonth.tooltip().displayMode('union');
	// salesByMonth.tooltip().useHtml(true).format(function () {
 //        return 'Total Sales: $'+ parseInt(this.value).toLocaleString();
	// });
	// salesByMonth.animation(true)

	salesByMonth.draw();
}

function drawMap(){
	var map = anychart.map();

	// count orders for each state in a dictionary object
	arr = [], arr2 = []
	$.each(superStoreData, function () {				// data variable is included from json file 
		if (arr[this["State"]] === undefined)
			arr[this["State"]] = this["Sales"]
		else
			arr[this["State"]] += this["Sales"]
	})

	stateNameToCode = { "Alabama": "AL", "Alaska": "AK", "Arizona": "AZ", "Arkansas": "AR", "California": "CA", "Colorado": "CO", "Connecticut": "CT", "Delaware": "DE", "District of Columbia": "DC", "Florida": "FL", "Georgia": "GA", "Hawaii": "HI", "Idaho": "ID", "Illinois": "IL", "Indiana": "IN", "Iowa": "IA", "Kansas": "KS", "Kentucky": "KY", "Louisiana": "LA", "Maine": "ME", "Maryland": "MD", "Massachusetts": "MA", "Michigan": "MI", "Minnesota": "MN", "Mississippi": "MS", "Missouri": "MO", "Montana": "MT", "Nebraska": "NE", "Nevada": "NV", "New Hampshire": "NH", "New Jersey": "NJ", "New Mexico": "NM", "New York": "NY", "North Carolina": "NC", "North Dakota": "ND", "Ohio": "OH", "Oklahoma": "OK", "Oregon": "OR", "Pennsylvania": "PA", "Rhode Island": "RI", "South Carolina": "SC", "South Dakota": "SD", "Tennessee": "TN", "Texas": "TX", "Utah": "UT", "Vermont": "VT", "Virginia": "VA", "Washington": "WA", "West Virginia": "WV", "Wisconsin": "WI", "Wyoming": "WY" }
	codeToStateName = { "AL": "Alabama", "AK": "Alaska", "AZ": "Arizona", "AR": "Arkansas", "CA": "California", "CO": "Colorado", "CT": "Connecticut", "DE": "Delaware", "DC": "District of Columbia", "FL": "Florida", "GA": "Georgia", "HI": "Hawaii", "ID": "Idaho", "IL": "Illinois", "IN": "Indiana", "IA": "Iowa", "KS": "Kansas", "KY": "Kentucky", "LA": "Louisiana", "ME": "Maine", "MD": "Maryland", "MA": "Massachusetts", "MI": "Michigan", "MN": "Minnesota", "MS": "Mississippi", "MO": "Missouri", "MT": "Montana", "NE": "Nebraska", "NV": "Nevada", "NH": "New Hampshire", "NJ": "New Jersey", "NM": "New Mexico", "NY": "New York", "NC": "North Carolina", "ND": "North Dakota", "OH": "Ohio", "OK": "Oklahoma", "OR": "Oregon", "PA": "Pennsylvania", "RI": "Rhode Island", "SC": "South Carolina", "SD": "South Dakota", "TN": "Tennessee", "TX": "Texas", "UT": "Utah", "VT": "Vermont", "VA": "Virginia", "WA": "Washington", "WV": "West Virginia", "WI": "Wisconsin", "WY": "Wyoming" }

	// connvert it to arrays in ISO 3188 shortname for anychart's format
	for (var k in arr) {
		arr2.push({"id": "US."+stateNameToCode[k], "value": parseInt(arr[k])});
	}

	map.geoData(anychart.maps.united_states_of_america);
	var series = map.choropleth(arr2);
	series.labels(false);
	series.colorScale(anychart.scales.linearColor('#FFEBD6','#C40A0A'));
	map.container('map');
	map.title('Sales Choropleth Geomap & Census Data');
	series.tooltip().useHtml(true).format(function (e) {
		stateName = codeToStateName[e.getData("id").replace("US.", "")]

		populationEstimateFact = 0, femaleFact = 13, incomeFact = 50, employmentFact = 54

		return 'Total Sales: $' + parseInt(e.getData("value")).toLocaleString() +""
			+"<br>"+ censusData[stateName][populationEstimateFact]["Fact"] + ": " + censusData[stateName][populationEstimateFact][stateName]
			+"<br>"+ censusData[stateName][femaleFact]["Fact"] + ": " + censusData[stateName][femaleFact][stateName]
			+"<br>"+ censusData[stateName][incomeFact]["Fact"] + ": " + censusData[stateName][incomeFact][stateName]
			+"<br>"+ censusData[stateName][employmentFact]["Fact"] + ": " + censusData[stateName][employmentFact][stateName]
				
	});

	map.draw();

}

function drawSalesByMonthArea() {

	var salesByMonthArea = anychart.bar();

	// count orders for each state in a dictionary object
	arr = { "January": 0, "February": 0, "March": 0, "April": 0, "May": 0, "June": 0, "July": 0, "August": 0, "September": 0, "October": 0, "November": 0, "December": 0 } // this will make sure object keys remains in this order for plotting purpose, instead of haphazard or sorted
	arr2 = []
	monthNames = { 01: "January", 02: "February", 03: "March", 04: "April", 05: "May", 06: "June", 07: "July", 08: "August", 09: "September", 10: "October", 11: "November", 12: "December" }
	$.each(superStoreData, function () {				// data variable is included from json file 
		month = monthNames[parseInt(this["Order Date"][3] + this["Order Date"][4])] // extract month from order date
		arr[month] += this["Sales"] // remove the decimal part of Sales
	})

	// connvert it to arrays for anychart's format
	for (var k in arr) {
		arr2.push({ x: k, value: arr[k] });
	}

	// set the data
	var series = salesByMonthArea.bar(arr2);
	
	
	// var dataSet = anychart.data.set(arr2)
	// // create column series
	// var columnSeriesData = dataSet.mapAs({
	// 	'x': 0,
	// 	'value': 1
	// });
	// var columnSeries = salesByMonth.column(columnSeriesData);

	// // create line series
	// var lineSeriesData = dataSet.mapAs({
	// 	'x': 0,
	// 	'value': 1
	// });
	// var scale = anychart.scales.linear();
	// var lineSeries = salesByMonth.spline(lineSeriesData);
	// lineSeries.name('Line').yScale(scale).stroke('2.5 #ef6c00');

	salesByMonthArea.title("Sales By Month - Bar");
	salesByMonthArea.container("salesByMonthArea");

	salesByMonthArea.tooltip().displayMode('union');
	salesByMonthArea.tooltip().useHtml(true).format(function () {
		return 'Total Sales: $' + parseInt(this.value).toLocaleString();
	});
	// salesByMonth.animation(true)

	salesByMonthArea.draw();
}

function drawtop10categoriesradar() {
	var top10categoriesradar = anychart.radar();
	// count orders for each state in a dictionary object
	arr = [], arr2 = []
	$.each(superStoreData, function () {				// data variable is included from json file 
		if (arr[this["Sub-Category"]] === undefined)
			arr[this["Sub-Category"]] = this["Sales"]
		else
			arr[this["Sub-Category"]] += this["Sales"]
	})
	// connvert it to arrays for anychart's format
	for (var k in arr) {
		arr2.push([k, arr[k]]);
	}
	// get only the top 10
	arr3 = arr2.sort(function (p1, p2) { return p2[1] - p1[1] }).slice(0, 10);
	// connvert it to arrays for anychart's format
	for (var k in arr3) {
		arr2.push({ x: k, value: arr3[k] });
	}

	// set the data
	var series2 = top10categoriesradar.area(arr2);

	top10categoriesradar.title("Top 10 Categories");
	top10categoriesradar.container("top10categoriesradar");

	top10categoriesradar.stroke('3 #fff');
	top10categoriesradar.radius('30%');
	top10categoriesradar.padding(0);
	top10categoriesradar.explode(0);
	top10categoriesradar.hovered().stroke(null);
	top10categoriesradar.labels().fontSize(11).position('outside');
	top10categoriesradar.labels().format(function () { return this.x });
	top10categoriesradar.legend().enabled(false);
	top10categoriesradar.tooltip().useHtml(true).format(function () {
		return 'Total Sales: $' + parseInt(this.value).toLocaleString();
	});
	// top10categoriesradar.animation(true)

	top10categoriesradar.draw();
}

