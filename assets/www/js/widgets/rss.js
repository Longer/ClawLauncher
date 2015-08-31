var WidgetRSS = function (params){
	Widget.call(this, params);
	var self = this;
	
	self.setTitle("RSS");
	self.setColor("#d17707");

	self.updateTimer = setInterval(function (){
		self.reload();
	}, 60000 * 20);
};

WidgetRSS.prototype = Object.create(Widget.prototype);
WidgetRSS.prototype.constructor = WidgetRSS;

WidgetRSS.prototype.reload = function (){
	var self = this;
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if (xhr.readyState == 4)
			if (xhr.status == 200){
				var data = {};
				var items = [];

				var tmp = xhr.responseXML.documentElement.childNodes[1];

				for (var i = 0; i < tmp.childNodes.length; i++){
					if (tmp.childNodes[i].nodeName === 'item'){
						var item = {};

						for (var j = 0; j < tmp.childNodes[i].childNodes.length; j++){
							item[tmp.childNodes[i].childNodes[j].nodeName] = tmp.childNodes[i].childNodes[j].textContent;
						}

						items.push(item);
					}
					else if (tmp.childNodes[i].textContent){
						data[tmp.childNodes[i].nodeName] = tmp.childNodes[i].textContent;
					}
				}

				self.setTitle(data['description']);

				console.log(items);

				var res = "";

				for (var i = 0; i < items.length; i++){
					var pubDate = new Date(items[i].pubDate);
					res += "<a href='"+items[i].link+"'>"+items[i].title+"</a><br>"
						+"<span style='font-size: 12px; color: #888;'>"+pubDate.toLocaleDateString()+"</span>"
						+"<br><br>";
				}

				self.setContent("<div style='padding: 5px;'>"+res+"</div>");
			}
	}
	xhr.open("GET", self.opts.url, true);
	//xhr.open("GET", "rss.xml", true);
	xhr.send(null);
};
