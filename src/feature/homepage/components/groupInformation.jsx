import React from "react";
import { useNavigate } from "react-router-dom";
import GroupData from "./Group.jsx";

const ShowData = ({ groupData }) => {
    const navigate = useNavigate();

    return (
        <>
            <div className="group-data">
                <GroupData {...groupData} />
            </div>

            <div className="expense-wrapper">
                <button
                    className="expense-button"
                    onClick={() => {
                        navigate("/AddExpense");
                    }}
                >
                    Add Expense
                </button>
            </div>
        </>
    );
};

export default ShowData;
