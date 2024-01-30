const footer = document.createElement("footer");
const footerP = document.createElement("p");

const footerContent = document.createTextNode(`
footer funcionando!
`);

footer.appendChild(footerP);
footerP.appendChild(footerContent);
document.body.appendChild(footer);