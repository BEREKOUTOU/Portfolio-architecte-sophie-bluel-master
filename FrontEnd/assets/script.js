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
//filtrer la liste des images qui est  dans la galerie  d'accueil par leur nom
function filterSelection(c) {
    let x, i;   
    x = document.getElementsByClassName("gallery-item");
    if (c == "all") c = "";
    for (i = 0; i < x.length; i++) {
      w3RemoveClass(x[i], "show");
      if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
    }
  }
  // Ajouter une classe à une balise HTML
  function w3AddClass(element, name) {
    let i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
      if (arr1.indexOf(arr2[i]) == -1) {
        element.className += " " + arr2[i];
      }
    }
  }
  // Supprimer une classe à une balise HTML
  function w3RemoveClass(element, name) {
    let i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
      while (arr1.indexOf(arr2[i]) > -1) {
        arr1.splice(arr1.indexOf(arr2[i]), 1);
      }
    }
    element.className = arr1.join(" ");
  }
  // Add active class to the current button (highlight it)
  const btnContainer = document.getElementById("myBtnContainer");
  const btns = btnContainer.getElementsByClassName("btn");
  for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function(){
      const current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      this.className += " active"; 
      filterSelection(this.innerHTML);
      // Récupération des catégories des travaux
      fetch('http://localhost:5678/api/categories')
      .then(response => response.json())      
      .then(data => {
        // Affichage des travaux dans la galerie
        const gallery = document.querySelector('#gallery');
        data.forEach(category => {
          const figure = document.createElement('figure');        
          const img = document.createElement('img');        
          img.src = category.imageUrl;
          img.alt = category.name;
          figure.appendChild(img);
          gallery.appendChild(figure);
        });     
      })
    })}
  
// Récupération des catégories des travaux
fetch('http://localhost:5678/api/categories')
.then(response => response.json())      
.then(data => {
  // Affichage des travaux dans la galerie
  const gallery = document.querySelector('#gallery');
  data.forEach(category => {
    const figure = document.createElement('figure');        
    const img = document.createElement('img');        
    img.src = category.imageUrl;
    img.alt = category.name;
    figure.appendChild(img);
    gallery.appendChild(figure);
  });     
})
// Ajout d'écouteur sur le champ de recherche
const searchInput = document.getElementById('search');
searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.toLowerCase();
  const galleryItems = document.querySelectorAll('#gallery figure');
  galleryItems.forEach(item => {
    const title = item.querySelector('img').alt.toLowerCase();
    if (title.includes(searchTerm)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
});


// Ajout d'écouteur sur les catégories
const categoryButtons = document.querySelectorAll('#myBtnContainer .btn');
categoryButtons.forEach(button => {
  button.addEventListener('click', () => {
    const category = button.textContent.toLowerCase();
    filterSelection(category);
  });
}); 
// Affichage du nombre de travaux dans la galerie
const galleryItems = document.querySelectorAll('#gallery figure');
const totalItems = galleryItems.length;
document.getElementById('totalItems').textContent = totalItems; 
// Ajout d'écouteur sur le menu déroulant
const menu = document.getElementById('menu');
menu.addEventListener('click', () => {
  const galleryItems = document.querySelectorAll('#gallery figure');
  galleryItems.forEach(item => {
    item.style.display = 'block';
  });
});         
// Ajout d'écouteur sur le bouton "Voir plus"
const voirPlusBtn = document.getElementById('voir-plus');
voirPlusBtn.addEventListener('click', () => {
  voirPlusBtn.style.display = 'none';
  const galleryItems = document.querySelectorAll('#gallery figure');
  galleryItems.forEach(item => {
    item.style.display = 'block';
  });
}); 
// Ajout d'écouteur sur le bouton "Voir moins"
const voirMoinsBtn = document.getElementById('voir-moins');
voirMoinsBtn.addEventListener('click', () => {
  voirMoinsBtn.style.display = 'none';
  const galleryItems = document.querySelectorAll('#gallery figure');
  galleryItems.forEach(item => {
    item.style.display = 'block';
  });
}); 