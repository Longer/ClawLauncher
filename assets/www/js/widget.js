var Widget = function (params){
	var self = this;
	self.content = params.elem;
	self.header = params.header;
	self.opts = params.opts;

	self.setTitle = function (value){
		self.header.textContent = value;
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
