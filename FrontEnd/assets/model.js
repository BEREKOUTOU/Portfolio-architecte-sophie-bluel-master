// Obtenir des éléments DOM
const modal1 = document.getElementById("modal1");
const modal2 = document.getElementById("modal2");
const showModalBtn = document.querySelector(".show-modal");
const closeBtn = document.querySelector(".fa-close");
const closeAddModalBtn = document.querySelector(".close-add-modal");
const addPhotoBtn = document.querySelector(".ajouter-une-photo");
const returnToGalleryBtn = document.querySelector(".retour-galerie");
const photoUploadInput = document.getElementById("photo-upload");
const previewImage = document.getElementById("preview-image");
const addPhotoForm = document.getElementById("add-photo-form");
const validateBtn = document.querySelector(".valider-btn");
const imageIcon = document.querySelector(".fa-image");
const categorySelect = document.getElementById("category");

// Fonction pour ouvrir le modal principal
const openModal = (e) => {
  e.preventDefault();
  modal1.style.display = "flex";
  modal1.setAttribute("aria-hidden", "false");
  modal1.setAttribute("aria-modal", "true");

  document.querySelector(".galerie-photo .grid").innerHTML = "";

  displayModalWorks();
};
// Fonction pour afficher les photos du modal principal
const displayModalWorks = async () => {
  const works = await fetchWorks();
  for (let i = 0; i < works.length; i++) {
    const work = works[i];
    addPhotoToGallery(work);
  }
};

// Fonction pour fermer le modal principal
const closeModal = () => {
  modal1.style.display = "none";
  modal1.setAttribute("aria-hidden", "true");
  modal1.setAttribute("aria-modal", "false");
};

// Fonction pour ouvrir le modal d'ajout de photo
const openAddPhotoModal = (e) => {
  e.preventDefault();
  modal1.style.display = "none";
  modal2.style.display = "flex";
  modal2.setAttribute("aria-hidden", "false");
  modal2.setAttribute("aria-modal", "true");

  resetForm();
  createCategoryOptions();
};
// Fonction pour créer les options de catégorie
const createCategoryOptions = async () => {
  const categories = await fetchCategories();
  categorySelect.innerHTML =
    '<option value="">Sélectionner une catégorie</option>';

  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.id;
    option.textContent = category.name;

    categorySelect.appendChild(option);
  });
};

// Fonction pour fermer le modal d'ajout de photo
const closeAddPhotoModal = () => {
  modal2.style.display = "none";
  modal2.setAttribute("aria-hidden", "true");
  modal2.setAttribute("aria-modal", "false");
  resetForm();
};

// Fonction pour retourner à la galerie
const returnToGallery = () => {
  closeAddPhotoModal();
};

// Fonction pour prévisualiser l'image
const handlePhotoUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    if (file.size > 4 * 1024 * 1024) {
      // 4Mo max
      alert(
        "Le fichier est trop volumineux. Veuillez choisir un fichier de moins de 4Mo."
      );
      resetForm();
      return;
    }
    // Vérifier l'extension du fichier
    const extension = file.name.split(".").pop().toLowerCase();
    if (!["jpg", "jpeg", "png"].includes(extension)) {
      alert("Veuillez choisir un fichier image au format JPG, JPEG ou PNG.");
      resetForm();
      return;
    }
    // Vérifier le type de fichier
    if (!file.type.startsWith("image/")) {
      alert("Veuillez choisir un fichier image.");
      resetForm();
      return;
    }
    // Prévisualiser l'image
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImage.src = e.target.result;
      previewImage.style.display = "block";
      imageIcon.style.display = "none";
      document.querySelector(".photo-upload-btn").style.display = "none";
      document.querySelector(".format-info").style.display = "none";
    };
    reader.readAsDataURL(file);
    updateFormValidation();
  }
};

// Fonction pour réinitialiser le formulaire
const resetForm = () => {
  addPhotoForm.reset();
  previewImage.style.display = "none";
  previewImage.src = "#";
  imageIcon.style.display = "block";
  document.querySelector(".photo-upload-btn").style.display = "block";
  document.querySelector(".format-info").style.display = "block";
  validateBtn.classList.remove("active");
};

// Fonction pour mettre à jour l'état du bouton de validation
const updateFormValidation = () => {
  const title = document.getElementById("title").value;
  const category = document.getElementById("category").value;
  const hasPhoto = previewImage.style.display === "block";

  if (title && category && hasPhoto) {
    validateBtn.classList.add("active");
  } else {
    validateBtn.classList.remove("active");
  }
};
// Fonction pour ajouter une photo à la galerie
const addPhotoToGallery = async (work) => {
  const workTitle = work.title;
  const workImageUrl = work.imageUrl;

  const newPhotoDiv = document.createElement("div");
  newPhotoDiv.classList.add("modal-work");

  const newPhotoImg = document.createElement("img");
  newPhotoImg.src = workImageUrl;
  newPhotoImg.alt = workTitle;

  const newPhotoTrashIcon = document.createElement("i");
  newPhotoTrashIcon.className = "fa-solid fa-trash-can";
  newPhotoTrashIcon.addEventListener("click", (e) =>
    deletePhoto(e, newPhotoDiv, work)
  );

  newPhotoDiv.appendChild(newPhotoTrashIcon);
  newPhotoDiv.appendChild(newPhotoImg);

  const gridContainer = document.querySelector(".galerie-photo .grid");
  if (gridContainer) {
    gridContainer.appendChild(newPhotoDiv);
  }
};
// Fonction pour supprimer une photo de la galerie
const deletePhoto = async (e, photoContainer, work) => {
  e.preventDefault();

  // Supprimer l'élément après l'animation
  const deleted = await deleteWork(work.id);
  if (deleted) {
    displayWorks(selectedCategory);
    photoContainer.remove();
    closeModal();
  }
};
// Gérer la soumission du formulaire
const handleFormSubmit = async (e) => {
  e.preventDefault();
  // Récupérer les valeurs du formulaire
  const title = document.getElementById("title").value;
  const category = categorySelect.value;
  const image = photoUploadInput.files[0];
  const token = localStorage.getItem("token");
 // Vérifier si tous les champs sont remplis
  const formData = new FormData();
  formData.append("title", title);
  formData.append("category", category);
  formData.append("image", image);

  const response = await fetch("http://localhost:5678/api/works", {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(await response.json())

  if (response.ok) {
    alert("photo ajouté");
    closeAddPhotoModal();
    displayWorks(selectedCategory);
  }
};

// événements pour ouvrir et fermer le modal
showModalBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);
addPhotoBtn.addEventListener("click", openAddPhotoModal);
closeAddModalBtn.addEventListener("click", closeAddPhotoModal);
returnToGalleryBtn.addEventListener("click", returnToGallery);

// Événements pour le formulaire d'ajout de photo
photoUploadInput.addEventListener("change", handlePhotoUpload);
addPhotoForm.addEventListener("submit", handleFormSubmit);
addPhotoForm.addEventListener("change", updateFormValidation);

// Fermer modal en cliquant à l'extérieur
window.addEventListener("click", (e) => {
  if (e.target === modal1) {
    closeModal();
  } else if (e.target === modal2) {
    closeAddPhotoModal();
  }
});

// Fermer modal en appuyant sur la touche "Esc"
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" || e.key === "Esc") {
    closeModal();
    closeAddPhotoModal();
  }
});

// Fermer modal en cliquant sur le bouton de fermeture
closeBtn.addEventListener("click", closeModal);
