import { useNavigate } from "react-router-dom";
import "../../homepage/style/homeStyle.scss";
import Back from "../../../images/back.png";
import { useLocation } from "react-router-dom";

function BackLanding() {
    const navigate = useNavigate();
    const location = useLocation();
    const clickHandler = () => {
        if (
            location.pathname == "/allExpenses" ||
            location.pathname == "/AddExpense"
        ) {
            navigate("/home", { replace: true });
        } else {
            navigate("/", { replace: true });
        }
    };
    return (
        <>
            <button
                onClick={clickHandler}
                className="BackButton"
            >
                <img
                    src={Back}
                    alt="Back"
                    className="back-image"
                />
            </button>
        </>
    );
}
export default BackLanding;
