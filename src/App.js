import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import Layout from './Screens/Layout'
import Home from './Screens/Home'
import User from './Screens/User'
import Admin from './Screens/Admin'
import Page404 from './Screens/Page404'

let theme = createTheme({
  direction: 'rtl',
  palette: {
    primary: {
      main: '#689f38'
    },
  },
  typography: {
    fontFamily: 'Varela Round',
    fontSize: 18
  },
});



function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/user" element={<User />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<Page404 />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
      <ToastContainer rtl />
    </>
  );
}

export default App;
