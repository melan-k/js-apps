import { render } from "./view/html-util.js";
import { TodoListView } from "./view/TodoListView.js"
import { TodoItemModel } from "./model/TodoItemModel.js";
import { TodoListModel } from "./model/TodoListModel.js";

export class App {
    constructor() {
        // TodoListの初期化
        this.todoListView = new TodoListView();
        this.todoListModel = new TodoListModel([]);
    }

    /**
     * Todoを追加時に呼ばれるリスナー関数
     * @param {string} title
     */
    handleAdd(title) {
        this.todoListModel.addTodo(new TodoItemModel({ title, completed: false }));
    };

    /**
     * Todoの状態を更新時に呼ばれるリスナー関数
     * @param {{ id: number, completed: boolean }}
     */
    handleUpdate({ id, completed }) {
        this.todoListModel.updateTodo({ id, completed });
    };

    /**
     * Todoを削除時に呼ばれるリスナー関数
     * @param {{ id: number }}
     */
    handleDelete({ id }) {
        this.todoListModel.deleteTodo({ id });
    };

    mount() {
        const formElement = document.querySelector("#js-form");
        const inputElement = document.querySelector("#js-form-input");
        const todoListContainerElement = document.querySelector("#js-todo-list");
        const todoItemCountElement = document.querySelector("#js-todo-count");

        // 2. TodoListModelの状態が更新されたら表示を更新する
        this.todoListModel.onChange(() => {
            // それぞれのTodoItem要素をTodoListElement以下へ追加する
            const todoItems = this.todoListModel.getTodoItems();
            // todoItemsに対応するTodoListViewを作成する
            const todoListElement = this.todoListView.createElement(todoItems, {
                // todoItemsに対応するTodoListViewを作成する
                onUpdateTodo: ({ id, completed }) => {
                    this.handleUpdate( {id, completed} );
                },
                // Todoアイテムが削除イベントが発生したときに呼ばれるリスナー関数
                onDeleteTodo: ({ id }) => {
                    this.handleDelete({ id });
                }
            });
            // containerElementの中身をtodoListElementで上書きする
            render(todoListElement, todoListContainerElement);
            // アイテム数の表示を更新
            todoItemCountElement.textContent = `Todoアイテム数: ${this.todoListModel.getTotalCount()}`;
        });

        formElement.addEventListener("submit", (event) => {
            event.preventDefault();
            this.handleAdd(inputElement.value);
            // 入力欄を空文字にリセットする
            inputElement.value = "";
        });
    }
}