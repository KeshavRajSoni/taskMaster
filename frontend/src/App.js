

//packages
import { BrowserRouter, Route, Routes } from "react-router-dom";

//pages
import HomePage from './pages/HomePage';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import ProtectedRoute from './pages/ProtectedRoute';
import DashBoard from './pages/DashBoard';
import PageNotFound from "./pages/PageNotFound";


function App() {


  if (localStorage.getItem("user") === null) {
    const user = {
      id: null,
      name: null,
      token: null,
      isAuthenticated: false,
      role: null, // "admin", "user", null
    };

    localStorage.setItem("user", JSON.stringify(user));
  }

  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route index element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          }
        >

        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
