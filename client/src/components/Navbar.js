import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import useHover from "@react-hook/hover";
import { useRef } from "react";

function Navbar() {
  const navigate = useNavigate();

  const Hovertarget = useRef(null);
  const Hovered = useHover(Hovertarget);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Container>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              <Link to="/" style={{ textDecoration: "none", color: "#eee" }}>
                PERN Stack
              </Link>
            </Typography>

            <Button
              variant={Hovered ? "contained" : "outlined"}
              color="info"
              ref={Hovertarget}
              onClick={() => navigate("/tasks/new")}
              >
              New Task
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

export default Navbar;
