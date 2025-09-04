const STORAGE_KEY = "jogadoras";

const jogadorasIniciais = [
    {
        nome: "Andressa Alves",
        posicao: "Meio-campo",
        clube: "Corinthians",
        foto: "https://example.com/andressa.jpg",
        gols: 15,
        assistencias: 10,
        jogos: 28,
        favorita: false,
    },
    {
        nome: "Dayana Rodríguez",
        posicao: "Meio-campo",
        clube: "Corinthians",
        foto: "https://example.com/dayana.jpg",
        gols: 5,
        assistencias: 12,
        jogos: 30,
        favorita: false,
    },
    {
        nome: "Mariza",
        posicao: "Zagueira",
        clube: "Corinthians",
        foto: "https://example.com/mariza.jpg",
        gols: 2,
        assistencias: 1,
        jogos: 32,
        favorita: false,
    },
    {
        nome: "Thaís Regina",
        posicao: "Zagueira",
        clube: "Corinthians",
        foto: "https://example.com/thais.jpg",
        gols: 1,
        assistencias: 2,
        jogos: 25,
        favorita: false,
    },
    {
        nome: "Letícia Teles",
        posicao: "Zagueira",
        clube: "Corinthians",
        foto: "https://example.com/leticia.jpg",
        gols: 0,
        assistencias: 0,
        jogos: 18,
        favorita: false,
    },
];

if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jogadorasIniciais));
}

const form = document.getElementById("jogadoraForm");
const buscaInput = document.getElementById("busca");

const nomeElement = document.getElementById("nome");
const posicaoElement = document.getElementById("posicao");
const clubeElement = document.getElementById("clube");
const golsElement = document.getElementById("gols");
const assistenciasElement = document.getElementById("assistencias");
const jogosElement = document.getElementById("jogos");
const fotoElement = document.getElementById("foto");
const editIndexElement = document.getElementById("editIndex");

let jogadoras = JSON.parse(localStorage.getItem(STORAGE_KEY));

function render() {
    const lista = document.getElementById("listaJogadoras");
    lista.innerHTML = "";

    let busca = buscaInput.value.toLowerCase();
    
    let jogadorasFiltradas = jogadoras.filter((jogadora) => jogadora.nome.toLowerCase().includes(busca) || jogadora.posicao.toLowerCase().includes(busca));

    jogadorasFiltradas.forEach((jogadora, index) => {
        const column = document.createElement("div");
        column.className = "col-md-4 col-lg-3";

        column.innerHTML = `
            <div class="card card-jogadora shadow-sm">
                <img src="${jogadora.foto}" class="card-img-top" alt="${jogadora.nome}">
                <span class="favorito" onclick="toggleFavorito(${index})">
                    ${jogadora.favorita ? "⭐" : "☆"}       
                </span>
                <div class="card-body">
                    <h5 class="card-title">${jogadora.nome}</h5>
                    <p class="card-text">
                        <b>Posição:</b> ${jogadora.posicao}<br>
                        <b>Clube:</b> ${jogadora.clube}<br>
                        <b>Gols:</b> ${jogadora.gols}<br>
                        <b>Assistências:</b> ${jogadora.assistencias}<br>
                        <b>Jogos:</b> ${jogadora.jogos}<br>
                    </p>
                    <div class="d-flex justify-content-between">
                        <button class="btn btn-sm btn-warning" onclick="editar(${index})">Editar</button>
                        <button class="btn btn-sm btn-danger" onclick="remover(${index})">Excluir</button>
                    </div>
                </div>
            </div>
        `;
        lista.appendChild(column);
    });
}

function salvar() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jogadoras));
    render();
}

function toggleFavorito(index) {
    jogadoras[index].favorita = !jogadoras[index].favorita;
    salvar();
}

function editar(index) {
    window.scrollTo({top: 0, behavior: "smooth"});

    const jogadora = jogadoras[index];

    editIndexElement.value = index;
    nomeElement.value = jogadora.nome;
    posicaoElement.value = jogadora.posicao;
    clubeElement.value = jogadora.clube;
    golsElement.value = jogadora.gols;
    assistenciasElement.value = jogadora.assistencias;
    jogosElement.value = jogadora.jogos;
    fotoElement.value = jogadora.foto;
}

function remover(index) {
    if (confirm(`Tem certeza que deseja remover a jogadora: ${jogadoras[index].nome}?`)) {
        jogadoras.splice(index, 1);
        alert("Jogadora removida com sucesso!");
        salvar();
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = nomeElement.value.trim();
    const posicao = posicaoElement.value.trim();
    const clube = clubeElement.value.trim();
    const gols = Number(golsElement.value);
    const assistencias = Number(assistenciasElement.value);
    const jogos = Number(jogosElement.value);
    const foto = fotoElement.value.trim();
    const editIndex = editIndexElement.value;

    if (!nome || !posicao || !clube || !foto) {
        alert("Todos os campos são obrigatórios!");
        return;
    }

    const novaJogadora = {
        nome,
        posicao,
        clube,
        gols,
        assistencias,
        jogos,
        foto,
        favorita: false,
    };

    if (editIndex) {
        jogadoras[editIndex] = {
            ...novaJogadora,
            favorita: jogadoras[editIndex].favorita
        }
        alert("Jogadora editada com sucesso!");
    }
    else {
        jogadoras.push(novaJogadora);
        alert("Jogadora adicionada com sucesso!");
    }

    form.reset();
    editIndexElement.value = "";
    salvar();
});
buscaInput.addEventListener("input", render);

render();
