import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await axios.post("/patient/logout");
            navigate("/patient/login");
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    Medical portal
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a
                                className="nav-link active"
                                aria-current="page"
                                href="/"
                            >
                                Home
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-link active"
                                aria-current="page"
                                href="/patient/dashboard"
                            >
                                Profile
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/patient/history">
                                History
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-link"
                                onClick={handleLogout}
                                href="/login"
                            >
                                Log out
                            </a>
                        </li>
                        {/*<li className="nav-item">*/}
                        {/*    <a className="nav-link" href="/patient/signup">Sign Up</a>*/}
                        {/*</li>*/}
                        {/*<li className="nav-item">*/}
                        {/*    <a className="nav-link disabled" aria-disabled="true">Disabled</a>*/}
                        {/*</li>*/}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Home;
