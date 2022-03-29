Hooks.on("chatMessage", (html, content, msg) => {
  let regExp;
  regExp = /(\S+)/g;
  let commands = content.match(regExp);
  let command = commands[0];
//-1 Random "Abyssal","Animal","Beast","Humanoid","Mutant","Supernatural"
  if (game.user.can('ACTOR_CREATE')) {
  if(command === "/creaturegen") {
	console.log(commands);
    if(commands.length === 1) {
    	let message;
      msg.content = "<p>What kind of trasure do you want to generate?</p>";
      msg.content += "<div><a class='trasuregenerator-type' data-treasure-type=-1><b>&gt; Random</b></a></div>";
      msg.content += "<div><a class='trasuregenerator-type' data-treasure-type=1><b>&gt; Abyssal</b></a></div>";
      msg.content += "<div><a class='trasuregenerator-type' data-treasure-type=2><b>&gt; Beast</b></a></div>";
      msg.content += "<div><a class='trasuregenerator-type' data-treasure-type=3><b>&gt; Humanoid</b></a></div>";
      msg.content += "<div><a class='trasuregenerator-type' data-treasure-type=4><b>&gt; Mutant</b></a></div>";
      msg.content += "<div><a class='trasuregenerator-type' data-treasure-type=5><b>&gt; Supernatural</b></a></div>";
	  msg.content += "<p>Click above or use the command as <i>/treasuregen [type] [name]</i></p>";
	    if(msg) {
	      ChatMessage.create(msg);
	    }
		}
		else {
			switch(commands[1].toLowerCase()) {
				case 'random': commands[1]=-1;break;
				case 'abyssal': commands[1]=1;break;
				case 'beast': commands[1]=2;break;
				case 'humanoid': commands[1]=3;break;
				case 'mutant': commands[1]=4;break;
				case 'supernatural': commands[1]=5;break;
				default: commands[1]=-1;
			}
			zweihanderCreatureGenerator(commands[1], commands[2]);
		}
		return false;
  }
  } else {
		notifications().info("No permisions to create items")
  }
});

Hooks.on('renderChatLog', (log, html, data) => {
  html.on("click", '.trasuregenerator-type', event => {
    event.preventDefault();
	//console.log(event.currentTarget);
    zweihanderCreatureGenerator($(event.currentTarget).attr("data-treasure-type"));
  });
});

function addItemActionButton(html, label, onClick) {
    const button = document.createElement('button');
    button.style.width = '95%';
    button.innerHTML = label;
    button.addEventListener('click', () => {
        onClick();
    });
    html.find('.header-actions').after(button);
}

Hooks.on("renderSidebarTab", async (app, html) => {
     if (app.options.id == "actors" && game.user.can('ACTOR_CREATE') )
    {
		if (game.user.can('ACTOR_CREATE')) {
			addItemActionButton(html, 'Generate Random Creature', () => {
				zweihanderCreatureGenerator(-1);
		    });
		}
	}
});

function zweihanderCreatureGenerator (SpeciesPick) {

function roll1d10(){
"use strict";
 return Math.floor(Math.random() * 10) + 1;
}
function roll2d10(){
"use strict";
 return Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + 2;
}
function rollXd10(x){
"use strict";
    var j;
    var roll= 0;
    for (j = 0; j < x; j += 1) {
        roll += roll1d10();
    }
    return roll;
}
function roll1d100(){
"use strict";
 return Math.floor(Math.random() * 100) + 1;
}

function generateNPC(SpeciesChoice) {
"use strict";
var i;

var SpeciesTxt ="";
var SpeciesN;
var SpeciesAll = ["Abyssal","Animal","Beast","Humanoid","Mutant","Supernatural"];

/*Chance to use simple or martial weapons*/
var WeaponChance = [0.5, 0.1, 0.1, 0.8, 0.6, 0.5];
/*Chance of having Natural attack with the weapon*/
var WeaponBothChance = [0.9, 0.9, 0.9, 0.2, 0.6, 0.5];
/*Chance to be a magic user*/
var MageChance   = [0.2, 0.1, 0.3, 0.1, 0.2, 0.3];
var Mage = 0;
var WeaponUser = 0;

var SizeN;
var SizeAll = ["Small","Normal","Large","Huge"];
var SizeName = "";

var RiskN;
var RiskAll = ["Basic","Intermediate","Advanced","Elite"];
var RiskName = "";

var NotchN;
var NotchAll = ["(Low)","(Medium)","(High)","(Unique)"];
var NotchName = "";


var StatsTxt = "";
var StatsName =   ["C","B","A","P","I","W","F"];
var StatsBonusName =   ["CB","BB","AB","PB","IB","WB","FB"];
var Stats =      [0, 0, 0, 0, 0, 0, 0];
var StatsBonus =  [0, 0, 0, 0, 0, 0, 0];
var StatsBonusAdvance = [0, 0, 0, 0, 0, 0, 0];
var StatsBonusTrait =  [0, 0, 0, 0, 0, 0, 0];
var StatsMost =   [50,45,45,40,40,40,35];
var StatsElite =  [55,50,50,50,50,50,50];
var StatsAll = [StatsMost,StatsMost,StatsMost,StatsElite];

var StatsBonusByRisk = [[2,3,4,4],[6,7,8,8],[10,11,12,12],[10,11,12,12]];
var StatBonusMax = [2,4,6,6];

var SecondaryName = ["Int","Mov","DTh","PTh","Par","Dod","RFa"];
var Secondary  = [3, 3, 0, 3, 0, 0, 0];
var SecondaryBonusTrait  = [0, 0, 0, 0, 0, 0, 0];
var ArmorBonus = 0;

var Trappings = [];
var TrappingTxt = "";

var TraitsByRisk = [[2,3,4,4],[6,7,8,8],[10,11,12,12],[10,11,12,12]];
var TraitsBasic = [
"Accursed","Ambush Tactics","Autotomy","Aversion to Light","Battle Frenzy","Blitz",
["Bloodless","Hangin' Tough"],"Bloodlust","Bog Stench","Chomp","Chthonian Dweller","Creepy Crawlies",
["Dark Sense","Fey Sight"],"Dense Anatomy","Dionysian Delights","Disease-ridden","Faces of Death","Fast on Their Feet", 
["Feckless Runt","Herp Derp","Mindless","Sniveling Whelp","Steely Fortitude"],
["Feel the Heat","Flammable"],"Fetid Weaponry", 
["Hatred (Humans)","Hatred (Dwarves)","Hatred (Elves)","Hatred (Gnomes)","Hatred (Ogres)"],
"Foul Mutation","Lick Your Wounds","Menacing",
["Natural Armor (1)","Natural Armor (3)","Natural Armor (5)","Scar the Flesh"],
"One-two Punch","Pack Mentality",
["Paw/hoof/wing","Paw/hoof/wing","Paw/hoof/wing#Broken Wings"],
"Perfect Camouflage",
["Petrifying Gaze","Petrifying Gaze#Eyes Wide Shut"],
"Poison Resistance",
["Reanimator#Skeletal Remains","Reanimator#Skeletal Remains","Reanimator#Soul Jar"],
"Ringen","Ripping Teeth",
"Salt of the Earth","Sanity-blasting","Silent Stalker",
"Spore-splosion","Squabble Among Themselves","Swallow Whole","Unbridled Rage","Unnatural Viscera","Unruly",
"Wanton Hunger",
["Weak Spot (Head)","Weak Spot (Body)","Weak Spot (Legs)"]];

var TraitsBasicWeaponUser = ["Point Blanck","Murderous Attacks","Saddle Tactics","Shootfighting","Shotgun Bang!"];
var TraitsBasicMage = ["Winds of Chaos"];

var TraitsIntermediate = [
"Accursed",["Acidic Spittle","Gastric Acidity","Acidic Spittle#Gastric Acidity"],
["Aethereal Form","Aethereal Form#Bonds of Death","Aethereal Form#Bonds of Death"],"Ambush Tactics",
"Arcana of Horror","Autotomy","Aversion to Light","Bane of Lycanthropes","Battle Frenzy",
"Blitz",
["Bloodless","Hangin' Tough"],"Bloodlust","Bog Stench","Broken Gut-plate",
["Brute Strength","Brute Strength#Hideous Might","Masterfully Adroit","Masterfully Adroit"],"Brush With Death",
"Call of the Abyss","Captivating Cry","Chomp","Champion's Call",
"Chthonian Dweller","Corrosive Bile",["Crippling Constrictor","Inescapable","Inescapable#Crippling Constrictor"],"Death Roll","Demonic Frenzy",
["Dark Sense","Fey Sight"],"Dionysian Delights","Disease-ridden","Divide & Conquer", "Fast on Their Feet", 
["Feel the Heat","Fireproof","Flammable","Dense Anatomy","Dense Anatomy#Flammable"],"Fetid Weaponry", 
["Hatred (Humans)","Hatred (Dwarves)","Hatred (Elves)","Hatred (Gnomes)","Hatred (Ogres)"],
"Foul Mutation","Grossly Paranoid","Hard-nosed",
"Impish Delights","Implacable Defense","Lick Your Wounds","Menacing",
["Mindless","Steely Fortitude"],
["Natural Armor (2)","Natural Armor (4)","Natural Armor (6)","Scar the Flesh"],
"One-two Punch","Pack Mentality",["Paw/hoof/wing","Paw/hoof/wing","Paw/hoof/wing#Broken Wings"],"Perfect Camouflage",
["Petrifying Gaze","Petrifying Gaze#Eyes Wide Shut"],
"Poison Resistance",
["Reanimator#I Thee Wed","Reanimator#Kill It With Fire","Reanimator#Kill It With Fire","Reanimator#Soul Jar","Reanimator#Witchboard"],
"Ringen","Ripping Teeth",
"Salt of the Earth","Sanity-blasting","Silent Stalker",
"Unruly",
["Weak Spot (Head)","Weak Spot (Body)","Weak Spot (Legs)"]
];
var TraitIntermediateMage = ["Winds of Chaos","Living Chaos"];

var TraitsIntermediateWeaponUser = ["Big Grim","Both-handedness","Snikt!Snikt!","Greanadier","Gift of Devils","I Got Axe for You","Murderous Attacks","Point Blanck","Saddle Tactics","Serpentine Cloak","Sharp-sighted","Shootfighting","Smoke Bomb",["Blam!Blam!","Blam!Blam!#Shotgun Bang!","Shotgun Bang!","Fwip!Fwip!","Fwip!Fwip!"],"Wytch-science"];

var TraitsAdvanced = [
"Accursed",["Acidic Spittle","Gastric Acidity","Acidic Spittle#Gastric Acidity"],["Aethereal Form","Aethereal Form#Bonds of Death","Aethereal Form#Bonds of Death"],
"Ambush Tactics","Arcana of Horror","Autotomy","Aversion to Light","Battle Frenzy",
"Blitz",
["Bloodless","Hangin' Tough"],"Bloodlust",
["Brute Strength","Brute Strength#Hideous Might","Masterfully Adroit","Masterfully Adroit"],
"Brush With Death","Call of the Abyss","Cancerous Absorption","Chomp","Champion's Call",
"Chthonian Dweller","Cold Hands","Corrosive Bile",
["Corruptive Breath#Fiery Retribution#Spit Fire","Corruptive Breath#Fiery Retribution#Spit Fire","Fiery Retribution#Spit Fire","Corruptive Breath#Spit Fire","Spit Fire"],
["Crippling Constrictor","Flailing Tentacles#Crippling Constrictor","Flailing Tentacles#Crippling Constrictor#Inescapable","Inescapable","Crippling Constrictor#Inescapable","Swallow Whole","Inescapable#Swallow Whole"],
"Death Roll","Demonic Frenzy",
["Dark Sense","Fey Sight"],"Dionysian Delights","Disease-ridden","Divide & Conquer", ["Fast on Their Feet","Lumbering Brute"], 
["Feel the Heat","Fireproof","Feel the Heat#Fireproof","Flammable","Dense Anatomy","Dense Anatomy#Flammable"],
"Fetid Weaponry", 
["Hatred (Humans)","Hatred (Dwarves)","Hatred (Elves)","Hatred (Gnomes)","Hatred (Ogres)"],
"Foul Mutation","Grossly Paranoid","Hard-nosed",
"Impish Delights","Implacable Defense","Lick Your Wounds",["Menacing","Monstruous Bellow","Primal Scream"],
["Mindless","Steely Fortitude","Feckless Runt"],
["Natural Armor (2)","Natural Armor (4)","Natural Armor (6)","Scar the Flesh"],
"One-two Punch","Pack Mentality",["Paw/hoof/wing","Paw/hoof/wing","Paw/hoof/wing#Broken Wings","Paw/hoof/wing#Broken Wings#Strafing Talons"],"Perfect Camouflage",
["Petrifying Gaze","Petrifying Gaze#Eyes Wide Shut","Transfixed Gaze","Transfixed Gaze#Entrancing"],
["Poison Resistance","Poison Resistance","Poison Resistance#Poisonous Bite","Poison Resistance#Poisonous Bite","Poisonous Bite"],
["Reanimator#Ashes to Ashes","Reanimator#Come Into the Light","Reanimator#Weakness to Brass","Reanimator#Kill It With Fire","Reanimator#Soul Jar","Reanimator#Golden Death","Vampire's Curse","Vampire's Curse","Vampire's Curse"],
"Ringen","Ripping Teeth",
"Salt of the Earth","Sanity-blasting","Silent Stalker",
"Unruly","Wall Crawler","Wanton Hunger","Wind Kick",
["Weak Spot (Head)","Weak Spot (Body)","Weak Spot (Legs)"]
];

var TraitsAdvancedMage = ["Aetheric Domination","Ceremonial Runes","Winds of Chaos","Living Chaos","The Changer of Ways"];
var TraitsAdvancedWeaponUser = ["Big Grim","Serpentine Cloak","Both-handedness","Gift of Devils","I Got Axe for You","Murderous Attacks","Saddle Tactics","Snikt!Snikt!","Shootfighting","Shotgun Bang!","Smoke Bomb","Sweeping Strike",["Blam!Blam!","Blam!Blam!#Shotgun Bang!","Shotgun Bang!","Point Blanck","Fwip!Fwip!","Fwip!Fwip!"],"Wytch-science"];



var TraitsElite = [
"Accursed",["Acidic Spittle","Gastric Acidity","Acidic Spittle#Gastric Acidity"],["Aethereal Form","Aethereal Form#Bonds of Death","Aethereal Form#Bonds of Death"],
"Ambush Tactics","Arcana of Horror","Autotomy","Aversion to Light","Battle Frenzy",
"Blitz",
["Bloodless","Hangin' Tough"],"Bloodlust",
["Brute Strength","Brute Strength#Hideous Might","Masterfully Adroit","Masterfully Adroit"],
"Brush With Death","Call of the Abyss","Cancerous Absorption","Chomp","Champion's Call",
"Chthonian Dweller","Cold Hands","Corrosive Bile",
["Corruptive Breath#Fiery Retribution#Spit Fire","Corruptive Breath#Fiery Retribution#Spit Fire","Fiery Retribution#Spit Fire","Corruptive Breath#Spit Fire","Spit Fire"],
["Crippling Constrictor","Flailing Tentacles#Crippling Constrictor","Flailing Tentacles#Crippling Constrictor#Inescapable","Inescapable","Crippling Constrictor#Inescapable","Swallow Whole","Inescapable#Swallow Whole"],
"Death Roll","Demonic Frenzy",
["Dark Sense","Fey Sight"],"Dionysian Delights","Disease-ridden","Divide & Conquer", ["Fast on Their Feet","Lumbering Brute"], 
["Feel the Heat","Fireproof","Feel the Heat#Fireproof","Flammable","Dense Anatomy","Dense Anatomy#Flammable"],
"Fetid Weaponry", 
["Hatred (Humans)","Hatred (Dwarves)","Hatred (Elves)","Hatred (Gnomes)","Hatred (Ogres)"],
"Foul Mutation","Grossly Paranoid","Hard-nosed",
"Impish Delights","Implacable Defense","Lick Your Wounds",["Menacing","Monstruous Bellow","Primal Scream"],
["Mindless","Steely Fortitude","Feckless Runt"],
["Natural Armor (2)","Natural Armor (4)","Natural Armor (6)","Scar the Flesh"],
"One-two Punch","Pack Mentality",["Paw/hoof/wing","Paw/hoof/wing","Paw/hoof/wing#Broken Wings","Paw/hoof/wing#Broken Wings#Strafing Talons"],"Perfect Camouflage",
["Petrifying Gaze","Petrifying Gaze#Eyes Wide Shut","Transfixed Gaze","Transfixed Gaze#Entrancing"],
["Poison Resistance","Poison Resistance","Poison Resistance#Poisonous Bite","Poison Resistance#Poisonous Bite","Poisonous Bite"],
"Potent Blows",
["Reanimator#Ashes to Ashes","Reanimator#Come Into the Light","Reanimator#Weakness to Brass","Reanimator#Kill It With Fire","Reanimator#Soul Jar","Reanimator#Golden Death","Vampire's Curse","Vampire's Curse","Vampire's Curse"],
"Ringen","Ripping Teeth",
"Salt of the Earth","Sanity-blasting","Silent Stalker",
"Unruly","Wall Crawler","Wanton Hunger","Wind Kick",
["Weak Spot (Head)","Weak Spot (Body)","Weak Spot (Legs)"], "Word of Death"
];

var TraitsEliteMage = ["Aetheric Domination","Awakening","Ceremonial Runes","Winds of Chaos","Living Chaos","The Changer of Ways"];

var TraitsAll = [TraitsBasic,TraitsIntermediate,TraitsAdvanced,TraitsAdvanced];
var TraitsWeaponUserAll = [TraitsBasicWeaponUser,TraitsIntermediateWeaponUser,TraitsAdvancedWeaponUser ,TraitsAdvancedWeaponUser];
var TraitsMageAll = [TraitsBasicMage,TraitIntermediateMage,TraitsAdvancedMage,TraitsEliteMage];
var TraitNames = [];
var TraitTxt = "";

var TraitDescription = [
["Ambush Tactics","These creatures roll 2D10 to determine Initiative."],
["Autotomy","When these creatures would be Slain!, they immediately break off their tail, remaining Grievously Wounded and can use any Movement Action for 0 APs. Should they suffer Damage again, they are permanently Slain!."],
["Aversion to Light","When these creatures are exposed to any sort of light (such as from a torch), they suffer a penalty of -3 to their Damage Threshold."],
["Battle Frenzy","When these creatures are encountered, roll 1D6 Chaos Die. If it lands on a face '1', '2' or '3', they are under the effect of that many doses of red cap mushrooms."],
["Blitz","When these creatures Charge, they may flip the results to succeed at their next Attack Action or Perilous Stunt on the same Turn."],
["Bloodless","These creatures cannot Bleed."],
["Bloodlust","Every time these creatures inflict an Injury, they move one step up the Damage Condition Track positively."],
["Bog Stench","These creatures emit a horrific stench, causing 1D10+1 physical Peril to those who stand Engaged with it."],
["Chomp","When a foe makes a successful Parry against this creature's melee attack, it can make an Opportunity Attack against that same foe."],
["Chthonian Dweller","These creatures do not need to breathe and are immune to Chokehold. In addition, they can burrow or swim at the same rate of Movement as they can on foot. Finally, they may flip the results to succeed at Resolve Tests."],
["Creepy Crawlies","These creatures can attack all foes in a Burst Template area of effect and are able to occupy the same space that its foes stand within. In addition, the creature never provokes Opportunity Attacks."],
["Dark Sense","These creatures can see in the dark."],
["Dense Anatomy","These creatures only suffer Damage dealt by fire."],
["Dionysian Delights","When these creatures are encountered, roll 1D6 Chaos Die. If the result is face '1-5', they are Intoxicated. If the result is face '6', they are not Intoxicated."],
["Disease-ridden","When these creatures reduce a foe to Seriously Wounded, the foe's wounds are Infected. When they reduce a foe to Grievously Wounded, the foe contracts the Disease indicated in parentheses."],
["Eyes Wide Shut","When this creature's eyes are successfully struck with a Called Shot (otherwise treated as their head), they lose their ability to use Petrifying Gaze."],
["Faces of Death","After these creatures consume the face of someone they have killed, they assume their memories and mannerisms with near perfection. This includes use of Magick, if applicable. Only with a Scrutinize Test made with a Critical Success would someone else be able to tell otherwise. This Trait's effects last until the new moon."],
["Fast on Their Feet","These creatures reduce all Movement Actions by 1 AP (to a minimum of 1 AP). They can also Dodge both melee and ranged weapons."],
["Feckless Runt","When this creature's Turn begins, roll 1D6 Chaos Die. If the result is face '6', they attack that Turn with a senseless object that does no Damage. This means that the creature will have a foe's attention and be in the way, but will otherwise be an ineffective combatant."],
["Feel the Heat","When foes are Engaged with this creature, they must Resist with a successful Coordination Test or be exposed to Mildly Dangerous flames."],
["Fetid Weaponry","When these creatures inflict an Injury, their foe's wounds are also Infected."],
["Fey Sight","These creatures can see in the dark and automatically spot foes who are hidden or Aethereal."],
["Flammable","When exposed to flames, these creatures suffer an additional 1D10+1 Damage from fire."],
["Foul Mutation","When these creatures are encountered, roll 1D6 Chaos Dice if a Basic Risk Factor; 2D6 Chaos Dice if an Intermediate Risk Factor; 3D6 if an Advanced Risk Factor; and 4D6 if an Elite Risk Factor. For every face '6', addc one Taint of Chaos to the creature."],
["Hallucinogenic Frenzy","After ingesting a dose of red cap mushrooms, these creatures add 1D6 Fury Die to melee weapon Damage."],
["Hangin' Tough","These creatures cannot Bleed or suffer Injuries."],
["Hatred (Humans)","When facing the Ancestries indicated in the parentheses, these creatures add an additional 1D6 Fury Die to Damage and automatically succeed at Resolve Tests."],
["Hatred (Dwarves)","When facing the Ancestries indicated in the parentheses, these creatures add an additional 1D6 Fury Die to Damage and automatically succeed at Resolve Tests."],
["Hatred (Elves)","When facing the Ancestries indicated in the parentheses, these creatures add an additional 1D6 Fury Die to Damage and automatically succeed at Resolve Tests."],
["Hatred (Gnomes)","When facing the Ancestries indicated in the parentheses, these creatures add an additional 1D6 Fury Die to Damage and automatically succeed at Resolve Tests."],
["Hatred (Ogres)","When facing the Ancestries indicated in the parentheses, these creatures add an additional 1D6 Fury Die to Damage and automatically succeed at Resolve Tests."],
["Herp Derp","These creatures are easily distracted. When their Turn starts, they must succeed at a Resolve Test or else lose 1 AP."],
["Holy Retribution","When struck by holy water, these creatures suffer 2D10+2 Damage from fire.Lick Your WoundsThese creatures can spend 1 Misfortune Point to move three steps up the Damage Condition Track positively."],
["Man O'War","When these creatures are Injured, always refer to the Moderate Injuries table to determine their severity. This Trait overrides any potential for increase in Injuries due to Qualities, Traits or other Talents."],
["Menacing","When these creatures use a Litany of Hatred, they inflict 1D10+[BB] mental Peril."],
["Mindless","These creatures do not possess Fellowship, Intelligence or Willpower and cannot be made to Resist effects which affect the mind. They can also see in the dark."],
["Murderous Attacks","When these creatures make an attack with a blackjack, garrote or bullwhip, their foe cannot Dodge, Parry or Resist this attack."],
["Natural Armor (1)","These creatures have factored in a bonus to their Damage Threshold, equal to the value in parentheses."],
["Natural Armor (2)","These creatures have factored in a bonus to their Damage Threshold, equal to the value in parentheses."],
["Natural Armor (3)","These creatures have factored in a bonus to their Damage Threshold, equal to the value in parentheses."],
["Natural Armor (4)","These creatures have factored in a bonus to their Damage Threshold, equal to the value in parentheses."],
["Natural Armor (5)","These creatures have factored in a bonus to their Damage Threshold, equal to the value in parentheses."],
["Natural Armor (6)","These creatures have factored in a bonus to their Damage Threshold, equal to the value in parentheses."],
["One-two Punch","When these creatures Take Aim and then make a successful Melee Attack, they force a foe to Resist a Stunning Blow."],
["Pack Mentality","When three or more of these creatures are alive during combat, they may flip the results to succeed at Skill Tests."],
["Paw/hoof/wing","These creatures' movement uses 6+[AB] on foot and 9+[AB] for flight. Creatures capable of flight are indicated under Movement."],
["Perfect Camouflage","Foes must flip the results to fail attacks made with ranged weapons to strike these creatures."],
["Petrifying Gaze","When foes are Engaged with this creature (and the creature can see them), they must Resist with a successful Awareness Test or be Petrified. While Petrified, they are left Helpless and unconscious. Petrification lasts until the heart of the creature that caused the Petrification is pulverized into a bloody concoction and poured over the victim with a successful Alchemy Test."],
["Point Blank","When these creatures make an Attack Action with a weapon possessing the Gunpowder Quality within Short Distance, they add an additional 1D6 Fury Die to Damage."],
["Poison Resistance","These creatures are immune to poisons.ReanimatorWhen this creature's Turn begins, they move one step up the Damage Condition Track positively. Other Traits cover how these creatures are permanently Slain!."],
["Ringen","These creatures penalize their foe's ability to Resist a Chokehold and Dirty Tricks by a -10 Base Chance to their Skill Test. In addition, when they use a Chokehold, add an additional 1D10 to determine how much physical Peril they inflict."],
["Ripping Teeth","When these creatures deal Damage, they can force a foe to Resist a Takedown."],
["Saddle Tactics","When fighting on horseback or a vehicle, they flip the results to succeed at Attack Actions and Perilous Stunts."],
["Salt of the Earth","These creatures have factored in +3 to their Peril Threshold."],
["Sanity-blasting","When first encountered, these creatures provoke one of the three brands of Madness; if of Basic Risk Factor, they provoke Stress; if of Intermediate Risk Factor, they provoke Fear; if of Advanced or Elite Risk Factor, they provoke Horror."],
["Scar the Flesh","These creatures add +3 to their Damage Threshold, but do not wear armor."],
["Shootfighting","These creatures ignore the Pummeling and Weak Qualities when fighting bare-handed, with a blackjack or using knuckledusters. In addition, they can refer to [BB] or [CB] when inflicting Damage with these same weapons."],
["Shotgun Bang!","When these creatures successfully strike with a ranged weapon possessing the Gunpowder Quality, they automatically Load their weapon for 0 APs."],
["Silent Stalker","When these creatures use the Stealth or Survival Skill, they flip the results to succeed at their Test."],
["Skeletal Remains","Only after these creature's bones have been spread around for 1 AP are they forever Slain!."],
["Sniveling Whelp","These creatures can only use 2 AP during combat."],
["Soul Jar","These creatures cannot be permanently Slain! unless the fetish or phylactery which houses their soul is destroyed. However, they can be forced to remain in hibernation and left unconscious if a jar of salt is poured into their mouths."],
["Spore-splosion","When these creatures attack, it cannot be Dodged or Parried – it may only be Resisted with a successful Toughness Test. If a foe fails this Toughness Test, they are exposed to Orx-molt."],
["Squabble Among Themselves","When these creatures suffer from Fear or Terror, they must succeed at a Resolve Test when their Turn starts or else attack their own allies. They can Resist every Turn thereafter."],
["Steely Fortitude","These creatures always succeed at Resolve Tests and cannot be Intimidated."],
["Swallow Whole","When these creatures make a successful Chokehold, they deal Damage as a bare-handed weapon and force a foe to Resist with a Toughness Test or be Swallowed. While Swallowed, the foe cannot use any Actions, but can attempt to Resist again at the beginning of their Turn to escape. Foes who attempt to Resist must flip the results to fail their Skill Test."],
["Unbridled Rage","When these creatures are Seriously or Grievously Wounded, add an additional 1D6 Fury Die to the Damage they inflict with melee weapon attacks."],
["Uncertain Form","These creatures are immune to Injuries and Perilous Stunts."],
["Unnatural Viscera","These creatures are immune to attacks made with ranged weapons. However, they cannot use any Movement Action that requires 3 APs."],
["Unruly","When these creatures drop down the Damage Condition Track, they move an equal number of steps down the Peril Condition Track."],
["Wanton Hunger","When these creatures are encountered, roll 1D6 Chaos Die. If the result is face '1-5', their hunger has been sated. If the result is face '6', their hunger has not yet been sated and they are in a state of frenzy. When sated, they add +1 to both Damage and Peril Condition Tracks. When in a state of frenzy, they add an additional 1D6 Fury Die to Damage."],
["Weak Spot (Head)","When a creature's body part indicated in parentheses is successfully struck by a Called Shot, a foe adds an additional 1D6 Fury Die to Damage."],
["Weak Spot (Body)","When a creature's body part indicated in parentheses is successfully struck by a Called Shot, a foe adds an additional 1D6 Fury Die to Damage."],
["Weak Spot (Legs)","When a creature's body part indicated in parentheses is successfully struck by a Called Shot, a foe adds an additional 1D6 Fury Die to Damage."],
["Winds of Chaos","When casting Generalist Magick , at their option, these creatures can automatically succeed at the Incantation Test, but must drop one step down the Peril Condition Track negatively. In addition, they must always add 1 additional Chaos Die when they Channel Power."],
["Acidic Spittle","These creatures can use their breath as a ranged weapon. This allows them to strike a single foe within 1+[PB], causing the foe to suffer 1D10+1 Damage from acid. However, Acidic Spittle ignores a foe's Damage Threshold Modifier from armor. A foe can attempt to Dodge Acidic Spittle or Parry it with a shield. Acidic Spittle can be used while Engaged with foes."],
["Accursed","These creatures cannot be harmed by normal weapons, only by weapons which have been imbued with Magick."],
["Aethereal Form","Creatures in Aethereal Form cannot inflict Damage or manipulate physical objects, but can pass through objects effortlessly and hover 1 yard off the ground. They can manifest into physical form instantaneously, but assuming Aethereal Form once more costs 2 APs."],
["Arcana of Horror","These creatures can use Bolt of Flame from the Arcana of Pyromancy. If at least three of these creatures are standing within sight of one another, they can use Withering Touch from the Arcana of Sorcery. If at least nine of these creatures are standing within sight of one another, they can use Death's Embrace from the Arcana of Morticism. Should a foe be Slain! by use of any of these Magicks, they are immediately turned into a Lemurian Host. Reagents are unnecessary to cast this Magick."],
["Bane of Lycanthropes","When creatures are struck with weapons coated with a sprig of wolfsbane, they suffer an additional 1D6 Fury Die in Damage."],
["Big Grim","These creatures can use two-handed weapons in one hand and take advantage of the Adaptable Quality."],
["Blam!Blam!","These creatures may spend 3 APs to attack twice with two ranged weapons, providing they possess the Gunpowder Quality and are Loaded."],
["Bonds of Death","These creatures can manipulate physical objects in Aethereal Form."],
["Both-handedness","When they wield two one-handed melee weapons and fail a Combat-based Skill Test, they may re-roll to generate a better result, but must accept the outcome."],
["Broken Gut-plate","After these creatures are Seriously Wounded or made subject to a Called Shot to the body and suffer at least 9 Damage, they suffer a penalty of -6 to their Damage Threshold."],
["Broken Wings","Once this creature is Grievously Wounded, it can no longer fly."],
["Brush With Death","When these creatures make a successful attack bare-handed, they provoke Fear, but do no Damage. They also force a foe to Resist with a Resolve Test or be aged by one year. For every year aged, the foe permanently reduces Brawn by 1%."],
["Brute Strength","These creatures refer to [BB] for Damage with melee weapons and ones with the Throwing Quality. They have also factored in +3 to their [BB]. Finally, they can inflict Injuries with Pummeling weapons."],
["Call of the Abyss","When this creature suffers Damage and is unable to deal Damage by the end of its next Turn, roll 3D6. If all three dice show face '6', the creature is banished back to the Abyss, until summoned once again."],
["Captivating Cry","When foes can hear this creature, they must Resist with a successful Resolve Test or be drawn towards the sound. Should they enter a dangerous area to find the sound, they can attempt another Resolve Test. Once they are able to visually see the creature, the Captivating Cry's effects end."],
["Champion's Call","One foe is left Defenseless to all of this creature's attacks, until the foe is defeated. The creature may select a new foe once the current one is defeated."],
["Corrosive Bile","When creatures use this attack, it ignores their foe's Damage Threshold Modifier from armor."],
["Crippling Constrictor","When these creatures maintain a Chokehold, they deal Damage as if they were using a bare-handed weapon."],
["Death Roll","When these creatures deal Damage, at their option, they can force a foe to Resist a Chokehold."],
["Demonic Frenzy","When this creature's Turn starts, roll 6D6 Chaos Dice. If at least three dice land on face '6', they enter a demonic Frenzy. While Frenzied, they can make up to three Melee Attacks during their Turn, costing 1 AP for each Melee Attack. In addition, they can make an Opportunity Attack at the end of a Charge. However, they cannot Counterspell, Dodge or Parry while in a frenzied state. Finally, their Frenzied state makes them more susceptible to harm, as foes add an additional 1D6 Fury Die to Damage when striking the creature."],
["Divide & Conquer","When these creatures are Slain!, roll 1D6 Chaos Die. If the result is face '1-3', they instantaneously split into two minor Adversary Demons (albeit unable to cast Magick, use the Underling rules this chapter and can now be permanently Slain!). If the result is face '4-6', it bursts into a cloud of mutating energy. Those caught in a Burst Template area of effect must succeed at a Resolve Test or gain a Taint of Chaos."],
["Fetid Stick","When these creatures are encountered, they carry a staff which buzzes with flies. When they deal Damage, the foe's wounds are also Infected. It can only be used in the hands of these creatures, being otherwise useless relics to others. If picked up by PCs whose Order Ranks are higher than their Chaos Ranks, they are instantly infected with Chaotic Rot."],
["Fireproof","These creatures and their possessions are entirely immune to Damage from fire."],
["Foul Mutation","When these creatures are encountered, roll 1D6 Chaos Dice if it has a Basic Risk Factor; 2D6 Chaos Dice if an Intermediate Risk Factor; 3D6 if an Advanced Risk Factor; or 4D6 if an Elite Risk Factor. For every face '6', add one Taint of Chaos to the creature."],
["Fwip!Fwip!","These creatures may spend 3 APs to attack twice with ranged weapons without Loading."],
["Gastric Acidity","When these creatures deal Damage, a foe must Resist with Coordination. If they fail, the foe's armor, weapon or shield is Ruined!."],
["Gift of Devils","These creatures ignore the Heavy Quality of armor to cast Magick."],
["Grenadier","When these creatures are encountered, they have a glass grenade. When thrown, it affects multiple foes in a Burst Template. Affected foes must succeed at a Toughness Test or contract Tomb Rot."],
["Grossly Paranoid","These creatures have factored in +3 to their Initiative."],
["Gutter Runner","When these creatures attempt to hide in urban and underground environments, they flip the results to succeed at Stealth Tests."],
["Harbinger of Plagues","When these creatures are encountered, roll 1D6 Chaos Die. If the result is face '1-5', they carry a massive gong. If the result is face '6', they carry a set of chimes. When they play the gong with Litany of Hatred, player Characters so affected also suffer 1D10+1 physical Peril. When they play the chime with Litany of Hatred, player Characters so affected instead lower their Damage and Peril Condition Tracks by -3 instead. These trappings can only be used by hands of these creatures who bear them, otherwise they are useless relics."],
["Hard-nosed","These creatures are immune to Knockout! and Stunning Blow."],
["Hideous Might","These creatures add the Reach and Vicious Qualities to any melee weapons they wield. They also ignore the Weak Quality of melee weapons."],
["Holy Retribution","When struck by holy water, these creatures suffer 2D10+2 Damage from fire."],
["Horror of the Pit","These creatures do not need to breathe and are immune to Chokehold. In addition, player Characters whose Order Ranks exceed their Chaos Ranks reduce their Damage by -3 when striking these creatures."],
["Hypnotic Musk","Foes who stand within 9 yards of this creature cannot add their Apprentice Skill Rank to Combat and Willpowerbased Skill Tests. In addition, foes who are Engaged with these creatures must successfully Resist using Toughness or be unable to add any Skill Ranks to Combat and Willpower-based Skill Tests for a day."],
["I Got Axe for You","After this creature makes an Attack Action with a melee weapon, it can immediately make an Opportunity Attack with any one-handed ranged weapon with the Throwing Quality on the same Turn."],
["I Thee Wed","These creatures cannot be permanently Slain! unless their wedding ring is placed into a decanter consecrated with the Ritual of Blessed Sacrament. As long as it remains in the decanter, they also remain in a state of hibernation, unless the ring is removed therefore giving life to the creature again. Only by then submerging the decanter into a large body of water are they forever Slain!."],
["Impish Delights","When these creatures are encountered, roll 1D6 Chaos die to determine what special power they can grant to one ally, once a day. If the result is a face '1', '2' or '3', they can cause any one ally standing within 3 yards of them to gain the benefits of Demonic Frenzy (as a Legion Demon). If the result is face '4' or '5', they allow any one ally standing within 3 yards of them to flip the results to succeed at a single Skill Test. If the result is face '6', anyone standing within 3 yards of this creature must succeed at a Resolve Test or temporarily lower their Fellowship by 9% for a day."],
["Implacable Defense","When this creature's Turn begins, they gain 1 additional AP. However, it can only be used to Dodge and Parry."],
["In the Face","These creatures can only be harmed by melee and ranged weapons by using a Called Shot to the head."],
["Inescapable","When these creatures use a Chokehold, they are able to maintain it for 0 AP and use other Actions In Combat."],
["Keening Wail","These creatures can spend 2 APs to make an Interrogation Test. If successful, foes caught in a Cone Template who fail to Resist with a Resolve Test immediately suffer from Fear and cannot Counterspell or Parry until their next Turn. A foe can be made victim to Keening Wail every Turn."],
["Kill It With Fire","Only after these creature's remains are set On Fire are they forever Slain!."],
["Lamb to the Slaughter","When these creatures Injure a foe with a melee weapon, they inflict two Injuries instead of one."],
["Lick Your Wounds","These creatures can spend 1 Misfortune Point to move three steps up the Damage Condition Track positively."],
["Light Sensitive","When a foe uses Take Aim for 2 APs to shine a source of light upon this creature before making their attack, reduce its Damage Threshold by a -6 penalty (to a minimum of 1)."],
["Living Chaos","When these creatures use Magick, they must roll 3D6 Chaos Dice. If all land on face '6', they are instantaneously Slain!."],
["Masterfully Adroit","These creatures refer to their [AB] for all Damage they inflict with weapons. They also have factored in +3 to their [AB]."],
["Mindless","These creatures do not possess Fellowship, Intelligence or Willpower and cannot be made to Resist effects which affect the mind. They can also see in the dark."],
["Never Say Die","When these creatures are Grievously Wounded, add 3 to their Damage Threshold."],
["Never Surrender","Foes do not gain an advantage when they flank or outnumber this creature in combat."],
["Physical Instability","Every minute these creatures remain in the Material Realm in physical form, roll 3D6 Chaos Dice at the end of their Turn. If all three dice show face '6', the creature is banished from the Material Realm until the new moon."],
["Poison Resistance","These creatures are immune to poisons."],
["Poisonous Bite","When these creatures deal Damage, roll 1D6 Chaos Die. If the result is face '6', they inject Spider Venom into their foe."],
["Primal Scream","When these creatures successfully use a Litany of Hatred, those affected must Resist with a Resolve Test or suffer from Fear."],
["Punishing Attack","When these creatures Take Aim and then make a successful Melee Attack, add 3 Damage."],
["Reanimator","When this creature's Turn begins, they move one step up the Damage Condition Track positively. Other Traits cover how these creatures are permanently Slain!."],
["Resistance to Chaos","This creature may flip the results to succeed at Resolve Tests when Resisting the effects of Magick."],
["Serpentine Cloak","When these creatures are encountered, they wear a cloak made from an undersea creature. It provides a Damage Threshold Modifier of 1 when worn."],
["Sharp-sighted","These creatures do not suffer penalties for ranged weapons at Medium or Long Distances."],
["Smoke Bomb","When these creatures are encountered, they have a smoke bomb. When thrown, it explodes outwards. Those caught in an Explosion Template area of effect must reduce their Movement by a -6 penalty, until they escape. In addition, it provides enough concealment for the creature to use their Stealth Skill."],
["Snikt!Snikt!","These creatures may spend 3 APs to attack twice with melee weapons."],
["Stinging Tentacle","When these creatures deal Damage, they have the option to force a foe to Resist a Stunning Blow."],
["Strafing Talons","When these creatures execute a successful attack while flying, they also deal 1D10+[AB] physical Peril."],
["True Name","Unless foes invoke this creature's True Name before casting Magick, it fails to affect the creature."],
["Unbridled Rage","When these creatures are Seriously or Grievously Wounded, add an additional 1D6 Fury Die to Damage they inflict with melee weapon attacks."],
["Wall Crawler","These creatures can crawl upon both vertical and horizontal surfaces with ease. In addition, they can initiate a ranged Chokehold at a Distance of 3+[PB], with a Load of 1 AP."],
["Witchboard","These creatures cannot be permanently Slain! unless their remains are placed beneath a spirit board. Once placed beneath a spirit board, they enter hibernation and will remain so unless the board or remains are removed, therefore giving life to the creature again as it is restored to Unharmed. Only by successfully casting Last Rites over the spirit board are they forever Slain!."],
["Wytch-science","When these creatures are encountered, roll 1D6 Chaos Die. If the result is face '1-4', they carry two Wytchfyre pistols. If the result is face '5', they carry a Wytchfyre jezzail. If the result is face '6', they carry a Wytchfyre thrower. While carrying a Wytchfyre thrower, they cannot Charge, Maneuver or Run."],
["Aetheric Domination","When these creatures would potentially invoke a Chaos Manifestation, they must roll two or more face '6' on Chaos Dice to invoke it."],
["Ashes to Ashes","These creatures cannot be permanently Slain! unless their remains are placed into a decanter consecrated with the Blessed Sacrament Ritual. Within, they remain in hibernation, unless the remains are removed therefore giving life to the creature again. Only by placing the decanter into a font of holy water are they forever Slain!."],
["Aversion to Light","When these creatures are exposed to any sort of light (such as that from a torch), they suffer a penalty of -3 to their Damage Threshold."],
["Cancerous Absorption","When they render an enemy Slain!, they gain +3 to [BB] and move three steps up the Damage Condition Track positively."],
["Ceremonial Runes","When these creatures are encountered, roll 1D6 Chaos Die. If the result is face '1', '2' or '3', they have three Apprentice Runes inscribed upon their staff. If the result is face '4' or '5', they have two Journeyman Runes inscribed upon their staff. If the result is face '6', they have one Master Rune inscribed upon their staff."],
["Champion's Call","One foe is left Defenseless to all this creature's attacks, until the foe is defeated. The creature may select a new foe once the current one is defeated."],
["Cold Hands","These creatures ignore the Damage Threshold Modifier a foe's armor may confer when they inflict Damage."],
["Lumbering Brute","These creatures cannot Charge, Run or use Movement Actions that require 3 AP."],
["Sweeping Strike","When these creatures make a successful attack with a two-handed melee weapon, they strike up to three foes they're Engaged with."],
["Awakening","Anytime these creatures attempt to raise and control Supernatural creatures using Magick and Rituals, they Critically Succeed at their Skill Test. In addition, they automatically understand how to use the Ritual of Awaken the Dead, don't need reagents to cast it and treat the casting time as one minute (3 AP), instead of one hour."],
["Come Into the Light","These creatures cannot be permanently Slain! unless their lantern is destroyed. If the lantern is snuffed out, they remain in hibernation until it is relit."],
["Corruptive Breath","When these creatures cause a foe to suffer Damage from Spit Fire, they also inflict 3 Corruption as a result. In addition, their Spit Fire ability gains the Shrapnel Quality."],
["Golden Death","These creatures cannot be permanently Slain! unless their eyes are pierced with a golden pin or 1 gold crown (gc) is placed beneath their tongue. During this time, they remain in a hibernating state, unless the pins or gold crown (gc) are removed, therefore giving life to the creature again. Only by then burning the head in a funeral pyre are they forever Slain!."],
["Entrancing","When this creature uses a Transfixed Gaze, they can use other Actions while they maintain its Mesmerizing effect. In addition, foes suffer 1 Corruption and 2D10+2 mental Peril for each of their Turns that they remain Mesmerized."],
["Fiery Retribution","These creatures can use Spit Fire as an Opportunity Attack without having to Load."],
["Flailing Tentacles","These creatures can attack up to nine foes in an Engagement with one Attack Action. In addition, their tentacles have the Reach Quality, able to strike foes up to 3 yards away."],
["Spit Fire","These creatures can use their breath as a ranged weapon. This allows then to strike a single foe within 3+[PB], as the foe suffers 2D10+2 Damage from fire. A foe can attempt to Dodge Spit Fire or Parry it with a shield. Spit Fire can be used while Engaged with foes."],
["Transfixed Gaze","When these creatures can see a foe (who can also see them), they force a foe to Resist with a Resolve Test or be Mesmerized. Mesmerized foes cannot use any Actions In Combat, but may attempt to Resist again at the beginning of their Turn to escape. The creature cannot use any other Actions while they maintain a Transfixed Gaze. However, they can release the gaze at any time. If the creature suffers Damage while a foe is Mesmerized, they immediately relinquish the hold. Foes who attempt to Resist must flip the results to fail their Skill Test."],
["Ungainly","When these creatures are Slain! all those Engaged with it must succeed at a Coordination Test or be knocked Prone beneath of it, suffering 3D10+3 Damage from falling."],
["Unlatch Doors","These creatures can automatically unfasten any lock they can see or touch, Magickal or otherwise."],
["Vampire's Curse","These creatures cannot cross running water, unless by bridge or boat. When exposed to sunlight, they suffer 2D10+2 Damage from fire for every minute they remain exposed. Instead of suffering Injuries in this case, they instead are caught On Fire. When Slain!, they turn into mist and immediately return to their resting place to sleep. For every hour they sleep, they move one step up the Damage Condition Track positively. Once Unharmed, all Injuries are healed as well. However, while asleep, they can be permanently Slain! if an ironwood stake is driven through their heart and the head is removed."],
["Wanton Hunger","When these creatures are encountered, roll 1D6 Chaos Die. If the result is face '1-5', their hunger has been sated. If the result is face '6', their hunger has not yet been sated and they are in a state of frenzy. When sated, they add +1 to both Damage and Peril Condition Tracks. When in a state of frenzy, they add an additional 1D6 Fury Die to Damage."],
["Wind Kick","When creatures use this attack, it forces a foe to Resist with a Coordination Test or be thrown 1D10+ [BB] in yards. This attack can be used against three foes at once."],
["Word of Death","When these creatures encounter those who are suffering from a Disorder, Disease or Grievous Injury, the foe must Resist with a successful Resolve Test or else be Slain!. However, the foe must be able to see and hear them for Word of Death to work. If a foe succeeds at this Resolve Test, they are forever immune to Word of Death"]
];

var SkillRanks = [[4,7,10,10],[14,17,20,20],[24,27,30,30],[24,27,30,30]];
var SkillRanksMax = [1,2,3,3];

var Skills = ["Athletics","Awareness","Charm","Coordination","Eavesdrop","Intimidate","Navigation","Resolve","Rumor","Scrutinize","Simple Melee","Simple Ranged","Stealth","Survival","Toughness"];
/*For non mosnter*/
var SkillsRare = ["Alchemy","Bargain", "Counterfeit","Disguise","Drive","Education","Folklore","Gamble","Guile","Heal", "Interrogation","Leadership","Pilot","Ride","Skulduggery","Tradecraft", "Warfare"];
var SkillsWeaponUser = ["Martial Melee","Martial Ranged"];
var SkillNames = [];
var SkillValues = [];
var SkillTxt = "";
var StatsRareChance   = [0.1, 0.05, 0.05, 0.2, 0.15, 0.15];
var WeaponsSimple = [
"<B>Dagger</B>: SM% . Distance (melee engaged) . Damage [CB] . Fast, Vicious, Weak",
"<B>Dirk</B>: SM% . Distance (melee engaged) . Damage [AB] . Fast,Finesse, Light, Weak",
"<B>Rapier</B>: SM% . Distance (melee engaged) . Damage [AB] . Fast,Finesse, Weak",
"<B>Threshing Flail</B>: SM% . Distance (melee engaged) . Damage [CB] . Adaptable, Weak",
"<B>Cudgel</B>: SM% . Distance (melee engaged or 1 yard) . Damage [CB] . Light, Powerful, Weak"
];
var WeaponsSimpleLow = [
"<B>Shiv</B>: SM% . Distance (melee engaged) . Damage [CB] . Fast, Weak",
"<B>Fire Hardenned Spear</B>: SM% . Distance (melee engaged) . Damage [CB] . Adaptable, Reach, Weak"
];

var WeaponsMartial = [
"<B>Sabre</B>: : MM% . Distance (melee engaged) . Damage [CB] . Defensive",
"<B>Morgenstern</B>: : MM% . Distance (melee engaged) . Damage [CB] . Adaptable, Powerful, Vicious",
"<B>Battle Axe</B>: : MM% . Distance (melee engaged or 1 yard) . Damage [CB] . Adaptable, Reach, Slow, Vicious"
];

var Attacks = [];
var AttackProfileTxt = "";

var WeaponsAbysal = [
"<B>Bull-like Horns</B>: SM% . Distance (melee engaged or 1 yard) . Damage [BB] . Pummeling, Reach, Slow, Vicious",
"<B>Corrosive Bile</B>: SM% . Distance (ranged 1+[PB] yards) . Load (1 AP) . Damage [CB] . Slow",
"<B>Demonic Beak</B>: SM% . Distance (melee engaged) . Damage [BB] . Pummeling, Punishing, Slow",
"<B>Deplorable Claws</B>: SM% . Distance (melee engaged) . Damage [CB] . Fast, Finesse, Powerful, Vicious",
"<B>Dire Penetration</B>: SM% . Dtance (melee engaged or 1 yard) .Damage [AB] . Entangling, Fast, Finesse, Vicious",
"<B>Euclidean Strike</B>: SM% . Distance (melee engaged) . Damage [AB] . Finesse, Weak",
"<B>Eviscerating Pincer</B>: SM% . Distance (melee engaged) . Damage [CB] . Slow, Vicious",
"<B>Fire Hooves</B>: SM% . Distance (melee engaged) . Damage [BB] . Fast, Immolate, Pummeling",
"<B>Fleshy Whips</B>: SM% . Distance (melee engaged or 1 yard) . Damage (None) . Entangling, Ineffective, Fast, Reach",
"<B>Halitosis Bite</B>: SM% . Distance (melee engaged) . Damage [AB] . Fast, Finesse",
"<B>Hellbite</B>: SM% . Distance (melee engaged) . Damage [CB] . Entangling, Slow, Weak",
"<B>Hyperbolic Fluctuation: SM%  Distance (ranged 6+[PB] yards) . Load (1 AP) . Damage [AB] . Finesse, Weak",
"<B>Immolating Claws</B>: SM% . Dtance (melee engaged or 1 yard) . Damage [CB] . Immolate, Punishing, Reach, Vicious",
"<B>Lashing Tail</B>: SM% .  Distance (melee engaged) . Damage [BB] . Pummeling, Punishing, Slow",
"<B>Penetrating Tongue</B>: SM% . Dtance (melee engaged or 1 yard) . Damage [CB] . Entangling, Fast, Finesse, Reach, Vicious",
"<B>Ragged Claws</B>: SM% . Dtance (melee engaged) . Damage [BB] . Fast, Pummeling",
"<B>Spire Fire</B>: SM% . Dtance (ranged 3+[PB] yards) . Load (0 AP) . Damage (Special) . Shrapnel",
"<B>Undulating Tentacles</B>: SM% . Dtance (melee engaged or 1 yard) . Damage [CB] . Reach, Vicious"];
var WeaponsAbysalLow = ["<B>Lower Demonic Claws</B>: SM% . Dtance (melee engaged) . Damage [AB] . Fast, Vicious"];
var WeaponsAbysalHigh = ["<B>Higher Demonic Claws</B>: SM% Simple Melee Distance (melee engaged) . Damage [BB] . Pummeling, Vicious,Slow"];

var WeaponsAnimal = [
"<B>Bite</B>: SM% . Distance (melee engaged) . Damage [CB] . Fast, Vicious, Weak",
"<B>Mandibles</B>: SM% . Distance (melee engaged) . Damage [CB] . Fast, Vicious",
"<B>Rending or Horrendous Bite</B>: SM% . Distance (melee engaged) . Damage [CB] . Fast, Vicious",
"<B>Swarm Attack</B>: SM% . Distance (melee engaged) . Damage [BB] . Fast, Powerful, Pummeling",
"<B>Talons & Beak</B>: SM% . Distance (melee engaged) . Damage [CB] . Powerful",
"<B>Tentacles or Pincers</B>: SM% . Distance (melee engaged) . Damage [CB] . Fast, Entangling, Weak",
"<B>Terrible Bites or Claws</B>: SM% . Distance (melee engaged) . Damage [CB] . Finesse, Punishing, Vicious",
"<B>Tusks</B>: SM% . Distance (melee engaged) . Damage [CB] . Fast, Powerful, Vicious",
"<B>Vampiric Fangs</B>: SM% . Distance (melee engaged) . Damage [CB] . Fast, Vicious",
"<B>Wall Crawler Spinneret</B>: SM% . Distance (ranged 3+[PB] yards) . Load (1 AP) . Damage (None) . Entangling, Ineffective, Throwing",
"<B>Yellow Teeth</B>: SM% . Distance (melee engaged) . Damage [CB] . Fast, Vicious, Weak"
];
var WeaponsAnimalLow = [
"<B>Small Critter Bite or Claws</B>: SM% . Distance (melee engaged) . Damage [BB] . Pummeling, Slow"];
var WeaponsAnimalHigh = [
"<B>Large Critter Bite or Claws</B>: SM% . Distance (melee engaged) . Damage [CB] . Slow, Weak"];

var WeaponsBeast = [
"<B>Claws & Teeth</B>: SM% . Distance (melee engaged) . Damage [BB] . Pummeling, Vicious",
"<B>Dull Hoof</B>: SM% . Distance (melee engaged) . Damage [BB] . Pummeling",
"<B>Lashing Tail</B>: SM% . Distance (melee engaged or 6 yards) . Damage [BB] . Pummeling, Slow",
"<B>Powerful Bite</B>: SM% . Distance (melee engaged) . Damage [BB] . Pummeling, Slow",
"<B>Ragged Claws</B>: SM% . Distance (melee engaged) . Damage [CB] . Slow, Vicious",
"<B>Ragged Talons</B>: SM% . Distance (melee engaged) . Damage [AB] . Finesse, Weak",
"<B>Razor Fin</B>: SM% . Distance (melee engaged) . Damage [BB] . Pummeling, Weak",
"<B>Sharp Beak</B>: SM% . Distance (melee engaged) . Damage [AB] . Fast, Finesse, Vicious",
"<B>Snapping Jaw</B>: SM% . Distance (melee engaged) . Damage [CB] . Punishing, Slow, Vicious",
"<B>Spiked Tail</B>: SM% . Distance (melee engaged or 1 yard) . Damage [CB] . Reach, Slow, Powerful",
"<B>Talons</B>: SM% . Distance (melee engaged) . Damage [AB] . Finesse, Slow, Vicious",
"<B>Terrible Teeth</B>: SM% . Distance (melee engaged) . Damage [AB] . Fast, Finesse, Vicious",
"<B>Thrashing Tentacles</B>: SM% . Distance (melee engaged or 3+[PB] yards) . Damage [CB] . Powerful, Reach",
"<B>Vicious Bite</B>: SM% . Distance (melee engaged) . Damage [CB] . Slow, Vicious, Weak",
"<B>Vile Claws</B>: SM% . Distance (melee engaged) . Damage [BB] . Pummeling, Slow",
"<B>Vorpal Claw</B>: SM% . Distance (melee engaged or 1 yard) . Damage [CB] . Punishing, Reach, Slow, Vicious"
];
var WeaponsHumanoid = [
"<B>Bog Claws</B>: SM% . Distance (melee engaged) . Damage [CB] . Fast, Vicious, Weak",
"<B>Eviscerating Claws</B>: SM% . Distance (melee engaged) . Damage [AB] . Fast, Finesse, Vicious",
"<B>Flailing Branch</B>: SM% . Distance (melee engaged) . Damage [BB] . Entangling, Pummeling, Slow",
"<B>Fluorophore</B>: SM% . Distance (ranged 1+[PB] yards) . Damage (None) . Entangling",
"<B>Mutated Antlers</B>: SM% . Distance (melee engaged) . Damage [BB] . Pummeling, Slow",
"<B>Mutated Hooves</B>: SM% . Distance (melee engaged) . Damage [BB] . Pummeling, Powerful, Slow",
"<B>Mutated Horns</B>: SM% . Distance (melee engaged) . Damage [BB] . Pummeling, Powerful, Punishing, Slow",
"<B>Pseudopod Glob</B>: SM% . Distance (ranged 3+[PB] yards) . Load (1 AP) . Damage [BB] . Slow, Pummeling, Throwing",
"<B>Pseudopod Tentacle</B>: SM% . Distance (melee engaged) . Damage [BB] . Entangling, Fast, Pummeling",
"<B>Ragged Teeth</B>: SM% . Distance (melee engaged) . Damage [CB] . Entangling, Pummeling, Slow",
"<B>Stomach Maw</B>: SM% . Distance (melee engaged) . Damage [CB] . Vicious, Punishing",
"<B>Tail Vertebrae</B>: SM% . Distance (melee engaged or 1 yard) . Damage (None) . Entangling, Ineffective, Reach",
"<B>Tail Whip</B>: SM% . Distance (melee engaged or 1 yard) . Damage [BB] . Entangling, Pummeling, Reach",
"<B>Terrible Claws</B>: SM% . Distance (melee engaged) . Damage [BB] . Pummeling, Slow",
"<B>Thundering Claws</B>: SM% . Distance (melee engaged or 1 yard) . Damage [BB] . Pummeling, Powerful, Reach",
"<B>Tyrant Spike</B>: SM% . Distance (melee engaged or 1 yard) . Damage [BB] . Fast, Reach, Powerful, Pummeling, Vicious",
"<B>Unhinged Jaw</B>: SM% . Distance (melee engaged) . Damage [BB] . Pummeling, Weak"
];
var WeaponsSupernatural = [
"<B>Branch-like Claws</B>: SM% . Distance (melee engaged or 1 yard) . Damage [BB] . Entangling, Pummeling, Slow",
"<B>Cold Touch</B>: SM% . Distance (melee engaged) . Damage [BB] . Pummeling, Slow, Weak",
"<B>Earthen Fisticuff</B>: SM% . Distance (melee engaged) . Damage [CB] . Slow",
"<B>Elemental Lash</B>: SM% . Distance (ranged 3+[PB] yards) . Load (2 AP) . Damage [BB] . Entangling, Pummeling",
"<B>Elemental Slash</B>: SM% . Distance (ranged 6+[PB] yards) . Load ( 2 AP) . Damage [AB] . Entangling, Finesse",
"<B>Ghastly Touch</B>: SM% . Distance (melee engaged) . Damage [CB]. Entangling, Pummeling, Slow, Weak",
"<B>Gnashing Teeth & Claws</B>: SM% . Distance (melee engaged) . Damage [CB] . Slow, Vicious",
"<B>Iron-hard Fists</B>: SM% . Distance (melee engaged) . Damage [CB] . Vicious",
"<B>Phantom Limb</B>: SM% . Distance (ranged 3+[PB] yards) . Load (1 AP) . Damage [CB] . Entangling, Throwing",
"<B>Ragged Talon</B>: SM% . Distance (melee engaged) . Damage [BB] . Pummeling, Slow, Weak",
"<B>Redcap Claws</B>: SM% . Distance (melee engaged or 1 yard) . Damage [BB] . Pummeling, Slow, Weak",
"<B>Stinging Tentacle</B>: SM% . Distance (melee engaged) . Damage [CB] . Entangling, Fast, Pummeling",
"<B>Stunted Claw</B>: SM% . Distance (melee engaged) . Damage [CB] . Slow, Weak",
"<B>Teeth & Claw</B>: SM% . Distance (melee engaged) . Damage [CB] . Slow, Vicious, Weak",
"<B>Tooth & Nail</B>: SM% . Distance (melee engaged) . Damage [BB] . Pummeling, Slow, Weak",
"<B>Vampiric Claw</B>: SM% . Distance (melee engaged) . Damage [BB] . Punishing, Slow, Weak",
"<B>Vampiric Talon</B>: SM% . Distance (melee engaged) . Damage [BB] . Pummeling, Slow, Weak"
];
var WeaponsNatural = [WeaponsAbysal,WeaponsAnimal,WeaponsBeast,WeaponsHumanoid,WeaponsHumanoid,WeaponsSupernatural];
var WeaponsNaturalLow = [WeaponsAbysalLow,WeaponsAnimalLow,WeaponsAnimalLow,WeaponsAnimalLow,WeaponsAnimalLow,[]];
var WeaponsNaturalHigh = [WeaponsAbysalHigh,WeaponsAnimalHigh,WeaponsAnimalHigh,WeaponsAnimalHigh,WeaponsAnimalHigh,[]];

var TaintOfChaos = [
["Acidic Spittle","By spending a Fortune Point, you can make an improvised ranged attack against a single foe within 1+[PB]. They suffer 1D10+[BB] Damage from acid. However, Acidic Spittle ignores a foe's Damage Threshold Modifier from armor, but a foe can attempt to Dodge Acidic Spittle or Parry it with a shield. Acidic Spittle can be used while Engaged with enemies."],
["Albinism","You suffer a permanent loss of 9% to Brawn."],
["Arachnos","Attacks made bare-handed inflicts a single dose of spider venom."],
["Astral Vision","You can see in the dark, and spot Aethereal creatures. However, you must flip the results to fail any Skill Test made in broad daylight."],
["Barbed Spines","Whenever you successfully use a Takedown, you also deal Damage as if you were using a bare-handed weapon."],
["Beaked Maw","Attacks made bare-handed gain the Punishing Quality."],
["Beweaponed Extremity","Select a single one-handed Martial Melee weapon. Attacks made bare-handed are instead treated as if you were fighting with that weapon. However, you can no longer use one of your hands, nor wield two-handed weapons."],
["Black Nails","Attacks made bare-handed gain the Fast Quality."],
["Blood Substitution","You can no longer be made to Bleed."],
["Bloodborne Rage","Whenever you are Seriously or Grievously Injured, you cannot Dodge or Parry. However, you may add 3 to all melee Damage."],
["Brightly-patterned Skin","This is a cosmetic change only."],
["Burning Body","Attacks made bare-handed gains the Fiery Quality (but you and your trappings are not harmed by these flames)."],
["Cancerous Protection","You permanently gain a +2 to Damage Threshold."],
["Centauroid",""],
["Chitinous Head",""],
["Clamorous Vocals",""],
["Cloud of Rot",""],
["Cloven Hooves",""],
["Conehead",""],
["Crow's Legs",""],
["Crown of Flesh",""],
["Crystalline Body",""],
["Cyclopean Eye",""],
["Demonic Tentacle",""],
["Doppelganger",""],
["Egghead",""],
["Elongated Neck",""],
["Evil Eye",""],
["Eyes Without A Face",""],
["Eyestalks",""],
["Fanged Maw",""],
["Fantastic Arms",""],
["Featherweight",""],
["Feathery Coat",""],
["Flaming Skull",""],
["Floating Fatman",""],
["Forestwalker",""],
["Froggy Eyes",""],
["Goat Horns",""],
["Hellish Visage",""],
["Horrific Stench",""],
["Hunchbacked",""],
["Hypnotic Glare",""],
["Infantile Transformation",""],
["Limb Transference",""],
["Mace-like Tail",""],
["Mad Hopper",""],
["Mane of Hair",""],
["Mangy Cur",""],
["Manikin",""],
["Material Instability",""],
["Mere-form",""],
["Metasoma",""],
["Misshapen Face",""],
["Monstrous Countenance",""],
["Moronic Mutation",""],
["Multiplication",""],
["Mutative Chimerism",""],
["Mutative Regeneration",""],
["Necrotic Atrophy",""],
["Obsidian Skin",""],
["Octopoid Suckers",""],
["Ouroboros",""],
["Petrified Limb",""],
["Pinhead",""],
["Plague-borne",""],
["Prehensile Tail",""],
["Prominent Ears",""],
["Pronounced Snout",""],
["Protean Growth",""],
["Protoplasmic Transformation",""],
["Puny Jumbo",""],
["Quadrumanibus",""],
["Quadruple Jointed",""],
["Roid Beast",""],
["Rotting Flesh",""],
["Seemingly Headless",""],
["Shrinky Dink",""],
["Skull-faced",""],
["Spiritual Instability",""],
["Spit Flames",""],
["Swinging Gait",""],
["The Thin Man",""],
["Thinktank",""],
["Third Eye",""],
["Translucent Skin",""],
["Transmutative Growth",""],
["Two Minds",""],
["Uncanny Resemblance",""],
["Uncontrollable Flatulence",""],
["Undulating Tail",""],
["Vestigial Twin",""],
["Vitriolic Excretion",""],
["Vividly-colored Skin",""],
["Vocal Oddity",""],
["Walk On Hands",""],
["Walking Head",""],
["Winged Horror",""],
["Wytchstone Mind",""],
["Zoological Mutation",""]
];

function parseNamesAny (NamesArray,AnyNames) {
    var x;
    var y;
    for (x in NamesArray) {
        if (NamesArray[x].indexOf("(Any one)") > -1 ) {
           for (y in AnyNames) {
               if ( (NamesArray[x]).localeCompare(AnyNames[y][0]) == 0  ) {
                NamesArray[x] = AnyNames[y][ Math.floor( Math.random() * ( AnyNames[y].length - 1 ) + 1 ) ];
                }
           }
       }
    }
    return NamesArray;
}


function dedupeName(NameArray) {
    var i;
    var j;
    var toremove = [];
    for (i = 0; i< (NameArray.length - 1); i += 1) {
        for (j = i + 1; j < (NameArray.length ) ; j += 1) {
            if( (NameArray[i]).localeCompare(NameArray[j]) == 0) { 
                toremove.push(j);
            }
        }
    }
    if (toremove.length > 0) {
        for (i in toremove) {
            NameArray.splice ( toremove[i] , 1);
        }
    }
    return NameArray;
}

function parseTrait2Stats (TraitArray) {
    var x;
    /* var StatsBonusName =   ["CB","BB","AB","PB","IB","WB","FB"]; */
    var stat = [0, 0, 0, 0, 0, 0, 0];
    var secondary = [0, 0, 0, 0, 0, 0, 0];
    var secondary = [0, 0, 0, 0, 0, 0, 0];
    var weapons = [];
    for (x in TraitArray) {
        switch (TraitArray[x]) {
            case "Brute Strength":
                stat[1] += 3;
                break;
            case "Masterfully Adroit":
                stat[2] += 3;
                break;
            case "Mindless":
                stat[4] += -10;
                stat[5] += -10;
                stat[6] += -10;
                break;

            case "Grossly Paranoid":
                secondary[0] += 3;
                break;
            case "Scar the Flesh":
                secondary[2] += 3;
                break;
            case "Taint of Chaos: Cancerous Protection":
                secondary[2] += 2;
                break;
            case "Serpentine Cloak":
                secondary[2] += 1;
    Trappings.push("Serpentine Cloak");
                break;
            case "Natural Armor (1)":
                secondary[2] += 1;
                break;
            case "Natural Armor (2)":
                secondary[2] += 2;
                break;
            case "Natural Armor (3)":
                secondary[2] += 3;
                break;
            case "Natural Armor (4)":
                secondary[2] += 4;
                break;
            case "Natural Armor (5)":
                secondary[2] += 5;
                break;
            case "Natural Armor (6)":
                secondary[2] += 6;
                break;
            case "Salt of the Earth":
                secondary[3] += 3;
                break;
   case "Acidic Spittle":
                weapons.push("<B>Acidic Spittle</B>: SR% . Distance (ranged 1+[PB] yards) . Load (1 AP) . Damage (Special) . None");
                break;
   case "Corrosive Bile":
                weapons.push("<B>Corrosive Bile</B>: SR% . Distance (ranged 1+[PB] yards) . Load (1 AP) . Damage [CB] . Slow");
                break;
   case "Shotgun Bang!":
   case "Blam!Blam!":
   case "Point Blanck":
                weapons.push("<B>Flintlock Pistol</B>: SR% . Distance (ranged 7 yards) . Load (3 AP) • Damage (5) . Gunpowder, Volatile");
    Trappings.push("<B>Flintlock Pistol</B>");
    Trappings.push("Gunpowder & shot (6)");
    break;
   case "Spit Fire":
                weapons.push("<B>Spit Fire</B>: SR% . Distance (ranged 3+[PB] yards) . Load (0 AP) . Damage (Special) . Shrapnel");
                break;
   case "Wall Crawler":
                weapons.push("<B>Wall Crawler Grasp</B>: SM% . Distance (ranged 3+[PB] yards) . Load (1 AP) . Damage (None) . Entangling, Ineffective, Throwing");
                break;
   case "Wind Kick":
                weapons.push("<B>Wind Kick</B>: SR% . Distance (melee engaged) . Damage (Special) . None");
                break;
   case "Flailing Tentacles":
                weapons.push("<B>Tentacles</B>: SM% . Distance (melee engaged or 3+[PB] yards) . Damage [CB] . Powerful, Reach");
                break;
   case "Ceremonial Runes":
                weapons.push("<B>Ceremonial Staff</B>: SM% . Distance (melee engaged or 1 yard) . Damage (CB or CB+1) . Adaptable, Pummeling, Reach");
                Trappings.push("<B>Ceremonial Staff</B>");
                break;
    case "Murderous Attack":
                weapons.push("<B>Garrote</B>: SM% . Distance (melee engaged) . Damage (None) . Entangling, Fast, Ineffective");
                Trappings.push("<B>Garrote</B>");
                break;
   case "Broken Gut-plate":
                Trappings.push("Gut-plate");
                break;
   case "Petrifying Gaze":
                Trappings.push("Creature Heart");
                break;
   case "Dionysian Delights":
                Trappings.push("Jug of wine");
                break;
   case "Smoke Bomb":
                Trappings.push("Smoke Bomb");
                break;
   case "Foul Mutation":  /*Ugly hack*/
    for (i =0;i<RiskN;i++) {
     var taint = Math.floor( Math.random() * TaintOfChaos.length);
     TraitArray.push( "Taint of Chaos: " + (TaintOfChaos.splice(taint,1))[0][0]);
    };
                break;
            default:
        }
    }
    return [stat,secondary,weapons];
}

function FindTraitDesc (traitIndex) {
 var x;
 var traitDesTxt;
 for (x in TraitDescription) {
 
  if (traitIndex == TraitDescription[x][0]) {
   traitDesTxt = TraitDescription[x][1];
  }
 }

 return traitDesTxt;
}
/*------ Start Rolling--------*/

var SpeciesRoll =  Math.floor(Math.random() *  SpeciesAll.length ) +1;

if  (SpeciesChoice>0) {
    SpeciesN = SpeciesChoice;
} else {
   SpeciesN = SpeciesRoll;
 };
SpeciesTxt = SpeciesAll[ SpeciesN - 1 ];


//var RiskNRadio;
//for (RiskNRadio=0;RiskNRadio<document.RiskSelection.Risk.length;RiskNRadio++){ 
//       if (document.RiskSelection.Risk[RiskNRadio].checked) 
//          break; 
//};
//RiskN = document.RiskSelection.Risk[RiskNRadio].value;

RiskN = -1;

if ( RiskN == -1 ) {
    RiskN = Math.floor(Math.random()*RiskAll.length);
};

RiskName = RiskAll[RiskN ];

//var NotchNRadio;
//for (NotchNRadio=0;NotchNRadio<document.NotchSelection.Notch.length;NotchNRadio++){ 
//       if (document.NotchSelection.Notch[NotchNRadio].checked) 
//          break; 
//};
//NotchN = document.NotchSelection.Notch[NotchNRadio].value;
Notch = -1;

if ( NotchN == -1 ) {
    NotchN = Math.floor(Math.random()*NotchAll.length);
};

NotchName = NotchAll[NotchN ];


//var SizeNRadio;
//for (SizeNRadio=0;SizeNRadio<document.SizeSelection.Size.length;SizeNRadio++){ 
//       if (document.SizeSelection.Size[SizeNRadio].checked) 
//          break; 
//};
//SizeN = document.SizeSelection.Size[SizeNRadio].value;
SizeN = -1;

if ( SizeN == -1 ) {
    SizeN = Math.floor(Math.random()*SizeAll.length);
 /* Non basic are rarely small, basic are never huge*/
 if (Math.random() < (RiskN/(RiskAll.length+1))) {
  SizeN = Math.min(SizeN+1,SizeAll.length-1);
 };
 if (Math.random() > (RiskN/(RiskAll.length+1))) {
  SizeN = Math.max(SizeN-1,0);
 };
};

SizeName = SizeAll[SizeN];

for (i in Stats) {
    var randStat =  Math.floor(Math.random()* StatsAll [ RiskN ].length );
    Stats[i] =  StatsAll [ RiskN ].splice(randStat,1);
};

for (i in Stats) {
    StatsBonus[i] =  Math.floor(Stats[i]/10);
};

var StatBonusVal = StatsBonusByRisk[RiskN][NotchN];

while (StatBonusVal) {
    var rand =  Math.floor(Math.random()* StatsBonus.length);
    if (StatsBonusAdvance[rand] < StatBonusMax[RiskN] ){
        StatsBonusAdvance[rand] += 1,
        StatBonusVal -= 1;
    };
};

if ( Math.random() < WeaponChance[SpeciesN - 1] ) {
    WeaponUser = 1;
 TraitsAll[RiskN] = TraitsAll[RiskN].concat(TraitsWeaponUserAll[RiskN]);
 Skills = Skills.concat(SkillsWeaponUser);
};

/*Abyssal creatures are almost always demons*/
if ((SpeciesN == 1) && (Math.random() > 0.5) ){
  TraitNames.push( "Horror of the Pit" );
};

for (i=TraitNames.length; i<TraitsByRisk[ RiskN ][NotchN]; i++) {
    var randTrait = Math.floor(Math.random() * TraitsAll[RiskN].length );
    TraitNames.push( TraitsAll[RiskN].splice(randTrait,1)[0]);
    /* Multiple exclusive trait*/
    if (Array.isArray(TraitNames[TraitNames.length-1])) {
        TraitNames[TraitNames.length-1] = TraitNames[TraitNames.length-1][ Math.floor(Math.random() * TraitNames[TraitNames.length-1].length ) ];
    };
 if (TraitNames[TraitNames.length-1].search("#") > -1) {
  var TraitArray = TraitNames[TraitNames.length-1].split("#");
  TraitNames[TraitNames.length-1] = TraitArray[0];
  TraitNames.push (TraitArray[1]);
  i += 1;
  if (TraitArray.length>2) { /*Ugly hack, replace for a proper loop*/
    TraitNames.push (TraitArray[2]);
    i += 1;
  };
 };
};

var SkillVal = SkillRanks[RiskN][NotchN];


if ( Math.random() < MageChance[SpeciesN - 1] ) {
    SkillNames.push("Incantation");
    SkillValues.push( SkillRanksMax[RiskN] );
    SkillVal -= SkillRanksMax[RiskN] ;
    Mage = 1;
    TraitsAll[RiskN] = TraitsAll[RiskN].concat(TraitsMageAll[RiskN]);
 Trappings.push("Arcane tome with " + (SkillRanksMax[RiskN]*3) + " Petty Magick spells");
 if (SkillRanksMax[RiskN]>1) {Trappings.push("Arcane tome with " + ((SkillRanksMax[RiskN]-1)*3) + " Lesser Magick spells");};
 if (SkillRanksMax[RiskN]>2) {Trappings.push("Arcane tome with " + ((SkillRanksMax[RiskN]-2)*3) + " Greater Magick spells");};
 Trappings.push("Reagents appropriate for Magicks (" + (SkillRanksMax[RiskN]*3+3) +")");
};

TraitNames = dedupeName(TraitNames);
TraitNames.sort();

while (SkillVal) {
    var rand =  Math.floor(Math.random()* Skills.length);
    var randrare =  Math.floor(Math.random()* SkillsRare.length);
    var randVal =  Math.min( Math.floor(Math.random()*  SkillRanksMax[RiskN] ) + 1, SkillVal );
    if ((Math.random()> StatsRareChance [ RiskN -1]) && (Skills.length > 0)) {
        SkillNames.push( Skills.splice(rand,1)[0]);
        SkillValues.push( randVal );
        SkillVal -= randVal;
    } else {
        SkillNames.push( SkillsRare.splice(randrare,1)[0] );
        SkillValues.push( randVal );
        SkillVal -= randVal;
    };
};

/* For lower risk we add couple of crappy simple weapons */
if (RiskN == 0) {
 WeaponsSimple = WeaponsSimple.concat(WeaponsSimpleLow);
};

var SkillVal = 0;

if (WeaponUser) {
 var MeleeSkill = "Simple Melee";
 for (i=0;i<SkillNames.length;i++) {
  if (SkillNames[i].includes("Melee") &&  SkillVal<SkillValues[i] ) {
   MeleeSkill = SkillNames[i];
   SkillVal = SkillValues[i];
  }
 };
 if (MeleeSkill == "Simple Melee") {
  Attacks.push(WeaponsSimple[Math.floor(Math.random()*WeaponsSimple.length)]);
 } else {
  Attacks.push(WeaponsMartial[Math.floor(Math.random()*WeaponsMartial.length)]);
 }; 
 Secondary[4] = SkillVal;
 Trappings.push(Attacks[Attacks.length-1].split(":")[0]);
 if (Math.random()>.7) {
	if (MeleeSkill == "Simple Melee") {
		Trappings.push("Leather armor");
		ArmorBonus = 1;
	}
	else {
		Trappings.push("Brigandine armor");
		ArmorBonus = 3;
	}
 };
};

var DodgeVal = 0;

for (i=0;i<SkillNames.length;i++) {
  if (SkillNames[i].includes("Coordination")) {
   DodgeVal = SkillValues[i];
   };
};



if (SizeN < 2) {
 WeaponsNatural[SpeciesN-1] = WeaponsNatural[SpeciesN-1].concat(WeaponsNaturalLow[SpeciesN-1]);
} else if (SizeN > 1) {
 WeaponsNatural[SpeciesN-1] = WeaponsNatural[SpeciesN-1].concat(WeaponsNaturalHigh[SpeciesN-1]);
};

if (Attacks.length == 0 || Math.random()<WeaponBothChance[SpeciesN-1] ) {
 Attacks.push(WeaponsNatural[SpeciesN-1][Math.floor(Math.random()*WeaponsNatural[SpeciesN-1].length)]);
 if (RiskN>1) {
  Attacks.push(WeaponsNatural[SpeciesN-1][Math.floor(Math.random()*WeaponsNatural[SpeciesN-1].length)]);
 };
};
var ParsedOutput = parseTrait2Stats(TraitNames);
StatsBonusTrait = ParsedOutput[0];
SecondaryBonusTrait = ParsedOutput[1];

if (StatsBonusTrait[4] < 0) {
 StatsBonus[4] = 0;
 StatsBonus[5] = 0;
 StatsBonus[6] = 0;
 StatsBonusTrait[4] = 0;
 StatsBonusTrait[5] = 0;
 StatsBonusTrait[6] = 0;
 StatsBonusAdvance[4] = 0;
 StatsBonusAdvance[5] = 0;
 StatsBonusAdvance[6] = 0;
 Stats[4] = 0;
 Stats[5] = 0;
 Stats[6] = 0;
};

if (ParsedOutput[2].length>0) {
 Attacks.push(ParsedOutput[2][0]);
};

Secondary[0] = 3 + StatsBonus[3]+StatsBonusAdvance[3]+StatsBonusTrait[3];
Secondary[1] = 3 + StatsBonus[2]+StatsBonusAdvance[2]+StatsBonusTrait[2];
Secondary[2] = StatsBonus[1]+StatsBonusAdvance[1]+StatsBonusTrait[1] + ArmorBonus;
Secondary[3] = 3 + StatsBonus[5]+StatsBonusAdvance[5]+StatsBonusTrait[5];
if (WeaponUser) {
 Secondary[4] =+ Stats[0] + (SkillVal*10);
};
Secondary[5] =+ Stats[2] + (DodgeVal*10);

/*Animals get Meat and hide*/
if ( SpeciesN == 2 ) {
 Trappings.push("Animal's Hide");
 Trappings.push("Animal's Meat ("+ (3 + 3 * SizeN) +")");
} else if ( SpeciesN == 3) {
 Trappings.push("Beast's Hide");
};

Trappings = dedupeName(Trappings);
Trappings.sort();

if (Trappings.length == 0) {
 Trappings.push("None");
}

//StatsTxt = "<table><tr>";
//for (i in StatsName) {
  //  StatsTxt += "<th><B>" + StatsName[i] +"</B></th>";
//}
StatsTxt += "</tr><tr style='text-align: right'>";
for (i in Stats) {
 //   StatsTxt += "<td>" + Stats[i] + "% ["+(StatsBonus[i]+StatsBonusAdvance[i]+StatsBonusTrait[i] )+"]</td>";
}
//StatsTxt += "</tr></tr>";
for (i in SecondaryName) {
  //  StatsTxt += "<th><B>" + SecondaryName[i] +"</B></th>";
}
//StatsTxt += "</tr><tr style='text-align: right'>";
for (i in Secondary) {
 //   StatsTxt += "<td>" + (Secondary[i]  +SecondaryBonusTrait[i]) + (i==4||i==5?"%":"") + (i==5&&ArmorBonus==0?"<br>Natural":"") + "</td>";
}
//StatsTxt += "</tr></table>";

for (i = 0; i < TraitNames.length ; i += 1) {
 //   var MouseOverTxt = ""; /*getMouseOverText (TraitNames[i],mouseoverTraits);*/
 //    TraitTxt += "<span title = '" + MouseOverTxt + "'><B>" + TraitNames[i] + "</B></span><br>";
 //    TraitTxt +=  FindTraitDesc(TraitNames[i]) +"</br>";
}

for (i = 0; i < SkillNames.length ; i += 1) {
 //   var MouseOverTxt = ""; /*getMouseOverText (SkillNames[i],mouseoverSkills);*/
 //   SkillTxt += "<span title = '" + MouseOverTxt + "'>" + SkillNames[i] + ": +" + SkillValues[i]*10 + "%</span>; ";
}

for (i = 0; i < Attacks.length ; i += 1) {
 //AttackProfileTxt += Attacks[i]+"<br>";
}

//TrappingTxt = Trappings.join(", ");

//refreshCharacterDisplay ();
let creaturedata = {
	name:"Generated "+SizeName+" "+SpeciesTxt+" Creature",
	type:"creature",
	primaryAttributes: {
        combat: {
            "value": Stats[0],
            "bonusAdvances": StatsBonusAdvance[0],
        },
        brawn: {
            "value": Stats[1],
            "bonusAdvances": StatsBonusAdvance[1],
        },
        agility: {
            "value": Stats[2],
            "bonusAdvances": StatsBonusAdvance[2],
        },
        perception: {
            "value": Stats[3],
            "bonusAdvances": StatsBonusAdvance[3],
        },
        intelligence: {
            "value": Stats[4],
            "bonusAdvances": StatsBonusAdvance[4],
        },
        willpower: {
            "value": Stats[5],
            "bonusAdvances": StatsBonusAdvance[5],
        },
        fellowship: {
            "value": Stats[6],
            "bonusAdvances": StatsBonusAdvance[7],
        }
    }

};

return [creaturedata,TraitNames,SkillNames,SkillValues,Trappings];
}

let creaturetotal = generateNPC(SpeciesPick);
Actor.create(creaturetotal[0])


}