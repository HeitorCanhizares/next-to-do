/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";

const postNewTodo = function (title, description, todo) {
    todo.title = title;
    todo.description = description;
    fetch("/api/todos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
    });
};

export default function TodoDialog(props) {
    if (props.isOpen === true) {
        const [title, setTitle] = useState(props.item.title);
        const [description, setDescription] = useState(props.item.description);

        return (
            <div className="todo-dialog">
                <div className="todo-dialog-toolbar">
                    <div>{props.title}</div>
                    <div
                        onClick={() => props.setIsOpen(false)}
                        className="close"
                    >
                        X
                    </div>
                </div>
                <div className="todo-dialog-body">
                    <input
                        className="title-input"
                        type="text"
                        placeholder="Título"
                        value={title}
                        onChange={v => setTitle(v.target.value)}
                    />
                    <textarea
                        className="description-input"
                        type="text"
                        placeholder="Descrição"
                        value={description}
                        onChange={v => setDescription(v.target.value)}
                    />
                    <div className="action-buttons">
                        <button
                            onClick={() => {
                                updateTodo(title, description, props.item);
                                props.setIsOpen(false);
                            }}
                        >
                            Salvar
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
