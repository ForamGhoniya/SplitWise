import React, { useState } from "react";
import "../../homepage/style/homeStyle.scss";

const GroupForm = ({ onSave }) => {
    const [groupName, setGroupName] = useState("");
    const [members, setMembers] = useState([
        "You",
        "Om",
        "Sapna",
        "Shruti",
        "Shivani",
    ]);

    const [newMember, setNewMember] = useState("");
    const [showInput, setShowInput] = useState(false);

    const handleAddMember = (e) => {
        e.preventDefault();

        if (newMember.trim() !== "") {
            setMembers([...members, newMember]);
            setNewMember("");
            setShowInput(false);
        }
    };

    const handleRemoveMember = (member) => {
        setMembers(members.filter((m) => m !== member));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const groupData = {
            groupName,

            members: members.map((member) => ({
                name: member,
            })),
        };

        onSave(groupData);
    };

    const handleAddMemberClick = () => {
        setShowInput(true);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="add-group">
                <label>
                    Group Name:
                    <input
                        type="text"
                        value={groupName}
                        onChange={(event) => setGroupName(event.target.value)}
                    />
                </label>
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
                {showInput ? (
                    <>
                        <input
                            type="text"
                            value={newMember}
                            onChange={(event) =>
                                setNewMember(event.target.value)
                            }
                            placeholder="New member name"
                        />
                        <button
                            type="button"
                            className="button"
                            onClick={handleAddMember}
                            disabled={newMember.trim() === ""}
                        >
                            Add Member
                        </button>
                    </>
                ) : (
                    <button
                        type="button"
                        className="button"
                        onClick={handleAddMemberClick}
                    >
                        Add Member
                    </button>
                )}
            </div>

            <button
                type="submit"
                className="button"
            >
                save
            </button>
        </form>
    );
};

const AddMembers = () => {
    const [groups, setGroups] = useState([]);

    const handleSaveGroup = (groupData) => {
        const updatedGroups = [...groups, groupData];
        setGroups(updatedGroups);
        saveToLocalStorage(updatedGroups);
    };

    const saveToLocalStorage = (data) => {
        localStorage.setItem("groups", JSON.stringify(data));
    };

    return (
        <div>
            <GroupForm onSave={handleSaveGroup} />
        </div>
    );
};

export default AddMembers;
