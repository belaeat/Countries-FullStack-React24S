import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './store';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/Home';
import { Login } from './components/Auth/Login';
import { Register } from './components/Auth/Register';
import { ProtectedRoute } from './components/Auth/ProtectedRoute';
import CountryDetail from './components/Countries/CountryDetail';
import CountriesList from './components/Countries/CountriesList';
import Layout from './components/Layout/Layout';
import { ProtectedTestData } from './components/ProtectedTestData';
import { Favorites } from './components/Favorites/Favorites';

function App() {
  return (
    <Provider store={store}>
      <CssBaseline />
      <Router>
        <AuthProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/countries" element={<ProtectedRoute><CountriesList /></ProtectedRoute>} />
              <Route path="/countries/:name" element={<ProtectedRoute><CountryDetail /></ProtectedRoute>} />
              <Route path="/test" element={<ProtectedRoute><ProtectedTestData /></ProtectedRoute>} />
              <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
            </Routes>
          </Layout>
        </AuthProvider>
      </Router>
      <ToastContainer />
    </Provider>
  );
}

export default App;
