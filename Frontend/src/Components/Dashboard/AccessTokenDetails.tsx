import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface BalancesResponse {
  accounts: Account[];
  item: Item;
  request_id: string;
}

interface Account {
  account_id: string;
  balances: Balances;
  mask: string;
  name: string;
  official_name: string;
  persistent_account_id: string;
  subtype: string;
  type: string;
}

interface Balances {
  available: number;
  current: number;
  iso_currency_code: string;
  limit: number | null;
  unofficial_currency_code: string | null;
}

interface Item {
  available_products: string[];
  billed_products: string[];
  consent_expiration_time: string | null;
  error: string | null;
  institution_id: string;
  item_id: string;
  products: string[];
  update_type: string;
  webhook: string;
}

interface TransactionsResponse {
  latest_transactions: Transaction[];
}

interface Transaction {
  account_id: string;
  account_owner: string | null;
  amount: number;
  authorized_date: string;
  authorized_datetime: string | null;
  category: string[];
  category_id: string;
  check_number: string | null;
  counterparties: Counterparty[];
  date: string;
  datetime: string | null;
  iso_currency_code: string;
  location: Location;
  logo_url: string | null;
  merchant_entity_id: string | null;
  merchant_name: string | null;
  name: string;
  payment_channel: string;
  payment_meta: PaymentMeta;
  pending: boolean;
  pending_transaction_id: string | null;
  personal_finance_category: PersonalFinanceCategory;
  personal_finance_category_icon_url: string;
  transaction_code: string | null;
  transaction_id: string;
  transaction_type: string;
  unofficial_currency_code: string | null;
  website: string | null;
}

interface Counterparty {
  confidence_level: string;
  entity_id: string | null;
  logo_url: string | null;
  name: string;
  phone_number: string | null;
  type: string;
  website: string | null;
}

interface Location {
  address: string | null;
  city: string | null;
  country: string | null;
  lat: number | null;
  lon: number | null;
  postal_code: string | null;
  region: string | null;
  store_number: string | null;
}

interface PaymentMeta {
  by_order_of: string | null;
  payee: string | null;
  payer: string | null;
  payment_method: string | null;
  payment_processor: string | null;
  ppd_id: string | null;
  reason: string | null;
  reference_number: string | null;
}

interface PersonalFinanceCategory {
  confidence_level: string;
  detailed: string;
  primary: string;
}

const AccessTokenDetails = () => {
  const { tokenId } = useParams<{ tokenId: string }>();
  const [balancesData, setBalancesData] = useState<BalancesResponse | null>(null);
  const [transactionsData, setTransactionsData] = useState<TransactionsResponse | null>(null);

  const fetchTransactions = async () => {
    try {
      const response = await fetch(`/api/transactions?current_access_token=${tokenId}`);
      const data: TransactionsResponse = await response.json();
      console.log("Transactions response data:", data);
      setTransactionsData(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const fetchBalances = async () => {
    try {
      const response = await fetch(`/api/balance?access_token=${tokenId}`);
      const data: BalancesResponse = await response.json();
      console.log("Balances response data:", data);
      setBalancesData(data);
    } catch (error) {
      console.error("Error fetching balances:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
    fetchBalances();
  }, [tokenId]);

  if (!balancesData || !transactionsData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>Access Token Details:</h3>
      <p>Token: {tokenId}</p>

      <h4>Accounts:</h4>
      {balancesData.accounts.map((account) => (
        <div key={account.account_id}>
          <p>Account ID: {account.account_id}</p>
          <p>Name: {account.name}</p>
          <p>Official Name: {account.official_name}</p>
          <p>Type: {account.type}</p>
          <p>Subtype: {account.subtype}</p>
          <p>Mask: {account.mask}</p>
          <p>Persistent Account ID: {account.persistent_account_id}</p>
          <div>
            <h5>Balances:</h5>
            <p>Available: {account.balances.available}</p>
            <p>Current: {account.balances.current}</p>
            <p>ISO Currency Code: {account.balances.iso_currency_code}</p>
            <p>Limit: {account.balances.limit ?? "N/A"}</p>
            <p>Unofficial Currency Code: {account.balances.unofficial_currency_code ?? "N/A"}</p>
          </div>
        </div>
      ))}

      <h4>Latest Transactions:</h4>
      {transactionsData.latest_transactions.map((transaction) => (
        <div key={transaction.transaction_id}>
          <p>Transaction ID: {transaction.transaction_id}</p>
          <p>Account ID: {transaction.account_id}</p>
          <p>Amount: {transaction.amount}</p>
          <p>Date: {transaction.date}</p>
          <p>Name: {transaction.name}</p>
          <p>Merchant Name: {transaction.merchant_name ?? "N/A"}</p>
          <p>Category: {transaction.category.join(", ")}</p>
          <p>Payment Channel: {transaction.payment_channel}</p>
          <p>Pending: {transaction.pending ? "Yes" : "No"}</p>
        </div>
      ))}
    </div>
  );
};

export default AccessTokenDetails;