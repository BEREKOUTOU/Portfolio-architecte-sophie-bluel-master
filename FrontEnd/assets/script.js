// Récupération des fichiers JSON
fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(data => {
        // Affichage des travaux dans la galerie
        data.forEach(work => {  
            const figure = document.createElement('figure');
            figure.innerHTML = `
                <img src="${work.imageUrl}" alt="${work.title}">
                <figcaption>${work.title}</figcaption>
            `;
            document.getElementById('gallery').appendChild(figure);
        });
    })
    
    .catch(error => console.error(error));    

// Filtrez les éléments d’une liste grâce à la fonction filterList
const boutonFiltrer = document.querySelector(".btn-filtrer");
boutonFiltrer.addEventListener("click", function () {
    // Filtrer les travaux par catégorie
    const categories = document.querySelectorAll("input[type=checkbox]:checked");
    const selectedCategories = Array.from(categories).map(category => category.value);
    const works = document.querySelectorAll("figure");
    works.forEach(work => {
        if (selectedCategories.length === 0 || selectedCategories.includes(work.querySelector("figcaption").textContent)) {
            work.style.display = "block";
        } else {
            work.style.display = "none";
        }
    }); 
});

// Filtrez les travaux par catégorie
const categories = document.querySelectorAll("input[type=checkbox]");
categories.forEach(category => {
    category.addEventListener("change", function () {
        const works = document.querySelectorAll("figure");
        works.forEach(work => {
            if (category.checked && work.querySelector("figcaption").textContent !== category.value) {
                work.style.display = "none";
            } else {
                work.style.display = "block";
            }
        });
    });
}); 