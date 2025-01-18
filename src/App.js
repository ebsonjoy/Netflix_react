import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from './ProtectedRoute'
import LoginPage from "./components/LoginPage/LoginPage";
import NavBar from "./components/NavBar/NavBar";
import Banner from "./components/Banner/Banner";
import RowPost from "./components/RowPost/RowPost";
import ProfilePage  from './components/ProfilePage/ProfilePage'
import { originals, actions, ComedyMovies, ActionMovies, HorrorMovies, RomanceMovies, Documentaries } from "./url";
import './App.css';


function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <div>
                  <NavBar />
                  <Banner />
                    <RowPost url={originals} title="Netflix Originals" />
                    <RowPost url={actions} title="Actions" isSmall />
                    <RowPost url={ComedyMovies} title="Comedy Movies" isSmall />
                    <RowPost url={HorrorMovies} title="Horror Movies" isSmall />
                    <RowPost url={ActionMovies} title="Action Movies" isSmall />
                    <RowPost url={RomanceMovies} title="Romance Movies" isSmall />
                    <RowPost url={Documentaries} title="Documentaries" isSmall />
                    </div>
              </ProtectedRoute>
            }
          />
          <Route 
  path="/profile" 
  element={
    <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  } 
/>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;