import React from "react";
import "./styles/app.scss";
import Header from "./components/Header";
import Posts from "./components/Posts";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Posts />
    </div>
  );
};

export default App;
