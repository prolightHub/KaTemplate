function main()
{
	var sounds = {
	    boom : getSound("retro/boom1")
	};

	mousePressed = function()
	{
		playSound(sounds.boom);
	};
	
	image(getImage("cute/RoofWest"), 3, 3);
}

createProcessing(main);