import "../../lendingPage/style/lending.scss";
import { useNavigate } from "react-router-dom";

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
                        <div class="card">
                            <h1>Split Wise</h1>
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
                        WelCome{" "}
                    </button>
                </div>
            </div>
        </>
    );
};

export default Lending;
