
$(document).ready(function () {

	
	
	parallax.add($("#page1"))
			.add("sexy", $("#page2"));
		

	parallax.page1.show();
	
	parallax.speed = 1200;
	parallax.scaling = 0.4;
		
	parallax.last = parallax.sexy;

	parallax.background = $('body');
	
	$("#left").click(function(){
			parallax.last.right();
			
			
	});
	
	$("#right").click(function(){
			parallax.last.left();
	});
	
	$("#top").click(function(){
			parallax.last.top();
	});
	
	$("#bottom").click(function(){
			parallax.last.bottom();
	});
});

