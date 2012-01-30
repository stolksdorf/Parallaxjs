window.onload = function(){
	if (typeof jQuery === 'undefined') {  
		alert("parallax.js requires jQuery.");
	} else {
		var updateparallax = function(){
			parallax.width = window.innerWidth;
			parallax.height = window.innerHeight;
		}
		updateparallax();
		$(window).resize(function(){updateparallax();});
	}
}

var parallaxPage = function(name, htmlObject){
	return{
		key: name,
		page : htmlObject,
		
		right  : function(callback){return this.transition({left:parallax.width,top:0}  ,{left:-parallax.width,top:0} ,callback);},
		left   : function(callback){return this.transition({left:-parallax.width,top:0} ,{left:parallax.width,top:0}  ,callback);},
		top    : function(callback){return this.transition({left:0,top:-parallax.height},{left:0,top:parallax.height} ,callback);},
		bottom : function(callback){return this.transition({left:0,top:parallax.height} ,{left:0,top:-parallax.height},callback);},
		
		transition : function(locationNew, locationOld, callback){
			if(!parallax.sliding){
				parallax.sliding = true;
				var thisPage = this;
				if(parallax.current !== this){
					this.hide(locationNew);
					this.slide({left:0,top:0}, function(){
						thisPage.makeCurrent();
						if(typeof callback === 'function'){ callback(); }
					});
					if(typeof parallax.current !== 'undefined'){
						parallax.current.slide(
							locationOld, 
							function(){parallax.sliding = false;}
						);
					}
					parallax.slideBackground(locationNew);
				}
			}
			return this;
		},
		
		slide : function(css, callback){
			this.page.css("display", "block");
			this.page.stop().animate(css, parallax.speed, parallax.easing,
				function(){if(typeof callback === "function"){callback();}
			});
		},
		
		hide : function(newLocation){
			newLocation = newLocation || {left:parallax.width,top:0}; //defaults left off screen
			this.page.css("display", "none");
			this.page.css(newLocation);
			return this;
		},
		
		show : function(newLocation){
			newLocation = newLocation || {left:0,top:0}; //defaults on screen
			if(typeof parallax.current !== 'undefined'){
				parallax.current.hide();
			}
			this.makeCurrent();
			this.page.css("display", "block");
			this.page.css(newLocation);
			return this;
		},
		
		makeCurrent : function(){
			if(this === parallax.current){
				return true;
			}else{
				if(typeof parallax.current !== 'undefined'){
					parallax.current.hide();
					parallax.last = parallax.current;
				}
				if(parallax.updateUrl === true){ this.updateUrl(); }
				if(typeof this.onload === 'function'){ this.onload();}
				parallax.current = this;
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


var parallax = {
	
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
				this[key] = parallaxPage(key,object);
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
			if(parallax.hasOwnProperty(pageName)){
				return parallax[pageName];
			}
		}
	},
	
	slideBackground : function(newLocation){
		if(typeof this.background !== 'undefined' && typeof newLocation !== 'undefined'){
			$(this.background).animate({
				'background-position-x': '+=' + -newLocation.left * parallax.scaling + 'px',
				'background-position-y': '+=' + -newLocation.top * parallax.scaling + 'px',
				}, parallax.speed, parallax.easing);
		}
	},
};








