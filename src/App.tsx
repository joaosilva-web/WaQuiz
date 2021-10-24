import { useState, useEffect} from "react";
import { Start } from "./components/Start";
import { Question } from "./components/Questions";
import "./app.css";

export function App() {
  

  return (
    <div className="App">
      <Start/>
      <Question/>
    </div>
  )
}
