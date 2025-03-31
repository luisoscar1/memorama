let sprites = [];  
let cards = [];  
let flippedCards = [];    
let pokemonIndices = [];  

function preload() {
  let uniquePokemon = 10;  
  for (let i = 1; i <= uniquePokemon; i++) {
    pokemonIndices.push(i, i);  
  }
  shuffle(pokemonIndices, true);  
  
  for (let i = 0; i < 20; i++) {
    let url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndices[i]}.png`;
    sprites[i] = loadImage(url);  
  }
}

function setup() {
  createCanvas(500, 400);
  background(220);
  let xOffset = 50;  
  let yOffset = 50;  
  let index = 0;

  for (let i = 0; i < 4; i++) {  
    for (let j = 0; j < 5; j++) {  
      cards.push({
        x: xOffset + j * 70,  
        y: yOffset + i * 100,  
        index: index,  
        flipped: false,  
        matched: false 
      });
      index++;
    }
  }
}

function draw() {
  background(220);
  for (let card of cards) {
    if (card.flipped || card.matched) {  
      image(sprites[card.index], card.x, card.y, 50, 50);  
    } else {
      fill(150);  
      rect(card.x, card.y, 50, 50); 
    }
  }
}
function mousePressed() {
  for (let card of cards) {
    if (
      mouseX > card.x && mouseX < card.x + 50 &&
      mouseY > card.y && mouseY < card.y + 50 &&
      !card.flipped && !card.matched
    ) {
      card.flipped = true;
      flippedCards.push(card);

      if (flippedCards.length === 2) {
        let card1 = flippedCards[0];
        let card2 = flippedCards[1];

         if (pokemonIndices[card1.index] === pokemonIndices[card2.index]) {
          card1.matched = true;
          card2.matched = true;
        } else {
          setTimeout(() => {
            card1.flipped = false;
            card2.flipped = false;
          }, 1000);
        }
        flippedCards = [];
      }
      break;
    }
  }
}

