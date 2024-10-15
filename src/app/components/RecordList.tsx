"use client";

import { useEffect, useState } from "react";
import { getRecords, deleteRecord } from "@/utils/api";
import { IRecord } from "../types";

const RecordList = () => {
  const [records, setRecords] = useState<IRecord[]>([]);

  useEffect(() => {
    const fetchRecords = async () => {
      const data = await getRecords();
      console.log("Dados --> ", data);
      setRecords(data);
    };

    fetchRecords();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteRecord(id);
    setRecords((prev) => prev.filter((record) => record._id !== id));
  };

  return (
    <div>
      {records.map((record) => (
        <div key={record._id}>
          <h3>{record.name}</h3>
          <p>
            {record.amount} - {record.type} - {record.category}
          </p>
          <button
            onClick={() => {
              if (record._id) {
                handleDelete(record._id);
              } else {
                console.error("ID do registro não encontrado");
              }
            }}
          >
            Deletar
          </button>
        </div>
      ))}
    </div>
  );
};

export default RecordList;
