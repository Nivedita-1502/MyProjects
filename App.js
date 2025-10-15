import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", dueDate: "" });

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = () => {
    axios.get("http://localhost:5000/api/tasks")
      .then((res) => setTasks(res.data));
  };

  const addTask = () => {
    if (!form.title.trim()) return;
    axios.post("http://localhost:5000/api/tasks", { ...form, status: "Pending" })
      .then(() => {
        setForm({ title: "", description: "", dueDate: "" });
        loadTasks();
      });
  };

  const deleteTask = (id) => {
    axios.delete(`http://localhost:5000/api/tasks/${id}`)
      .then(loadTasks);
  };

  const updateTaskStatus = (id) => {
    axios.put(`http://localhost:5000/api/tasks/${id}`, { status: "Completed" })
      .then(loadTasks);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Task Manager</h2>

      <div style={styles.form}>
        <input
          style={styles.input}
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          style={styles.input}
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          type="date"
          style={styles.input}
          value={form.dueDate}
          onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
        />
        <button style={styles.addBtn} onClick={addTask}>Add Task</button>
      </div>

      <table style={styles.table}>
        <thead style={styles.tableHead}>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Due</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((t) => (
            <tr key={t._id} style={styles.row}>
              <td>{t.title}</td>
              <td>{t.description}</td>
              <td>{t.dueDate}</td>
              <td>{t.status}</td>
              <td>
                <button style={styles.completeBtn} onClick={() => updateTaskStatus(t._id)}>
                  Complete
                </button>
                <button style={styles.deleteBtn} onClick={() => deleteTask(t._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial",
    backgroundColor: "#f3f7ff",
    minHeight: "100vh",
  },
  heading: {
    textAlign: "center",
    marginBottom: "15px",
    color: "#333",
  },
  form: {
    marginBottom: "20px",
    display: "flex",
    gap: "10px",
  },
  input: {
    padding: "6px",
    backgroundColor: "#eef1f7",
  },
  addBtn: {
    padding: "6px 10px",
    backgroundColor: "#6fa3ef",
    color: "white",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#ffffff",
  },
  tableHead: {
    backgroundColor: "#dce6ff",
  },
  row: {
    backgroundColor: "#f9faff",
  },
  completeBtn: {
    padding: "5px 8px",
    backgroundColor: "#7bc67e",
    color: "white",
    marginRight: "5px",
  },
  deleteBtn: {
    padding: "5px 8px",
    backgroundColor: "#f28b82",
    color: "white",
  },
};

export default App;
