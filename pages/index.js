import dayjs from "dayjs";
import useSWR from "swr";

const fetcher = url => fetch(url).then(res => res.json());

const tableRowItem = function (item) {
    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.title}</td>
            <td>{item.description}</td>
            <td>{dayjs(item.createdAt).format("DD/MM/YYYY HH:mm")}</td>
            <td>{item.done ? "Sim" : "Não"}</td>
            <td>{item.finishedAt}</td>
        </tr>
    );
};

export default function Home() {
    const { data, error } = useSWR("/api/todos", fetcher);

    if (!data) return <div>Carregando...</div>;

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Descrição</th>
                        <th>Criado Em</th>
                        <th>Finalizado</th>
                        <th>Finalizado Em</th>
                    </tr>
                </thead>
                <tbody>{data.map(item => tableRowItem(item))}</tbody>
            </table>
        </div>
    );
}
