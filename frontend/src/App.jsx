import Router from "./routes/Router.jsx";
import Navbar from "./components/shared/Navbar.jsx";
import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const App = () => {
  return (
    <div className="w-full min-h-screen bg-baby">
      <Navbar />
      <ToastContainer />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default App;
