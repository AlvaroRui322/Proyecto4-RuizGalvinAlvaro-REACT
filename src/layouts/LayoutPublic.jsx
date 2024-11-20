import {Outlet} from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

const LayoutPublic = () => {
    return (
        <div>
            <Navbar/>
            <Outlet />
            <footer className="navbar navbar-expand-lg bg-danger">Footer</footer>
        </div>
    )
}

export default LayoutPublic