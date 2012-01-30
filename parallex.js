window.onload = function(){
	if (typeof jQuery === 'undefined') {  
		alert("parallex.js requires jQuery.");
	} else {
		var updateParallex = function(){
			parallex.width = window.innerWidth;
			parallex.height = window.innerHeight;
		}
		updateParallex();
		$(window).resize(function(){updateParallex();});
	}
}

var parallexPage = function(name, htmlObject){
	return{
		key: name,
		page : htmlObject,
		
		right  : function(callback){return this.transition({left:parallex.width,top:0}  ,{left:-parallex.width,top:0} ,callback);},
		left   : function(callback){return this.transition({left:-parallex.width,top:0} ,{left:parallex.width,top:0}  ,callback);},
		top    : function(callback){return this.transition({left:0,top:-parallex.height},{left:0,top:parallex.height} ,callback);},
		bottom : function(callback){return this.transition({left:0,top:parallex.height} ,{left:0,top:-parallex.height},callback);},
		
		transition : function(locationNew, locationOld, callback){
			if(!parallex.sliding){
				parallex.sliding = true;
				var thisPage = this;
				if(parallex.current !== this){
					this.hide(locationNew);
					this.slide({left:0,top:0}, function(){
						thisPage.makeCurrent();
						if(typeof callback === 'function'){ callback(); }
					});
					if(typeof parallex.current !== 'undefined'){
						parallex.current.slide(
							locationOld, 
							function(){parallex.sliding = false;}
						);
					}
					parallex.slideBackground(locationNew);
				}
			}
			return this;
		},
		
		slide : function(css, callback){
			this.page.css("display", "block");
			this.page.stop().animate(css, parallex.speed, parallex.easing,
				function(){if(typeof callback === "function"){callback();}
			});
		},
		
		hide : function(newLocation){
			newLocation = newLocation || {left:parallex.width,top:0}; //defaults left off screen
			this.page.css("display", "none");
			this.page.css(newLocation);
			return this;
		},
		
		show : function(newLocation){
			newLocation = newLocation || {left:0,top:0}; //defaults on screen
			if(typeof parallex.current !== 'undefined'){
				parallex.current.hide();
			}
			this.makeCurrent();
			this.page.css("display", "block");
			this.page.css(newLocation);
			return this;
		},
		
		makeCurrent : function(){
			if(this === parallex.current){
				return true;
			}else{
				if(typeof parallex.current !== 'undefined'){
					parallex.current.hide();
					parallex.last = parallex.current;
				}
				if(parallex.updateUrl === true){ this.updateUrl(); }
				if(typeof this.onload === 'function'){ this.onload();}
				parallex.current = this;
			}
			return false;
		},
		
		updateUrl : function(){
			var url = document.URL;
			url = (url.lastIndexOf("#") === -1)? url : url.substring(0, url.lastIndexOf("#")); //Strips off any anchors
			window.location.href = url + "#" + this.key;
		},
		
		ackbar : function(){ alert(this.key + " thinks it's a trap!"); return this;},
	};
};


var parallex = {
	
	speed : 800,
	easing : 'swing',
	sliding : false,
	unusableNames : ["last", "current", "background"],  //Work on this
	scaling : 0.15,

	add : function(key,object) {
		//check the key
		var check = true;
		if(typeof key === 'object'){
			try{
				object = key
				key = key.attr('id');
			} catch(err){
				check = false;
				alert("Page object lacks an id");
			}
		}else if(typeof key !== 'string'){
			check = false;
			alert("undefined key");
		}
		
		//check the object
		if(typeof object !== 'object'){
			check = false;
			alert("undefined page");
		}
		
		if(check){
			validKeyName = true;
			for(propName in this){ //do a check for invalid keys
				if(propName === key || $.inArray(propName, this.unusableNames) !== -1) {
					alert("'"+propName+"' cannot be used as a page identifier");
					validKeyName = false;
				}
			}
			if(validKeyName){
				this[key] = parallexPage(key,object);
				this[key].hide();
				this[key].page.css("position","absolute");
			}
		}
		return this;
	},
	
	fromUrl : function(){
		var temp = document.URL.lastIndexOf("#")
		if(temp !== -1){
			pageName = document.URL.substring(temp + 1, document.URL.length);
			if(parallex.hasOwnProperty(pageName)){
				return parallex[pageName];
			}
		}
	},
	
	slideBackground : function(newLocation){
		if(typeof this.background !== 'undefined' && typeof newLocation !== 'undefined'){
			$(this.background).animate({
				'background-position-x': '+=' + -newLocation.left * parallex.scaling + 'px',
				'background-position-y': '+=' + -newLocation.top * parallex.scaling + 'px',
				}, parallex.speed, parallex.easing);
		}
	},
};








