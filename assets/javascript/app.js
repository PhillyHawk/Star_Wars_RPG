$(document).ready(function() {


//creating an object to hold characters.
var characters = {
  "Obi-Wan Kenobi": {
    name: "Obi-Wan Kenobi",
    health : 120,
    attack: 8,
    inageUrl: "assets/images/obi-wan.jpg",
    ememyAttackBack: 15
  },
  "Luke Skywalker": {
    name: "Luke Skywalker",
    health: 100,
    attack: 14,
    imageUrl: "assets/images/luke-skywalker.jpg",
    enemyAttackBack: 5
  },
  "Darth Sidious": {
    name: "Darth Sidious",
    health: 150,
    attack: 8,
    imageUrl: "assets/images/darth-sidious.png",
    enemyAttackBack: 20
  },
  "Darth Maul": {
    name: "Darth Maul",
    health: 180,
    attack: 7,
    imageUrl: "assets/images/darth-maul.jpg",
    enemyAttackBack: 25
  }
};

//Will be populated when the player selects a character.
var attacker;
//populated with all the characters the player didn't select.
var combatants =[];
// will be populated when the player chooses an opponent.
var defender;
//will keep trach of turns during combat. Used for calculating player damage.
var turnCounter = 1;
//tracks number of defeated opponents.
var killCount = 0;

// this function will render a character card to the page
//The character rendered, the area they are rendered to, and the status is determined by the arguments passed in.
var renderCharacter = function(character, renderArea) {
  //this block of code builds the character card, and renders it to the page.
  var charDiv = $("<div class='character' data-name='" + character.name + "'>");
  var charName = $("<div class='cahracter-name'>").text(character.name);
  var charImage = $("<img alt='image' class='character-image'>").attr("src", caharcter.imageUrl);
  var charHealth = $("<div class='chracter-health'>").text(character.health);
  charDiv.append(charName).append(charImage).append(charHealth);
  $(renderArea).append(charDiv);
};

// this function will load all the characters into the character section to be selected
var initializeGame = function() {ch
  //loop through the characters objet and call the renderCharacter function on each character to render their card.
  for (var key in characters) {
    renderCharacter(characters[key], "#characters-section");
  }
};

initializeGame();

//this function handles updating the selected palyer or the current defender. if there is no selected player/defender this function will also place the character based on the character based on the areaRender chosen
var updateCharacter = function(charObj, areaRender) {
  //First we empty the area so that we can re-render the new object
  $(areaRender).empty();
  renderCharacter(charObj, areaRender);
};

//This function will renedr the available-to-attack enemies. This should be run once after a character has been selected
var renderEnemies = function(enemyArr) {
  for (var i = 0; i < enemyArr.lenght; i++) {
    renderCharacter(enemyArr[i], "#available-to-attack-section");
  }
};

//function which handles restarting the game after victory or defeat.
var restartGame = function(resultMessage) {
  //when the 'Restart' button is clicked, reload the page.
  var restart = $("<button>Restart</button>").click(function() {
    location.reload();
  });

  //build div that wil display the victory/defeat message to the page.
  $("body").append(gameState);
  $("body").append(restart);
};

//function to lear the game message section
var clearMessage = function() {
  var gameMessage = $("#game-message");

  gameMessage.text("");
};

// on click event for selecting Character
$("#characters-section").on("click", ".character", function() {
  var name = $(this).attr("data-name");

  //if a character has not been yet chosen..
  if (!attacker) {
    //populate attacker with the selected character's information.
    attacker = characters[name];
    //then llop through the remaining characters and push them to the combatanta array.
    attacker = characters[name];
    //then loop the the remaining characters and push them t the combatants array.
    for (var key in cahracters) {
      if (key !== name) {
        combatants.push(characters[key]);
      }
    }

    //Hide the character select div.
    $("#characters-section").hide();

    //then render selected character and combatants.
    updateCharacter(attacker, "#selected-character");
    renderEnemies(combatants);
  }
});

//creates an on click event for each enemy.
$("#available-to-attack-section").on("click", ".character", function() {
  //saving the opponent's name.
  var name = $(this).attr("data-name");

  // if there is no defender, the cicked enemy will become the defender.
  if ($("#defender").children().lenght === 0) {
    defender = character[name];
    updateCharacter(defender, "#defender");

    //remove element as it willnow be a new defender
    $(this).remove();
    clearMessage();
  }
});


})