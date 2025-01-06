// Fonction pour filtrer les éléments de la galerie
function filterSelection(category) {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const buttons = document.querySelectorAll('.btn');

    // Supprimer la classe active de tous les boutons et l'ajouter au courant
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('onclick').includes(category)) {
            btn.classList.add('active');
        }
    });

    // Filtrer les éléments de la galerie en fonction de la catégorie
    galleryItems.forEach(item => {
        item.style.display = 'none'; // Masquer d'abord tous les éléments
        if (category === 'all' || item.classList.contains(category)) {
            item.style.display = 'block'; // Afficher les éléments qui correspondent à la catégorie
        }
    });
}

// Afficher tous les éléments lors du chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    filterSelection('all');
});
