import React, { useState } from "react";
import "./SellCreditPopUp.css";
import "./SetTokenRate.css";
import "../../ClaimCredit/EarnCredit/EarnCreditsPopup.css";
import ethsvg from "./eth.svg";

const SetTokenRate = (props) => {
  const [powerOutput, setPowerOutput] = useState(0);
  const [unit, setUnit] = useState("kWh");

  async function handleEarnCredit() {
    let energyProduced = 0;
    if (unit === "kWh") {
      energyProduced = powerOutput;
    } else {
      energyProduced = powerOutput * 1000;
    }
    props.handleEarnCredit(energyProduced);
  }

  
  const handleSellCredit=()=>{
    return props.popup(3);
  }
  return (
    <>
      <button className="popup-close" onClick={() => props.popup(false)}>
        &times;
      </button>
      <div className="popup-title-parent">
      <h2 className="popup-title">Set Token Rate</h2>
      <p className="popup-subtitle">
        You have the flexibility set your own token rate tied to ETH.
      </p>
      </div>
      <div className="credit-details">
        <h3>Floor Price</h3>
        <div className="credit-details-settoken">
          <h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-lightning-fill"
              viewBox="0 0 16 16"
            >
              <path d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641z" />
            </svg>{" "}
            1 CCT =
            <img src={ethsvg} width="16" height="16" /> 0.1 ETH
          </h3>
          <button className="reload-button" >🔃</button>
        </div>
      </div>
      <div className="input-container">
        <label htmlFor="power-output" className="input-label">
          What amount of ETH would you like to set for 1 CCT?
        </label>
        <div className="input-group">
          <input
            type="number"
            id="power-output"
            placeholder="Enter the amount"
            className="input-field-settoken"
            value={powerOutput}
            onChange={(e) => setPowerOutput(e.target.value)}
          />
          <select
            className="input-select"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          >
            <option value="ETH">ETH</option>
            <option value="kWh">kWh</option>
          </select>
        </div>
        <button className="confirm-button" onClick={handleSellCredit}>
        Next
      </button>
      </div>
      
    </>
  );
};

export default SetTokenRate;
