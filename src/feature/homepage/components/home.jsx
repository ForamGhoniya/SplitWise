import React, { useState, useEffect } from "react";

const saveToLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

const getFromLocalStorage = (key) => {
    return localStorage.getItem(key);
};

const HomePage = () => {
    const [expenses, setExpenses] = useState([]);
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [paidBy, setPaidBy] = useState("user1");
    const [participants, setParticipants] = useState([]);
    const [newParticipant, setNewParticipant] = useState("");

    const defaultParticipants = ["you", "user2", "user3", "user4", "user5"];

    useEffect(() => {
        const savedExpenses = getFromLocalStorage("expenses");
        if (savedExpenses) {
            setExpenses(JSON.parse(savedExpenses));
        }
    }, []);

    useEffect(() => {
        saveToLocalStorage("expenses", expenses);
    }, [expenses]);

    const handleNewParticipant = () => {
        if (newParticipant.trim() !== "") {
            setParticipants([...participants, newParticipant]);
            setNewParticipant("");
        }
    };

    const handleSplitBill = () => {
        const numParticipants = participants.length;
        if (numParticipants === 0) {
            alert("Please select at least one participant.");
            return;
        }

        const splitAmount = parseFloat(amount) / numParticipants;

        const newExpense = {
            description,
            amount,
            paidBy,
            participants: [...participants],
            splitAmount,
        };

        setExpenses([...expenses, newExpense]);

        setDescription("");
        setAmount("");
        setPaidBy("user1");
        setParticipants([]);
    };

    return (
        <div>
            <h1>SplitWise Application</h1>

            <h2>Add Expense</h2>
            <label htmlFor="description">Expense Description:</label>
            <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
            />
            <br />

            <label htmlFor="amount">Expense Amount:</label>
            <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
            />
            <br />

            <label htmlFor="paid-by">Paid By:</label>
            <select
                id="paid-by"
                value={paidBy}
                onChange={(e) => setPaidBy(e.target.value)}
            >
                {defaultParticipants.map((participant) => (
                    <option
                        key={participant}
                        value={participant}
                    >
                        {participant}
                    </option>
                ))}
            </select>
            <br />

            <label>Participants:</label>
            {defaultParticipants.map((participant) => (
                <label key={participant}>
                    <input
                        type="checkbox"
                        checked={participants.includes(participant)}
                        onChange={(e) => {
                            if (e.target.checked) {
                                setParticipants([...participants, participant]);
                            } else {
                                setParticipants(
                                    participants.filter(
                                        (p) => p !== participant
                                    )
                                );
                            }
                        }}
                    />
                    {participant}
                </label>
            ))}
            <br />

            <label htmlFor="new-participant">New Participant:</label>
            <input
                type="text"
                id="new-participant"
                value={newParticipant}
                onChange={(e) => setNewParticipant(e.target.value)}
                placeholder="New Participant"
            />
            <button onClick={handleNewParticipant}>Add Participant</button>
            <br />

            <button onClick={handleSplitBill}>Split Bill</button>
            <br />

            <h2>Expense List</h2>
            {expenses.length === 0 ? (
                <p>No expenses added yet.</p>
            ) : (
                <ul>
                    {expenses.map((expense, index) => (
                        <li key={index}>
                            <strong>Description:</strong> {expense.description},{" "}
                            <strong>Amount:</strong> {expense.amount},{" "}
                            <strong>Paid By:</strong> {expense.paidBy},{" "}
                            <strong>Participants:</strong>{" "}
                            {expense.participants.join(", ")} <br />
                            <strong>Split Amount:</strong> {expense.splitAmount}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default HomePage;
