import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AppLayout from "./components/app-layout";
import Home from "./pages/home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
