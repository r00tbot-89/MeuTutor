// Usuário e senha padrão para demonstração no projeto
const USUARIO_PADRAO = "admin";
const SENHA_PADRAO = "1234";

document.addEventListener("DOMContentLoaded", () => {
    const formLogin = document.querySelector("form");

    if (formLogin) {
        formLogin.addEventListener("submit", (event) => {
            // Evita que o formulário recarregue a página
            event.preventDefault();

            const usuarioInput = document.getElementById("username").value.trim();
            const senhaInput = document.getElementById("password").value.trim();

            // Validação simples
            if (usuarioInput === USUARIO_PADRAO && senhaInput === SENHA_PADRAO) {
                alert(`Login realizado com sucesso! Bem-vindo, ${usuarioInput}.`);
                
                // Redireciona de volta para a página principal do quiz
                window.location.href = "index.html";
            } else {
                alert("Usuário ou senha incorretos!");
            }
        });
    }
});
