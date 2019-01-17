function createProcessing()
{
	var args = Array.prototype.slice.call(arguments);
	args.push({ beginCode: "with(processing)\n{", endCode: "}"});
	var any = combine.apply(this, args);

	//Onelined to make actual console line output
	function code(processing)
	{
		processing.size(400, 400);
		processing.background(0, 0, 0);
		processing.angleMode = "degrees";
		
		processing.mousePressed = function(){ };
		processing.mouseReleased = function(){ };
		processing.mouseMoved = function(){ };
		processing.mouseDragged = function(){ };
		processing.mouseOver = function(){ };
		processing.mouseOut = function(){ };
		
		processing.keyPressed = function(){ };
		processing.keyReleased = function(){ };
		processing.keyTyped = function(){ };
		
		processing.getSound = function(name) 
		{ 
			return "noSound"; 
		};
		processing.playSound = function(sound) 
		{ 
			console.log(sound + " is not supported yet..."); 
		};
		
		const proxyUrl = "https://cors-anywhere.herokuapp.com/";
		processing.getImage = function(img) 
		{ 
			try{
				var url = "https://www.kasandbox.org/programming-images/" + img + ".png";
				/*var url = proxyUrl + "file:///home/pi/Downloads/live-editor-master/images/" + img + ".png";*/
                                
				/*if((url in processing.externals.sketch.imageCache.images))
				{
					processing.externals.sketch.imageCache.add(url);
				}*/
				throw new Error("Images are in development.");
				return processing.loadImage(url);
			}
			catch(e)
			{
				console.log(e);
				console.log(img + " is not supported yet..."); 
				return processing.get(0, 0, 1, 1); 
			}
		};
		
		processing.debug = function(event) 
		{
			try{
				return window.console.log.apply(this, arguments);
			} 
			catch(e) 
			{
				processing.println.apply(this, arguments);
			}
		};
		processing.Program = {
			restart: function() 
			{
				window.location.reload();
			},
			assertEqual: function(equiv) 
			{
				if(!equiv) 
				{
					console.warn(equiv);
				}
			},
		};
	}

	code = combine(new Function("return " + code.toString().split("\n").join(" "))(), any);
	
	window.canvas = document.getElementById("canvas"); 
	window.processing = new Processing(canvas, code);
}

function combine(a, c)
{
	var args = Array.prototype.slice.call(arguments);
	var config = {};

	var funcArgs = "";
	var join = "";
	for(var i = 0; i < args.length; i++)
	{
		if(typeof args[i] === "object")
		{
			config = args[i];
			continue;
		}

		var to = args[i].toString();

		var temp = to.substring(to.indexOf('(') + 1, to.indexOf(')'));

		if(temp !== "" && temp !== " ")
		{
			funcArgs += temp + ",";
		}

		join += to.slice(to.indexOf('{') + 1, -1);
	}

	funcArgs = funcArgs.slice(0, -1);
	
	return new Function("return function any(" + funcArgs + "){" + (config.beginCode || "").replace("\n", "") + join + (config.endCode || "") + "}")();
}




