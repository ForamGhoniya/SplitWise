import React from "react";
import "../../homepage/style/homeStyle.scss";
import User from "../../../images/user.png";

function UserId() {
    return (
        <>
            <div className="user-section">
                <div className="user-profile">
                    <img
                        src={User}
                        alt="User logo"
                        className="user-image"
                    />
                    <div className="userInfo-wrapper">
                        <p className="user-name">Foram Patel</p>
                        <p className="user-email">forampatel188@gmail.com</p>
                    </div>
                </div>
            </div>
        </>
    );
}
export default UserId;
