/* eslint-disable no-loop-func */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import App from "./App";

const randomNum = (max: number, min: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

test("renders App component", () => {
  render(<App />);
  const appElement = screen.getByText("Risk Dice");
  expect(appElement).toBeInTheDocument();
});

test("updates Attacker Army input value", () => {
  render(<App />);
  const attackerArmy = randomNum(1, 100);
  const attackerArmyInput = screen.getByLabelText("Attacker Army");
  fireEvent.change(attackerArmyInput, { target: { value: attackerArmy } });
  expect(attackerArmyInput).toHaveValue(attackerArmy);
});

test("updates Distributor Army input value", () => {
  render(<App />);
  const distributorArmy = randomNum(1, 100);
  const distributorArmyInput = screen.getByLabelText("Distributor Army");
  fireEvent.change(distributorArmyInput, {
    target: { value: distributorArmy },
  });
  expect(distributorArmyInput).toHaveValue(distributorArmy);
});

test("simulates dice throw and displays winner", async () => {
  render(<App />);
  const attackerArmyInput = screen.getByLabelText("Attacker Army");
  const distributorArmyInput = screen.getByLabelText("Distributor Army");

  const attackerArmy = randomNum(1, 100);
  const distributorArmy = randomNum(1, 100);
  fireEvent.change(attackerArmyInput, { target: { value: attackerArmy } });
  fireEvent.change(distributorArmyInput, {
    target: { value: distributorArmy },
  });

  const throwDiceButton = screen.getByText("Throw dice!");

  let attackerVictories = 0;
  let distributorVictories = 0;
  const iterations = 1000;
  for await (const _ of Array.from({ length: iterations }, (_, j) => j)) {
    fireEvent.click(throwDiceButton);
    await waitFor(
      () => {
        const winnerMessage = screen.getByText((_, element) => {
          const textContent = element?.textContent || "";

          if (element?.tagName.toLowerCase() !== "b") return false;

          const isAttackerWinner = textContent.includes(
            "The winner is: Attacker"
          );
          const isDistributorWinner = textContent.includes(
            "The winner is: Distributor"
          );

          if (isAttackerWinner) {
            attackerVictories++;
          }

          if (isDistributorWinner) {
            distributorVictories++;
          }

          return isAttackerWinner || isDistributorWinner;
        });

        expect(winnerMessage).toBeInTheDocument();
      },
      { timeout: 4000 }
    );
  }
  console.info(`Runnel ${iterations} iterations ➰`);
  console.info(`Attacker Army: ${attackerArmy}`);
  console.info(`Distributor Army: ${distributorArmy}`);
  console.info(`Attacker victories: ${attackerVictories}`);
  console.info(`Distributor victories: ${distributorVictories}`);
});
