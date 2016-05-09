var canvas = document.getElementById("canvas");
canvas.width = 512;
canvas.height = 512;
var ctx = canvas.getContext("2d");
var map = map1;
var inventoryOpen = false;
var ready = false;

var inventoryI = new Image();
inventoryI.src = "images/inventory.png";
var dragonI = new Image();
dragonI.src = dragon.base;
var inventoryBoxI = new Image();
inventoryBoxI.src = "images/inventoryBox.png";
var bushI = new Image();
bushI.src = bush.base;
var gluantI = new Image();
gluantI.src = gluant.base;
var gobelinI = new Image();
gobelinI.src = gobelin.base;
var smallPotionI = new Image();
smallPotionI.src = smallPotion.base;
var chestI = new Image();
chestI.src = chest.base;
var stoneI = new Image();
stoneI.src = stone.base;
var treeI = new Image();
treeI.src = tree.base;
var grassI = new Image();
grassI.src = grass.base;
var waterGrassI1 = new Image();
waterGrassI1.src = "images/waterGrass1.png";
var waterI = new Image();
waterI.src = water.base;
waterI.onload = function() {
	ready = true;
	var player = new Player(hero);
	renderPlayer(player);
	renderMap(map, player);
	renderGUI(player);

	document.addEventListener('keydown', function(e) {
		moving(e, player, map);
	}, true);

	canvas.addEventListener('click', function(e) {

		if(inventoryOpen) {
	    	var x = Math.round((e.pageX-16)/ 32)-4; 
	        var y = Math.round((e.pageY-16)/ 32)-4;
	        console.log(x + " " + y);
	        useInventoryItem(player, x, y, map);
	    }

	}, true);
};