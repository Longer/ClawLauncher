var WidgetWeather = function (params){
	Widget.call(this, params);
	var self = this;
	document.write(self.opts)
	
	self.setTitle("Weather");
	self.setColor("#41b7b9");

	self.updateTimer = setInterval(function (){
		self.reload();
	}, 60000 * 20);
};

WidgetWeather.prototype = Object.create(Widget.prototype);
WidgetWeather.prototype.constructor = WidgetWeather;

WidgetWeather.prototype.reload = function (){
	var self = this;
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if (xhr.readyState == 4)
			if (xhr.status == 200){
				var fact = xhr.responseXML.documentElement.childNodes[1];

				var data = {};
				var wild = {
					n: 'северный',
					s: 'южный',
					w: 'западный',
					e: 'восточный',
					sw: 'юго-западный',
					se: 'юго-восточный',
					nw: 'северо-западный',
					ne: 'северо-восточный',
					calm: 'штиль'
				};

				for (var i = 0; i < fact.childNodes.length; i++){
					if (fact.childNodes[i].textContent){
						data[fact.childNodes[i].nodeName] = fact.childNodes[i].textContent;
					}
				}

				self.setContent("<center>"
					+"<img src='https://yastatic.net/weather/i/icons/svg/"+data["image-v3"]+".svg' style='height: 45%; width: 45%; opacity: 0.8;'><br>"
					+"<div style='font-size: 30px;'><b>"+(data["temperature"]>0?"+":"")+data["temperature"]+"</b>°C</div>"
					+"<div style='font-size: 14px;'>ветер: "+wild[data["wind_direction"]]
						+(data["wind_speed"]>0?" "+data["wind_speed"]+" м/с":"") +"</div>"
					+"<div style='font-size: 14px;'>влажность: "+data["humidity"]+"%</div>"
					+"</center>");
			}
	}
	xhr.open("GET", "https://export.yandex.ru/weather-ng/forecasts/"+self.opts.id+".xml", true);
	//xhr.open("GET", "28440.xml", true);
	xhr.send(null);
};
