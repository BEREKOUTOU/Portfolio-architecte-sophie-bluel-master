// Fonction permettant de gérer l'authentification et la navigation des utilisateurs
async function handleLogin(event) {
    event.preventDefault();
    // Obtenir les données de l'utilisateur
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    // Demander à l'API de se connecter à l'aide des données fournies
    try {
        const response = await fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        // Convertir la réponse en données JSON et vérifier si elle est correcte
        const data = await response.json();

        if (response.ok) {
            // Stockez le jeton dans localStorage pour les futures demandes authentifiées
            localStorage.setItem('token', data.token);
            
            // Affichez un message de succès
            alert("Ok");
            
            // Redirigez vers la page d'accueil
            window.location.href = "Homepage_edit.html";
        } else {
            // Affichez un message d'erreur
            alert(data.message || "Error during authentication");
        }
    } catch (error) {
        alert("An error occurred during authentication");
        console.error('Error:', error);
    }
}

// Ajoutez un gestionnaire d'événement lorsque le document est chargé
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector("#login-form");
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});
