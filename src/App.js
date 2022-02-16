import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import {
  ThemeProvider,
  createTheme
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { prefixer } from "stylis";

import ContextProvider from './Context';

import Layout from './Screens/Layout'
import Home from './Screens/Home'
import User from './Screens/User'
import Admin from './Screens/Admin'
import Page404 from './Screens/Page404'
import AdminMemory from './Screens/AdminMemory'
import UserMemory from './Screens/UserMemory'

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin]
});

let theme = createTheme({
  direction: 'rtl',
  palette: {
    primary: {
      main: '#689f38',
      secondary: "#808080"
    },
  },
  typography: {
    fontFamily: 'Varela Round',
    fontSize: 16,
    textAlign: "right"
  },
});



function App() {
  return (
    <ContextProvider>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/user" element={<User />} />
                <Route path="/user/:memoryId" element={<UserMemory />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/:memoryId" element={<AdminMemory />} />
                <Route path="*" element={<Page404 />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </CacheProvider>
    </ContextProvider>
  );
}

export default App;
