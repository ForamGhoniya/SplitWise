import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Lending from '../src/feature/lendingPage/components/lendingPage.jsx';
import HomePage from '../src/feature/homepage/components/home.jsx';
import GroupForm from './feature/homepage/components/groupExpense';
import SplitForm from './feature/homepage/components/splitExpense';
import ShowData from './feature/homepage/components/groupInformation';
import AllExpenses from './feature/homepage/components/allExpenses';

function App() {
  const initialData = [{
    groupName: "Flatmates",
    description: "Food party",
    paidByName: "Foram",
    amount: 0,
    splitAmount: 0,
    lentAmount: 0,
    members: [
      { name: "Foram", amount: "00", givenAmount: "00" },
      { name: "Om", amount: "00", givenAmount: "00" },
      { name: "Sapna", amount: "00", givenAmount: "00" },
      { name: "Shruti", amount: "00", givenAmount: "00" },
      { name: "Shivani", amount: "00", givenAmount: "00" },
    ],

  }
  ];

  const [groupData, setGroupData] = useState(initialData);
  const [currentGroupData, setCurrentGroupData] = useState(groupData[0])
  const [currentGroupDataIndex, setCurrentGroupDataIndex] = useState(0)

  const handleCurrentData = (data, index) => {
    setCurrentGroupData(data);
    setCurrentGroupDataIndex(index)
  }

  const handleGroupFormSubmit = (formData) => {
    let updatedFormData = [...groupData, formData]
    setGroupData(updatedFormData);
  };
  const storedFormData = localStorage.getItem("formData");

  useEffect(() => {
    let formData = localStorage.setItem("formData", JSON.stringify(groupData));
    setCurrentGroupData(groupData[currentGroupDataIndex])
  }, [storedFormData])



  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Lending />} />
        <Route path="/home" element={<HomePage groupData={groupData} handleCurrentData={handleCurrentData} />} />
        <Route path="/allExpenses" element={<AllExpenses currentGroupData={currentGroupData} />} />
        <Route
          path="/AddExpense"
          element={<GroupForm members={currentGroupData?.members} currentTotalAmount={currentGroupData?.amount} onSet={handleGroupFormSubmit} />}
        />
        <Route
          path="/SplitExpense"
          element={<SplitForm members={currentGroupData?.members} currentTotalAmount={currentGroupData?.amount} onSet={handleGroupFormSubmit} currentGroupDataIndex={currentGroupDataIndex} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
