function renderImage(player, loaded) { // fonction qui permet de prÃƒÂ©parer l'image d'une entitÃƒÂ©.
	var image = new Image();
	image.src = player.base;
	image.onload = function() {
		ready = true;
		loaded(image);
	};
	return image;
};


function renderMap(map, player) {
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "10px Verdana";
	ctx.textAlign = "left";
	ctx.textBaseline = "bottom";

	if(ready){
		var x = 0;
		var y = 0;

		for (i = 0; i < map.length; i++) {
			for (j = 0; j < map[i].length; j++) {

				if (map[i][j] == 0) {
					ctx.drawImage(grassI, x, y, 32, 32);
				}

				if (map[i][j] == 1) {
					ctx.drawImage(grassI, x, y, 32, 32);
					ctx.drawImage(treeI, x, y, 32, 32);
				}

				if (map[i][j] == 2) {
					map[i][j] = new Chest(chest);
					ctx.drawImage(grassI, x, y, 32, 32);
					ctx.drawImage(chestI, x, y, 32, 32);

				}

				if (map[i][j] == 3) {
					ctx.drawImage(waterI, x, y, 32, 32);
				}

				if (map[i][j] == 4) {
					map[i][j] = new Ennemy(gobelin);
					ctx.drawImage(grassI, x, y, 32, 32);
					ctx.drawImage(gobelinI, x, y, 32, 32);
					ctx.fillText(map[i][j].hp + "/" + map[i][j].hpMax, x, y);
				}

				if (map[i][j] == 5) {
					map[i][j] = new Ennemy(gluant);
					ctx.drawImage(grassI, x, y, 32, 32);
					ctx.drawImage(gluantI, x, y, 32, 32);
					ctx.fillText(map[i][j].hp + "/" + map[i][j].hpMax, x, y);
				}

				if (map[i][j] == 6) {
					map[i][j] = new Ennemy(dragon);
					ctx.drawImage(grassI, x, y, 32, 32);
					ctx.drawImage(dragonI, x, y, 32, 32);
					ctx.fillText(map[i][j].hp + "/" + map[i][j].hpMax, x, y);
				}

				if (map[i][j] == 7) {
					map[i][j] = new Potion(smallPotion);
					ctx.drawImage(grassI, x, y, 32, 32);
					ctx.drawImage(smallPotionI, x, y, 32, 32);
				}

				if (map[i][j] == 8) {
					ctx.drawImage(grassI, x, y, 32, 32);
					ctx.drawImage(bushI, x, y, 32, 32);
				}

				if (map[i][j] == 9) {
					ctx.drawImage(stoneI, x, y, 32, 32);
				}

				if (map[i][j] == 10) {
					ctx.drawImage(waterGrassI1, x, y, 32, 32);
				}
				x += 32;
			}
			x = 0;
			y += 32;
		}
	}
	ctx.textAlign = "center";
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "16px Verdana";
	ctx.fillText(player.message, 256, 24);
};


function updateMap(map, player) {
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "10px Verdana";
	ctx.textAlign = "left";
	ctx.textBaseline = "bottom";
	var x = 0;
	var y = 0;

	for (i = 0; i < map.length; i++) {
		for (j = 0; j < map[i].length; j++) {

			if (map[i][j] == 0) {
				ctx.drawImage(grassI, x, y, 32, 32);
			}

			if (map[i][j] == 1) {
				ctx.drawImage(grassI, x, y, 32, 32);
				ctx.drawImage(treeI, x, y, 32, 32);
			}

			if (map[i][j] == 2) {
				ctx.drawImage(grassI, x, y, 32, 32);
				ctx.drawImage(chestI, x, y, 32, 32);
			}

			if (map[i][j] == 3) {
				ctx.drawImage(waterI, x, y, 32, 32);
			}

			if (map[i][j] == 8) {
				ctx.drawImage(grassI, x, y, 32, 32);
				ctx.drawImage(bushI, x, y, 32, 32);
			}

			if (map[i][j] == 9) {
				ctx.drawImage(stoneI, x, y, 32, 32);
			}

			if (map[i][j] == 10) {
				ctx.drawImage(waterGrassI1, x, y, 32, 32);
			}

			if (map[i][j] instanceof Ennemy) {
				ctx.drawImage(grassI, x, y, 32, 32);
				ctx.drawImage(map[i][j].image, x, y, 32, 32);
				ctx.fillText(map[i][j].hp + "/" + map[i][j].hpMax, x, y);
			}

			if (map[i][j] instanceof Chest) {
				ctx.drawImage(grassI, x, y, 32, 32);
				ctx.drawImage(map[i][j].image, x, y, 32, 32);
			}

			if (map[i][j] instanceof Potion) {
				ctx.drawImage(grassI, x, y, 32, 32);
				ctx.drawImage(map[i][j].image, x, y, 32, 32);
			}
			x += 32;
		}
		x = 0;
		y += 32;
	}
	ctx.textAlign = "center";
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "16px Verdana";
	ctx.fillText(player.message, 256, 24);
};

function renderPlayer(player) {
	var x = player.x;
	var y = player.y;

	renderImage(player, function(image) {
		ctx.drawImage(image, x, y, 32, 32);
		ctx.fillStyle = "rgb(0, 250, 250)";
		ctx.font = "10px Verdana";
		ctx.textAlign = "left";
		ctx.textBaseline = "bottom";
		ctx.fillText(player.hp + "/" + player.hpMax, x, y);
	});
};

function renderGUI(player) {

	var name = document.getElementById("name");
	var hp = document.getElementById("hp");
	var attack = document.getElementById("attack");
	var weapon = document.getElementById("weapon");
	var defence = document.getElementById("defence");
	var level = document.getElementById("level");
	var xp = document.getElementById("xp");
	var gold = document.getElementById("gold");

	name.innerHTML = "Nom : " + player.name;
	hp.innerHTML = "Hp : " + player.hp + "/" + player.hpMax;
	if(player.weapon != null) {
		attack.innerHTML = "Attaque : " + player.attack + " (+" + player.weapon.attack + ")";
		defence.innerHTML = "DÃ©fense : " + player.defence + " (+" + player.weapon.defence + ")";
		weapon.innerHTML = "Arme Ã©quipÃ©e : " + player.weapon.name;
	} else {
		attack.innerHTML = "Attaque : " + player.attack;
		defence.innerHTML = "DÃ©fense : " + player.defence;
		weapon.innerHTML = "Arme Ã©quipÃ©e : Aucune";
	}
	level.innerHTML = "Level : " + player.level;
	xp.innerHTML = "Xp : " + player.xp + "/" + (15 * player.level * Math.round(Math.sqrt(15 * player.level + 1) * Math.exp(2.7))/10);
	gold.innerHTML = "Gold : " + player.gold;
};


function renderItem(item, loaded) { // fonction qui permet de prÃƒÂ©parer l'image d'une entitÃƒÂ©.
	var image = new Image();
	image.src = item.base;
	image.onload = function() {
		ready = true;
		loaded(image);
	};
	return image;
};



function renderInventory(player) {

	ctx.drawImage(inventoryI, 0, 0, 512, 512);
	if(player.weapon != null) {
		ctx.drawImage(player.weapon.image, 64, 128, 32, 32);
	} 
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "18px Verdana";
	ctx.textAlign = "center";
	ctx.textBaseline = "bottom";
	ctx.fillText("Inventaire", 256, 112);
	var x = 64;
	var y = 128;

	ctx.drawImage(inventoryBoxI, x, y, 32, 32);

	x = 128;

	for(i = 0; i < 32; i++) {
		ctx.drawImage(inventoryBoxI, x, y, 32, 32);
		x += 32;
		if(x >= 384){
			x = 128;
			y += 32;
		}
	}

	x = 128;
	y = 128;

	for(j = 0; j < player.inventory.length; j++) {
		ctx.drawImage(player.inventory[j].image, x, y, 32, 32);
		x += 32;
		if(x >= 384){
			x = 128;
			y += 32;
		}
	}

};