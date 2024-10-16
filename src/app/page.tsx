"use client";

import RecordList from "./components/RecordList";
import FinancialSummary from "./components/FinancialSummary";
import { useState } from "react";
import RecordFormModal from "./components/RecordFormModal";
import Header from "./components/Header";

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [changes, setChanges] = useState<number>(0);

  return (
    <div>
      <Header setShowModal={setShowModal} />
      {showModal && (
        <RecordFormModal
          showModal={showModal}
          setShowModal={setShowModal}
          setChanges={setChanges}
        />
      )}
      <FinancialSummary changes={changes} />
      <RecordList setChanges={setChanges} changes={changes} />
    </div>
  );
};

export default HomePage;
