import { useNavigate } from "react-router-dom";
import "../../lendingPage/style/lending.scss";
import Logo from "../../../images/logo2.png";

const Lending = () => {
    const navigate = useNavigate();
    return (
        <>
            <div
                className="dashboard-wrapper"
                id="lending-page"
            >
                <div className="background">
                    <div className="lending">
                        <div className="logo-wrapper"></div>
                        <div className="card">
                            <img
                                src={Logo}
                                alt="split logo"
                                className="logo-image"
                            />
                        </div>
                    </div>
                </div>
                <div className="button-wrapper">
                    <button
                        className="start-button"
                        onClick={() => {
                            navigate("/home");
                        }}
                    >
                        Get Started
                    </button>
                </div>
            </div>
        </>
    );
};

export default Lending;
