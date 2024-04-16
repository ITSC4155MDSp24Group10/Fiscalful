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

interface BudgetResponse {
  budgets: Budget[];
}

interface Budget {
  amount: number,
  category: string,
  duration: string,
  firebase_user_id: string,
}

const AccessTokenDetails = () => {
  const { tokenId } = useParams<{ tokenId: string }>();
  const [balancesData, setBalancesData] = useState<BalancesResponse | null>(null);
  const [transactionsData, setTransactionsData] = useState<TransactionsResponse | null>(null);
  const [budgetData, setBudgetData] = useState<BudgetResponse | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const transactionsPerPage = 4;
  const navigate = useNavigate();
  const { setIsUserLoggedIn } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [showCreateBudgetModal, setShowCreateBudgetModal] = useState(false);
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState(0);
  const [duration, setDuration] = useState('');  
  const [history] = useState([]);
  const [firebaseUserId, setFirebaseUserId] = useState(localStorage.getItem('firebase_user_id') || '');

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event.target.value));
  };

  const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDuration(event.target.value);
  };

  useEffect(() => {
    localStorage.setItem('firebase_user_id', firebaseUserId);
  }, [firebaseUserId]);

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

  const create_budget = async () => {
    try {
      const response = await fetch(`/api/budget/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount,
          category: category,
          duration: duration,
          firebase_user_id: firebaseUserId,
          history: history
        }),
      });
      const data: BudgetResponse = await response.json();
      console.log("Budget response data:", data);
      setBudgetData(data);
    } catch (error) {
      console.error("Error creating budget:", error);
    }
  };

  const delete_budget = async (budgetId: string) => {
    try {
      const response = await fetch(`/api/budget/delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          budget_id: budgetId,
          firebase_user_id: firebaseUserId,
        }),
      });
      const data = await response.json();
      if (data.success) {
        console.log("Budget deleted successfully");
        setBudgetData(data);
      }
    } catch (error) {
      console.error("Error deleting budget:", error);
    }
  };
  
  const get_user_budgets = async (firebaseUserId: string): Promise<void> => {
    try {
      const response = await fetch(`/api/budget/get?firebase_user_id=${firebaseUserId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log("User's budgets:", data);
      if (data.success) {
        setBudgetData(data);
      } else {
        console.error("Error getting budgets:", data.error);
      }
    } catch (error) {
      console.error("Error getting budgets:", error);
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

  const handleConnect = async () => {
    try {
      setIsUserLoggedIn(true);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error connecting:', error);
    }
  };

  useEffect(() => {
    fetchTransactions();
    fetchBalances();
  }, [tokenId]);

  useEffect(() => {
    console.log(transactionsData);
  }, [transactionsData]);

  useEffect(() => {
      get_user_budgets(firebaseUserId);
  }, [showBudgetModal, firebaseUserId]);
  
  useEffect(() => {
    if (showCreateBudgetModal || showBudgetModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showCreateBudgetModal || showBudgetModal]);

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

        <div className="connect-container">
          <button className="connect-btn" onClick={() => setShowConnectModal(true)}>Connect Another Account</button>
        </div>

        {showConnectModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>Confirm Connect</h2>
              <p>Are you sure you want to connect another bank account?</p>
              <button className="yes" onClick={handleConnect}>Yes</button>
              <button className="no" onClick={() => setShowConnectModal(false)}>No</button>
            </div>
          </div>
        )}

        <div className="connect-container">
          <button className="logout-btn" onClick={() => setShowBudgetModal(true)}>Budget</button>
        </div>

        {showBudgetModal && (
        <div className="modal">
          <div className="modal-content">
            <h2 className="modal-h2">Your Expenses</h2>
            {budgetData && budgetData.budgets && budgetData.budgets.map((budget: Budget, index: number) => (
              <div key={index} className="budget-item">
                <p className="budget-detail"><span className="budget-label">Category:</span> {budget.category}</p>
                <p className="budget-detail"><span className="budget-label">Duration:</span> {budget.duration}</p>
                <p className="budget-detail"><span className="budget-label">Amount:</span> ${budget.amount}</p>
              </div>
              ))}
              <p className="budget-total"><span className="budget-label">Total:</span> ${budgetData && budgetData.budgets && budgetData.budgets.reduce((total, budget) => total + budget.amount, 0)}</p>
              <button className="yes" onClick={() => setShowCreateBudgetModal(true)}>Create Expense</button>
              <button className="no" onClick={() => setShowBudgetModal(false)}>Cancel</button>
            </div>
          </div>
        )}

        {showCreateBudgetModal && (
          <div className="modal-c">
            <div className="modal-content-c">
              <h2 className="modal-h2">Create An Expense</h2>
              <form onSubmit={create_budget}>
                <label>
                  Category:
                  <input type="text" value={category} onChange={handleCategoryChange} required/>
                </label>
                <label>
                  Amount:
                  <input type="number" value={amount} onChange={handleAmountChange} required/>
                </label>
                <label>
                  Duration:
                  <input type="text" value={duration} onChange={handleDurationChange} required/>
                </label>
                <input type="submit" value="Create Expense" className="yes" />
              </form>
              <button className="no" onClick={() => setShowCreateBudgetModal(false)}>Cancel</button>
            </div>
          </div>
        )}

        <div className="connect-container">
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