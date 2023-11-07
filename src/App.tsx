import React, { useState } from 'react';
import './App.css';
import { Button, TextField } from '@mui/material';

function App() {
  const [attackerArmy, setAttackerArmy] = useState(10);
  const [distributorArmy, setDistributorArmy] = useState(7);
  const [winner, setWinner] = useState<string>();


  const throwDice = () => {
    let currentAttackerArmy = attackerArmy;
    let currentDistributorArmy = distributorArmy;

    while (true) {
      let attackerDice = currentAttackerArmy >= 3 ? 3 : currentAttackerArmy === 2 ? 2 : 1;
      let distributorDice = currentDistributorArmy >= 2 ? 2 : 1;

      const attackerScore = Array.from({ length: attackerDice }, () => 1).map((i) => {
        return (Math.floor(Math.random() * 5) + 1) + i;
      });

      const distributorScore = Array.from({ length: distributorDice }, () => 1).map((i) => {
        return (Math.floor(Math.random() * 5) + 1) + i;
      });

      const firstAttackerDice = Math.max(...attackerScore);
      const secondAttackerDice = attackerScore.sort((a, b) => b - a)[1];

      const firstDistributorDice = Math.max(...distributorScore);
      const secondDistributorDice = distributorScore.sort((a, b) => b - a)[1];
  
      if(firstDistributorDice >= firstAttackerDice) {
        currentAttackerArmy--;
      } else {
        currentDistributorArmy--;
      }

      if(currentAttackerArmy <= 0 || currentDistributorArmy <= 0) break;

      if(secondDistributorDice >= secondAttackerDice) {
        currentAttackerArmy--;
      } else {
        currentDistributorArmy--;
      }

      if(currentAttackerArmy <= 0 || currentDistributorArmy <= 0) break;
    }
    setWinner(currentAttackerArmy > currentDistributorArmy ? "Attacker" : "Distributor");
  }

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection:'column', gap: '10px'}}>
        <h1>
          Risk Dice
        </h1>
        <TextField type='number'  label="Attacker Army" variant="outlined"  defaultValue={attackerArmy} onChange={(nv)=>setAttackerArmy(Number(nv.target.value))}/>
        <TextField type='number' label="Distributor Army" variant="outlined" defaultValue={distributorArmy} onChange={(nv)=>setDistributorArmy(Number(nv.target.value))}/> 
        <Button variant="contained" onClick={throwDice}>Throw dice!</Button>
        {winner ? <b>The winner is: {winner}</b> : <b>Find out the winner :)</b>}     
      </div> 
    </div>
  );
}

export default App;
