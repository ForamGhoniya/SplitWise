import React, { useState, useEffect } from "react";
import "../../homepage/style/homeStyle.scss";
import BackHome from "./back";
import UserId from "./userInformation";

const saveToLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

const getFromLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key));
};

const ExpenseForm = () => {
    const [expenses, setExpenses] = useState([]);
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState(0);
    const [members, setMembers] = useState([
        "You",
        "Om",
        "Sapna",
        "Shruti",
        "Shivani",
    ]);
    const [paidBy, setPaidBy] = useState("");
    const [newMember, setNewMember] = useState("");

    useEffect(() => {
        const savedExpenses = getFromLocalStorage("expenses");
        if (savedExpenses) {
            setExpenses(savedExpenses);
        }
    }, []);

    useEffect(() => {
        saveToLocalStorage("expenses", expenses);
    }, [expenses]);

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleAmountChange = (e) => {
        setAmount(parseFloat(e.target.value));
    };

    const handlePaidByChange = (e) => {
        setPaidBy(e.target.value);
    };

    const handleNewMemberChange = (e) => {
        setNewMember(e.target.value);
    };

    const handleAddMember = (e) => {
        e.preventDefault();

        if (newMember.trim() !== "") {
            setMembers([...members, newMember]);
            setNewMember("");
        }
    };

    const handleRemoveMember = (member) => {
        setMembers(members.filter((m) => m !== member));
    };

    const handleExpenseSubmit = (e) => {
        e.preventDefault();

        const newExpense = {
            description,
            amount,
            members,
            paidBy,
            splitAmount: amount / members.length,
        };
        setExpenses([...expenses, newExpense]);
        setDescription("");
        setAmount(0);
        setPaidBy("");
    };

    return (
        <>
            <BackHome />
            <div className="container">
                <div className="header">
                    <UserId />
                </div>
                <div className="form-group">
                    <div>
                        <label className="label">Description:</label>
                        <input
                            type="text"
                            className="input"
                            value={description}
                            onChange={handleDescriptionChange}
                        />
                    </div>
                    <div>
                        <label className="label">Amount:</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={handleAmountChange}
                        />
                    </div>
                    <div>
                        <label className="label">Paid By:</label>
                        <select
                            value={paidBy}
                            className="select"
                            onChange={handlePaidByChange}
                        >
                            {members.map((member) => (
                                <option
                                    key={member}
                                    value={member}
                                >
                                    {member}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="member-container">
                        <p>Members:</p>
                        {members.map((member) => (
                            <div key={member}>
                                <label className="member-label">{member}</label>
                                <button
                                    type="button"
                                    className="member-button"
                                    onClick={() => handleRemoveMember(member)}
                                >
                                    ╳
                                </button>
                            </div>
                        ))}
                    </div>
                    <div>
                        <label className="label">Add Member:</label>
                        <input
                            type="text"
                            value={newMember}
                            onChange={handleNewMemberChange}
                        />
                        <button
                            type="button"
                            className="button"
                            onClick={handleAddMember}
                        >
                            Add
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="button"
                        onClick={handleExpenseSubmit}
                    >
                        Split
                    </button>

                    <h2 className="expense-list">Expense List</h2>
                    {expenses.length === 0 ? (
                        <p>No expenses added yet.</p>
                    ) : (
                        <ul className="expense-item">
                            {expenses.map((expense, index) => (
                                <li key={index}>
                                    <strong className="expense-description">
                                        Description:
                                    </strong>{" "}
                                    {expense.description},{" "}
                                    <strong className="expense-amount">
                                        Amount:
                                    </strong>{" "}
                                    {expense.amount}, <strong>Paid By:</strong>{" "}
                                    {expense.paidBy},{" "}
                                    <strong>Participants:</strong>{" "}
                                    {expense.members.join(", ")} <br />
                                    <strong className="expense-split">
                                        Split Amount:
                                    </strong>{" "}
                                    {expense.splitAmount}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </>
    );
};

export default ExpenseForm;
