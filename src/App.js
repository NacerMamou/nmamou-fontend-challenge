import Navigation from "./routes/navigation/navigation.route";
import Home from "./routes/home/home.route";
import Dashboard from "./routes/dashboard/dashboard.route.jsx";

import { Routes, Route, Navigate } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />}></Route>
        <Route path="dashboard" element={<Dashboard />}></Route>
      </Route>
    </Routes>
  );
};

export default App;
