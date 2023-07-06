import { useNavigate } from "react-router-dom";
import "../../homepage/style/homeStyle.scss";
import Back from "../../../images/back.png";

function BackHome() {
    const navigate = useNavigate();
    const clickHandler = () => {
        navigate("/", { replace: true });
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
export default BackHome;
