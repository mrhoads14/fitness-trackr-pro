import { useAuth } from "../auth/AuthContext";
import { NavLink } from "react-router";

/** Navbar with site navigation links */
export default function Navbar() {
  const { token, logout } = useAuth();
  //const { setPage } = usePage();
  return (
    <header>
      <p>Fitness Trackr</p>
      <nav>
        <NavLink
          className={({ isActive }) => isActive ? "active" : ""}
          to="/activities"
        >
          Activities
        </NavLink>
        {token ? (
          <>
            <NavLink
              className={({ isActive }) => isActive ? "active" : ""}
              to="/activities"
              onClick={() => logout()}
            >
              Log out
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              className={({ isActive }) => isActive ? "active" : ""}
              to="/register"
            >
              Register
            </NavLink>
            <NavLink
              className={({ isActive }) => isActive ? "active" : ""}
              to="/login"
            >
              Login
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
