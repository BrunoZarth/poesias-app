const main = document.createElement("main");
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
const labelUpload = createLabel("Escolha um arquivo:");
const inputUpload = createInput("file", "single");

// Botão Submit
const buttonSubmit = createButton("submit", "Cadastrar Autor");

form.setAttribute("action", "/autor");
form.setAttribute("method", "post");
form.setAttribute("enctype", "multipart/form-data");

appendChildren(fieldset, [labelNome, inputNome, labelEmail, inputEmail, labelSenha, inputSenha, labelUpload, inputUpload, buttonSubmit]);
form.appendChild(fieldset);
main.appendChild(form);

document.body.appendChild(main);

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
