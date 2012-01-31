

$(document).ready(function () {
	
	
	parallax.add($("#features"))
			.add($("#index"))
			.add($("#boo"))
			.add($("#sandbox"))
			.add($("#me"));
			
	parallax.background = $("body");
	
	
	parallax.index.onload=function(){
		
		$("#rightText").text("Features");
		$("#rightControl").show().unbind('click').click(function(){
			$(".control").hide();
			parallax.features.right();
		});
		
		$("#topText").text("Sandbox");
		$("#topControl").show().unbind('click').click(function(){
			$(".control").hide();
			parallax.sandbox.top();
		});
		
		$("#leftText").text("The Guy");
		$("#leftControl").show().unbind('click').click(function(){
			$(".control").hide();
			parallax.me.left();
		});
	};
	
	
	parallax.sandbox.onload=function(){
		$("#bottomText").text("Home");
		$("#bottomControl").show().unbind('click').click(function(){
			$(".control").hide();
			parallax.index.bottom();
		});
	};
	
	parallax.boo.onload=function(){
		$(".control").hide();
	};
	

	
	parallax.features.onload=function(){
		$("#leftText").text("Home");
		$("#leftControl").show().unbind('click').click(function(){
			$(".control").hide();
			parallax.index.left();
		});
		
		$("#rightText").text("The Guy");
		$("#rightControl").show().unbind('click').click(function(){
			$(".control").hide();
			parallax.me.right();
		});
	};
	
	
	parallax.me.onload=function(){
		$("#leftText").text("Features");
		$("#leftControl").show().unbind('click').click(function(){
			$(".control").hide();
			parallax.features.left();
		});
		
		$("#rightText").text("Home");
		$("#rightControl").show().unbind('click').click(function(){
			$(".control").hide();
			parallax.index.right();
		});
	};
	
	//The fadey bits
	$("#bottomControl").mouseenter(function(){
		$("#bottomArrow").fadeTo(500,1);
		$("#bottomText").fadeTo(500,1);
	}).mouseleave(function(){
		$("#bottomArrow").stop().fadeTo(500,0.2);
		$("#bottomText").stop().fadeTo(500,0);
	});
	
$("#leftControl").mouseenter(function(){
		$("#leftArrow").fadeTo(500,1);
		$("#leftText").fadeTo(500,1);
	}).mouseleave(function(){
		$("#leftArrow").stop().fadeTo(500, 0.2);
		$("#leftText").stop().fadeTo(500,0);
	});
	
$("#rightControl").mouseenter(function(){
		$("#rightArrow").fadeTo(500,1);
		$("#rightText").fadeTo(500,1);
	}).mouseleave(function(){
		$("#rightArrow").stop().fadeTo(500, 0.2);
		$("#rightText").stop().fadeTo(500,0);
	});
	
$("#topControl").mouseenter(function(){
		$("#topArrow").fadeTo(500,1);
		$("#topText").fadeTo(500,1);
	}).mouseleave(function(){
		$("#topArrow").stop().fadeTo(500, 0.2);
		$("#topText").stop().fadeTo(500,0);
	});

	

	$(".control").hide();
	parallax.index.show();

});

