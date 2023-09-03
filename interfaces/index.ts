interface IRequester {
  type: string;
}

interface ISource {
  type: string;
  id?: number | string | null;
  description?: string;
}

interface IDestination {
  type: string;
  id?: number | string | null;
  description?: string;
}

interface ITransaction {
  activity_id: string;
  date: string;
  type: TransactionType;
  method?: string;
  amount: number;
  balance: number;
  requester?: IRequester;
  source?: ISource;
  destination?: IDestination;
  description?: string;
}

export enum TransactionType {
  DEPOSIT = "DEPOSIT",
  INVESTMENT = "INVESTMENT",
  REFUND = "REFUND",
  TRANSFER = "TRANSFER",
  WITHDRAWAL = "WITHDRAWAL",
}
