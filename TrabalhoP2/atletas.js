if (!sessionStorage.getItem('log')) {
    alert("Login não autorizado");
    window.location = '/';
}

const urlApi = "https://botafogo-atletas.mange.li";


const botaoOpcoes = document.createElement('button');
botaoOpcoes.innerHTML = "Escolher";
botaoOpcoes.id = "botaoOpcoes";

const conteudoOpcoes = document.createElement('div');
conteudoOpcoes.className = "conteudo-opcoes";

const opcoesSelecao = ["Masculino", "Feminino", "Todos"];

opcoesSelecao.forEach(opcao => {
    const botaoOpcao = document.createElement('button');
    botaoOpcao.innerHTML = opcao;
    botaoOpcao.onclick = () => CliqueBotoes(opcao.toLowerCase());
    conteudoOpcoes.appendChild(botaoOpcao);
});

botaoOpcoes.onclick = function () {
    conteudoOpcoes.style.display = 'block';
};


const containerCabecalho = document.createElement('div');
containerCabecalho.className = 'container-cabecalho'
const textoCabecalho = document.createElement('h1');
textoCabecalho.innerText = 'Atletas do Botafogo 2023-2';

const botaoSaida = document.createElement('button');
botaoSaida.id = "botaoSaida"
botaoSaida.innerText = 'Sair';
botaoSaida.onclick = () => {
    sessionStorage.removeItem('log');
    window.location = '/';
};

containerCabecalho.appendChild(textoCabecalho);
containerCabecalho.appendChild(botaoSaida);
document.body.appendChild(containerCabecalho);


const grupoBotoes = document.createElement('div');
grupoBotoes.id = "grupoBotoes"


const botaoMasculino = document.createElement('button');
botaoMasculino.innerHTML = "Categoria Masculina";
botaoMasculino.onclick = () => CliqueBotoes("masculino");


const botaoFeminino = document.createElement('button');
botaoFeminino.innerHTML = "Categoria Feminina";
botaoFeminino.onclick = () => CliqueBotoes("feminino");


const botaoTodos = document.createElement('button');
botaoTodos.innerHTML = "Todos";
botaoTodos.onclick = () => CliqueBotoes("todos");

grupoBotoes.appendChild(botaoMasculino);
grupoBotoes.appendChild(botaoFeminino);
grupoBotoes.appendChild(botaoTodos);
document.body.appendChild(grupoBotoes);
document.body.appendChild(botaoOpcoes);
document.body.appendChild(conteudoOpcoes);

const preencherDados = (atleta) => {
    const container = document.createElement('article');
    const titulo = document.createElement('h3');
    const imagem = document.createElement('img');
    const saibaMais = document.createElement('p');

    container.dataset.id = atleta.id;
    container.dataset.altura = atleta.altura;
    container.dataset.nome_completo = atleta.nome_completo;
    container.dataset.nascimento = atleta.nascimento;

    titulo.innerText = atleta.nome;
    imagem.src = atleta.imagem;
    imagem.alt = `Imagem de ${atleta.nome}`;
    saibaMais.innerHTML = "Saiba Mais";

    container.appendChild(titulo);
    container.appendChild(imagem);
    container.appendChild(saibaMais);

    container.onclick = () => CliqueContainer(atleta);

    document.body.appendChild(container);
};

const CliqueBotoes = (caminho) => {
    if (caminho == 'todos') {
        caminho = 'all';
    }
    document.body.innerHTML = '';
    document.body.appendChild(containerCabecalho);
    document.body.appendChild(grupoBotoes);
    document.body.appendChild(botaoOpcoes);
    document.body.appendChild(conteudoOpcoes);
    conteudoOpcoes.style.display = 'none';
    buscarDados(`${urlApi}/${caminho}`).then(
        (dados) => {
            for (atleta of dados) {
                preencherDados(atleta);
            }
        }
    );
};

const CliqueContainer = (atleta) => {
    window.location = `/outros/descricaoAtleta.html?id=${atleta.id}`;
};

const buscarDados = async (caminho) => {
    const resposta = await fetch(caminho);
    const dados = await resposta.json();
    return dados;
};




