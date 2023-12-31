import React, { useState, useEffect } from "react";
import "../../homepage/style/homeStyle.scss";
import { useNavigate } from "react-router-dom";
import BackLending from "./back";

const GroupForm = ({ members, currentTotalAmount, onSet }) => {
    const [description, setDescription] = useState("");
    const [groupName, setGroupName] = useState("");
    const [totalPayAmount, setTotalPayAmount] = useState(0);
    const [paidBy, setPaidBy] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const storedFormData = localStorage.getItem("formData");
        if (storedFormData) {
            const parsedFormData = JSON.parse(storedFormData);
            setGroupName(parsedFormData.groupName);
            setDescription(parsedFormData.description);
            setTotalPayAmount(parsedFormData.totalPayAmount);
            setPaidBy(parsedFormData.paidBy);
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        let splitAmt =
            (+currentTotalAmount + +totalPayAmount) / +members?.length;
        const formData = {
            groupName: groupName,
            description: description,
            paidByName: paidBy,
            amount: +currentTotalAmount + +totalPayAmount,
            members: members?.map((member) => ({
                name: member?.name,
                amount: splitAmt,
                givenAmount:
                    member.name === paidBy
                        ? +member.givenAmount + +totalPayAmount
                        : +member.givenAmount,
            })),
            splitAmount: splitAmt,
        };

        const storedFormData = localStorage.getItem("formData");

        let updatedData = [storedFormData, formData];

        localStorage.setItem("formData", JSON.stringify(updatedData));

        onSet(formData);
        setDescription("");
        setPaidBy("");
        setTotalPayAmount(0);
        navigate("/home");
    };

    return (
        <>
            <div className="card-container">
                <div className="back-button">
                    <BackLending />
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="card"
                >
                    <div className="card-field">
                        <label className="card-label">
                            Group Name:
                            <input
                                type="text"
                                className="text-input"
                                value={groupName}
                                onChange={(e) => setGroupName(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="card-field">
                        <label className="card-label">
                            Description:
                            <input
                                type="text"
                                className="text-input"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </label>
                    </div>

                    <div className="card-field">
                        <label className="card-label">
                            Total Pay Amount:
                            <input
                                type="number"
                                className="text-input"
                                value={totalPayAmount}
                                onChange={(e) =>
                                    setTotalPayAmount(e.target.value)
                                }
                            />
                        </label>
                    </div>

                    <div className="card-field">
                        <label className="label">
                            Paid By:
                            <select
                                value={paidBy}
                                className="select-paid-by"
                                onChange={(e) => setPaidBy(e.target.value)}
                            >
                                <option value="">Select</option>
                                {members?.map((member, index) => (
                                    <option
                                        key={index}
                                        value={member.name}
                                    >
                                        {member.name}
                                    </option>
                                ))}
                            </select>
                            and split
                            <select className="select-paid-by">
                                <option value="">Select</option>
                                <option value="equal">Equally</option>
                                <option value="percentage">Percentage</option>
                            </select>
                        </label>
                    </div>

                    <div className="save-button">
                        <button
                            type="submit"
                            className="button"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default GroupForm;
