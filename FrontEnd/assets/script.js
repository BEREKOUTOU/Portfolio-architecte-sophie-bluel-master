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


//gestion des bouton tri
const buttons = document.querySelectorAll('#myBtnContainer button');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        buttons.forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');
    });
})
// Fonction pour filtrer les éléments de la galerie
const filterWorks = (category) => {
    const works = document.querySelectorAll('figure');
    works.forEach(work => {
        const workCategory = work.getAttribute('data-category');
        if (category === 'all' || workCategory === category) {
            work.style.display = 'block';
        } else {
            work.style.display = 'none';
        }
    });
}
 // Affichage du nombre de travaux correspondant au filtre
  const tous = document.querySelector('.tous');
  const objects = document.querySelector('.objects');
  const appartements = document.querySelector('.appartements');
  const hotelRestaurants = document.querySelector('.hôtelRestaurants');
  // Ajout des écouteurs d'événements pour les filtres
  const myBtnContainer = document.querySelector('.objects');
  myBtnContainer.addEventListener('click', () => {
    tous.classList.remove('active');
    objects.classList.add('active');
    const works = category.filterWorks (function (work) {
        return work.category === 'objects';
    })
   
  });
  myBtnContainer.addEventListener('click', () => {
    tous.classList.remove('active');
    appartements.classList.add('active');
    const works = category.filterWorks (function (work) {
        return work.category === 'appartements';
    })
  });
  myBtnContainer.addEventListener('click', () => {
    tous.classList.remove('active');
    hotelRestaurants.classList.add('active');
    const works = category.filterWorks (function (work) {
        return work.category === 'hôtelRestaurants';
    })
  });
  myBtnContainer.addEventListener('click', () => {
    tous.classList.add('active');
    filterWorks('all');
  });