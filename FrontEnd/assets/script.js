// Récupération des fichiers JSON
fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(data => {
        // Affichage des travaux dans la galerie
        const gallery = document.querySelector('#gallery');
        data.forEach(work => {
            const figure = document.createElement('figure');        
            const img = document.createElement('img');        
            img.src = work.imageUrl;
            img.alt = work.title;
            figure.appendChild(img);
            gallery.appendChild(figure);
        });
    })
    .catch(error => console.error(error));          