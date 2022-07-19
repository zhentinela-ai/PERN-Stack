import { useEffect, useState } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';

function TaskList() {
  const [tasks, setTasks] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:4000/tasks");
      const data = await res.json();
      setTasks(data);
    })();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:4000/tasks/${id}`, {
        method: "DELETE",
      });

      setTasks(tasks.filter((task) => task.id !== id));

      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>Task List</h1>

      {tasks.map((task) => (
        <Card
          style={{
            marginBottom: ".7rem",
            backgroundColor: "#1e272e",
          }}
          key={task.id}
        >
          <CardContent
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              <Typography color="#eee">{task.title}</Typography>
              <Typography color="#eee">{task.description}</Typography>
            </div>

            <div>
              <Button
                variant="contained"
                color="inherit"
                onClick={() => navigate(`/tasks/${task.id}/edit`)}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="warning"
                style={{ marginLeft: ".5rem" }}
                onClick={() => handleDelete(task.id)}
              >
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}

export default TaskList;
