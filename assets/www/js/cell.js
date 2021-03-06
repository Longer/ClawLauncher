var Cell = function (params){
	var self = this;

	self.id = id_count++;
	self.type = params.type;

	self.elem = document.createElement("div");
	self.header = document.createElement("div");
	self.icon = document.createElement("img");
	self.title = document.createElement("span");
	self.content = document.createElement("div");

	self.title.innerHTML = "Header";
	self.icon.style.width = '16px';
	self.icon.style.height = '16px';

	if (self.type){
		self.widget = new widgets[self.type]({
			elem: self.content,
			header: self.header,
			title: self.title,
			icon: self.icon,
			opts: params.opts
		});
		self.widget.reload();
	}
	else{
		self.content.innerHTML = self.id;
	}
	

	self.elem.id = "cell" + self.id;
	self.elem.className = "cell hide";
	self.header.className = "header";
	self.content.className = "content";

	self.resize = function (){
		self.elem.style.left = Math.round(viewport.width/4*params.x) + 'px';
		self.elem.style.top = Math.ceil(viewport.height/2*params.y) + 'px';
		self.elem.style.width = Math.ceil(viewport.width/4*params.w) + 'px';
		self.elem.style.height = Math.ceil(viewport.height/2*params.h) + 'px';
	};

	self.show = function (){
		self.elem.classList.remove("hide");
	};

	self.hide = function (){
		self.elem.classList.add("hide");
	};

	self.resize();

	self.elem.appendChild(self.header);
	self.header.appendChild(self.icon);
	self.header.appendChild(self.title);
	self.elem.appendChild(self.content);
	document.body.appendChild(self.elem);
};
