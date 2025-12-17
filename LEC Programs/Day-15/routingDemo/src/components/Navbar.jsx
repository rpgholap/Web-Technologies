import { Link } from "react-router-dom";

export function Navbar(){
    return (
        <div>
            <Link to="/">Home</Link>
            <Link to="/about-us">About Us</Link>
            <Link to="/contact-us">Contact Us</Link>
        </div>
    )
}