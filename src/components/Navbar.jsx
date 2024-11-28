import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";
import { logOut } from "../config/firebase.jsx";

const Navbar = () => {
    const { user, setUser } = useContext(UserContext); // Obtiene el estado del usuario desde el contexto
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logOut();
            setUser(false);
            navigate("/");
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg bg-danger">
            <div className="container">
                <Link to="/" className="btn btn-secondary">Home</Link>

                {/* Si no hay usuario autenticado, muestra las opciones de registro e inicio de sesión */}
                {!user && (
                    <>
                        <NavLink to="/register" className="btn btn-secondary">Register</NavLink>
                        <NavLink to="/login" className="btn btn-secondary">Login</NavLink>
                    </>
                )}

                {/* Si hay un usuario autenticado, muestra el perfil y la opción para cerrar sesión */}
                {user && (
                    <>
                        <NavLink to="/profile" className="btn btn-secondary">
                            <img
                                src={user.photoURL || "/default-avatar.png"} // Usa una imagen predeterminada si no tiene photoURL
                                alt="Profile"
                                style={{
                                    width: "30px",
                                    height: "30px",
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                    marginRight: "8px",
                                }}
                            />
                            {user.displayName || "Profile"}
                        </NavLink>
                        <button onClick={handleLogout} className="btn btn-secondary">Cerrar sesión</button>
                    </>
                )}

                <NavLink to="/contact" className="btn btn-secondary">Contact</NavLink>
            </div>
        </nav>
    );
};

export default Navbar;
