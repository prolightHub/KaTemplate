
function createProcessing()
{
	var args = Array.prototype.slice.call(arguments);
	args.push({ beginCode: "with(processing)\n{", endCode: "}"});
	var any = combine.apply(this, args);

	//Onelined to make actual console line output
	function code(processing){processing.size(400, 400);processing.background(0, 0, 0);processing.angleMode = "degrees";processing.debug = console.log;processing.Program = {restart : function(){window.location.reload();},assertEqual : function(equiv){if(!equiv){console.warn(equiv);}},};with(processing){}}

	code = combine(code, any);

	var canvas = document.getElementById("canvas"); 
	var processing = new Processing(canvas, code);
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

	return Object.constructor("return function any(" + funcArgs + "){" + (config.beginCode || "").replace("\n", "") + join + (config.endCode || "") + "}")();
}