function moving (e, player, map) {

	if(player.hp > 0){
		if (e.keyCode == 38) { // Player holding up
			inventoryOpen = false;
			player.base = player.up;
			if(player.y > 0) {
				if(colision(player, map, -1, 0, e, 38)) {
					clearCanvas();
					player.y -= player.speed;
					updateMap(map, player);
					renderPlayer(player);
					renderGUI(player);
				}
			}
		}
		if (e.keyCode == 40) { // Player holding down
			inventoryOpen = false;
			player.base = player.down;
			if(player.y < canvas.height-32) {
				if(colision(player, map, 1, 0, e, 40)) {
					clearCanvas();
					player.y += player.speed;
					updateMap(map, player);
					renderPlayer(player);
					renderGUI(player);
				}
			}
		}
		if (e.keyCode == 37) { // Player holding left
			inventoryOpen = false;
			player.base = player.left;
			if(player.x > 0) {
				if(colision(player, map, 0, -1, e, 37)) {
					clearCanvas();
					player.x -= player.speed;
					updateMap(map, player);
					renderPlayer(player);
					renderGUI(player);
				}
			}
		}
		if (e.keyCode == 39) { // Player holding right
			inventoryOpen = false;
			player.base = player.right;
			if(player.x < canvas.width-32) {
				if(colision(player, map, 0, 1, e, 39)) {
					clearCanvas();
					player.x += player.speed;
					updateMap(map, player);
					renderPlayer(player);
					renderGUI(player);
				}
			}
		}



		if (e.keyCode == 73) { // Player holding i
			if(inventoryOpen == true) {
				inventoryOpen = false;
				clearCanvas();
				updateMap(map, player);
				renderPlayer(player);
				renderGUI(player);
			} else {
				inventoryOpen = true;
				renderInventory(player);
			}
		}

		if (e.keyCode == 27) { // Player holding escape
			inventoryOpen = false;
			clearCanvas();
			updateMap(map, player);
			renderPlayer(player);
			renderGUI(player);
		}

	} else if (player.hp <= 0) {
		if (e.keyCode == 27) {
			document.location.reload(true);
		}
	}
};

function clearCanvas() {
	canvas.width = canvas.width;
};	

function colision(player, map, dirY, dirX, e, keyCode) {
	var colision = false;
	var i = player.y/player.speed+dirY;
	var j = player.x/player.speed+dirX;

	if(map[i][j] == 0){
		colision = true;

	} else if(map[i][j] == 8){
		colision = true;

	}  else if(map[i][j] == 9){
		colision = true;
		spawnPotion(map);
		respawnMonster(map);

	} else if (map[i][j] instanceof Ennemy){
		colision = false;
		if(e.keyCode == keyCode){
			fight(player, map[i][j] , map, i, j);
		}

	} else if (map[i][j] instanceof Chest){
		colision = false;
		if(e.keyCode == keyCode){
			openChest(player, map[i][j] , map, i, j);
		}


	} else if (map[i][j] instanceof Potion){
		colision = true;
		if(e.keyCode == keyCode){
			usePotion(player, map[i][j] , map, i, j);
			map[i][j] = "0";
		}

	} else {
		colision = false;
	}

	return colision;
};

function fight(player, monster, map, i, j) {
	if(player.weapon != null) {
		monster.hp -= Math.round(player.attack + player.weapon.attack - (monster.defence/2));
	} else {
		monster.hp -= Math.round(player.attack - (monster.defence/2));
	}
	if (monster.hp <= 0) {
		playerLevelUp(player, monster);
		monsterDeath(monster, player, i, j, map);
	} else {
		if(player.weapon != null) {
			player.hp -= Math.round(monster.attack - (player.defence + player.weapon.defence)/2);
			player.message = "Vous infligez " + Math.round(player.attack + player.weapon.attack - (monster.defence/2)) + ", vous avez subi " + Math.round(monster.attack - (player.defence + player.weapon.defence)/2);
		} else {
			player.hp -= Math.round(monster.attack - (player.defence/2));
			player.message = "Vous infligez " + Math.round(player.attack - (monster.defence/2)) + ", vous avez subi " + Math.round(monster.attack - (player.defence/2));
			renderGUI(player);
		}
	}

	if (player.hp <= 0) {
		playerDeath(monster, player, i, j, map);
	}

	updateMap(map, player);		
	renderPlayer(player);
};

function openChest(player, monster, map, i, j) {
	var rnd = Math.round(Math.random() * (map[i][j].drop.length - 1));
	player.inventory.push(new Weapon(map[i][j].drop[rnd]));
	player.message = "Vous avez ouvert un coffre, vous avez obtenu " + map[i][j].drop[rnd].name;
	map[i][j] = "0";
	updateMap(map, player);
	renderPlayer(player);
	renderGUI(player);

};

function monsterDeath(monster, player, i, j, map){
	player.gold += monster.gold;
	map[i][j] = "0";
	spawnPotion(map);
	respawnMonster(map);
	player.message = "Vous avez tuÃ© un " + monster.name;
	renderGUI(player);
};

function playerDeath(monster, player, i, j, map){
	if(player.hp < 0) {
		player.hp = 0;
	}
	player.message = "Vous Ã¨tes mort, rÃ©essayez encore";
	renderGUI(player);
};

function playerLevelUp(player, monster) {
	player.xp += monster.xp;

	if(player.xp >= (15 * player.level * Math.round(Math.sqrt(15 * player.level + 1) * Math.exp(2.7))/10)) {
		player.xp -= (15 * player.level * Math.round(Math.sqrt(15 * player.level + 1) * Math.exp(2.7)/10));
		player.level ++;
		player.hpMax += 10;
		player.hp = player.hpMax;
		player.attack += 3.5;
		player.defence += 1.5;
	}
	player.message = "Vous Ãªtes montÃ© niveau " + player.level + " !";
	renderGUI(player);
};

function respawnMonster(map) {
	var x = 0;
	var y = 0;

	for (i = 0; i < map.length; i++) {
		for (j = 0; j < map[i].length; j++) {
		var rnd = Math.round(Math.random() * (620 - 1) + 1);
			if (map[i][j] == 0) {
				if(rnd == 1) {
					map[i][j] = new Ennemy(gobelin);
				} else if(rnd == 2) {
					map[i][j] = new Ennemy(gluant);
				} else if(rnd == 3) {
					map[i][j] = new Ennemy(dragon);
				}
			}
		}
	}
};


function usePotion(player, potion, map, i, j) {
	if(!addItemToInventory(player, potion)){
		player.hp += potion.health;
		if(player.hp > player.hpMax) {
			player.hp = player.hpMax;
		}
		respawnMonster(map);
		player.message = "Vous avez utilisÃ© une " + potion.name + ", vous avez regagnÃ© " + potion.health + " hp.";
	}
	console.log(player.inventory);
	renderGUI(player);

};

function spawnPotion(map) {
	var x = 0;
	var y = 0;

	for (i = 0; i < map.length; i++) {
		for (j = 0; j < map[i].length; j++) {
		var rnd = Math.round(Math.random() * (800 - 1) + 1);
			if (map[i][j] == 0) {
				if(rnd == 1) {
					map[i][j] = new Potion(smallPotion);
				}
			}
		}
	}
};

function addItemToInventory(player, item) {
	if(player.inventory.length < 32) {
		player.inventory.push(item)
		return true;
	} else {
		player.message = "Inventaire plein";
		renderGUI(player);
		return false;
	}
};

function useInventoryItem(player, x, y, map) {
	var i = (8)*y +x;
	if (player.inventory[i] instanceof Potion) {
		if(!(player.hp == player.hpMax)) {
			player.hp += player.inventory[i].health;
			if(player.hp > player.hpMax) {
				player.hp = player.hpMax;
			}
			player.inventory.splice(i, 1);
		}
		renderGUI(player);
		updateMap(map, player);
		renderInventory(player);
	} 
	else if (player.inventory[i] instanceof Weapon) {
		if(player.weapon != null) {
			player.inventory.push(player.weapon);
			player.weapon = player.inventory[i];
			player.inventory.splice(i, 1);
			renderInventory(player);
			renderGUI(player);
		} else {
			player.weapon = player.inventory[i];
			player.inventory.splice(i, 1);
			renderInventory(player);
			renderGUI(player);
		}
	} else if (x == -2 && y == 0) {
		player.inventory.push(player.weapon);
		player.weapon = null;
		renderInventory(player);
		renderGUI(player);
	}

};