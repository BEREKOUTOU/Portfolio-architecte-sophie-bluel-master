// Fonction permettant de gérer l'authentification et la navigation des utilisateurs
async function handleLogin(event) {
  event.preventDefault();
  // Obtenir les données de l'utilisateur
  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value.trim();
  // Vérifier si les données sont valides
  if (email && password) {
    // Appeler la fonction de connexion de l'API
    await loginUser(email, password);
  } else {
    alert("Veuillez remplir tous les champs");
  }
}

// Fonction de connexion de l'API
async function loginUser(email, password) {
  try {
    const response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    // Convertir la réponse en données JSON et vérifier si elle est correcte
    const data = await response.json();

    if (response.ok) {
      // Stockez le jeton dans localStorage pour les futures demandes authentifiées
      localStorage.setItem("token", data.token);
      // Redirigez vers la page d'accueil
      window.location.href = "./index.html";
    } else {
      // Affichez un message d'erreur
      alert(data.message || "Erreur lors de l'authentification");
    }
  } catch (error) {
    // Affichez un message d'erreur en cas d'exception
    alert("Une erreur est survenue : " + error.message);
  }
}

// Ajoutez un gestionnaire d'événement lorsque le document est chargé
document.addEventListener("DOMContentLoaded", () => {
  // Redirection de l'utilisateur si il est déjà connecté
  const token = localStorage.getItem("token");
  if (token) {
    window.location.href = "./index.html";
    return;
  }

  const loginForm = document.querySelector("#login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
  }
});
