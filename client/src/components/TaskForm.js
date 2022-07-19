import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import useHover from "@react-hook/hover";
import { useEffect, useRef, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

function TaskForm() {
  const Hovertarget = useRef();
  const Hovered = useHover(Hovertarget);

  const navigate = useNavigate();
  const params = useParams();

  const [task, setTask] = useState({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (editing) {
      const res = await fetch(`http://localhost:4000/tasks/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
      const data = await res.json();
      console.log(data);
    } else {
      const res = await fetch("http://localhost:4000/tasks", {
        method: "POST",
        body: JSON.stringify(task),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      console.log(data);
      setEditing(false);
    }

    setLoading(false);
    navigate("/");
  };

  const handleChange = (e) =>
    setTask({ ...task, [e.target.name]: e.target.value });

  const loadTask = async (id) => {
    const res = await fetch(`http://localhost:4000/tasks/${id}`);
    const data = await res.json();
    setTask({ title: data.title, description: data.description });
    setEditing(true);
  };

  useEffect(() => {
    if (params.id) {
      loadTask(params.id);
    }
  }, [params.id]);

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={3}>
        <Card
          sx={{ mt: 5 }}
          style={{
            backgroundColor: "#1e272e",
            padding: "1rem",
          }}
        >
          <Typography variant="5" textAlign="center" color="white">
            {!editing ? "Create Task" : "Editing Task"}
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="filled"
                label="Write your title"
                value={task.title}
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                name="title"
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />

              <TextField
                variant="filled"
                label="Write your description"
                multiline
                rows={4}
                value={task.description}
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                name="description"
                onChange={handleChange}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />

              <Button
                variant={Hovered ? "contained" : "outlined"}
                ref={Hovertarget}
                color={Hovered ? "primary" : "secondary"}
                type="submit"
                disabled={!task.title || !task.description}
              >
                {loading ? (
                  <CircularProgress color="inherit" size={24} />
                ) : !editing ? (
                  "Create"
                ) : (
                  "Editing"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default TaskForm;
