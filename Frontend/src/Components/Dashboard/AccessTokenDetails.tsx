import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useAuth } from "../Header/AuthContext";
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
  const [currentPage, setCurrentPage] = useState(0);
  const transactionsPerPage = 4;
  const navigate = useNavigate();
  const { setIsUserLoggedIn } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

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

  const handleLogout = async () => { 
    try {
      await signOut(auth); // log out the user from Firebase
      setIsUserLoggedIn(false);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };


  useEffect(() => {
    fetchTransactions();
    fetchBalances();
  }, [tokenId]);

  useEffect(() => {
    console.log(transactionsData);
  }, [transactionsData]);
  

  if (!balancesData || !transactionsData) {
    return <div>Loading...</div>;
  }

  const numPages = Math.ceil(transactionsData.latest_transactions.length / transactionsPerPage);
  const currentTransactions = transactionsData.latest_transactions.slice(currentPage * transactionsPerPage, (currentPage + 1) * transactionsPerPage);

  return (
    <section className="token section" id="token">
      <div className='token-container'>
        <h1 className="token__title">User Accounts</h1>
        <span className="token__subtitle">Account Details</span>

        <div className="logout-button-container">
          <button className="logout-btn" onClick={() => setShowLogoutModal(true)}>Logout</button>
        </div>

        {showLogoutModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>Confirm Logout</h2>
              <p>Are you sure you want to log out?</p>
              <button className="yes" onClick={handleLogout}>Yes</button>
              <button className="no" onClick={() => setShowLogoutModal(false)}>No</button>
            </div>
          </div>
        )}

        <div className="parent-container">
          <div>
            <h3>Accounts</h3>
            <div className="accounts-container">
              {balancesData.accounts.map((account, index) => (
              <div key={account.account_id} className="account-card">
                <p><span className="bold-label">Name:</span> {account.name}</p>
                <p><span className="bold-label">Official Name:</span> {account.official_name}</p>
                <p><span className="bold-label">Type:</span> {account.subtype}</p>
              </div>
              ))}
            </div>
          </div>

          <div>
            <h3>Balances</h3>
            <div className="balances-container">
              {balancesData.accounts.map((account, index) => (
              <div key={account.account_id} className="balance-card">
                <p><span className="bold-label">Name:</span> {account.name}</p>
                <p><span className="bold-label">Available Balance:</span> {account.balances.available}</p>
                <p><span className="bold-label">Current Balance:</span> {account.balances.current}</p>
                <p><span className="bold-label">Limit:</span> {account.balances.limit ?? "N/A"}</p>
              </div>
              ))}
            </div>
          </div>
        </div>

        <h3>Latest Transactions</h3>
        <div className="transactions-container">
          {currentTransactions.map((transaction) => (
          <div key={transaction.transaction_id} className="transaction-card">
            <p><span className="bold-label">Name:</span> {transaction.name}</p>
            <p><span className="bold-label">Amount:</span> ${transaction.amount}</p>
            <p><span className="bold-label">Date:</span> {transaction.date}</p>
            <p><span className="bold-label">Merchant Name:</span> {transaction.merchant_name ?? "N/A"}</p>
            <p><span className="bold-label">Category:</span> {transaction.category.join(", ")}</p>
            <p><span className="bold-label">Pending:</span> {transaction.pending ? "Yes" : "No"}</p>
          </div> 
          ))}
        </div>

        <div className="button-container">
          <button className="page-button" onClick={() => setCurrentPage((oldPage) => Math.max(oldPage - 1, 0))}>Previous Page</button>
          <button className="page-button" onClick={() => setCurrentPage((oldPage) => Math.min(oldPage + 1, numPages - 1))}>Next Page</button>
        </div>
      </div>
    </section>
  );
};

export default AccessTokenDetails;