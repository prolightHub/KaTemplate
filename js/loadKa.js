(function(window, JSON, localStorage)
{
	function createProcessing()
	{
		var args = Array.prototype.slice.call(arguments);
		args.push({ beginCode: "with(processing)\n{", endCode: "}"});
		var any = combine.apply(this, args);

		this.cache = window.cache = {};
		this.cache.loadedImages = window.cache.loadedImages = {};
		this.cache.imageNames = window.cache.imageNames = [
			"avatars/*"
		];

		this.links = window.links = {
			proxyUrl : "https://cors-anywhere.herokuapp.com/",
			image : ["https://www.kasandbox.org/third_party/javascript-khansrc/live-editor/build/images/",
				 	 "https://github.com/Khan/live-editor/tree/master/images",
					 "https://www.kasandbox.org/programming-images/"],
			sound : [
				"https://raw.githubusercontent.com/Khan/live-editor/master/sounds/"
			]
		};

		var self = this;

		this.isIE = function() 
		{
			if(window.navigator)
			{
				var ua = window.navigator.userAgent;
				/* MSIE used to detect old browsers and Trident used to newer ones*/
				var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;

				return is_ie; 
			}

			return false;
		};

		(function()
		{
			try{

				var rg = (/getImage([ ]*)\(([ ]*)\'(.*)\'([ ]*)\)/g);
				var array = [];

				var v;
				var i = 0;

				while(v !== null)
				{
					v = rg.exec(any.toString());
					if(v && v[3] && this.cache.imageNames.indexOf(v[3].split(".")[0]) === -1)
					{
						array.push(v[3].split(".")[0]);
					}

					i++;
					if(i > 2000)
					{
						break;
					}
				}

				this.cache.imageNames = this.cache.imageNames.concat(array);
			}
			catch(e)
			{
				console.log(e);
			}
		}());

		(function()
		{
			try{

				var rg = (/getImage([ ]*)\(([ ]*)\"(.*)\"([ ]*)\)/g);
				var array = [];

				var v;
				var i = 0;

				while(v !== null)
				{
					v = rg.exec(any.toString());
					if(v && v[3] && this.cache.imageNames.indexOf(v[3].split(".")[0]) === -1)
					{
						array.push(v[3].split(".")[0]);
					}

					i++;
					if(i > 2000)
					{
						break;
					}
				}

				this.cache.imageNames = this.cache.imageNames.concat(array);
			}
			catch(e)
			{
				console.log(e);
			}
		}());

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
				
				try{
					processing.soundCache = JSON.parse(localStorage.getItem("pjs-soundCache"));
				}
				catch(e)
				{
					console.log(e);
					delete processing.soundCache;
				}

				if(!processing.soundCache)
				{
					processing.soundCache = {};
				}

				processing.playSound = function(source, volume)
			    {
			        var sound = new Audio();
			        sound.volume = (typeof volume === "number" ? vol : 1);
			        sound.appendChild(source);
			        sound.play().catch(); 
			    };
			    processing.getSound = function(path)
			    {
			    	if(!processing.soundCache)
			    	{
			    		var source = document.createElement("source");
			        	source.src = window.links.sound[0] + path + ".mp3";
			        	return source;
			    	}
			        
		        	if(processing.soundCache[path])
			        {
			        	var source = document.createElement("source");
			        	source.src = processing.soundCache[path];
			        	return source;
			        }else{
			        	source = document.createElement("source");
			        	source.src = window.links.sound[0] + path + ".mp3";

			        	toDataURL(source.src, function(dataUrl)
		        		{
		        			processing.soundCache[path] = dataUrl;
			        		localStorage.setItem("pjs-soundCache", JSON.stringify(processing.soundCache));
		        		});

			        	return source;
			        }
			    };

				processing.getImage = function(name)
				{
					var img = self.cache.loadedImages[name.split(".")[0]];
					if(img)
					{
						return img;
					}

					var url = self.links.image[0] + name.split(".")[0] + ".png";

					if(self.imageProcessing && self.imageProcessing.imageCache)
					{
						return self.imageProcessing.getImage(name);
					}

					processing.get(0, 0, 1, 1);

					return processing.loadImage(url);
				};

				var backupImage = processing.get(0, 0, 2, 2);

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
							if(self.okayToReload)
							{
								if(!self.reTimeout)
								{
									self.reTimeout = true;
									(window.setTimeout || function(func)
									{
										return func.apply(this, arguments);
									})
									(function()
									{
										window.location.reload();
										self.reTimeout = false;
									}, 3000);
								}
							}
						}else{
							throw e;
						}

						return backupImage;
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

			var checkSetup = function()
			{
				if(processing.setup && typeof processing.setup !== "function")
				{
					processing.setup = function () {};
				}
			};
			code = combine(combine(new Function("return " + code.toString().split("\n").join(" "))(), any), checkSetup);
			
			var matched = code.toString().match("this[ ]*\[[ ]*\[[ ]*(\"KAInfiniteLoopSetTimeout\")[ ]*\][ ]*\][ ]*\([ ]*\d*[ ]*\);*");
			
			if(matched)
			{
				code = new Function("return " + code.toString().replace(matched[0], ""))();
			}

			window.canvas = document.getElementById("canvas"); 
			window.processing = new Processing(canvas, code);
		};

		if(this.isIE())
		{
			this.setup();
			return;
		}

		console.log("It works!");

		this.imageProcessing = new Processing(canvas, function(processing)
		{
			with(processing)
			{
				size(400, 400);
				background(0, 0, 0);
			}

			try{
				processing.imageCache = JSON.parse(localStorage.getItem("pjs-imageCache"));
			}
			catch(e)
			{
				console.log(e);
				delete processing.imageCache;
			}

			if(!processing.imageCache)
			{
				self.okayToReload = window.location ? true : false;
				processing.imageCache = {};
			}

			processing.getImage = function(name, callback, url)
			{
				if(name === undefined) { return get(0, 0, 1, 1); }

				url = url || self.links.image[0] + name.split(".")[0] + ".png";
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

				toDataURL(self.links.proxyUrl + url, function(dataUrl)
				{
					processing.imageCache[name] = dataUrl;

					if(!self.colTimeout)
					{
						self.colTimeout = true;
						(window.setTimeout || function(func)
						{
							return func.apply(this, arguments);
						})
						(function()
						{
							localStorage.setItem("pjs-imageCache", JSON.stringify(processing.imageCache));
							self.colTimeout = false;
						}, 200);
					}
					
					callback(processing.imageCache[name], name);
				});

				return processing.loadImage(processing.imageCache[url] || url);
			};

			self.cache.imageNames.forEach(function(element, index, array)
			{
				processing.getImage(element, function(img, name)
				{
					self.cache.loadedImages[name] = img;

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
	(localStorage || { getItem: function() { return "{}"; }, setItem: function() {}, removeItem: function() {} })
));
