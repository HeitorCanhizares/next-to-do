import Head from "next/head";
import useSWR from "swr";
import dayjs from "dayjs";
import TodoForm from "components/todoForm";

const fetcher = url => fetch(url).then(res => res.json());
const removeTodo = todoId => {
    fetch("/api/todos?id=" + todoId, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
};

const tableRowItem = function (item) {
    return (
        <div key={item.id} className="list-item">
            <input type={"checkbox"} />
            <div>{item.title}</div>
            <button onClick={() => removeTodo(item.id)}>X</button>
        </div>
    );
};

export default function Home() {
    const { data, error } = useSWR("/api/todos", fetcher, {
        refreshInterval: 10,
    });
    console.log(data);
    if (error) {
        return <div>Falha ao carregar</div>;
    }
    if (!data) {
        return <div>Carregando...</div>;
    }

    return (
        <div>
            <head>
                <title>To-Do</title>
                <meta name="description" content="To-Do nextJS" />
            </head>

            <TodoForm />

            <div className="list">{data.map(item => tableRowItem(item))}</div>
        </div>
    );
}
