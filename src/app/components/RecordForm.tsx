"use client";

import { useState } from "react";
import { createRecord } from "@/utils/api";
import { IRecord } from "../types";

const RecordForm = () => {
  const [formData, setFormData] = useState<Omit<IRecord, "_id">>({
    name: "",
    amount: 0,
    type: "entrada",
    category: "",
    date: new Date(),
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createRecord(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Nome"
        required
      />
      <input
        name="amount"
        type="number"
        value={formData.amount}
        onChange={handleChange}
        placeholder="Valor"
        required
      />
      <select name="type" value={formData.type} onChange={handleChange}>
        <option value="entrada">Entrada</option>
        <option value="saída">Saída</option>
      </select>
      <input
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Categoria"
        required
      />
      <button type="submit">Adicionar Registro</button>
    </form>
  );
};

export default RecordForm;
