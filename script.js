const API_URL = "http://localhost:3000/locais";

async function carregarLocais() {
    const resposta = await fetch(API_URL);
    const locais = await resposta.json();
    const listaLocais = document.getElementById("lista-locais");
    listaLocais.innerHTML = "";

    locais.forEach(local => {
        const div = document.createElement("div");
        div.classList.add("local");
        div.innerHTML = `
            <h2>${local.titulo}</h2>
            <p>${local.descricao}</p>
            <img src="${local.foto}" alt="${local.titulo}">
            <button onclick="editarLocal(${local.id})">Editar</button>
            <button onclick="excluirLocal(${local.id})">Excluir</button>
        `;
        listaLocais.appendChild(div);
    });
}

document.getElementById("local-form").addEventListener("submit", async function(event) {
    event.preventDefault();
    const titulo = document.getElementById("titulo").value;
    const descricao = document.getElementById("descricao").value;
    const foto = document.getElementById("foto").value;

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo, descricao, foto })
    });

    this.reset();
    carregarLocais();
});

async function excluirLocal(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    carregarLocais();
}

async function editarLocal(id) {
    const novoTitulo = prompt("Novo título:");
    const novaDescricao = prompt("Nova descrição:");
    const novaFoto = prompt("Nova URL da foto:");

    if (novoTitulo && novaDescricao && novaFoto) {
        await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ titulo: novoTitulo, descricao: novaDescricao, foto: novaFoto })
        });
        carregarLocais();
    }
}

carregarLocais();
