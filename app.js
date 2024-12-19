import ToDoService from "./service.js";

function getAppElement(appId) {
    return document.getElementById(appId);
};

function createItemElement(item) {
    let divElement = document.createElement('div');
    divElement.style.backgroundColor = item.done === true ? 'green' : 'red';

    let pElement = document.createElement('p');
    pElement.textContent = item.text;

    let spanElement = document.createElement('span');
    spanElement.style.visibility = false;
    spanElement.textContent = item.id;

    let buttonElement = document.createElement('button');
    buttonElement.textContent = 'toggle'

    let rateElement = document.createElement('div');

    for (let i = 1; i <= item.rate; i++) {
        let imgElement = document.createElement('img');
        imgElement.setAttribute('src', './star.png');

        rateElement.appendChild(imgElement);

        imgElement.addEventListener('click', () => {
            rateElement.removeChild(imgElement);
        })
    }

    buttonElement.addEventListener('click', () => {
        item.done = !item.done;
        divElement.style.backgroundColor = item.done === true ? 'green' : 'red';
        service.toggleToDoItem(item.id, item.done);
    })

    divElement.appendChild(spanElement);
    divElement.appendChild(pElement);
    divElement.appendChild(rateElement);
    divElement.appendChild(buttonElement);

    return divElement;
}

function addItems(appElement, items) {
    let ulElement = document.createElement('ul');
    appElement.appendChild(ulElement);

    for (let item of items) {
        let liElement = document.createElement('li');
        let todoItemElement = createItemElement(item);
        liElement.appendChild(todoItemElement);
        ulElement.appendChild(liElement);
    }
    return ulElement;
}

const service = new ToDoService();
const items = await service.fetchToDoItems();
const appElement = getAppElement('toDoApp');



let selectElement = document.createElement('select');

let ascOption = document.createElement('option');
ascOption.setAttribute('value', 'asc');
ascOption.textContent = 'Ascending'

let descOption = document.createElement('option');
descOption.setAttribute('value', 'desc');
descOption.textContent = 'Descending'

selectElement.append(ascOption, descOption);

appElement.appendChild(selectElement)

let sortButton = document.createElement('button');
sortButton.textContent = "sort";
appElement.appendChild(sortButton);
sortButton.addEventListener('click', () => {
    let sortedItems = [];

    let selectedOption = selectElement.options[selectElement.selectedIndex].value;

    appElement.removeChild(ulElement);

    if (selectedOption === 'asc') {
        sortedItems = items.sort((a, b) => (a.rate > b.rate) ? 1 : ((b.rate > a.rate) ? -1 : 0));
    } else {
        sortedItems = items.sort((a, b) => (b.rate > a.rate) ? 1 : ((a.rate > b.rate) ? -1 : 0));
    }
    ulElement = addItems(appElement, sortedItems);

})


let ulElement = addItems(appElement, items);

