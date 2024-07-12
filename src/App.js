import React from "react";
import './App.css'
import NavBar from "./components/NavBar/NavBar";
import Banner from "./components/Banner/Banner";
import RowPost from "./components/RowPost/RowPost";
import { originals,actions,ComedyMovies,ActionMovies,HorrorMovies,RomanceMovies,Documentaries } from "./url";
function App() {
  return (
    <div className="App">
      <NavBar/>
      <Banner/>
      <RowPost url = {originals} title = 'NetFlix Original'/>
      <RowPost url = {actions} title = 'Actions' isSmall />
      <RowPost url = {ComedyMovies} title = 'ComedyMovies' isSmall />
      <RowPost url = {HorrorMovies} title = 'HorrorMovies' isSmall />
      <RowPost url = {ActionMovies} title = 'ActionMovies' isSmall />
      <RowPost url = {RomanceMovies} title = 'RomanceMovies' isSmall />
      <RowPost url = {Documentaries} title = 'Documentaries' isSmall />
    </div>
  );
}

export default App;
