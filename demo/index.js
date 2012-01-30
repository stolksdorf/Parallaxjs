
$(document).ready(function () {

	
	
	parallex.add($("#page1"))
			.add("sexy", $("#page2"));
		

	parallex.page1.show();
	
	parallex.speed = 1200;
	parallex.scaling = 0.4;
		
	parallex.last = parallex.sexy;

	parallex.background = $('body');
	
	$("#left").click(function(){
			parallex.last.right();
			
			
	});
	
	$("#right").click(function(){
			parallex.last.left();
	});
	
	$("#top").click(function(){
			parallex.last.top();
	});
	
	$("#bottom").click(function(){
			parallex.last.bottom();
	});
});

