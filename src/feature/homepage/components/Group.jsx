import React, { useEffect, useState } from "react";
import "../../homepage/style/homeStyle.scss";
import "../../homepage/style/homeResponsive.scss";
import { useNavigate } from "react-router-dom";

const GroupData = ({
    groupName,
    description,
    paidByName,
    amount,
    members,
    lentAmount,
    splitAmount,
}) => {
    const [transactions, setTransactions] = useState([]);
    const navigate = useNavigate();
    const spentAmount = amount;
    const yourLentAmount = amount - splitAmount;
    const calculateTransaction = () => {
        const totalAmount = parseFloat(amount);
        const totalMembers = members?.length;
        const memberAmount = totalAmount / totalMembers;
        const transactions = members?.map((member) => ({
            giver: paidByName,
            taker: member.name,
            amount: memberAmount - parseFloat(member.givenAmount),
            hasPaid: member.hasPaid,
        }));

        return transactions?.filter((transaction) => transaction.amount !== 0);
    };
    const storedFormData = localStorage.getItem("formData");

    useEffect(() => {
        const mytransactions = calculateTransaction();
        setTransactions(mytransactions);
    }, [members?.length]);

    const goToSplit = (member) => {
        return navigate({
            pathname: "/SplitExpense",
            search: `?name=${member.name}&amount=${member.amount}`,
        });
    };

    return (
        <>
            <div className="group-info-wrapper">
                <div className="group-information">
                    <h2>{groupName}</h2>

                    <div className="description-wrapper">
                        <p className="description">
                            Description: {description}
                        </p>
                        <p className="description">Paid by: {paidByName}</p>
                    </div>

                    <div className="amount-wrapper">
                        <p className="amount">
                            Spent Amount: <br /> {spentAmount}
                        </p>
                        <p className="amount">
                            Lent Amount: <br /> {yourLentAmount}
                        </p>
                    </div>

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
                                                    {transaction.amount > 0 &&
                                                    transaction.giver ==
                                                        transaction.taker
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
                            ?.filter((member) => member.name != paidByName)
                            .map((member, index) => (
                                <li key={index}>
                                    {member.name} - {member.amount}
                                    <button
                                        className="split-up"
                                        onClick={() => goToSplit(member)}
                                    >
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
