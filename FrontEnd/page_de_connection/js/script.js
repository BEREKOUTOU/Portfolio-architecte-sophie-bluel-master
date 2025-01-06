// Obtenir des éléments DOM
const modal1 = document.getElementById('modal1');
const modal2 = document.getElementById('modal2');
const showModalBtn = document.querySelector('.show-modal');
const closeBtn = document.querySelector('.fa-close');
const closeAddModalBtn = document.querySelector('.close-add-modal');
const addPhotoBtn = document.querySelector('.ajouter-une-photo');
const returnToGalleryBtn = document.querySelector('.retour-galerie');
const photoUploadInput = document.getElementById('photo-upload');
const previewImage = document.getElementById('preview-image');
const addPhotoForm = document.getElementById('add-photo-form');
const validateBtn = document.querySelector('.valider-btn');
const imageIcon = document.querySelector('.fa-image');

// Fonction pour ouvrir le modal principal
const openModal = (e) => {
    e.preventDefault();
    modal1.style.display = 'flex';
    modal1.setAttribute('aria-hidden', 'false');
    modal1.setAttribute('aria-modal', 'true');
};

// Fonction pour fermer le modal principal
const closeModal = () => {
    modal1.style.display = 'none';
    modal1.setAttribute('aria-hidden', 'true');
    modal1.setAttribute('aria-modal', 'false');
};

// Fonction pour ouvrir le modal d'ajout de photo
const openAddPhotoModal = (e) => {
    e.preventDefault();
    modal1.style.display = 'none';
    modal2.style.display = 'flex';
    modal2.setAttribute('aria-hidden', 'false');
    modal2.setAttribute('aria-modal', 'true');
};

// Fonction pour fermer le modal d'ajout de photo
const closeAddPhotoModal = () => {
    modal2.style.display = 'none';
    modal2.setAttribute('aria-hidden', 'true');
    modal2.setAttribute('aria-modal', 'false');
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
        if (file.size > 4 * 1024 * 1024) { // 4Mo max
            alert('Le fichier est trop volumineux. Veuillez choisir un fichier de moins de 4Mo.');
            resetForm();
            return;
        }
        // Vérifier l'extension du fichier
        const extension = file.name.split('.').pop().toLowerCase();
        if (!['jpg', 'jpeg', 'png'].includes(extension)) {
            alert('Veuillez choisir un fichier image au format JPG, JPEG ou PNG.');
            resetForm();
            return;
        }
        // Vérifier le type de fichier
        if (!file.type.startsWith('image/')) {
            alert('Veuillez choisir un fichier image.');
            resetForm();
            return;
        }
        // Prévisualiser l'image
        const reader = new FileReader();
        reader.onload = (e) => {
            previewImage.src = e.target.result;
            previewImage.style.display = 'block';
            imageIcon.style.display = 'none';
            document.querySelector('.photo-upload-btn').style.display = 'none';
            document.querySelector('.format-info').style.display = 'none';
        };
        reader.readAsDataURL(file);
        updateFormValidation();
    }
};

// Fonction pour réinitialiser le formulaire
const resetForm = () => {
    addPhotoForm.reset();
    previewImage.style.display = 'none';
    previewImage.src = '#';
    imageIcon.style.display = 'block';
    document.querySelector('.photo-upload-btn').style.display = 'block';
    document.querySelector('.format-info').style.display = 'block';
    validateBtn.classList.remove('active');
};

// Fonction pour mettre à jour l'état du bouton de validation
const updateFormValidation = () => {
    const title = document.getElementById('title').value;
    const category = document.getElementById('category').value;
    const hasPhoto = previewImage.style.display === 'block';

    if (title && category && hasPhoto) {
        validateBtn.classList.add('active');
    } else {
        validateBtn.classList.remove('active');
    }
};

// Fonction pour ajouter une nouvelle photo à la galerie
const addPhotoToGallery = (imageUrl, title) => {
    const gridContainer = document.querySelector('.grid');
    const newPhotoDiv = document.createElement('div');
    newPhotoDiv.className = 'img1';
    
    newPhotoDiv.innerHTML = `
        <img src="${imageUrl}" alt="${title}">
        <i class="fa-solid fa-trash-can"></i>
    `;
    
    // Ajouter une animation d'apparition
    newPhotoDiv.style.opacity = '0';
    gridContainer.appendChild(newPhotoDiv);
    
    // Déclencher l'animation d'apparition
    setTimeout(() => {
        newPhotoDiv.style.transition = 'opacity 0.3s ease';
        newPhotoDiv.style.opacity = '1';
    }, 10);
};

// Fonction pour supprimer une photo de la galerie
const deletePhoto = (e) => {
    if (e.target.classList.contains('fa-trash-can')) {
        const photoContainer = e.target.closest('.img1');
        if (photoContainer) {
            // Animation de suppression
            photoContainer.style.transition = 'opacity 0.3s ease';
            photoContainer.style.opacity = '0';
            
            // Supprimer l'élément après l'animation
            setTimeout(() => {
                photoContainer.remove();
            }, 300);
        }
    }
};

// Gérer la soumission du formulaire
const handleFormSubmit = (e) => {
    e.preventDefault();
    
    const title = document.getElementById('title').value;
    const category = document.getElementById('category').value;
    const imageUrl = previewImage.src;
    
    if (title && category && imageUrl) {
        addPhotoToGallery(imageUrl, title);
        closeAddPhotoModal();
        returnToGallery();
    }
};

// événements pour ouvrir et fermer le modal
showModalBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
addPhotoBtn.addEventListener('click', openAddPhotoModal);
closeAddModalBtn.addEventListener('click', closeAddPhotoModal);
returnToGalleryBtn.addEventListener('click', returnToGallery);

// Événements pour le formulaire d'ajout de photo
photoUploadInput.addEventListener('change', handlePhotoUpload);
addPhotoForm.addEventListener('submit', handleFormSubmit);
document.getElementById('title').addEventListener('input', updateFormValidation);
document.getElementById('category').addEventListener('change', updateFormValidation);

// Ajouter les écouteurs d'événements pour la suppression
document.querySelectorAll('.grid').forEach(grid => {
    grid.addEventListener('click', deletePhoto);
});

// Fermer modal en cliquant à l'extérieur
window.addEventListener('click', (e) => {
    if (e.target === modal1) {
        closeModal();
    } else if (e.target === modal2) {
        closeAddPhotoModal();
    }
});

// Fermer modal en appuyant sur la touche "Esc"
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
        closeModal();
        closeAddPhotoModal();
    }
});

// Fermer modal en cliquant sur le bouton de fermeture
closeBtn.addEventListener('click', closeModal);
