import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AppLayout from "./components/app-layout";
import Home from "./pages/home";
import { Toaster } from "react-hot-toast";
import { DateProvider } from "./contexts/date-context";
import Raffles from "./pages/raffles";
import RafflesDetails from "./pages/raffles-details";

function App() {
  return (
    <>
      <DateProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<Home />} />
              <Route path="raffles">
                <Route index element={<Raffles />} />
                <Route path=":address" element={<RafflesDetails />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster position="top-center" gutter={12} containerStyle={{ margin: "8px" }} toastOptions={{ duration: 5000, style: { background: "#363636", color: "#fff", padding: "16px 24px" } }} />
      </DateProvider>
    </>
  );
}

export default App;
