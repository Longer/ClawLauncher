var WidgetTest = function (params){
	Widget.call(this, params);
	var self = this;
	
	self.setTitle("Test");

	self.updateTimer = setInterval(function (){
		self.reload();
	}, 5000);
	self.count = 0;
};

WidgetTest.prototype = Object.create(Widget.prototype);
WidgetTest.prototype.constructor = WidgetTest;

WidgetTest.prototype.reload = function (){
	var self = this;
	self.setContent("<div style='padding: 5px;'>"+self.count+"</div>");
	self.count++;
};
