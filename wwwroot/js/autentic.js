// Função para exibir o nome do usuário na navbar e ajustar os links conforme o login
function updateNavbar() {
    const loggedInUser = localStorage.getItem("loggedInUser");

    if (loggedInUser) {
        const userName = loggedInUser.substring(0, 4); // Exibe os primeiros 4 caracteres do email
        document.getElementById("userName").textContent = userName;
        document.getElementById("userDropdown").style.display = "block";  // Exibe a opção de perfil
        document.getElementById("loginLink").style.display = "none";  // Esconde o link de login
    } else {
        // Caso não esteja logado, exibe o link de login e oculta o dropdown
        document.getElementById("userDropdown").style.display = "none";
        document.getElementById("loginLink").style.display = "block";
    }
}

// Função para realizar logout
function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";  // Redireciona para a página de login
}

// Chama a função para atualizar a navbar assim que a página carregar
document.addEventListener("DOMContentLoaded", updateNavbar);