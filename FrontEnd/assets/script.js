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
        button.innerText ='tous';
        document.getElementById('myBtnContainer').appendChild(button);
        // Affichage des travaux dans la galerie
        data.forEach(category => {  
            const button = document.createElement('button');
            button.innerText = category.name;
            document.getElementById('myBtnContainer').appendChild(button);
        });
    })
    .catch(error => console.error(error)); 