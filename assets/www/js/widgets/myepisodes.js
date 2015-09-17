var WidgetMyEpisodes = function (params){
	Widget.call(this, params);
	var self = this;

	self.setTitle("MyEpisodes");
	self.setColor("#000000");

	self.updateTimer = setInterval(function (){
		self.reload();
	}, 60000 * 60);

	self.parseData = function (xrequest){
		var items = xrequest.responseXML.documentElement.getElementsByTagName('item');
		var titles = [];

		for(i=0; i<items.length; i++){
			for(j=0; j<items[i].childNodes.length; j++) {
				name = items[i].childNodes[j].nodeName;
				if (name == 'title'){
					titles[i] = items[i].childNodes[j].textContent;
					if (items[i].childNodes[j].textContent == "No Episodes"){
						return titles;
					}
					continue;
				}
			}
		}

		return titles;
	};

	self.highlight = function (str){
		return str.replace(/^\[ (.+) \]\[ (\d+)x(\d+) \]\[ (.+) \]\[ (.+) \]$/, "<b>$1 S$2E$3</b> - \"$4\", $5");
	};
};

WidgetMyEpisodes.prototype = Object.create(Widget.prototype);
WidgetMyEpisodes.prototype.constructor = WidgetMyEpisodes;

WidgetMyEpisodes.prototype.reload = function (){
	var self = this;

	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if (xhr.readyState == 4)
			if (xhr.status == 200){
				var titles = self.parseData(xhr);

				var res = "";
				for (var i = 0; i < titles.length; i++)
					res += "<div>" + self.highlight(titles[i]) + "</div><br>";

				self.setContent(res);
			}
	}
	xhr.open("GET", "http://myepisodes.com/rss.php?feed="+self.opts.feed+"&showignored=1&onlyunacquired=1&uid="+self.opts.login+"&pwdmd5="+self.opts.pass, true);
	xhr.send(null);
};
