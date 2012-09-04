# What is Parallax.js?
Is a javascript framework allowing you to slide in pages of your site with having a parallaxing background.
Parallax.js keeps pages in a structureless format, meaning you can absolutely control where pages come in and from where, even if it doesn't make geometric sense. You add html elements, or pages, to Parallax.js and use the movement functions to slide them into view, pushing whatever was there out of the way. Very light weight, very cool. Just like fezes.

Check out the [demo page](http://stolksdorf.github.com/Parallaxjs)'s features section. It should explain everything you need to know to use Parallax.js. I strongly you suggest to take a dive into the demo page's code base as well, some nifty things in there.

# I want to use Parallax.js for my project. What license is it under?
I like to consider Parallax.js under the [WTFPL](http://sam.zoy.org/wtfpl/). In short, do whatever you like. Good luck on whatever you are working on and feel free to email me when it's done, I'd love to see your work.

# Adding Pages
Add accepts either a name and an element, or just an element. With the latter Parallax.js will try to use the element's Id as the name. Pages can be accessed using their name as a property on the Parallax.js object.

	parallax.add("foo", $("#page1"))
	parallax.add($("#bar"));

	parallax.foo; //<- woah! they're properties now!
	parallax.bar;

# Backgrounds and Parallax Scaling
To get a nifty parallaxing background, just set a jQuery element to be Parallax.js's background. For best results, make sure that the element's background image is a repeating image. You can also control the scaling, or how much the background moves in relation to pages.

	parallax.background = $("body");
	parallax.scaling = 0.4; //background moves 40% with the pages

# Speed and Easing
Some like it fast, some like it slow. Some like to swing and others like to get... umm linear? <br>
Whatever you fancy, Parallax.js has you covered.

	parallax.speed = 1200; //In milliseconds of course!
	parallax.easing = 'linear';

# Movement
The meat and potatoes. Invoking these will move that page in from that side.

	parallax.bar.left(); //Bar slides in from the left
	parallax.foo.top(); //bringing back foo from the top
	parallax.bar.bottom(IAmBack()); //We got callbacks too ;)

	functon IAmBack(){
		alert("I'm back foo!");
	}

# Show and Hide
Sometimes we don't need the fanciness. Show and hide simply bring pages to focus instantly, or hides them.

	//All pages start out hidden,
	//remember to show your initial page!
	parallax.foo.show();
	parallax.bar.hide(); //Bar is being a tad shy

# Last and Current
Parallax.js has two special pages that it fills in for you. You can use that just like regular pages.

	parallax.bar.left()
	parallax.current.ackbar(); //Bar thinks it's a trap!
	parallax.foo.top();
	parallax.current.ackbar(); //Foo now thinks it's a trap
	parallax.last.right(); //Bar slides in from the right

# OnLoad and Preload
Sometimes your page just has to run some code when it hits the big screen. We understand. Preload runs before the page animation, onload runs after.

	parallax.bar.onload = function(){
			alert( "sweetest function eva!");
		};
	parallax.bar.left(); //Fires that function!
	parallax.bar.show(); //Also fires it, how cool!

	//parallax itself has it's own preload and onload functions
	parallax.preload = function(){
		//these get run on -every- page,
		//in addition to the page's onload/preload functions
		alert("Super annoying alert");
	};

# Protips!
	//Remember parallax can be aliased!
	p = parallax;

	//Using arrow key navigation is super cool
	//most users find it very intuitive
	$(document).keydown(function(e){
		if (e.keyCode == 37) { //this is the left key,
			p.bar.left();
		}
	}); //check out the code of this demo, it has arrow key navigation!
	//For reference; 38 - top, 39 - right, 40 - bottom

	//Before using .last either check to see if it's null
	if(typeof p.last === 'undefined'){
		//handle it here
	}
	//or set it before hand
	p.last = p.foo;

	//Movement callbacks and .onload look like they do the same thing
	//But they don't!
	p.bar.onload = herp();
	p.bar.left(derp()); //both herp and derp get run
	p.current.show() //only herp gets run

Godspeed.
