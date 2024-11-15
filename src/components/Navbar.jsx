import {Link, NavLink} from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-danger">
            <div className="container">
                <Link to="/" className="btn btn-secondary">Home</Link>
                <NavLink to="/register" className="btn btn-secondary">Register</NavLink>
                <NavLink to="/contact" className="btn btn-secondary">Contact</NavLink>
                <NavLink to="/profile" className="btn btn-secondary">UserProfile</NavLink>
            </div>
        </nav>
    )
}

export default Navbar;