class Todo {
  constructor(data, selector, handleCheck, handleDelete) {
    this._completed = data.completed;
    this._data = data;
    this._templateElement = document.querySelector(selector);
    this._handleCheck = handleCheck;
    this._handleDelete = handleDelete;
  }

  _setEventListeners() {
    this._todoCheckboxEl.addEventListener("change", () => {
      this._data.completed = !this._data.completed;
      this._toggleCompletion();
      this._handleCheck(this._data.completed);
    });
    this._todoElement
      .querySelector(".todo__delete-btn")
      .addEventListener("click", () => {
        this._todoElement.remove();
        this._handleDelete(this._completed);
        this._remove();
      });
  }

  _generateCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");

    this._todoCheckboxEl.checked = this._data.completed;

    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  _generateTodoDates() {
    this._todoDate = this._todoElement.querySelector(".todo__date");

    const dueDate = new Date(this._data.date);
    if (!isNaN(dueDate)) {
      this._todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }
  }

  _toggleCompletion = () => {
    this._completed = !this._completed;
  };

  _remove = () => {
    if (this._todoElement) {
      this._todoElement.remove();
      this._todoElement = null;
    }
  };

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    const todoNameEl = this._todoElement.querySelector(".todo__name");

    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    todoNameEl.textContent = this._data.name;

    this._generateCheckboxEl();
    this._setEventListeners();
    this._generateTodoDates();

    return this._todoElement;
  }
}

export default Todo;
