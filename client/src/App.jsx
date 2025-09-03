/** @jsxImportSource @emotion/react */
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { css } from '@emotion/react';
import './App.css';
import Header from "./components/Header/Header";
import Aside from "./components/Aside/Aside";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import DetailPage from "./pages/DetailPage/DetailPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import Admin from "./pages/Admin/Admin";
import LoginPage from "./pages/LoginPage/LoginPage";
import { UserProvider } from "./contexts/userInfo";

const gridStyle = css`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(4, auto);
  width: 100%;
`;

function App() {

  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div id="root">
      {!isAdminRoute && <Header />}

      <UserProvider>
        <Routes>
          <Route index element={<Home />} />
          <Route path="product/:name" element={<DetailPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="admin/products" element={<Admin />}>
            <Route path="new" element={<Admin />} />
          </Route>
          <Route path="admin/categories" element={<Admin />}>
            <Route path="new" element={<Admin />} />
          </Route>
        </Routes>
      </UserProvider>

      {!isAdminRoute && <Aside />}
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;
