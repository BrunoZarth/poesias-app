const header = document.createElement("header");
const headerP = document.createElement("p");

const headerContent = document.createTextNode(`
    header funcionando!
`);

header.appendChild(headerP);
headerP.appendChild(headerContent);
document.body.appendChild(header);