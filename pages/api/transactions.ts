// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { transactions } from "@/transactionData";
import TransactionCollection from "@/lib/collections/transactionCollections";
import { ITransaction } from "@/interfaces";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  let data: any = {};
  const transactionData = transformTransactions(transactions);
  data.transactions = transactionData;
  data.balance = transactionData[transactionData.length - 1]["balance"];

  res.status(200).json(data);
}

const transformTransactions = (transactions: ITransaction[]) => {
  let data = TransactionCollection.removeDuplicateEntries(transactions);
  data = TransactionCollection.orderByDate(data);
  data = TransactionCollection.dataWithCorrectOrder(data);
  data = TransactionCollection.dataWithDescription(data);
  return data;
};
