import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";

import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Container>
        <Navbar />

        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/tasks/new" element={<TaskForm />} />
          {/* Edit Route */}
          <Route path="/tasks/:id/edit" element={<TaskForm />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
