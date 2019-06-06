import { TodoListModel } from "./Model/TodoListModel.js";
import { TodoItemModel } from "./Model/TodoItemModel.js";
import { element, render } from "./view/html-util.js";

export class App {
    constructor() {
        // TodoListの初期化
        this.todoListModel = new TodoListModel();
    }
    mount() {
        const formElement = document.querySelector("#js-form");
        const inputElement = document.querySelector("#js-form-input");
        const containerElement = document.querySelector("#js-todo-list");
        const todoItemCountElement = document.querySelector("#js-todo-count");

        // 2. TodoListModelの状態が更新されたら表示を更新する
        this.todoListModel.onChange(() => {
            // TodoリストをまとめるList要素
            const todoListElement = element`<ul />`;
            // それぞれのTodoItem要素をTodoListElement以下へ追加する
            const todoItems = this.todoListModel.getTodoItems();
            todoItems.forEach(item => {
                // 完了済みなら checked 属性を付けて，未完了なら checked 属性を外す
                const todoItemElement = item.completed
                ? element`<li><input type="checkbox" class="checkbox" checked><s>${item.title}</s></input></li>`
                : element`<li><input type="checkbox" class="checkbox">${item.title}</input></li>`
                const inputCheckboxElement = todoItemElement.querySelector(".checkbox");
                inputCheckboxElement.addEventListener("change", () => {
                    this.todoListModel.updateTodo({
                        id: item.id,
                        completed: !item.completed
                    });
                });
                todoListElement.appendChild(todoItemElement);
            });
            // containerElementの中身をtodoListElementで上書きする
            render(todoListElement, containerElement);
            // アイテム数の表示を更新
            todoItemCountElement.textContent = `Todoアイテム数: ${this.todoListModel.getTotalCount()}`;
        });

        formElement.addEventListener("submit", (event) => {
            event.preventDefault();
            this.todoListModel.addTodo(new TodoItemModel({
                title: inputElement.value,
                completed: false
            }));
            // 入力欄を空文字にリセットする
            inputElement.value = "";
        });
    }
}