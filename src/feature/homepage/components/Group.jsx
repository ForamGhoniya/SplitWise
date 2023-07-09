import React from "react";
import "../../homepage/style/homeStyle.scss";
import { useNavigate } from "react-router-dom";

const GroupData = ({
    groupName,
    description,
    paidByName,
    amount,
    members,
    splitAmount,
}) => {
    const navigate = useNavigate();
    const spentAmount = amount;
    const yourLentAmount = amount - splitAmount;
    const calculateTransaction = () => {
        const totalAmount = parseFloat(amount);
        const totalMembers = members.length;
        const memberAmount = totalAmount / totalMembers;
        const transactions = members.map((member) => ({
            giver: member.name,
            taker: paidByName,
            amount: memberAmount - parseFloat(member.givenAmount),
        }));

        return transactions.filter((transaction) => transaction.amount !== 0);
    };

    const transactions = calculateTransaction();

    const goToSplit = () => {
        return navigate({
            pathname: "/SplitExpense",
            // search: `?name=${member.name}&amount=${member.amount}`,
        });
    };

    return (
        <>
            <div className="group-info-wrapper">
                <div className="group-information">
                    <h2>{groupName}</h2>
                    <p>Description: {description}</p>
                    <p>Paid by: {paidByName}</p>
                    <p>Spent Amount: {spentAmount}</p>
                    <p>Lent Amount: {yourLentAmount}</p>

                    <div className="transactions">
                        {transactions?.length > 0 && (
                            <div>
                                <h3>Transactions:</h3>
                                <ul>
                                    {transactions.map(
                                        (transaction, index) =>
                                            transaction.giver !==
                                                transaction.taker && (
                                                <li key={index}>
                                                    {transaction.giver} has to{" "}
                                                    {transaction.amount > 0
                                                        ? "give"
                                                        : "take"}{" "}
                                                    {Math.abs(
                                                        transaction.amount
                                                    )}{" "}
                                                    to/from {transaction.taker}
                                                </li>
                                            )
                                    )}
                                </ul>
                            </div>
                        )}
                    </div>
                    <h3>Members:</h3>
                    <ul>
                        {members
                            .filter((member) => member.name != paidByName)
                            .map((member, index) => (
                                <li key={index}>
                                    {member.name} - {member.amount}
                                    <button onClick={() => goToSplit(member)}>
                                        Split Up
                                    </button>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default GroupData;
