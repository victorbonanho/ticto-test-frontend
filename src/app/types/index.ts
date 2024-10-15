export interface IRecord {
  _id?: string;
  name: string;
  amount: number;
  type: "entrada" | "saída";
  category: string;
  date: Date;
}
