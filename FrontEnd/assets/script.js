// Fonction des works
// Récupération des fichiers JSON works
const fetchWorks = async () => {
    const data = await fetch('http://localhost:5678/api/works')
        .then(response => response.json())
        .catch(error => console.error(error));
    return data;
}

const displayWorks = async (category) => {
    // Supprimé les works actuel
    document.getElementById("gallery").innerHTML = "";

    // Récupération des works
    const works = await fetchWorks();

    // Filtrage des works si une categorie existe
    const filteredWorks = category ? works.filter((work) => work.category.name === category.name) : works;
    filteredWorks.forEach(work => {
        const figure = document.createElement('figure');
        figure.innerHTML = `
        <img src="${work.imageUrl}" alt="${work.title}" data-category="${work.category}">
        <figcaption>${work.title}</figcaption>
    `;
        document.getElementById('gallery').appendChild(figure);
    });
}

// Fonctions des catégories
const fetchCategories = async () => {
    const data = await fetch('http://localhost:5678/api/categories')
        .then(response => response.json())
        .catch(error => console.error(error));
    return data;
}

const displayCategories = async () => {
    const categories = await fetchCategories();

    // Création du bouton "Tous"
    createButtonCategory();

    // Création des autres boutons
    categories.forEach(category => {
        createButtonCategory(category);
    });
}

const createButtonCategory = (category) => {
    const button = document.createElement('button');
    button.textContent = category ? category.name : "Tous";
    button.className = `category ${!category ? "active" : ""}`;
    button.addEventListener("click", () => addButtonCategoryListener(button, category));
    document.getElementById('myBtnContainer').appendChild(button);
}

const addButtonCategoryListener = (button, category) => {
    const activeButton = document.querySelector(".category.active");
    activeButton.classList.remove("active");
    button.classList.add('active');
    displayWorks(category)
}

// Initialisation
displayWorks();
displayCategories();