// Récupération des fichiers JSON works
fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(data => {
        // Affichage des travaux dans la galerie
        data.forEach(work => {  
            const figure = document.createElement('figure');
            figure.innerHTML = `
                <img src="${work.imageUrl}" alt="${work.title}" data-category="${work.category}">
                <figcaption>${work.title}</figcaption>
            `;
            document.getElementById('gallery').appendChild(figure);
        });
    })
    .catch(error => console.error(error)); 

// Récupération des fichiers JSON categories
fetch('http://localhost:5678/api/categories')
     .then(response => response.json())
     .then(data => {
         const button = document.createElement('button');
         button.innerText = 'Tous';
         button.dataset.category = 'tous';
         document.getElementById('myBtnContainer').appendChild(button);
         // Affichage des catégories dans les boutons de filtre
         data.forEach(category => {  
             const button = document.createElement('button');
             button.innerText = category.name;
             button.dataset.category = category.name.toLowerCase();
             document.getElementById('myBtnContainer').appendChild(button);
         });
        
         // Ajout d'un gestionnaire d'événement pour les boutons de filtre
         const buttons = document.querySelectorAll('#myBtnContainer button');
         buttons.forEach(button => {
             button.classList.remove('active');
             // Supprimer la classe active de tous les boutons et l'ajouter au courant
             // Ajouter un gestionnaire d'événement de clic au bouton
             button.addEventListener('click', () => {
                 const activeButton = document.querySelector('#myBtnContainer button.active');
                 if (activeButton) {
                     activeButton.classList.remove('active');
                 }
                 const category = button.dataset.category;
                 const works = document.querySelectorAll('#gallery figure');
                 works.forEach(work => {
                     if (category === 'tous' || work.dataset.category === category) {
                         work.style.display = 'block';// afficher tous les travaux de la catégorie actuelle
                     } else  {
                         work.style.display = 'none'; // masquer tous les travaux autres que ceux de la catégorie actuelle  
                     }
                 });
                 // Ajouter la classe active au bouton actuel
                 button.classList.add('active');
             });
         });
         console.log(buttons);
     })
     .catch(error => console.error(error));