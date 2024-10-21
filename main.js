// Part 1: Humble Beginnings
const adventurer = {
    name: "Robin",
    health: 10,
    inventory: ["sword", "potion", "artifact"],
    companion: {
        name: "Leo",
        type: "Cat",
        companion: {
            name: "Frank",
            type: "Flea",
            belongings: ["small hat", "sunglasses"]
        }
    },

    roll(mod = 0) {
        const result = Math.floor(Math.random() * 20) + 1 + mod;
        console.log(`${this.name} rolled a ${result}.`);
        return result;
    }
};

adventurer.inventory.forEach(item => console.log(item));
adventurer.roll();
adventurer.roll(2);


// Part 2: Class Fantasy
class Character {
    constructor(name) {
        this.name = name;
        this.health = 100;
        this.inventory = [];
    }

    roll(mod = 0) {
        const result = Math.floor(Math.random() * 20) + 1 + mod;
        console.log(`${this.name} rolled a ${result}.`);
        return result;
    }
}

const robin = new Character("Robin");
robin.inventory = ["sword", "potion", "artifact"];

const leo = new Character("Leo");
leo.type = "Cat";
leo.companion = new Character("Frank");
leo.companion.type = "Flea";
leo.companion.inventory = ["small hat", "sunglasses"];

leo.roll();
leo.companion.roll();


// Part 3: Class Features
class Adventure extends Character {
    constructor(name, role) {
        super(name);
        this.role = role;
        this.inventory.push('bedroll', '50 gold coins');
    }

    scout() {
        console.log(`${this.name} is scouting ahead...`);
        this.roll();
    }
}

const adventurerRobin = new Adventure('Robin', 'Fighter');
adventurerRobin.scout();


// Part 4: Class Uniforms
class Adventurer extends Character {
    static MAX_HEALTH = 100;
    static ROLES = ["Fighter", "Healer", "Wizard"];

    constructor(name, role) {
        super(name);
        if (!Adventurer.ROLES.includes(role)) {
            throw new Error(`Invalid role: ${role}`);
        }
        this.role = role;
        this.inventory.push("bedroll", "50 gold coins");
        this.health = Adventurer.MAX_HEALTH; // Ensure health is set to max
    }

    scout() {
        console.log(`${this.name} is scouting ahead...`);
        this.roll();
    }
}

// Creating an adventurer with role validation
const robinFighter = new Adventurer("Robin", "Fighter");
robinFighter.scout();


// Part 5: Gather your Party
class AdventurerFactory {
    constructor(role) {
        this.role = role;
        this.adventurers = [];
    }

    generate(name) {
        const newAdventurer = new Adventurer(name, this.role);
        this.adventurers.push(newAdventurer);
    }

    findByIndex(index) {
        return this.adventurers[index];
    }

    findByName(name) {
        return this.adventurers.find(a => a.name === name);
    }
}

const healerFactory = new AdventurerFactory("Healer");
healerFactory.generate("Robin");
healerFactory.generate("Sam");

console.log(healerFactory.findByName("Robin"));


// Part 6: Developing Skills
class DuelAdventurer extends Adventurer {
    duel(opponent) {
        while (this.health > 0 && opponent.health > 0) {
            const myRoll = this.roll();
            const opponentRoll = opponent.roll();

            if (myRoll > opponentRoll) {
                opponent.health -= 10; // Reduce health by a fixed amount for clarity
                console.log(`${this.name} won this round! ${opponent.name} has ${opponent.health} health left.`);
            } else {
                this.health -= 10;
                console.log(`${opponent.name} won this round! ${this.name} has ${this.health} health left.`);
            }
        }

        if (this.health > 0) {
            console.log(`${this.name} wins the duel!`);
        } else {
            console.log(`${opponent.name} wins the duel!`);
        }
    }
}

const fighterRobin = new DuelAdventurer("Robin", "Fighter");
const healerSam = new DuelAdventurer("Sam", "Healer");

fighterRobin.duel(healerSam);
