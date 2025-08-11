import './App.css';
import { BrowserRouter } from "react-router-dom";
import { Router } from "./router";
import './index.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
