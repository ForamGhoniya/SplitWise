import React from "react";
import "../../homepage/style/homeStyle.scss";
import BackLending from "./back";
import UserId from "./userInformation";
import ShowListData from "./groupListInformation";

const Home = ({ groupData, handleCurrentData }) => {
    return (
        <>
            <div className="split-wise-wrapper">
                <div className="container">
                    <BackLending />
                    <div className="header">
                        <UserId />
                    </div>
                    <div className="new-expense">
                        <ShowListData
                            groupData={groupData}
                            handleCurrentData={handleCurrentData}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
