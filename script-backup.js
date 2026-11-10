
// Load saved data from browser
let artists = JSON.parse(localStorage.getItem("artists")) || [];
let artworks = JSON.parse(localStorage.getItem("artworks")) || [];

// Save data
function saveData() {
    localStorage.setItem("artists", JSON.stringify(artists));
    localStorage.setItem("artworks", JSON.stringify(artworks));
}

// Artist form
document.getElementById("artistForm")
.addEventListener("submit", function(event) {
    event.preventDefault();

    const artist = {
        id: Date.now().toString(),
        name: document.getElementById("artistName").value.trim(),
        email: document.getElementById("artistEmail").value.trim(),
        phone: document.getElementById("artistPhone").value.trim(),
        bio: document.getElementById("artistBio").value.trim()
    };

    if (!artist.name || !artist.email) return;

    artists.push(artist);
    saveData();
    this.reset();
    displayArtists();
    displayArtworks();
});

// Display artists
function displayArtists() {
    const list = document.getElementById("artistList");
    list.replaceChildren();

    const dropdown = document.getElementById("artworkArtist");
    dropdown.replaceChildren(new Option("Select Artist", ""));

    artists.forEach(artist => {
        const option = new Option(artist.name, artist.id);
        dropdown.add(option);

        const card = document.createElement("div");
        card.className = "record";

        const title = document.createElement("h3");
        title.textContent = artist.name;

        const email = document.createElement("p");
        email.textContent = "Email: " + artist.email;

        const phone = document.createElement("p");
        phone.textContent = "Phone: " + artist.phone;

        const bio = document.createElement("p");
        bio.textContent = "Biography: " + artist.bio;

        const edit = document.createElement("button");
        edit.textContent = "Edit";
        edit.addEventListener("click", () => editArtist(artist.id));

        const remove = document.createElement("button");
        remove.textContent = "Delete";
        remove.className = "delete";
        remove.addEventListener("click", () => deleteArtist(artist.id));

        card.append(title, email, phone, bio, edit, remove);
        list.append(card);
    });
}

// Edit artist
function editArtist(id) {
    const artist = artists.find(a => a.id === id);
    if (!artist) return;

    const name = prompt("Artist name:", artist.name);
    if (name === null) return;
    if (!name.trim()) {
        alert("Name cannot be empty.");
        return;
    }

    const email = prompt("Email:", artist.email);
    if (email === null) return;

    const phone = prompt("Phone:", artist.phone);
    if (phone === null) return;

    const bio = prompt("Biography:", artist.bio);
    if (bio === null) return;

    artist.name = name.trim();
    artist.email = email.trim();
    artist.phone = phone.trim();
    artist.bio = bio.trim();

    saveData();
    displayArtists();
    displayArtworks();
}

// Delete artist
function deleteArtist(id) {
    const linkedArtworks = artworks.some(a => a.artistId === id);

    if (linkedArtworks) {
        alert("This artist has artworks. Delete or reassign those artworks first.");
        return;
    }

    if (!confirm("Delete this artist?")) return;

    artists = artists.filter(a => a.id !== id);
    saveData();
    displayArtists();
}

// Artwork form
document.getElementById("artworkForm")
.addEventListener("submit", function(event) {
    event.preventDefault();

    const artwork = {
        id: Date.now().toString(),
        name: document.getElementById("artworkName").value.trim(),
        artistId: document.getElementById("artworkArtist").value,
        category: document.getElementById("artworkCategory").value.trim(),
        price: document.getElementById("artworkPrice").value,
        description: document.getElementById("artworkDescription").value.trim()
    };

    if (!artwork.name || !artwork.artistId) {
        alert("Enter an artwork name and select an artist.");
        return;
    }

    artworks.push(artwork);
    saveData();
    this.reset();
    displayArtworks();
});

// Display artworks
function displayArtworks() {
    const list = document.getElementById("artworkList");
    list.replaceChildren();

    artworks.forEach(artwork => {
        const artist = artists.find(a => a.id === artwork.artistId);

        const card = document.createElement("div");
        card.className = "record";

        const title = document.createElement("h3");
        title.textContent = artwork.name;

        const artistName = document.createElement("p");
        artistName.textContent = "Artist: " + (artist ? artist.name : "Unknown");

        const category = document.createElement("p");
        category.textContent = "Category: " + artwork.category;

        const price = document.createElement("p");
        price.textContent = "Price: " + (artwork.price || "Not specified");

        const description = document.createElement("p");
        description.textContent = "Description: " + artwork.description;

        const edit = document.createElement("button");
        edit.textContent = "Edit";
        edit.addEventListener("click", () => editArtwork(artwork.id));

        const remove = document.createElement("button");
        remove.textContent = "Delete";
        remove.className = "delete";
        remove.addEventListener("click", () => deleteArtwork(artwork.id));

        card.append(title, artistName, category, price, description, edit, remove);
        list.append(card);
    });
}

// Edit artwork
function editArtwork(id) {
    const artwork = artworks.find(a => a.id === id);
    if (!artwork) return;

    const name = prompt("Artwork name:", artwork.name);
    if (name === null) return;
    if (!name.trim()) {
        alert("Artwork name cannot be empty.");
        return;
    }

    const artistId = prompt(
        "Enter an existing Artist ID:\n" +
        artists.map(a => `${a.name}: ${a.id}`).join("\n"),
        artwork.artistId
    );
    if (artistId === null) return;
    if (!artists.some(a => a.id === artistId)) {
        alert("Invalid Artist ID.");
        return;
    }

    const category = prompt("Category:", artwork.category);
    if (category === null) return;

    const price = prompt("Price:", artwork.price);
    if (price === null) return;

    const description = prompt("Description:", artwork.description);
    if (description === null) return;

    artwork.name = name.trim();
    artwork.artistId = artistId;
    artwork.category = category.trim();
    artwork.price = price;
    artwork.description = description.trim();

    saveData();
    displayArtists();
    displayArtworks();
}

// Delete artwork
function deleteArtwork(id) {
    if (!confirm("Delete this artwork?")) return;

    artworks = artworks.filter(a => a.id !== id);
    saveData();
    displayArtworks();
}

// Show saved records when page opens
displayArtists();
displayArtworks();
