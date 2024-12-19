import ToDoItem from "./to-do-item.js";

let other = {}
other.id = 3;
other.text = "interview practice";
other.done = false;
other.rate = 5;

const testItems = [

    new ToDoItem(
        1,
        "buy milk",
        true,
        3
    ),

    new ToDoItem(
        2,
        "buy chocolate",
        false,
        4
    ),

    other

];



export default testItems;