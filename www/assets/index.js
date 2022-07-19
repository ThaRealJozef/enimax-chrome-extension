function createElement(x) {
    let temp;
    if ("element" in x) {
        temp = document.createElement(x.element);

    } else {
        temp = document.createElement("div");

    }
    let attributes = x.attributes;

    for (value in attributes) {
        temp.setAttribute(value, attributes[value]);
    }



    for (value in x.style) {

        temp.style[value] = x.style[value];
    }


    if ("id" in x) {
        temp.id = x.id;
    }

    if ("class" in x) {
        temp.className = x.class;
    }

    if ("innerText" in x) {
        temp.textContent = x.innerText;
    }

    if ("innerHTML" in x) {
        temp.innerHTML = x.innerHTML;
    }

    let listeners = x.listeners;

    for (value in listeners) {
        temp.addEventListener(value, listeners[value]);
    }

    return temp;

}