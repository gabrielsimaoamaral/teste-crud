import { db } from "../db.js";

export const getTasks = (_, res) => {
    const q = "SELECT * FROM tarefas";

    db.query(q, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    });
}

export const addTask = (req, res) => {
    const q = "INSERT INTO tarefas (`titulo`, `descricao`) VALUES(?)"

    const values = [
        req.body.titulo,
        req.body.descricao,
    ];

    db.query(q, [values], (err) => {
        if(err) return res.json(err);
        return res.status(200).json("Tarefa criada com sucesso!");
    });
};

export const updateTask = (req, res) => {
    const q = "UPDATE tarefas SET `titulo` = ?, `descricao` = ? WHERE `id` = ?";
    
    const values = [
        req.body.titulo,
        req.body.descricao,
    ];

    db.query(q, [...values, req.params.id], (err) => {
        if (err) return res.json(err);
        return res.status(200).json("Tarefa atualizada com sucesso!");
    });
}

export const deleteTask = (req, res) => {
    const q = "DELETE FROM tarefas WHERE `id` = ?";

    db.query(q, [req.params.id], (err) => {
        if (err) return res.json(err);
        return res.status(200).json("Tarefa deletada com sucesso!");
    });
}