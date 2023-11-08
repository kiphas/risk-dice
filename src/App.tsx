import React, { useState } from "react";
import "./App.css";
import { Button, TextField } from "@mui/material";

function App() {
  const [attackerArmy, setAttackerArmy] = useState(10);
  const [distributorArmy, setDistributorArmy] = useState(7);
  const [attackedRemainedArmy, setAttackedRemainedArmy] = useState<number>(0);
  const [distributorRemainedArmy, setDistributorRemainedArmy] =
    useState<number>(0);

  const throwDice = () => {
    let currentAttackerArmy = attackerArmy;
    let currentDistributorArmy = distributorArmy;
    const rollDice = (length: number) =>
      Array.from({ length }, () => Math.floor(Math.random() * 5) + 1);

    while (true) {
      // Get the current allowed dices
      const attackerDice = Math.min(currentAttackerArmy, 3);
      const distributorDice = Math.min(currentDistributorArmy, 2);

      // Roll the dice and sort the from highest to lowest
      // Relevant are the first two dices for the following comparison
      const attackerScore = rollDice(attackerDice).sort((a, b) => b - a);
      const distributorScore = rollDice(distributorDice).sort((a, b) => b - a);

      if (distributorScore[0] >= attackerScore[0]) {
        currentAttackerArmy--;
      } else {
        currentDistributorArmy--;
      }

      if (currentAttackerArmy <= 0 || currentDistributorArmy <= 0) break;

      if (distributorScore[1] >= attackerScore[1]) {
        currentAttackerArmy--;
      } else {
        currentDistributorArmy--;
      }

      if (currentAttackerArmy <= 0 || currentDistributorArmy <= 0) break;
    }
    setAttackedRemainedArmy(currentAttackerArmy);
    setDistributorRemainedArmy(currentDistributorArmy);
  };

  const winner =
    attackedRemainedArmy > distributorRemainedArmy
      ? "Attacker"
      : attackedRemainedArmy < distributorRemainedArmy
      ? "Distributor"
      : null;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "13px",
        }}
      >
        <h1>Risk Dice</h1>
        <TextField
          type="number"
          label="Attacker Army"
          variant="outlined"
          defaultValue={attackerArmy}
          onChange={(nv) => setAttackerArmy(Number(nv.target.value))}
        />
        <TextField
          type="number"
          label="Distributor Army"
          variant="outlined"
          defaultValue={distributorArmy}
          onChange={(nv) => setDistributorArmy(Number(nv.target.value))}
        />
        <Button variant="contained" onClick={throwDice}>
          Throw dice!
        </Button>
        {winner && (
          <>
            <b style={{ textDecoration: "underline" }}>
              The winner is: {winner}
            </b>
            <span>Attacker remained army: {attackedRemainedArmy}</span>
            <span>Distributor remained army: {distributorRemainedArmy}</span>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
