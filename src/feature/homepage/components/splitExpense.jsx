import React, { useState, useEffect } from "react";
import "../../homepage/style/homeStyle.scss";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const SplitForm = ({ members, currentTotalAmount, onSet }) => {
    const [currentData, setCurrentData] = useState([]);
    const [description, setDescription] = useState("");
    const [totalPayAmount, setTotalPayAmount] = useState(0);
    const [paidBy, setPaidBy] = useState("");
    const [paidTo, setPaidTo] = useState("");

    const navigate = useNavigate();

    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    const name = searchParams.get("name");
    const amount = searchParams.get("amount");

    useEffect(() => {
        const storedFormData = localStorage.getItem("formData");
        if (storedFormData) {
            const parsedFormData = JSON.parse(storedFormData);
            setDescription(parsedFormData.description);
            setCurrentData(parsedFormData);
        }
        setTotalPayAmount(amount);
        setPaidBy(name);
        setPaidTo(name);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        e.preventDefault();
        let filteredMember = members;
        const formData = {
            ...currentData,
        };
        localStorage.setItem("formData", JSON.stringify(currentData));
        setDescription("");
        setPaidBy("");
        setTotalPayAmount(0);
        navigate("/home");
    };

    return (
        <>
            <div className="card-container">
                <form
                    onSubmit={handleSubmit}
                    className="card"
                >
                    <div>
                        <label>
                            Description:
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </label>
                    </div>

                    <div>
                        <label>
                            Total Pay Amount:
                            <input
                                type="number"
                                value={totalPayAmount}
                                onChange={(e) =>
                                    setTotalPayAmount(e.target.value)
                                }
                            />
                        </label>
                    </div>

                    <div>
                        <label className="label">
                            Paid By:
                            <select
                                value={paidBy}
                                onChange={(e) => setPaidBy(e.target.value)}
                            >
                                <option value="">Select</option>
                                {members.map((member, index) => (
                                    <option
                                        key={index}
                                        value={member.name}
                                    >
                                        {member.name}
                                    </option>
                                ))}
                            </select>
                            paid
                            <select
                                value={paidTo}
                                onChange={(e) => setPaidTo(e.target.value)}
                            >
                                <option value="">Select</option>
                                {members.map((member, index) => (
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

                    <button
                        type="submit"
                        className="button"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
};

export default SplitForm;
