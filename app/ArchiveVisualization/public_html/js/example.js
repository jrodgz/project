// notify listeners of load event
var notify = [];

var sid = "1O0JIuvFus0U-WYZ_3IJBU-PB3amRQhfH63hAq8dY6aE";
var url = "https://spreadsheets.google.com/feeds/list/" + sid + 
          "/od6/public/values?alt=json";
var statusDiv = $('#chart-update');
var sp = new sheetParser(url, statusDiv);

notify.push(preprocess.onLoad);
notify.push(dataLoaded);

sp.loadSheet().then(function(data) {
    notify.forEach(function(callback) {
        callback(data);
    });
});

function dataLoaded()
{
	var defaultStyle = {
		'font-family': 'sans-serif',
		'font-size': 'default',
		'font-weight': 'bold',
		'fill': 'slateblue',
		'stroke': 'black',
		'stroke-width': '1px'
	};
	
	var svg = d3.select('body')
		.append('svg')
		.attr('width', 640)
		.attr('height', 480);
		
	var domains = preprocess.getDomains();
	var v = new drawing.TextNodes(svg);
	
	function drawDomains()
	{
		var data = [];
		for (key in domains)
		{
			data.push({
				text: key,
				style: defaultStyle,
				payload: domains[key]
			});
		}
		v.setData(data, 'i');
		v.drawNodes();
		v.clearLinks();
		v.on('dblclick', drawMementos);
	}
	
	function drawMementos(payload)
	{
		var data = [];
		payload.forEach(function(v) {
			data.push({
				text: v,
				style: defaultStyle,
				payload: null
			});
		});
		v.setData(data, 'l');
		v.drawNodes();
		v.drawLinks();
		v.on('dblclick', drawDomains);
	}
	
	drawDomains();
}