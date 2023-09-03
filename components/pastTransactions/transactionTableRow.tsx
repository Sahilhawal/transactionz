interface props {
  date: string;
  type: string;
  description: string;
  amount: number;
  balance: number;
}
const TransactionTableRow: React.FC<props> = ({
  date,
  type,
  description,
  amount,
  balance,
}) => {
  return (
    <tr>
      <td>{new Date(date).getDate()}</td>
      <td>{type}</td>
      <td>{description}</td>
      <td>{amount}</td>
      <td>{balance}</td>
    </tr>
  );
};

export default TransactionTableRow;
