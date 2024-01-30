const main = document.createElement("main");
const divMain = document.createElement("div");

// Div com Botões
const divBotoes = document.createElement("div");

// Botão Login
const buttonLogin = createButton("button", "Login", fazerLogin);

// Botão Cadastrar Autor
const buttonCadastrarAutor = createButton("button", "Cadastrar Autor", cadastrarAutor);

// Botão Poesias
const buttonPoesias = createButton("button", "Poesias", exibirPoesias);

// Botão Autores
const buttonAutores = createButton("button", "Autores", exibirAutores);

// Adicionando os botões à div
appendChildren(divBotoes, [buttonLogin, buttonCadastrarAutor, buttonPoesias, buttonAutores]);

main.appendChild(divBotoes);
document.body.appendChild(main);

// Função auxiliar para criar elemento button
function createButton(type, text, clickFunction) {
    const button = document.createElement("button");
    button.setAttribute("type", type);
    button.appendChild(document.createTextNode(text));

    // Adicionando ação para cada botão
    if (clickFunction) {
        button.addEventListener("click", clickFunction);
    }

    return button;
}

// Função Login
function fazerLogin() {
    alert("Ação: Login");
    removerFormAnterior()
    divMain.innerHtml = "";
    const form = document.createElement("form");
    const fieldset = document.createElement("fieldset");

    // Campo Email
    const labelEmail = createLabel("Email:");
    const inputEmail = createInput("email", "email");

    // Campo Senha
    const labelSenha = createLabel("Senha:");
    const inputSenha = createInput("password", "senha");

    // Botão Submit
    const buttonSubmit = createButton("submit", "Login");

    form.setAttribute("action", "/autor/login");
    form.setAttribute("method", "post");

    appendChildren(fieldset, [labelEmail, inputEmail, labelSenha, inputSenha, buttonSubmit]);
    form.appendChild(fieldset);

    main.appendChild(form);

    // Função auxiliar para criar elemento label
    function createLabel(text) {
        const label = document.createElement("label");
        label.setAttribute("for", text.toLowerCase());
        label.appendChild(document.createTextNode(text));
        return label;
    }

    // Função auxiliar para criar elemento input
    function createInput(type, name) {
        const input = document.createElement("input");
        input.setAttribute("type", type);
        input.setAttribute("name", name);
        return input;
    }

    // Função auxiliar para criar elemento button
    function createButton(type, text) {
        const button = document.createElement("button");
        button.setAttribute("type", type);
        button.appendChild(document.createTextNode(text));
        return button;
    }

    // Função auxiliar para adicionar vários filhos a um elemento
    function appendChildren(parent, children) {
        children.forEach(child => parent.appendChild(child));
    }
}


// Função Cadastrar Autor
function cadastrarAutor() {
    removerFormAnterior()

    const form = document.createElement("form");
    const fieldset = document.createElement("fieldset");

    // Campo Nome
    const labelNome = createLabel("Nome:");
    const inputNome = createInput("text", "nome");

    // Campo Email
    const labelEmail = createLabel("Email:");
    const inputEmail = createInput("email", "email");

    // Campo Senha
    const labelSenha = createLabel("Senha:");
    const inputSenha = createInput("password", "senha");

    // Campo Upload
    const formUpload = document.createElement("form");
    const fieldsetUpload = document.createElement("fieldset");
    const labelUpload = createLabel("Escolha um arquivo:");
    const inputUpload = createInput("file", "single");
    const buttonUpload = createButton("submit", "Upload Imagem");
    formUpload.setAttribute("action", "/upload");
    formUpload.setAttribute("method", "post");
    formUpload.setAttribute("enctype", "multipart/form-data");
    appendChildren(fieldsetUpload, [labelUpload, inputUpload, buttonUpload]);
    formUpload.appendChild(fieldsetUpload);
    console.log()

    // Botão Submit
    const buttonSubmit = createButton("submit", "Cadastrar Autor");

    // pegar nome da imagem
    const inputOculto = createInput("hidden", "valorOculto");
    form.addEventListener("submit", function (event) {
        // Define o valor do campo oculto antes do envio
        inputOculto.value = document.getElementsByName("single")[0].value.split("\\")[2];
        //alert(inputOculto.value)
        const formData = new FormData();

        formData.append('nome', inputNome.value);
        formData.append('email', inputEmail.value);
        formData.append('senha', inputSenha.value);
        formData.append('img', inputOculto.value);
        fetch('/autor', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                // Manipular a resposta do servidor, se necessário
                console.log('Resposta do servidor:', data);
            })
            .catch(error => {
                console.error('Erro ao enviar dados para /autor:', error);
            });

    });


    form.setAttribute("action", "/autor");
    form.setAttribute("method", "post");
    //form.setAttribute("enctype", "multipart/form-data");


    appendChildren(fieldset, [labelNome, inputNome, labelEmail, inputEmail, labelSenha, inputSenha, buttonSubmit, inputOculto]);
    form.appendChild(fieldset);
    main.appendChild(form);
    main.appendChild(formUpload);

    // Função auxiliar para criar elemento label
    function createLabel(text) {
        const label = document.createElement("label");
        label.setAttribute("for", text.toLowerCase());
        label.appendChild(document.createTextNode(text));
        return label;
    }

    // Função auxiliar para criar elemento input
    function createInput(type, name) {
        const input = document.createElement("input");
        input.setAttribute("type", type);
        input.setAttribute("name", name);
        return input;
    }

    // Função auxiliar para criar elemento button
    function createButton(type, text) {
        const button = document.createElement("button");
        button.setAttribute("type", type);
        button.appendChild(document.createTextNode(text));
        return button;
    }

    // Função auxiliar para adicionar vários filhos a um elemento
    function appendChildren(parent, children) {
        children.forEach(child => parent.appendChild(child));
    }


}

// Função Exibir Poesias
function exibirPoesias() {
    //alert("Ação: Exibir Poesias");
    removerFormAnterior()
}

// Função Exibir Autores
function exibirAutores() {
    removerFormAnterior()

    fetch('/autor', {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            // Manipular a resposta do servidor, se necessário
            console.log('Resposta do servidor:', data);
            let footer = document.querySelector('footer');
            footer.innerHTML = "";
            data.forEach(autor => {
                // Criação de um elemento de card
                const card = document.createElement('div');
                card.classList.add('card'); // Adiciona uma classe ao card para estilização
            
                // Adiciona o nome do autor ao card
                const nomeElement = document.createElement('p');
                nomeElement.textContent = `Nome: ${autor.nome}`;
                card.appendChild(nomeElement);
            
                // Adiciona o email do autor ao card
                const emailElement = document.createElement('p');
                emailElement.textContent = `Email: ${autor.email}`;
                card.appendChild(emailElement);
            
                // Cria um link para a imagem que inicia o download ao clicar
                const imgLink = document.createElement('a');
                imgLink.href = "img/" + autor.img; // Supondo que `img` seja o caminho para a imagem do autor
                imgLink.download = autor.img; // Define o nome do arquivo para download
                imgLink.style.textDecoration = 'none'; // Remove a sublinhado padrão
            
                // Adiciona a imagem ao link
                const imgElement = document.createElement('img');
                imgElement.src = "img/" + autor.img; // Supondo que `img` seja o caminho para a imagem do autor
                imgElement.alt = `Imagem de ${autor.nome}`;
                
                // Adiciona estilos para limitar o tamanho da imagem
                imgElement.style.maxWidth = '150px';
                imgElement.style.maxHeight = '150px';
            
                // Adiciona a imagem ao link
                imgLink.appendChild(imgElement);
            
                // Adiciona o link (com a imagem) ao card
                card.appendChild(imgLink);
            
                // Adiciona a borda ao card usando JavaScript
                card.style.border = '1px solid #ccc'; // Cor e largura da borda
                card.style.padding = '10px'; // Espaçamento interno para melhor aparência
                card.style.margin = '10px'; // Espaçamento externo entre os cards
            
                // Adiciona o card ao footer
                footer.appendChild(card);
            });
            
            

        })
        .catch(error => {
            console.error('Erro ao buscar dados para /autor:', error);
        });
}

// Função auxiliar para adicionar vários filhos a um elemento
function appendChildren(parent, children) {
    children.forEach(child => parent.appendChild(child));
}

function removerFormAnterior() {
    main.querySelectorAll("form").forEach(f => main.removeChild(f));
    document.querySelector('footer').innerHTML = "footer";
}




//let fileName = document.getElementsByName("single")[0].value.split("\\")[2]

//ao clicas em cadastrar autor, fileName deve ser passado como parâmetro no json