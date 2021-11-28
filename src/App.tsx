import React from "react";
import Header from "./components/Header";
import Posts from "./components/Posts";
import "./styles/app.scss";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Posts />
    </div>
  );
};

export default App;
