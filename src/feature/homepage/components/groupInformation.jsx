import React from "react";
import GroupData from "./Group.jsx";

const ShowData = ({ groupData}) => {
    return (
        <>
            <div className="group-data">
                <GroupData {...groupData} />
            </div>
            
        </>
    );
};


export default ShowData;
