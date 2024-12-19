import testItems from "./test-data.js";

class ToDoService {

    async fetchToDoItems() {

        let data = [];

        await fetch('http://localhost:3000/to-do-items')
            .then(async response => {
                data = await response?.json();
            })
            .catch(() => {
                data = testItems;
            });

        return data;

    };

    async toggleToDoItem(id, value){

        // TODO

    }

}

export default ToDoService;