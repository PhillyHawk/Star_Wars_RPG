$(document).ready(function() {




  //creating an object to hold characters.
var characters = {
  "Obi-Wan Kenobi": {
    name: "Obi-Wan Kenobi",
    health : 120,
    attack: 8,
    imageUrl: "assets/images/obi-wan.jpg",
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
var combatants = [];
// will be populated when the player chooses an opponent.
var defender;
//will keep trach of turns during combat. Used for calculating player damage.
var turnCounter = 1;
//tracks number of defeated opponents.
var killCount = 0;




// This function will render a character card to the page.
  // The character rendered, the area they are rendered to, and their status is determined by the arguments passed in.
  var renderCharacter = function(character, renderArea) {
    // This block of code builds the character card, and renders it to the page.
    var charDiv = $("<div class='character' data-name='" + character.name + "'>");
    var charName = $("<div class='character-name'>").text(character.name);
    var charImage = $("<img alt='image' class='character-image'>").attr("src", character.imageUrl);
    var charHealth = $("<div class='character-health'>").text(character.health);
    charDiv.append(charName).append(charImage).append(charHealth);
    $(renderArea).append(charDiv);
  };

  // this function will load all the characters into the character section to be selected
  var initializeGame = function() {
    // Loop through the characters object and call the renderCharacter function on each character to render their card.
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
  for (var i = 0; i < enemyArr.length; i++) {
    renderCharacter(enemyArr[i], "#available-to-attack-section");
  }
};

// Function to handle rendering game messages.
var renderMessage = function(message) {
  // Builds the message and appends it to the page.
  var gameMessageSet = $("#game-message");
  var newMessage = $("<div>").text(message);
  gameMessageSet.append(newMessage);
};

//function which handles restarting the game after victory or defeat.
var restartGame = function(resultMessage) {
  //when the 'Restart' button is clicked, reload the page.
  var restart = $("<button>Restart</button>").click(function() {
    location.reload();
  });

  //build div that wil display the victory/defeat message to the page.
  var gameState = $("<div>").text(resultMessage);


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
    
    //then loop the the remaining characters and push them t the combatants array.
    for (var key in characters) {
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
  if ($("#defender").children().length === 0) {
    defender = characters[name];
    updateCharacter(defender, "#defender");

    //remove element as it will now be a new defender
    $(this).remove();
    clearMessage();
  }
});

//click the attack button, run the following game logic..
$("#attack-button").on("click", function() {
  //if there is a defender, combat will occur.
  if ($("#defender").children().length !== 0) {
    //creates message for attack and opponents counter attack.
    var attackMessage = "You attacked " + defender.name + " for " + attacker.attack * turnCounter + " damage.";
    var counterAttackMessage = defender.name + " atacked you back for " + defender.enemyAttackBack + " damage.";
    clearMessage();

    //Reduce defender's health by attack value.
    defender.health -= attacker.attack * turnCounter;

    //if the enemy still has health..
    if (defender.health > 0) {
      //render the enemy's updated character card.
      updateCharacter(defender, "#defender");

      //render the combat messages.
      renderMessage(attackMessage);
      renderMessage(counterAttackMessage);

      //reduce health by the opponent's attack value.
      attacker.health -= defender.enemyAttackBack;

      //rernder the player's updated character card.
      updateCharacter(attacker, "#selecter-character");

      // if there is less than zero health the game ends.
      if (attacker.health <= 0) {
        clearMessage();
        restartGame("You have been defeated...GAME OVER!!!");
        $("#attack-button").off("click");
      }
    }
    else {
      $("#defender").empty();

      var gameStateMessage = "You have defeated " + defender.name +", you can choose to fight another enemy.";
      renderMessage(gameStateMessage);

      //increment kill count
      killCount++;

      //if all are oppents are killed game is won
      if (killCount >= combatants.length) {
        clearMessage();
        restartGame("You Won!!! GAME OVER!!!");
      }
    }
    //increment turn counter. This is used for determining how much damage the player does.
    turnCounter++;
  }
  else {
    clearMessage();
    renderMessage("No enemy here.")
  }
});
});