import React, { useEffect, useRef } from 'react';
import './formulario.css';
import axios from "axios";
import { toast } from 'react-toastify';

export default function Form({ onEdit, setOnEdit, getTasks }) {
    const ref = useRef();

    useEffect(() => {
        if (onEdit) {
            const task = ref.current;

            task.titulo.value = onEdit.titulo;
            task.descricao.value = onEdit.descricao;
        }
    }, [onEdit]);

    const enviar = async (e) => {
        e.preventDefault();

        const task = ref.current;

        if (
            !task.titulo.value ||
            !task.descricao.value
        ) {
            return toast.warn("Preencha todos os campos.");
        }

        if (onEdit) {
            await axios.put("http://localhost:8800/" + onEdit.id, {
                titulo: task.titulo.value,
                descricao: task.descricao.value,
            }).then(({ data }) => toast.success(data))
            .catch(({ data }) => toast.error(data));
        } else {
            await axios.post("http://localhost:8800", {
                titulo: task.titulo.value,
                descricao: task.descricao.value,
            }).then(({ data }) => toast.success(data))
            .catch(({ data }) => toast.error(data));
        }

        task.titulo.value = "";
        task.descricao.value = "";

        setOnEdit(null);
        getTasks();
    }

    return (
        <form className='formulario' ref={ref} onSubmit={enviar}>
            <div className='escopo'>
                <label>Título</label>
                <input type='text' placeholder='Nome da tarefa' name='titulo' className='formulario__entrada'></input>
            </div>
            <div className='escopo'>
                <label>Descrição</label>
                <input type='text' placeholder='Descrição da tarefa' name='descricao' className='formulario__entrada'></input>
            </div>
            <button type='submit' className='botao'>Enviar</button>
        </form>
    )
}
