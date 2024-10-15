import RecordForm from "./components/RecordForm";
import RecordList from "./components/RecordList";
import FinancialSummary from "./components/FinancialSummary";

const HomePage = () => {
  return (
    <div>
      <h1>Gerenciador Financeiro</h1>
      <FinancialSummary />
      <RecordForm />
      <RecordList />
    </div>
  );
};

export default HomePage;
