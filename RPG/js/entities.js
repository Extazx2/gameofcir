var hero = {
	name: "HÃ©ro",
	level: 1,
	xp: 0,
	gold: 20,
	hpMax: 50,
	hp: 50,
	manaMax: 0,
	mana: 0,
	attack: 3,
	weapon: null,
	power: 0,
	defence: 0,
	speed: 32,
	inventory: [],
	x: 32,
	y: 0,
	base: "images/hero_down.png",
	up: "images/hero_up.png",
	down: "images/hero_down.png",
	left: "images/hero_left.png",
	right: "images/hero_right.png",
	message: "Battez-vous !"
};

function Player(entity) {
	this.name = entity.name;
	this.level = entity.level;
	this.hpMax = entity.hpMax;
	this.hp = this.hpMax;
	this.manaMax = entity.manaMax;
	this.mana = entity.mana;
	this.Weapon = entity.weapon;
	this.attack = entity.attack;
	this.power = entity.power;
	this.defence = entity.defence;
	this.speed = entity.speed;
	this.x = entity.x;
	this.y = entity.y;

	this.xp = entity.xp;
	this.gold = entity.gold;
	this.inventory = entity.inventory;

	this.base = entity.base;
	this.up = entity.up;
	this.down = entity.down;
	this.left = entity.left;
	this.right = entity.right;

	this.image = new Image();
	this.image.src = this.base;

	this.message = entity.message;
};

var gobelin = {
	name: "Gobelin",
	hpMax: 10,
	attack: 2,
	defence: 4,
	xp: 20,
	gold: 8, 
	base: "images/gobelin.png"
};

var gluant = {
	name: "Gluant",
	hpMax: 20,
	attack: 3,
	defence: 2,
	xp: 70,
	gold: 11,
	base: "images/gluant.png"
};

var dragon = {
	name: "Dragon",
	hpMax: 156,
	attack: 7,
	defence: 0,
	xp: 290,
	gold: 74,
	base: "images/dragon.png"
};

function Ennemy(entity) {
	this.name = entity.name;
	this.hpMax = entity.hpMax;
	this.hp = entity.hpMax;
	this.attack = entity.attack;
	this.defence = entity.defence;
	this.xp = entity.xp;
	this.gold = entity.gold;
	this.base = entity.base;

	this.image = new Image();
	this.image.src = this.base;
};

function Chest(entity) {
	this.name = entity.name;
	this.base = entity.base;
	this.drop = entity.drop;

	this.image = new Image();
	this.image.src = this.base;
};





var keyblade = {
	name: "keyblade",
	attack: 7,
	defence: 0,
	base: "images/keyblade.png"
};

var ironAxe = {
	name: "Hache en fer",
	attack: 5,
	defence: 2,
	base: "images/ironAxe.png"
};

var ironSword = {
	name: "Ã‰pÃ©e en fer",
	attack: 9,
	defence: 3,
	base: "images/ironSword.png"
};

function Weapon(entity) {
	this.name = entity.name;
	this.attack = entity.attack;
	this.defence = entity.defence;

	this.image = new Image();
	this.image.src = entity.base;  
};

var smallPotion = {
	name: "Petite potion de Vie",
	health: 20,
	base: "images/smallPotion.png"
};

function Potion(entity) {
	this.name = entity.name;
	this.health = entity.health;
	this.base = entity.base;
	this.image = new Image();
	this.image.src = entity.base;
};

// Define the tiles of ground


var chest = {
	name: "Coffre",
	base: "images/chest.png",
	drop: [keyblade, ironAxe, ironSword]
};

var bush = {
	name: "Bush",
	base: "images/bush.png"
};

var tree = {
	name: "Tree",
	base: "images/tree.png"
};

var water = {
	name: "Water",
	base: "images/water.png"
};

var grass = {
	name: "Grass",
	base: "images/grass.png"
};

var stone = {
	name: "Stone",
	base: "images/stone.png"
};