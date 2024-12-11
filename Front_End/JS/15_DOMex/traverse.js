// Element Traversal API

let parentElement = document.querySelector('body');
let currentChildElement = parentElement.firstChild;

function processChildElement(e) {
    console.log(e);
}

while (currentChildElement) {
    processChildElement(currentChildElement);
    if (currentChildElement == parentElement.lastElementChild) {
        break;
    }
    // currentChildElement = currentChildElement.nextSibling; // 这个时候TextNode会出来
    currentChildElement = currentChildElement.nextElementSibling; // TextNode不会出来
}