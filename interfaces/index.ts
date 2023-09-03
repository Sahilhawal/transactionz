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
  type: string;
  method?: string;
  amount: number;
  balance: number;
  requester?: IRequester;
  source?: ISource;
  destination?: IDestination;
  description?: string;
}
