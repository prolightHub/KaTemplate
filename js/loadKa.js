!(function(window, JSON, localStorage)
{
	function createProcessing()
	{
		var args = Array.prototype.slice.call(arguments);
		args.push({ beginCode: "with(processing)\n{", endCode: "}"});
		var any = combine.apply(this, args);

		this.cache = window.cache = {};
		this.cache.loadedImages = window.cache.loadedImages = {};
		this.cache.imageNames = window.cache.imageNames = [
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
			"cute/WoodBlock",
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

		window.links = {
			proxyUrl : "https://cors-anywhere.herokuapp.com/",
			image : ["https://www.kasandbox.org/third_party/javascript-khansrc/live-editor/build/images/", 
					 "https://github.com/Khan/live-editor/tree/master/images",
					 "https://www.kasandbox.org/programming-images/"],
			sound : [
				"https://raw.githubusercontent.com/Khan/live-editor/master/sounds/"
			]
		};

		var self = this;

		this.setup = function()
		{
			function code(processing)
			{
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
				
				processing.playSound = function(source, volume)
			    {
			        var sound = new Audio();
			        sound.volume = (typeof volume === "number" ? vol : 1);
			        sound.appendChild(source);
			        sound.play(); 
			    };
			    processing.getSound = function(path)
			    {
			    	var source = document.createElement("source");
			        source.src = window.links.sound[0] + path + ".mp3";
			        return source;
			    };

				processing.getImage = function(name)
				{
					return (window.cache || self.cache).loadedImages[name] || processing.get(0, 0, 1, 1);
				};

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
							console.log(e);
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
			
			var matched = code.toString().match("this[ ]*\[[ ]*\[[ ]*(\"KAInfiniteLoopSetTimeout\")[ ]*\][ ]*\][ ]*\([ ]*\d*[ ]*\);*");
			
			if(matched)
			{
				code = new Function("return " + code.toString().replace(matched[0], ""))();
			}

			window.canvas = document.getElementById("canvas"); 
			window.processing = new Processing(canvas, code);
		};

		this.imageProcessing = new Processing(canvas, function(processing)
		{
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

			processing.getImage = function(name, callback, url)
			{
				if(name === undefined) { return get(0, 0, 1, 1); }

				url = url || window.links.image[0] + name.split(".")[0] + ".png";
				callback = callback || function() {};

				if(!processing.imageCache)
				{
					var img = processing.loadImage(url);
					callback(img, name);
					return img;
				}
				if(processing.imageCache[name])
				{
					var img = processing.loadImage(processing.imageCache[name]);
					callback(img, name);
					return img;
				}

				toDataURL(window.links.proxyUrl + url, function(dataUrl)
				{
					processing.imageCache[name] = dataUrl; 
					localStorage.setItem("imageCache", JSON.stringify(processing.imageCache));
					callback(processing.imageCache[name], name);
				});

				return processing.loadImage(processing.imageCache[url] || url);
			};

			window.cache.imageNames.forEach(function(element, index, array)
			{
				processing.getImage(element, function(img, name)
				{
					window.cache.loadedImages[name] = img;

					if(index === array.length - 1)
					{
						(window.setTimeout || function(func)
						{
							return func.apply(this, arguments);
						})
						(function()
						{
							self.setup();
						}, 50);
					}
				});
			});
		});
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

	return {
		createProcessing: window.createProcessing = this.createProcessing = createProcessing,
		toDataURL: window.toDataURL = this.toDataURL = toDataURL,
		combine: window.combine = this.combine = combine,
	};
}( 
	(window || {}), 
	(JSON || { stringify: function() { return "{}"; }, parse: function() { return {}; } }), 
	(localStorage || { getItem: function() { return {} }, setItem: function() {}, removeItem: function() {} })
));
