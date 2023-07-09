import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Lending from '../src/feature/lendingPage/components/lendingPage.jsx';
import HomePage from '../src/feature/homepage/components/home.jsx';
import GroupForm from './feature/homepage/components/groupExpense';

function App() {
  const initialData = {
    groupName: "Flatmates",
    paidByName: "",
    amount: "0",
    members: [
      { name: "You", amount: "00", givenAmount: "00" },
      { name: "Om", amount: "00", givenAmount: "00" },
      { name: "Sapna", amount: "00", givenAmount: "00" },
      { name: "Shruti", amount: "00", givenAmount: "00" },
      { name: "Shivani", amount: "00", givenAmount: "00" },
    ],
  };

  const [groupData, setGroupData] = useState(initialData);

  const handleGroupFormSubmit = (formData) => {
    setGroupData(formData);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Lending />} />
        <Route path="/home" element={<HomePage groupData={groupData} />} />
        <Route
          path="/AddExpense"
          element={<GroupForm members={groupData.members} currentTotalAmount={groupData.amount} onSet={handleGroupFormSubmit} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
