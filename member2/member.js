// Get saved exhibitions
let exhibitions = JSON.parse(
    localStorage.getItem("exhibitions")
) || [];

// Get HTML elements
const exhibitionForm = document.getElementById("exhibitionForm");
const exhibitionList = document.getElementById("exhibitionList");

// Save exhibitions
function saveExhibitions() {
    localStorage.setItem(
        "exhibitions",
        JSON.stringify(exhibitions)
    );
}

// Display exhibitions
function displayExhibitions() {
    exhibitionList.innerHTML = "";

    exhibitions.forEach((exhibition, index) => {
        const row = document.createElement("tr");

        const values = [
            exhibition.id,
            exhibition.name,
            exhibition.theme,
            exhibition.startDate,
            exhibition.endDate,
            exhibition.description
        ];

        values.forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        // Edit button
        const actions = document.createElement("td");

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.onclick = () => editExhibition(index);

        // Delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => deleteExhibition(index);

        actions.append(editButton, deleteButton);
        row.appendChild(actions);

        exhibitionList.appendChild(row);
    });
}

// Add exhibition
exhibitionForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("exhibitionName").value.trim();
    const theme = document.getElementById("exhibitionTheme").value.trim();
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    const description = document.getElementById("description").value.trim();

    if (endDate < startDate) {
        alert("End date cannot be before start date!");
        return;
    }

    const exhibition = {
        id: Date.now(),
        name: name,
        theme: theme,
        startDate: startDate,
        endDate: endDate,
        description: description
    };

    exhibitions.push(exhibition);

    saveExhibitions();
    displayExhibitions();

    exhibitionForm.reset();

    alert("Exhibition added successfully!");
});

// Edit exhibition
function editExhibition(index) {
    const exhibition = exhibitions[index];

    const newName = prompt(
        "Enter new exhibition name:",
        exhibition.name
    );

    if (newName === null || newName.trim() === "") {
        return;
    }

    exhibition.name = newName.trim();

    saveExhibitions();
    displayExhibitions();

    alert("Exhibition updated successfully!");
}

// Delete exhibition
function deleteExhibition(index) {
    if (confirm("Are you sure you want to delete this exhibition?")) {
        exhibitions.splice(index, 1);

        saveExhibitions();
        displayExhibitions();

        alert("Exhibition deleted successfully!");
    }
}

// Load saved exhibitions
displayExhibitions();