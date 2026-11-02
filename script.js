```javascript
const games = [
    {
        name: "Gorilla Tag",
        description: "A popular VR game!",
        votes: 0,
        likes: 0,
        icon: "🐵"
    },
    {
        name: "Minecraft",
        description: "Build and explore!",
        votes: 0,
        likes: 0,
        icon: "⛏️"
    },
    {
        name: "Roblox",
        description: "Play millions of games!",
        votes: 0,
        likes: 0,
        icon: "🎮"
    },
    {
        name: "BONELAB",
        description: "A physics VR sandbox!",
        votes: 0,
        likes: 0,
        icon: "🧪"
    }
];

// Load saved data
let savedGames = localStorage.getItem("moddingGames");

if (savedGames) {
    games.splice(0, games.length, ...JSON.parse(savedGames));
}

let votedGames = JSON.parse(
    localStorage.getItem("votedGames") || "[]"
);

let likedGames = JSON.parse(
    localStorage.getItem("likedGames") || "[]"
);

// Display games
function displayGames() {

    const gameList = document.getElementById("game-list");

    gameList.innerHTML = "";

    games.forEach((game, index) => {

        const card = document.createElement("div");

        card.className = "game-card";

        const title = document.createElement("h3");
        title.textContent = `${game.icon} ${game.name}`;

        const description = document.createElement("p");
        description.textContent = game.description;

        const voteButton = document.createElement("button");
        voteButton.className = "vote-btn";

        voteButton.textContent = votedGames.includes(index)
            ? "✓ Voted"
            : "🗳️ Vote";

        voteButton.onclick = () => voteGame(index);

        const voteCount = document.createElement("span");
        voteCount.textContent = ` ${game.votes} Votes`;

        const likeButton = document.createElement("button");
        likeButton.className = "like-btn";

        likeButton.textContent =
            `${likedGames.includes(index) ? "❤️" : "🤍"} ${game.likes}`;

        likeButton.onclick = () => likeGame(index);

        card.appendChild(title);
        card.appendChild(description);
        card.appendChild(voteButton);
        card.appendChild(voteCount);
        card.appendChild(likeButton);

        gameList.appendChild(card);
    });

    updateStats();
}

// Vote for a game
function voteGame(index) {

    if (votedGames.includes(index)) {
        alert("You already voted for this game!");
        return;
    }

    games[index].votes++;

    votedGames.push(index);

    saveData();
    displayGames();
}

// Like a game
function likeGame(index) {

    if (likedGames.includes(index)) {

        games[index].likes--;

        likedGames = likedGames.filter(
            id => id !== index
        );

    } else {

        games[index].likes++;

        likedGames.push(index);
    }

    saveData();
    displayGames();
}

// Add a game
document.getElementById("suggest-form")
.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("game-name")
        .value.trim();

    const description = document.getElementById("game-desc")
        .value.trim();

    if (!name) return;

    if (games.some(game =>
        game.name.toLowerCase() === name.toLowerCase()
    )) {
        alert("This game already exists!");
        return;
    }

    games.push({
        name: name,
        description: description || "Community game suggestion!",
        votes: 0,
        likes: 0,
        icon: "🎮"
    });

    saveData();
    displayGames();

    this.reset();

    alert("Game added successfully!");
});

// Update statistics
function updateStats() {

    document.getElementById("game-count").textContent =
        games.length;

    document.getElementById("vote-count").textContent =
        games.reduce((total, game) => total + game.votes, 0);

    document.getElementById("like-count").textContent =
        games.reduce((total, game) => total + game.likes, 0);
}

// Save everything
function saveData() {

    localStorage.setItem(
        "moddingGames",
        JSON.stringify(games)
    );

    localStorage.setItem(
        "votedGames",
        JSON.stringify(votedGames)
    );

    localStorage.setItem(
        "likedGames",
        JSON.stringify(likedGames)
    );
}

// Start website
displayGames();
```
