import { Route, Routes, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import HomeStyle4 from './components/Pages/HomeStyle4';
import About from './components/Pages/About';
import Doctors from './components/Pages/Doctors';
import Blog from './components/Pages/Blog';
import Appointments from './components/Pages/Appointments';
import Kalkulator from './components/Pages/Kalkulator';
import DepartmentDetails from './components/Pages/DepartmentDetails';
import BlogDetails from './components/Pages/BlogDetails';
import DoctorDetails from './components/Pages/DoctorDetails';
import Gallery from './components/Pages/Gallery';
import PlaylistPage from './components/Pages/PlaylistPage';
import Contact from './components/Pages/Contact';
import { useEffect } from 'react';
import ErrorPage from './components/Pages/ErrorPage';
import LoginPage from './pages/Login/Login';
import Dashboard from './pages/Dashboard/dashboard';
import MainBlog from './pages/Profile/Profile';
import AdminPlaylistPost from './pages/Admin/Admin';
import Testing from './pages/Testing/testing';
import Bidan from './pages/User/User';
import DataAnak from './pages/Anak/Anak';
import ArticleManagement from './pages/Artikel/Artikel'
import Medis from './pages/Medis/Medis'
import AuthProvider from './providers/AuthProviders';
import PrivateRoute from './pages/Dashboard/PrivateRoute';
import MainProfile from './pages/MainProfile/MainProfile';
import MainCenter from './pages/MainCenter/MainCenter';


function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <AuthProvider>
    <Routes>
      <Route path="/" element={ <Layout />}>
        <Route index element={<HomeStyle4 />} />
        <Route path="about" element={<About />} />
        <Route path="doctors" element={<Doctors />} />
        <Route path="doctors/:doctorId" element={<DoctorDetails />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:blogId" element={<BlogDetails />} />
        <Route path="appointments" element={<Appointments />} />
        <Route
          path="departments/:departmentId"
          element={<DepartmentDetails />}
        />
        <Route path="Kalkulator" element={<PrivateRoute component={<Kalkulator/>}/>} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="PlaylistPage" element={<PlaylistPage />} />
        <Route path="contact" element={<Contact />} />

      </Route>
      <Route path='/LoginPage' element={<LoginPage/>}></Route>
      {/* <Route index element={<div>Dashboard Overview</div>} /> Tampilan default Dashboard */}
          <Route path="AdminPlaylistPost" element={<PrivateRoute component={<AdminPlaylistPost/>}/>}/>
          <Route path="MainBlog" element={< PrivateRoute component={<MainBlog/>}/>} />
          <Route path="Testing" element={<PrivateRoute component={<Testing/>}/>} />
          <Route path="Bidan" element={<PrivateRoute component={<Bidan/>}/>} />
          <Route path="DataAnak" element={<PrivateRoute component={<DataAnak/>}/>}/>
          <Route path="Artikel" element={<PrivateRoute component={<ArticleManagement/>}/>}/>
          <Route path="Medis" element={<PrivateRoute component={<Medis/>}/>}/>
          <Route path="MainProfile" element={<PrivateRoute component={<MainProfile/>}/>}/>
          <Route path="MainCenter" element={<PrivateRoute component={<MainCenter/>}/>}/>
          <Route path="dashboard" element={<PrivateRoute component={<Dashboard />}/>}>
      </Route>
      
      <Route path="*" element={<ErrorPage />} />
    </Routes>
    </AuthProvider>
  );
}

export default App;
