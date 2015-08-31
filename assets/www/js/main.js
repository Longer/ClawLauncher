var viewport = {
	width: window.innerWidth,
	height: window.innerHeight - window.innerHeight/6
};

var widgets = {
	weather: WidgetWeather,
	rss: WidgetRSS,
	test: WidgetTest,
};

var config = {
	"panel": [
		"org.mozilla.firefox",
		"ru.kinopoisk",
		"com.android.vending",
		"com.android.settings"
	],
	"cells": [
		{"type": "weather", "opts": {"id": 28440}, "x": 0, "y": 0, "w": 1, "h": 1},
		{"type": "rss", "opts": {"url": "https://www.linux.org.ru/section-rss.jsp?section=1"}, "x": 1, "y": 0, "w": 1, "h": 2},
		{"type": "rss", "opts": {"url": "http://www.opennet.ru/opennews/opennews_all.rss"}, "x": 2, "y": 0, "w": 2, "h": 2},
		{"type": "test", "x": 0, "y": 1, "w": 1, "h": 1}
	]
};

var cells = [];
var id_count = 0;

var panel = document.getElementById("panel");
panel.style.height = window.innerHeight/6 + 'px';
var panel_apps = document.querySelector('#panel .apps');

var menu_apps = document.querySelector('#menu .apps');
menu_apps.style.height = window.innerHeight - window.innerHeight/6 - 10 + 'px';

var menu = document.getElementById('menu');
var menu_btn = document.getElementById('menu_btn')

function menuBtnHandle(e){
	menu.style.display = menu.style.display==='none'?'block':'none';
}

if (isMobile()){
	//config = JSON.parse(AndroidAPI.getConfig());
	menu_btn.ontouchend = menuBtnHandle;

	var apps = JSON.parse(AndroidAPI.apps());
	var apps_list = "";
	for (var i = 0; i < apps.length; i++){
		apps_list += "<div class='app' onclick='AndroidAPI.exec(\""+apps[i].name+"\")'>"
			+"<div class='icon'><img src='"+apps[i].icon+"' width='48' height='48'></div>"
			+"<div class='name'>"+apps[i].label+"</div></div>"
	}
	menu_apps.innerHTML = apps_list;
	
	var apps = "";
	for (var i = 0; i < config.panel.length; i++){
		var icon = AndroidAPI.getIcon(config.panel[i]);
		apps += "<div class='icon' onclick='AndroidAPI.exec(\""+config.panel[i]+"\")'><img src='"+icon+"' width='48' height='48'></div>"
	}

	panel_apps.innerHTML = apps;
}
else{
	menu_btn.onclick = menuBtnHandle;
}



window.onresize = function (){
	viewport = {
		width: window.innerWidth,
		height: window.innerHeight - window.innerHeight/6
	};

	for (var i = 0; i < cells.length; i++){
		cells[i].resize();
	}

	panel.style.height = window.innerHeight/6 + 'px';
	menu_apps.style.height = window.innerHeight - window.innerHeight/6 - 1 + 'px';
};

for (var i = 0; i < config.cells.length; i++)
	cells.push(new Cell(config.cells[i]));
