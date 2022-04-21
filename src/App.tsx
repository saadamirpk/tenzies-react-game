import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import Die from "./Components/Die";
import { nanoid } from "nanoid";
import "./App.css";

function App() {
    type Dice = {
        id: string;
        val: number;
        isHeld: boolean;
    };

    const [dice, setDice] = useState(() => allNewDice());
    const [won, setWon] = useState(false);

    useEffect(() => {
        const allHeld = dice.every((die) => die.isHeld);
        const value = dice[0].val;
        const allVal = dice.every((die) => die.val === value);
        if (allHeld && allVal) {
            console.log("You Won!");
            setWon(true);
        }
    }, [dice]);

    function allNewDice() {
        let diceArray: Dice[] = [];
        for (let i = 0; i < 10; i++) {
            let d: Dice = {
                id: nanoid(),
                val: getRandomIntInclusive(1, 9),
                isHeld: false,
            };
            diceArray.push(d);
        }
        return diceArray;
    }

    function toggleHeld(dieId: string) {
        setDice((prevDie) => {
            return prevDie.map((die) => {
                return die.id === dieId ? { ...die, isHeld: !die.isHeld } : die;
            });
        });
    }

    function getRandomIntInclusive(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
        //The maximum is inclusive and the minimum is inclusive
    }

    const DiceDisplay = dice.map((die) => {
        return <Die key={die.id} toggleHeld={toggleHeld} {...die} />;
    });

    function rollDice() {
        if (won) {
            setDice(allNewDice());
            setWon(false);
        } else {
            setDice((prevDie) => {
                return prevDie.map((die) => {
                    return die.isHeld
                        ? die
                        : { ...die, val: getRandomIntInclusive(1, 9) };
                });
            });
        }
    }

    return (
        <main>
            {won && <Confetti />}
            <h1>Tenzies</h1>
            <p>
                {won
                    ? "You Won!"
                    : "Get same numbers on all dice. Click the dice to freeze at current value between rolls."}
            </p>
            <div className="die-container">{DiceDisplay}</div>
            <button className="roll-dice" onClick={rollDice}>
                {won ? "New Game" : "Roll"}
            </button>
        </main>
    );
}

export default App;
