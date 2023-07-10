import React from "react";
import "../../homepage/style/homeStyle.scss";
import BackLending from "./back";
import UserId from "./userInformation";
import ShowData from "./groupInformation";

const AllExpenses = ({ currentGroupData }) => {
    return (
        <>
            <div className="split-wise-wrapper">
                <div className="container">
                    <BackLending />
                    <div className="header">
                        <UserId />
                    </div>
                    <div className="new-expense">
                        <ShowData groupData={currentGroupData} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default AllExpenses;
