"use client";

import { useEffect, useState } from "react";
import { getRecords, deleteRecord } from "@/utils/api";
import { IRecord } from "../types";
import Image from "next/image";
import Trash from "@/assets/icons/trash.svg";
import styles from "@/app/styles/RecordList.module.scss";
import { formatCurrency } from "@/utils/helpers";
import { Modal } from "antd";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface RecordListProps {
  changes: number;
  setChanges: React.Dispatch<React.SetStateAction<number>>;
}

const RecordList: React.FC<RecordListProps> = ({ changes, setChanges }) => {
  const [records, setRecords] = useState<IRecord[]>([]);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [currentId, setCurrentId] = useState("");

  useEffect(() => {
    fetchRecords();
  }, []);

  useEffect(() => {
    fetchRecords();
  }, [changes]);

  const fetchRecords = async () => {
    try {
      const data = await getRecords();
      setRecords(data);
    } catch (error) {
      console.log("Erro ao carregar os dados --> ", error);
    }
  };

  const handleOk = async (_id: string) => {
    setConfirmLoading(true);
    try {
      await deleteRecord(_id);
      setChanges((prev: number) => prev + 1);
      setConfirmLoading(false);
      setOpen(false);
    } catch (error) {
      setConfirmLoading(false);
      console.log("Erro ao deletar --> ", error);
    } finally {
      setConfirmLoading(false);
    }
    // setRecords((prev) => prev.filter((record) => record._id !== _id));
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const showModal = (_id: string) => {
    setOpen(true);
    setCurrentId(_id);
  };

  const formatDate = (date: string | Date) => {
    const dateObj = date instanceof Date ? date : new Date(date);
    return dateObj
      .toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
      .replace(", ", " às ")
      .replace(":", "h");
  };

  return (
    <div>
      {records.length !== 0 && (
        <div className={styles["container-titles"]}>
          <div className={styles["titles"]}>
            <h4 className={styles["title"]}>Descrição</h4>
            <h4 className={styles["title"]}>Valor</h4>
            <h4 className={styles["title"]}>Categoria</h4>
            <h4 className={styles["title"]}>Data</h4>
          </div>
        </div>
      )}
      <div className={styles["container-records"]}>
        {records.length === 0 && (
          <div className={styles["list-skeleton"]}>
            <Skeleton height={45} count={3} style={{ marginBottom: 12 }} />
          </div>
        )}
        {records.map((record) => (
          <div key={record._id} className={styles["records"]}>
            <p className={styles["record"]}>{record.name}</p>
            <p
              className={styles["record"]}
              style={
                record.type === "saída"
                  ? { color: "#DB3766" }
                  : { color: "#06D7A5" }
              }
            >
              {formatCurrency(record.amount)}
            </p>
            <p className={styles["record"]}>{record.category}</p>
            <p className={styles["record"]}>{formatDate(record.date)}</p>
            <button
              onClick={() => {
                if (record._id) {
                  showModal(record._id);
                } else {
                  console.error("ID do registro não encontrado");
                }
              }}
              className={styles["delete"]}
            >
              <Image src={Trash} alt="Remover" width={15} />
            </button>
          </div>
        ))}
      </div>
      {/* Mobile */}
      <div className={styles["mobile-list-containers"]}>
        {records.map((record) => (
          <div key={record._id} className={styles["records-mobile"]}>
            <h4 className={styles["title"]}>Descrição</h4>
            <p className={styles["record"]}>{record.name}</p>
            <h4 className={styles["title"]}>Valor</h4>
            <p
              className={styles["record"]}
              style={
                record.type === "saída"
                  ? { color: "#DB3766" }
                  : { color: "#06D7A5" }
              }
            >
              {formatCurrency(record.amount)}
            </p>
            <h4 className={styles["title"]}>Categoria</h4>
            <p className={styles["record"]}>{record.category}</p>
            <h4 className={styles["title"]}>Data</h4>
            <p className={styles["record"]}>{formatDate(record.date)}</p>
            <button
              onClick={() => {
                if (record._id) {
                  showModal(record._id);
                } else {
                  console.error("ID do registro não encontrado");
                }
              }}
              className={styles["delete"]}
            >
              <Image src={Trash} alt="Remover" width={15} />
            </button>
          </div>
        ))}
      </div>
      <Modal
        title="Excluir"
        open={open}
        onOk={() => {
          if (currentId) {
            handleOk(currentId);
          } else {
            console.error("ID do registro não encontrado");
          }
        }}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        Tem certeza que deseja deletar esse registro?
      </Modal>
    </div>
  );
};

export default RecordList;
