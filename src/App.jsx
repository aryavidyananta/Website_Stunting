import { Routes, Route } from "react-router-dom";
import "antd/dist/reset.css";
import './App.css';
import LoginPage from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/dashboard";
import Profile from "./pages/Profile/Profile";
// Add the Projects page

function App() {
  return (
    <div>
      <Routes>
        {/* Login Routes */}
        <Route exact path="/" element={<LoginPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        
        {/* Dashboard Routes with Nested Pages */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="profile" element={<Profile />} />  {/* Nested under /dashboard */}
          <Route path="projects" element={<Profile />} /> {/* Nested under /dashboard */}
        </Route>

      </Routes>
    </div>
  );
}

export default App;
