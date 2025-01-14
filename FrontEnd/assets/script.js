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
        button.setAttribute('data-category', 'tous');
        document.getElementById('myBtnContainer').appendChild(button);
        // Affichage des catégories dans les boutons de filtre
        data.forEach(category => {  
            const button = document.createElement('button');
            button.innerText = category.name;
            button.setAttribute('data-category', category.name.toLowerCase());
            document.getElementById('myBtnContainer').appendChild(button);
        });

        // Gestion des filtres
        const buttons = document.querySelectorAll('#myBtnContainer button');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-category');
                const figures = document.querySelectorAll('#gallery figure');
                figures.forEach(figure => {
                    const category = figure.querySelector('img').getAttribute('data-category');
                    if (filter === 'tous' || category === filter) {
                        figure.style.display = 'block';
                    } else {
                        figure.style.display = 'none';
                    }
                });
            });
        });
    })
    .catch(error => console.error(error));