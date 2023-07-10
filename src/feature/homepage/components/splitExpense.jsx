import React, { useState, useEffect } from "react";
import "../../homepage/style/homeStyle.scss";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const SplitForm = ({
    members,
    currentTotalAmount,
    onSet,
    currentGroupDataIndex,
}) => {
    const [currentMembersList, setCurrentMembersList] = useState(members);
    const [currentData, setCurrentData] = useState([]);
    const [description, setDescription] = useState("");
    const [groupName, setGroupName] = useState("");
    const [totalPayAmount, setTotalPayAmount] = useState(0);
    const [paidBy, setPaidBy] = useState("");
    const [paidTo, setPaidTo] = useState("");

    const navigate = useNavigate();

    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    const name = searchParams.get("name");
    const amount = searchParams.get("amount");

    useEffect(() => {
        setCurrentMembersList(members);
        const storedFormData = localStorage.getItem("formData");
        if (storedFormData) {
            const parsedFormData = JSON.parse(storedFormData);
            setDescription(parsedFormData[currentGroupDataIndex].description);
            setGroupName(parsedFormData[currentGroupDataIndex].groupName);
            setPaidTo(parsedFormData[currentGroupDataIndex].paidByName);
            setCurrentData(parsedFormData);
        }
        setTotalPayAmount(amount);
        setPaidBy(name);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = [...currentData];

        let updatedFormData = formData.map((item, index) => {
            if (index == Number(currentGroupDataIndex)) {
                let updatedMembers = [...item.members].map((item) => {
                    if (item.name == name) {
                        return { ...item, isPaid: true };
                    } else {
                        return {
                            ...item,
                            isPaid: item.isPaid ? item.isPaid : false,
                        };
                    }
                });
                return {
                    ...item,
                    members: updatedMembers,
                };
            } else {
                return item;
            }
        });
        localStorage.setItem("formData", JSON.stringify(updatedFormData));
        navigate("/allExpenses");
    };

    return (
        <>
            <div className="card-container">
                <form
                    onSubmit={handleSubmit}
                    className="card"
                >
                    <div className="card-field">
                        <p className="card-label text-input">
                            GroupName: {groupName}{" "}
                        </p>
                    </div>

                    <div className="card-field">
                        <p className="card-label text-input">
                            Description: {description}{" "}
                        </p>
                    </div>

                    <div className="card-field">
                        <label className="card-label">
                            Amount to pay:
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
                    <div>
                        <p></p>
                    </div>
                    <div className="card-field">
                        <label className="label">
                            Paid By :
                            <select
                                value={paidBy}
                                className="select-paid-by"
                                onChange={(e) => setPaidBy(e.target.value)}
                                disabled
                            >
                                <option value="">Select</option>
                                {currentMembersList.map((member, index) => (
                                    <option
                                        key={index}
                                        value={member.name}
                                    >
                                        {member.name}
                                    </option>
                                ))}
                            </select>
                            <span> to: </span>
                            <select
                                className="select-paid-by"
                                value={paidTo}
                                onChange={(e) => setPaidTo(e.target.value)}
                            >
                                <option value="">Select</option>
                                {currentMembersList.map((member, index) => (
                                    <option
                                        key={index}
                                        value={member.name}
                                    >
                                        {member.name}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div className="save-button">
                        <button
                            type="submit"
                            className="button"
                        >
                            Settle Up
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default SplitForm;
