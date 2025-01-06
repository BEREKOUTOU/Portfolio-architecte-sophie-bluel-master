// Function to handle user authentication and navigation
async function handleLogin(event) {
    event.preventDefault();
    
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

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

        const data = await response.json();

        if (response.ok) {
            // Store the token in localStorage for future authenticated requests
            localStorage.setItem('token', data.token);
            
            // Show success message
            alert("Ok");
            
            // Redirect to Homepage_edit.html
            window.location.href = "Homepage_edit.html";
        } else {
            // Show error message
            alert(data.message || "Error during authentication");
        }
    } catch (error) {
        alert("An error occurred during authentication");
        console.error('Error:', error);
    }
}

// Add event listener when the document is loaded
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector("#login-form");
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});
