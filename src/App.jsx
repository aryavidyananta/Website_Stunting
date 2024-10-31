import { Route, Routes, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import HomeStyle4 from './components/Pages/HomeStyle4';
import About from './components/Pages/About';
import Doctors from './components/Pages/Doctors';
import Blog from './components/Pages/Blog';
import Appointments from './components/Pages/Appointments';
import Departments from './components/Pages/Departments';
import DepartmentDetails from './components/Pages/DepartmentDetails';
import BlogDetails from './components/Pages/BlogDetails';
import DoctorDetails from './components/Pages/DoctorDetails';
import Gallery from './components/Pages/Gallery';
import Contact from './components/Pages/Contact';
import { useEffect } from 'react';
import ErrorPage from './components/Pages/ErrorPage';
import LoginPage from './pages/Login/Login';
import Dashboard from './pages/Dashboard/dashboard';
import Profile from './pages/Profile/Profile';

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomeStyle4 />} />
        <Route path="about" element={<About />} />
        <Route path="doctors" element={<Doctors />} />
        <Route path="doctors/:doctorId" element={<DoctorDetails />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:blogId" element={<BlogDetails />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="departments" element={<Departments />} />
        <Route
          path="departments/:departmentId"
          element={<DepartmentDetails />}
        />
        <Route path="gallery" element={<Gallery />} />
        <Route path="contact" element={<Contact />} />

      </Route>
      <Route path='/LoginPage' element={<LoginPage/>}></Route>
      <Route path="/dashboard" element={<Dashboard />}>
        {/* Rute nested di dalam Dashboard */}
  
        <Route path="profile" element={<Profile />} />
   
      </Route>
      
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
