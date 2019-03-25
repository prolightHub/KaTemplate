function createProcessing()
{
	var args = Array.prototype.slice.call(arguments);
	args.push({ beginCode: "with(processing)\n{", endCode: "}"});
	var any = combine.apply(this, args);

	//Onelined to make actual console line output
	function code(processing)
	{
		var processing = processing;

		processing.size(400, 400);
		processing.background(255, 255, 255);
		processing.angleMode = "degrees";
		
		processing.mousePressed = function() {};
		processing.mouseReleased = function() {};
		processing.mouseMoved = function() {};
		processing.mouseDragged = function() {};
		processing.mouseOver = function() {};
		processing.mouseOut = function() {};
		processing.keyPressed = function() {};
		processing.keyReleased = function() {};
		processing.keyTyped = function() {};
		
		processing.getSound = function(name) 
		{ 
			return "noSound"; 
		};
		processing.playSound = function(sound) 
		{ 
			console.log(sound + " is not supported yet..."); 
		};

		try{
			processing.imageCache = JSON.parse(localStorage.getItem("imageCache"));
		}
		catch(e)
		{
			console.log(e);
		}

		if(!processing.imageCache)
		{
			processing.imageCache = {};
		}
	
		const proxyUrl = "https://cors-anywhere.herokuapp.com/";
		processing.pathToImages = "https://www.kasandbox.org/third_party/javascript-khansrc/live-editor/build/images/";
		processing.pendingImageRequests = {};

		/*"https://www.kasandbox.org/programming-images/";*/

		processing.getImage = function(name, override) 
		{ 
			try{
				var url = override || processing.pathToImages + name + ".png";
				if(!processing.imageCache)
				{
					return processing.loadImage(url);
				}
				if(processing.imageCache[url])
				{
					return processing.loadImage(processing.imageCache[url]);
				}else{
					processing.pendingImageRequests[url] = true;

					toDataURL(proxyUrl + url, function(dataUrl)
					{
						processing.imageCache[url] = dataUrl; 
						delete processing.pendingImageRequests[url];

						localStorage.setItem("imageCache", JSON.stringify(processing.imageCache));
					});

					return processing.loadImage(processing.imageCache[url] || url);
				}
			}
			catch(e)
			{
				console.log(e);
				console.log(img + " is not supported yet..."); 
				return processing.get(0, 0, 1, 1); 
			}
		};

		processing.loadedTempImages = [
			"avatars/aqualine-sapling", 
			"avatars/aqualine-seed", 
			"avatars/aqualine-seedling", 
			"avatars/aqualine-tree", 
			"avatars/aqualine-ultimate", 
			"avatars/avatar-team", 
			"avatars/duskpin-sapling", 
			"avatars/duskpin-seed", 
			"avatars/duskpin-tree", 
			"avatars/duskpin-ultimate", 
			"avatars/leaf-blue", 
			"avatars/leaf-green", 
			"avatars/leaf-grey", 
			"avatars/leaf-orange", 
			"avatars/leaf-red", 
			"avatars/leaf-yellow", 
			"avatars/leafers-sapling", 
			"avatars/leafers-seed", 
			"avatars/leafers-seedling", 
			"avatars/leafers-tree", 
			"avatars/leafers-ultimate", 
			"avatars/marcimus", 
			"avatars/marcimus-orange", 
			"avatars/marcimus-purple", 
			"avatars/marcimus-red", 
			"avatars/mr-pants", 
			"avatars/mr-pants-green", 
			"avatars/mr-pants-orange", 
			"avatars/mr-pants-pink", 
			"avatars/mr-pants-purple", 
			"avatars/mr-pants-with-hat", 
			"avatars/mr-pink", 
			"avatars/mr-pink-green", 
			"avatars/mr-pink-orange", 
			"avatars/old-spice-man", 
			"avatars/old-spice-man-blue", 
			"avatars/orange-juice-squid", 
			"avatars/piceratops-sapling", 
			"avatars/piceratops-seed", 
			"avatars/piceratops-seedling", 
			"avatars/piceratops-tree", 
			"avatars/piceratops-ultimate", 
			"avatars/primosaur-sapling", 
			"avatars/primosaur-seed", 
			"avatars/primosaur-seedling", 
			"avatars/primosaur-tree", 
			"avatars/primosaur-ultimate", 
			"avatars/purple-pi", 
			"avatars/purple-pi-pink", 
			"avatars/purple-pi-teal", 
			"avatars/questionmark", 
			"avatars/robot_female_1", 
			"avatars/robot_female_2", 
			"avatars/robot_female_3", 
			"avatars/robot_male_1", 
			"avatars/robot_male_2", 
			"avatars/robot_male_3", 
			"avatars/spunky-sam", 
			"avatars/spunky-sam-green", 
			"avatars/spunky-sam-orange", 
			"avatars/spunky-sam-red", 
			"avatars/starky-sapling", 
			"avatars/starky-seed", 
			"avatars/starky-seedling", 
			"avatars/starky-tree", 
			"avatars/starky-ultimate", 
			"creatures/Hopper-Happy", 
			"creatures/Hopper-Cool", 
			"creatures/Hopper-Jumping", 
			"creatures/OhNoes", 
			"creatures/OhNoes-Happy", 
			"creatures/OhNoes-Hmm", 
			"cute/Blank", 
			"cute/BrownBlock", 
			"cute/CharacterBoy", 
			"cute/CharacterCatGirl", 
			"cute/CharacterHornGirl", 
			"cute/CharacterPinkGirl", 
			"cute/CharacterPrincessGirl", 
			"cute/ChestClosed", 
			"cute/ChestLid", 
			"cute/ChestOpen", 
			"cute/DirtBlock", 
			"cute/DoorTallClosed", 
			"cute/DoorTallOpen", 
			"cute/EnemyBug", 
			"cute/GemBlue", 
			"cute/GemGreen", 
			"cute/GemOrange", 
			"cute/GrassBlock", 
			"cute/Heart", 
			"cute/Key", 
			"cute/PlainBlock", 
			"cute/RampEast", 
			"cute/RampWest", 
			"cute/Rock", 
			"cute/RoofEast", 
			"cute/RoofNorth", 
			"cute/RoofNorthEast", 
			"cute/RoofNorthWest", 
			"cute/RoofSouth", 
			"cute/RoofSouthEast", 
			"cute/RoofSouthWest", 
			"cute/RoofWest", 
			"cute/Selector", 
			"cute/ShadowEast", 
			"cute/ShadowNorth", 
			"cute/ShadowNorthEast", 
			"cute/ShadowNorthWest", 
			"cute/ShadowSideWest", 
			"cute/ShadowSouth", 
			"cute/ShadowSouthEast", 
			"cute/ShadowSouthWest", 
			"cute/ShadowWest", 
			"cute/Star", 
			"cute/StoneBlock", 
			"cute/StoneBlockTall", 
			"cute/TreeShort", 
			"cute/TreeTall", 
			"space/girl2", 
			"space/girl3", 
			"space/girl4", 
			"space/girl5", 
			"space/healthheart", 
			"space/minus", 
			"space/octopus", 
			"space/planet", 
			"space/plus", 
			"space/rocketship", 
			"space/star", 
			"space/3", 
			"space/4", 
			"space/5", 
			"space/6", 
			"space/7", 
			"space/8", 
			"space/9"
		];

		processing.loadedTempImages.forEach((img) => processing.getImage(img));
		
		var lastError = "";
		var lastGet = processing.get;
		processing.get = function()
		{
			try{
				return lastGet.apply(this, arguments);
			}
			catch(e)
			{
				if(arguments[2] !== 0 && arguments[3] !== 0)
				{
					if(e.toString() !== lastError)
					{
						console.warn(e);
					}
					lastError = e.toString();

					for(var i in processing.pendingImageRequests)
					{
						if(processing.pendingImageRequests[i])
						{
							return;
						}
					}

					window.setTimeout(function()
					{
						window.location.reload();
					}, 50);
				}else{
					throw e;
				}
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
	
	var pattern = code.toString().match("this[ ]*\[[ ]*\[[ ]*(\"KAInfiniteLoopSetTimeout\")[ ]*\][ ]*\][ ]*\([ ]*\d*[ ]*\);*")[0];
	code = new Function("return " + code.toString().replace(pattern, ""))();
	
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

function toDataURL(url, callback) 
{
	var xhr = new XMLHttpRequest();
	xhr.onload = function() 
	{
		var reader = new FileReader();
		reader.onloadend = function() 
		{
			callback(reader.result);
		}
		reader.readAsDataURL(xhr.response);
	};
	xhr.open('GET', url);
	xhr.responseType = 'blob';
	xhr.send();
}
