// Fonction des works
// Récupération des fichiers JSON works
const fetchWorks = async () => {
  const data = await fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .catch((error) => console.error(error));
  return data;
};

const displayWorks = async (category) => {
  // Supprimé les works actuel
  document.getElementById("gallery").innerHTML = "";

  // Récupération des works
  const works = await fetchWorks();

  // Filtrage des works si une categorie existe
  const filteredWorks = category
    ? works.filter((work) => work.category.name === category.name)
    : works;
  filteredWorks.forEach((work) => {
    const figure = document.createElement("figure");
    figure.innerHTML = `
        <img src="${work.imageUrl}" alt="${work.title}" data-category="${work.category}">
        <figcaption>${work.title}</figcaption>
    `;
    document.getElementById("gallery").appendChild(figure);
  });
};

const deleteWork = async (id, photoContainer) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`http://localhost:5678/api/works/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.ok;
};

// Fonctions des catégories
const fetchCategories = async () => {
  const data = await fetch("http://localhost:5678/api/categories")
    .then((response) => response.json())
    .catch((error) => console.error(error));
  return data;
};

const displayCategories = async () => {
  const categories = await fetchCategories();

  // Création du bouton "Tous"
  createButtonCategory();

  // Création des autres boutons
  categories.forEach((category) => {
    createButtonCategory(category);
  });
};
// Création des boutons
const createButtonCategory = (category) => {
  const button = document.createElement("button");
  button.textContent = category ? category.name : "Tous";
  button.className = `category ${!category ? "active" : ""}`;
  button.addEventListener("click", () =>
    addButtonCategoryListener(button, category)
  );
  document.getElementById("myBtnContainer").appendChild(button);
};
// Fonction de changement de catégories
const addButtonCategoryListener = (button, category) => {
  const activeButton = document.querySelector(".category.active");
  activeButton.classList.remove("active");
  button.classList.add("active");
  displayWorks(category);
};

// Initialisation
displayWorks();
displayCategories();

// Ajoutez un gestionnaire d'événement lorsque le document est chargé
document.addEventListener("DOMContentLoaded", () => {
  // Redirection de l'utilisateur si il est déjà connecté
  const token = localStorage.getItem("token");
  if (token) {
    // Cacher la liste des filtres
    const myBtnContainer = document.getElementById("myBtnContainer");
    if (myBtnContainer) {
      myBtnContainer.style.display = "none";
    }

    // Afficher le bouton modifier
    const editButton = document.getElementById("modifier");
    if (editButton) {
      editButton.style.display = "block";
    }

    // Lien de connexion dans la navbar
    const loginLink = document.getElementById("login-link");
    if (loginLink) {
      loginLink.addEventListener("click", (event) => {
        event.preventDefault();
        localStorage.removeItem("token");
        loginLink.textContent = "login";
        // Cacher le bouton modifier
        editButton.style.display = "none";
        // Afficher la liste des filtres
        myBtnContainer.style.display = "flex";
      });
      loginLink.textContent = "logout";
    }
  }
});
