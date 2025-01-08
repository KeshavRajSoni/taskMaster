import { useSelector } from "react-redux";
import UserDashboard from "../components/UserDashboard";
import AdminDashboard from "../components/AdminDashboard";

function DashBoard() {
  const role = useSelector((store) => store.auth.role);

  return (
    <div>
      {role === "user" && <UserDashboard />}
      {role === "admin" && <AdminDashboard />}
      {role === null && <h1>no role</h1>}
    </div>
  );
}

export default DashBoard;
