import CurrentBalanceHeading from "@/components/currentBalanceHeading";
import Header from "@/components/header";
import PastTransactionSection from "@/components/pastTransactions/pastTransactionSection";
import { ITransaction } from "@/interfaces";
import { fetchTransactions } from "@/services/transaction.service";
import { useEffect, useState } from "react";
interface props {}

const LandingPage: React.FC<props> = () => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        const transactionsData = await fetchTransactions();
        setTransactions(transactionsData.transactions);
        setBalance(transactionsData.balance);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactionData();
  }, []);

  return (
    <>
      <Header />
      <CurrentBalanceHeading currentBalance={balance} />
      <PastTransactionSection transactions={transactions} />
    </>
  );
};

export default LandingPage;
