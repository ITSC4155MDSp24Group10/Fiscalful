import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../Dashboard/token.css";

interface BalancesResponse {
  accounts: Account[];
  item: Item;
  request_id: string;
}

interface Account {
  account_id: string;
  balances: Balances;
  name: string;
  official_name: string;
  subtype: string;
  type: string;
}

interface Balances {
  available: number;
  current: number;
  iso_currency_code: string;
  limit: number | null;
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
  category: string[];
  category_id: string;
  date: string;
  iso_currency_code: string;
  merchant_name: string | null;
  name: string;
  pending: boolean;
  transaction_id: string;
  transaction_type: string;
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
    <section className="token section" id="token">
      <div className='token-container'>
        <h1 className="token__title">User Accounts</h1>
        <span className="token__subtitle">Account Details</span>

        <h3>Accounts:</h3>
        {balancesData.accounts.map((account, index) => (
        <div key={account.account_id}>
          <p>Name: {account.name}</p>
          <p>Official Name: {account.official_name}</p>
          <p>Type: {account.subtype}</p>
          {index < balancesData.accounts.length - 1 && <hr />}
        </div>
        ))}
        <h3>Balances:</h3>
        {balancesData.accounts.map((account, index) => (
        <div key={account.account_id}>
          <p>Name: {account.name}</p>
          <p>Available Balance: {account.balances.available}</p>
          <p>Current Balance: {account.balances.current}</p>
          <p>Limit: {account.balances.limit ?? "N/A"}</p>
          {index < balancesData.accounts.length - 1 && <hr />}
        </div>
        ))}

        <h3>Latest Transactions:</h3>
        {transactionsData.latest_transactions.map((transaction) => (
          <div key={transaction.transaction_id}>
            <p>Name: {transaction.name}</p>
            <p>Amount: ${transaction.amount}</p>
            <p>Date: {transaction.date}</p>
            <p>Merchant Name: {transaction.merchant_name ?? "N/A"}</p>
            <p>Category: {transaction.category.join(", ")}</p>
            <p>Pending: {transaction.pending ? "Yes" : "No"}</p>
            <hr />
      </div>
      ))}
    </div>
   </section>
  );
};

export default AccessTokenDetails;