"use client";

import { useEffect, useState } from "react";
import { getTotalEntries, getTotalExits, getTotalBalance } from "@/utils/api";
import EntryArrow from "@/assets/icons/green_arrow.svg";
import ExitArrow from "@/assets/icons/red_arrow.svg";
import Image from "next/image";
import styles from "@/app/styles/FinancialSummary.module.scss";
import { formatCurrency } from "@/utils/helpers";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const FinancialSummary = ({ changes }: { changes: number }) => {
  const [totalEntries, setTotalEntries] = useState(0);
  const [totalExits, setTotalExits] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [changes]);

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const entries = await getTotalEntries();
      const exits = await getTotalExits();
      const balance = await getTotalBalance();

      setTotalEntries(entries.totalEntries);
      setTotalExits(exits.totalExits);
      setTotalBalance(balance.totalBalance);
      setLoading(false);
    } catch (error) {
      console.log("Erro ao carregar valores --> ", error);
    }
  };

  return (
    <div className={styles["main-container"]}>
      <div className={styles["amount-containers"]}>
        <div className={styles["amount-container"]}>
          <div className={styles["amount-item"]}>
            <h2 className={styles.title}>Entradas</h2>
            <Image src={EntryArrow} alt="entradas" width={15} />
          </div>
          <span className={styles.balance}>
            {loading ? <Skeleton height={30} /> : formatCurrency(totalEntries)}
          </span>
        </div>
        <div className={styles["amount-container"]}>
          <div className={styles["amount-item"]}>
            <h2 className={styles.title}>Saídas</h2>
            <Image src={ExitArrow} alt="entradas" width={15} />
          </div>
          <span className={styles.balance}>
            {loading ? <Skeleton height={30} /> : formatCurrency(totalExits)}
          </span>
        </div>
        <div className={styles["amount-container"]}>
          <div className={styles["amount-item"]}>
            <h2 className={styles["last-title"]}>Saldo Total</h2>
          </div>
          <span className={styles["last-balance"]}>
            {loading ? <Skeleton height={30} /> : formatCurrency(totalBalance)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FinancialSummary;
