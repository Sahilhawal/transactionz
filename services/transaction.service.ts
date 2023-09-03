export const fetchTransactions = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/transactions`
  );
  const data = await response.json();
  return data;
};
