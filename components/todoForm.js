import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useSWRConfig } from "swr";

const postNewTodo = function (todo, mutate) {
	mutate(
		"/api/todos",
		async todos => {
			let result = await fetch("/api/todos", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(todo),
			});
			let insertedTodo = await result.json();
			let filteredData = todos.filter(
				todo => todo.id !== insertedTodo.id
			);
			return [...filteredData, insertedTodo];
		},
		{ revalidate: false }
	);
};

const checkKeyPressed = function (event, callbackFunc) {
	if (event.defaultPrevented) return;
	let key = event.key || event.keyCode;
	if (key === "Enter" || key === 13) callbackFunc();
};

export default function TodoForm(props) {
	const { mutate } = useSWRConfig();

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const insertTodo = () => {
		postNewTodo({ title, description: "" }, mutate);
		setTitle("");
	};

	return (
		<>
			<div className="mt-4">
				<InputGroup className="mb-3">
					<Form.Control
						value={title}
						placeholder="O que você precisa fazer?"
						onChange={e => {
							setTitle(e.target.value);
						}}
						onKeyUp={e => checkKeyPressed(e, () => insertTodo())}
					/>
					<Button
						onClick={() => {
							postNewTodo({ title, description: "" }, mutate);
							setTitle("");
						}}
					>
						Adicionar
					</Button>
				</InputGroup>
			</div>
		</>
	);
}
