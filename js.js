
const gameModeHard = document.querySelector("#hard"); 
const gameModeMedium = document.querySelector("#medium"); 
const gameModeEasy = document.querySelector("#easy"); 
const gameContainer = document.querySelector("#game");
const container = document.querySelector('.game-container'); 
const checkGame = document.getElementById('game');
let noClicking = false;
let cardsFlipped = 0;
let card1 = null;
let card2 = null;

const COLORS = []; 
function colorPicker(grid){
    for(let i = 0; i < grid; i++){
        
        var red = Math.floor(Math.random() * 256); 
        var green = Math.floor(Math.random() * 256); 
        var blue = Math.floor(Math.random() * 256); 
        let colorPicked = `rgb(${red},${green},${blue})`;
        //Appends color twice to have pairs 
        COLORS.push(colorPicked); 
        COLORS.push(colorPicked); 
        
    } 
    shuffle(COLORS);
}


function shuffle(array) {
    let counter = array.length;
  
    // While there are elements in the array
    while (counter > 0) {
      // Pick a random index
      let index = Math.floor(Math.random() * counter);
  
      // Decrease counter by 1
      counter--;
  
      // And swap the last element with it
      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }
    // return array;
    populateGame(array);
}


let counter = 0;
function populateGame(colors){

    for(let color of colors){
        
        const scene = document.createElement('div'); 
        scene.classList.add('scene'); 
        scene.classList.add('scene--card'); 
        
        const card = document.createElement("div");
        card.classList.add(color);
        card.classList.add('card');
        

        const card_face_front = document.createElement('div'); 
        card_face_front.classList.add('card__face');
        card_face_front.classList.add('card__face--front');

        const card_face_back = document.createElement('div'); 
        //card_face_back.classList.add(color);
        card_face_back.classList.add('card__face');
        card_face_back.classList.add('card__face--back');
    
        
        
        card.addEventListener("click", handleCardClick);
        
        card_face_front.appendChild(card_face_back); 
        card.appendChild(card_face_front); 
        scene.appendChild(card); 

        container.appendChild(scene); 

    }
    populateColors(); 
    
}

populateColors();
function populateColors(colors){
    const getAll = document.querySelectorAll('.card');
    console.log(getAll[0]);
    
    for(let current_card of getAll){
        current_card.style.backgroundColor = current_card.classList[0];   
    }
}


function handleCardClick(e) {
    
    if (noClicking) return;
    if (e.target.parentElement.classList.contains("is-flipped")) return;
    
    let currentCard = e.target.parentElement;
    //readds color back when card is flipped again
    e.target.parentElement.style.backgroundColor = e.target.parentElement.classList[0];
     
    if (!card1 || !card2) {
      console.log(`!card1 ${!card1}, !card2 ${!card2}`);
      currentCard.classList.add('is-flipped');
      card1 = card1 || currentCard;
      card2 = currentCard === card1 ? null : currentCard;
    }
  
    if (card1 && card2) {
      noClicking = true;
      // debugger
      let gif1 = card1.className;
      let gif2 = card2.className;
  
      if (gif1 === gif2) {
        cardsFlipped += 2;
        card1.removeEventListener("click", handleCardClick);
        card2.removeEventListener("click", handleCardClick);
        card1 = null;
        card2 = null;
        noClicking = false;
      } else {
        setTimeout(function() {
          card1.style.backgroundColor = "";
          card2.style.backgroundColor = "";
          card1.classList.toggle('is-flipped');
          card2.classList.toggle('is-flipped');
          card1 = null;
          card2 = null;
          noClicking = false;
        }, 1000);
      }
    }
    
    if (cardsFlipped === COLORS.length){
        alert("YOU WIN!");
        }
}

gameModeEasy.addEventListener("click", function(e){
    colorPicker(6) 
})
gameModeMedium.addEventListener("click", function(e){
    colorPicker(8) 
})
gameModeHard.addEventListener("click", function(e){ 
    colorPicker(12); 

})
 
