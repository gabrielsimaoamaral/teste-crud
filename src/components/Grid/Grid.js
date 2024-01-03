import React from 'react';
import axios from "axios";
import "./grid.css";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from 'react-toastify';

export default function Grid({ tasks, setTasks, setOnEdit }) {

    const update = (item) => {
        setOnEdit(item);
    }

    const deletar = async (id) => {
        await axios.delete("http://localhost:8800/" + id)
        .then(({ data }) => {
            const newArray = tasks.filter((task) => task.id !== id)

            setTasks(newArray);
            toast.success(data);
        }).catch(({ data }) => toast.error(data));

        setOnEdit(null);
    }

    return (
        <table className='tabela'>
            <thead>
                <tr>
                    <th>Título</th>
                    <th>Descrição</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {tasks.map((item, i) => (
                    <tr key={i}>
                        <td width="30%">{item.titulo}</td>
                        <td width="30%">{item.descricao}</td>
                        <td width="5%" className='icone'>
                            <FaEdit onClick={() => update(item)} />
                        </td>
                        <td width="5%" className='icone'>
                            <FaTrash onClick={() => deletar(item.id)} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
