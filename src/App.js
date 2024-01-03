import GlobalStyle from "./styles/global.js"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import Form from "./components/Form/Form.js";
import './app.css';
import Grid from "./components/Grid/Grid.js";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getTasks = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      setTasks(res.data.sort((a, b) => (a.tarefa > b.tarefa ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getTasks();
  }, [setTasks]);

  return (
    <>
      <div className="container">
        <h2>Tarefas</h2>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getTasks={getTasks} />
        <Grid tasks={tasks} setTasks={setTasks} setOnEdit={setOnEdit}/>
      </div>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_RIGHT} />
      <GlobalStyle />
    </>
  );
}

export default App;
