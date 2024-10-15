"use client";

import { useEffect, useState } from "react";
import { getTotalEntries, getTotalExits, getTotalBalance } from "@/utils/api";

const FinancialSummary = () => {
  const [totalEntries, setTotalEntries] = useState(0);
  const [totalExits, setTotalExits] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const entries = await getTotalEntries();
      const exits = await getTotalExits();
      const balance = await getTotalBalance();

      setTotalEntries(entries.totalEntries);
      setTotalExits(exits.totalExits);
      setTotalBalance(balance.totalBalance);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Total Entradas: {totalEntries}</h2>
      <h2>Total Saídas: {totalExits}</h2>
      <h2>Saldo Total: {totalBalance}</h2>
    </div>
  );
};

export default FinancialSummary;
