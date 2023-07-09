import React from "react";
import "../../homepage/style/homeStyle.scss";
import BackHome from "./back";
import UserId from "./userInformation";
import ShowData from "./groupInformation";

const Home = ({ groupData }) => {
    return (
        <>
            <div className="split-wise-wrapper">
                <div className="container">
                    <BackHome />
                    <div className="header">
                        <UserId />
                    </div>
                    <div className="new-expense">
                        <ShowData groupData={groupData} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
