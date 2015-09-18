var Widget = function (params){
	var self = this;
	self.content = params.elem;
	self.header = params.header;
	self.title = params.title;
	self.icon = params.icon;
	self.opts = params.opts;

	self.setTitle = function (value){
		self.title.textContent = value;
	};

	self.setIcon = function (value){
		self.icon.src = value;
	};

	self.setColor = function (value){
		self.header.style.backgroundColor = value;
	};

	self.setContent = function (value){
		self.content.innerHTML = value;
	};
};

Widget.prototype.reload = function (){

};
