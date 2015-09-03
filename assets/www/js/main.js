var viewport = {
	width: window.innerWidth,
	height: window.innerHeight - window.innerHeight/6
};

var widgets = {
	weather: WidgetWeather,
	rss: WidgetRSS,
	test: WidgetTest,
};

var config;
var home_screens = [];
var current_screen = 0;
var id_count = 0;

var hammer = new Hammer(document.body);

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
	config = JSON.parse(AndroidAPI.getConfig());
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

for (var i = 0; i < config.screens.length; i++)
	home_screens.push(new HomeScreen({cells: config.screens[i].cells}));
home_screens[0].show();

hammer.on("swipeleft swiperight", function (e){
	var change = 0;

	if (e.type === "swiperight" && current_screen > 0)
		change = -1;
	else if (e.type === "swipeleft" && current_screen < home_screens.length-1)
		change = 1;

	if (change != 0){
		home_screens[current_screen].hide();
		current_screen += change;
		home_screens[current_screen].show();
	}
});
