var HomeScreen = function (params){
	var self = this;
	self.cells = [];

	for (var i = 0; i < params.cells.length; i++)
		self.cells.push(new Cell(params.cells[i]));
	
	self.show = function (){
		for (var i = 0; i < self.cells.length; i++)
			self.cells[i].show();
	};

	self.hide = function (){
		for (var i = 0; i < self.cells.length; i++)
			self.cells[i].hide();
	};

	self.resize = function (){
		for (var i = 0; i < self.cells.length; i++)
			self.cells[i].resize();
	}
};
