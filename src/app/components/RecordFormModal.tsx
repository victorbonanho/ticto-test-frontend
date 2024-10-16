"use client";

import { useState } from "react";
import { createRecord } from "@/utils/api";
import { IRecord } from "../types";
import styles from "@/app/styles/RecordFormModal.module.scss";
import Image from "next/image";
import ArrowGreen from "@/assets/icons/enter_green.svg";
import ArrowRed from "@/assets/icons/exit_red.svg";
import { notification } from "antd";

interface RecordFormModalProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  setChanges: React.Dispatch<React.SetStateAction<number>>;
}

const RecordFormModal: React.FC<RecordFormModalProps> = ({
  showModal,
  setShowModal,
  setChanges,
}) => {
  const [formData, setFormData] = useState<Omit<IRecord, "_id">>({
    name: "",
    amount: 0,
    type: "entrada",
    category: "",
    date: new Date(),
  });
  const [disabled, setDisable] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDisable(true);
    try {
      await createRecord(formData);
      notification.success({
        message: "Novo Cadastro",
        description: "Registro criado com sucesso!",
      });
      setDisable(false);
      setChanges((prev: number) => prev + 1);
      setShowModal(false);
    } catch (error) {
      notification.error({
        message: "Erro",
        description: "Ocorreu um erro ao criar o registro.",
      });
      console.log("Error --> ", error);
      setDisable(false);
    } finally {
      setDisable(false);
    }
  };

  const handleTypeChange = (type: "entrada" | "saída") => {
    setFormData((prev) => ({ ...prev, type }));
  };

  if (!showModal) return null;

  return (
    <>
      <div className={styles.modalOverlay}>
        <div
          className={styles.modalContent}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className={styles.closeButton}
            onClick={() => setShowModal(false)}
          >
            &#x2715;
          </button>
          <h2 className={styles.title}>Cadastrar Transação</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nome"
              required
              className={styles.formInput}
            />
            <input
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Valor"
              required
              className={styles.formInput}
            />
            <div className={styles.buttonGroup}>
              <button
                type="button"
                className={`${styles.typeButton} ${
                  formData.type === "entrada" ? styles.selected : ""
                }`}
                onClick={() => handleTypeChange("entrada")}
              >
                <Image
                  src={ArrowGreen}
                  alt="entrada"
                  width={22}
                  style={{ marginRight: "10px" }}
                />{" "}
                Entrada
              </button>
              <button
                type="button"
                className={`${styles.typeButton} ${
                  formData.type === "saída" ? styles.selected : ""
                }`}
                onClick={() => handleTypeChange("saída")}
              >
                <Image
                  src={ArrowRed}
                  alt="saída"
                  width={22}
                  style={{ marginRight: "10px" }}
                />{" "}
                Saída
              </button>
            </div>
            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Categoria"
              required
              className={styles.formInput}
            />
            <button
              type="submit"
              className={styles.submitButton}
              disabled={disabled}
            >
              CADASTRAR
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default RecordFormModal;
