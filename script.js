// Liste des paires : 2 images différentes mais même "id"
const pairs = [
  { id: "chien", img: "images/chien1.png" },
  { id: "chien", img: "images/chien2.png" },

  { id: "chat", img: "images/chat1.png" },
  { id: "chat", img: "images/chat2.png" },

  { id: "voiture", img: "images/voiture1.png" },
  { id: "voiture", img: "images/voiture2.png" }
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
