import TransactionTableRow from "./transactionTableRow";

interface props {
  transactions: ITransaction[];
}

const PastTransactionSection: React.FC<props> = ({ transactions }) => {
  return (
    <div className="w-full px-16 pt-14">
      <table className=" table-auto w-full">
        <thead className=" text-left">
          <tr>
            <th className="">Date</th>
            <th>Type</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => {
            return (
              <TransactionTableRow
                date={transaction.date}
                type={transaction.type}
                description={transaction.description}
                amount={transaction.amount}
                balance={transaction.balance}
                key={transaction.activity_id}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PastTransactionSection;
