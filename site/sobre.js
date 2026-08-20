document.addEventListener("DOMContentLoaded", () => {
    // Configuracoes e metadados do projeto escolar :)
    const infoProjeto = {
        versao: "1.0.0 (Demo)",
        tecnologias: ["HTML5", "CSS3 (Glassmorphism)", "Javascript (ES6)"],
        autor: "Joaquim, Com auxilio de (Marcos Pablo, Maria Eduarda, Jannifer Mendonsa e Wallison Xavier)"
    };

    // Atualiza a area de detalhes do projeto dinamicamente
    const containerDetalhes = document.getElementById("detalhes-projeto");

    if (containerDetalhes) {
        containerDetalhes.innerHTML = `
            <h3>💻 Informações do Protótipo</h3>
            <p><strong>Versão:</strong> ${infoProjeto.versao}</p>
            <p><strong>Desenvolvido por:</strong> ${infoProjeto.autor}</p>
            <p><strong>Tecnologias:</strong> ${infoProjeto.tecnologias.join(", ")}</p>
        `;
    }
});
