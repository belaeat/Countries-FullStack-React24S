import { Box, Container, AppBar, Toolbar, Typography, Button } from "@mui/material";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { TestData } from "./components/TestData";
import { ThemeProvider } from "./theme/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Countries App
              </Typography>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/test">
                Test Data
              </Button>
            </Toolbar>
          </AppBar>

          <Container sx={{ mt: 4 }}>
            <Routes>
              <Route
                path="/"
                element={
                  <Box>
                    <Typography variant="h4" component="h1" gutterBottom>
                      Welcome to the Home Page
                    </Typography>
                    <Typography variant="body1">
                      Use the navigation above to explore the app
                    </Typography>
                  </Box>
                }
              />
              <Route path="/test" element={<TestData />} />
            </Routes>
          </Container>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
