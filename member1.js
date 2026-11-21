
// GET SAVED DATA

let artists = JSON.parse(localStorage.getItem("artists")) || [];
let artworks = JSON.parse(localStorage.getItem("artworks")) || [];

function saveArtists() {
    localStorage.setItem("artists", JSON.stringify(artists));
}

function saveArtworks() {
    localStorage.setItem("artworks", JSON.stringify(artworks));
}


// ===============================
// ARTIST MANAGEMENT
// ===============================

const artistForm = document.getElementById("artistForm");
const artistList = document.getElementById("artistList");

function displayArtists() {

    if (!artistList) return;

    artistList.innerHTML = "";

    artists.forEach((artist, index) => {

        const row = document.createElement("tr");

        [
            artist.id,
            artist.name,
            artist.email,
            artist.phone,
            artist.address
        ].forEach(value => {

            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);

        });

        const actions = document.createElement("td");

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";

        editButton.onclick = () => editArtist(index);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.onclick = () => deleteArtist(index);

        actions.append(editButton, deleteButton);

        row.appendChild(actions);
        artistList.appendChild(row);

    });
}


if (artistForm) {

    artistForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const artist = {

            id: Date.now(),

            name: document.getElementById("artistName").value.trim(),

            email: document.getElementById("artistEmail").value.trim(),

            phone: document.getElementById("artistPhone").value.trim(),

            address: document.getElementById("artistAddress").value.trim()

        };

        artists.push(artist);

        saveArtists();
        displayArtists();

        artistForm.reset();

        alert("Artist added successfully!");

    });

}


function editArtist(index) {

    const artist = artists[index];

    const newName = prompt("Enter new artist name:", artist.name);

    if (newName === null || newName.trim() === "") return;

    artist.name = newName.trim();

    saveArtists();
    displayArtists();

    alert("Artist updated successfully!");

}


function deleteArtist(index) {

    const artist = artists[index];

    const hasArtworks = artworks.some(
        artwork => artwork.artistId === artist.id
    );

    if (hasArtworks) {
        alert("This artist has artworks assigned. Delete those artworks first.");
        return;
    }

    if (confirm("Are you sure you want to delete this artist?")) {

        artists.splice(index, 1);

        saveArtists();
        displayArtists();

        alert("Artist deleted successfully!");

    }

}


// ===============================
// ARTWORK MANAGEMENT
// ===============================

const artworkForm = document.getElementById("artworkForm");
const artworkList = document.getElementById("artworkList");
const artworkArtist = document.getElementById("artworkArtist");


function loadArtists() {

    if (!artworkArtist) return;

    artworkArtist.innerHTML =
        '<option value="">Select Artist</option>';

    artists.forEach(artist => {

        const option = document.createElement("option");

        option.value = artist.id;
        option.textContent = artist.name;

        artworkArtist.appendChild(option);

    });

}


function displayArtworks() {

    if (!artworkList) return;

    artworkList.innerHTML = "";

    artworks.forEach((artwork, index) => {

        const row = document.createElement("tr");

        const artist = artists.find(
            a => a.id === artwork.artistId
        );

        const values = [
            artwork.id,
            artwork.name,
            artwork.category,
            "₹" + artwork.price,
            artwork.description,
            artist ? artist.name : "Not found"
        ];

        values.forEach(value => {

            const cell = document.createElement("td");

            cell.textContent = value;

            row.appendChild(cell);

        });

        const actions = document.createElement("td");

        const editButton = document.createElement("button");

        editButton.textContent = "Edit";

        editButton.onclick = () => editArtwork(index);

        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.onclick = () => deleteArtwork(index);

        actions.append(editButton, deleteButton);

        row.appendChild(actions);

        artworkList.appendChild(row);

    });

}


if (artworkForm) {

    artworkForm.addEventListener("submit", function(event) {

        event.preventDefault();

        if (artists.length === 0) {

            alert("Please add an artist first!");

            return;

        }

        const artwork = {

            id: Date.now(),

            name: document.getElementById("artworkName").value.trim(),

            category: document.getElementById("artworkCategory").value.trim(),

            price: document.getElementById("artworkPrice").value,

            description: document.getElementById("artworkDescription").value.trim(),

            artistId: Number(artworkArtist.value)

        };

        if (!artwork.artistId) {

            alert("Please select an artist!");

            return;

        }

        artworks.push(artwork);

        saveArtworks();

        displayArtworks();

        artworkForm.reset();

        alert("Artwork added successfully!");

    });

}


function editArtwork(index) {

    const artwork = artworks[index];

    const newName = prompt(
        "Enter new artwork name:",
        artwork.name
    );

    if (newName === null || newName.trim() === "") return;

    artwork.name = newName.trim();

    saveArtworks();
    displayArtworks();

    alert("Artwork updated successfully!");

}


function deleteArtwork(index) {

    if (confirm("Are you sure you want to delete this artwork?")) {

        artworks.splice(index, 1);

        saveArtworks();

        displayArtworks();

        alert("Artwork deleted successfully!");

    }

}


// ===============================
// INITIALIZE BOTH MODULES
// ===============================

displayArtists();

loadArtists();

displayArtworks();
