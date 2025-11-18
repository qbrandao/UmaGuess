// Liste des paires : 2 images différentes mais même "id"
const pairs = [
  { id: "tokaiteio", img: "images/tokaiteio_u.png" },
  { id: "tokaiteio", img: "images/tokaiteio_h.png" },
  
  { id: "mcqueen", img: "images/mcqueen_u.png" },
  { id: "mcqueen", img: "images/mcqueen_h.png" }
];

// Mélange des cartes
let cards = [...pairs].sort(() => Math.random() - 0.5);

const game = document.getElementById("game");

let first = null;
let second = null;
let lock = false;

// Création des cartes
cards.forEach(cardData => {
  const card = document.createElement("div");
  card.className = "card";
  card.dataset.id = cardData.id;

  const img = document.createElement("img");
  img.src = cardData.img;
  card.appendChild(img);

  game.appendChild(card);

  card.addEventListener("click", () => {
    if (lock || card === first || card.classList.contains("matched")) return;

    card.classList.add("revealed");

    if (!first) {
      first = card;
    } else {
      second = card;
      lock = true;

      if (first.dataset.id === second.dataset.id) {
        // Paire trouvée !
        first.classList.add("matched");
        second.classList.add("matched");

        reset();
      } else {
        // Pas la bonne paire
        setTimeout(() => {
          first.classList.remove("revealed");
          second.classList.remove("revealed");
          reset();
        }, 800);
      }
    }
  });
});

function reset() {
  first = null;
  second = null;
  lock = false;
}
