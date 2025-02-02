import React, { useState, useEffect } from "react";
import "./TransactionsTable.css";
import axios from "axios";

const TransactionsTable = (props) => {
  const [transactions, setTransactions] = useState(props.transactions);
  const [selectedRows, setSelectedRows] = useState([]);
  const [filter, setFilter] = useState("All");
  const [verificationStatus, setVerificationStatus] = useState({});
  const [userId, setUserId] = useState(props.account); // Replace this with the actual logged-in user's ID

  useEffect(() => {
        setTransactions(props.transactions);
        const initialStatus = props.transactions.reduce((acc, transactions) => {
          acc[transactions.orderId] = "Verify";
          return acc;
        }, {});
        console.log(initialStatus);
        setVerificationStatus(initialStatus);
  }, [props.transactions]);

  let filteredTransactions = transactions.filter((transaction) =>
    filter === "My Orders" ? transaction.seller === userId : true
  );
  useEffect(() => {
    setUserId(props.account);
    filteredTransactions = transactions.filter((transaction) =>
      filter === "My Orders" ? transaction.seller === props.account : true
    );
}, [props.account]);
  // Toggle verification status
  const handleVerifyClick =async  (seller,orderId,amountToBuy,pricePerToken) => {
    if(verificationStatus[orderId]==="Verify"){
      const response =await props.verify(seller,amountToBuy);
      if(response){
        setVerificationStatus((verificationStatus) => ({
          ...verificationStatus,
          [orderId]: "Buy",
        }));

      }
      else{
        setVerificationStatus((verificationStatus) => ({
          ...verificationStatus,
          [orderId]: "Not-Verified",
        }));
      }
    }
    else if(verificationStatus[orderId]==="Buy"){
        props.buyOrder(orderId,amountToBuy,pricePerToken);
    }
  };

  // Delete transaction
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/deleteOrder/${id}`);
      setTransactions((prevTransactions) => prevTransactions.filter((t) => t.orderId !== id));
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };


  return (
    <div className="transaction-section">
      <div className="navbar">
        <div className="nav-buttons">
          <button
            className={`filter-button ${filter === "My Orders" ? "active" : ""}`}
            onClick={() => setFilter("My Orders")}
          >
            My Orders
          </button>
          <button
            className={`filter-button ${filter === "All" ? "active" : ""}`}
            onClick={() => setFilter("All")}
          >
            All Orders
          </button>
        </div>
        <div className="filter-dropdown">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="All">All</option>
            <option value="Completed">Completed</option>
            <option value="Aborted">Aborted</option>
          </select>
        </div>
      </div>

      <div className="table-container">
        <table className="transaction-table">
          <thead>
            <tr>
              <th style={{ minWidth: "10%" }}>Sl. No.</th>
              <th style={{ minWidth: "20%" }}>Order ID</th>
              <th style={{ minWidth: "30%" }}>Time</th>
              <th style={{ minWidth: "20%" }}>Price per Token</th>
              <th style={{ minWidth: "20%" }}>Amount to Sell</th>
              <th style={{ minWidth: "20%" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction, index) => (
              <tr key={transaction.orderId}>
                <td>{index + 1}</td>
                <td>{transaction.orderId}</td>
                <td>{new Date(transaction.timestamp).toLocaleString()}</td>
                <td>₹{transaction.pricePerToken.toFixed(5)}</td>
                <td>{transaction.amountToSell}</td>
                <td>
                  {transaction.userId === userId ? (
                    // Show delete button if order belongs to user
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(transaction.orderId)}
                    >
                      Delete
                    </button>
                  ) : (
                    // Show verify button for non-user orders
                    <button
                      className={`verify-button ${verificationStatus[transaction.orderId].toLowerCase()}`}
                      onClick={() => handleVerifyClick(transaction.seller,transaction.orderId,transaction.amountToSell,transaction.pricePerToken)}
                    >
                      {verificationStatus[transaction.orderId]}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsTable;
