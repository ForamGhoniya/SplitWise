import React from "react";
import { useNavigate } from "react-router-dom";

const ShowListData = ({ groupData,handleCurrentData }) => {
    const navigate = useNavigate();
    
    const goToShowData = () => {
        return navigate({
            pathname: "/allExpenses",
        });
    };

  return (
    <>
      <div className="group-data">
        <div className="group-list-data">
          <ul>
            {groupData.map((groupInfo, index) => {
              return (
                <li 
                key={index}
                >
                    <p>Group :{ groupInfo?.groupName}</p>
                    <p>Description : { groupInfo?.description}</p>
                    <p>PaidBy : {groupInfo?.paidByName}</p>
                    <p>Amount : {groupInfo?.amount}</p>
                  <button
                  title="View Expense Details"
                  className="split-up"
                  onClick={() => {
                    
                    handleCurrentData(groupInfo, index)
                    goToShowData()
                    }}>
                    view
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="expense-wrapper">
                    <button
                    title="Add Expense"
                        className="expense-button"
                        onClick={() => {
                            navigate("/AddExpense");
                        }}
                    >
                        +
                    </button>
                </div>
        </div>
      </div>
    </>
  );
};

export default ShowListData;
