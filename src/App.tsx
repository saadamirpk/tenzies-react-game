import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import Die from "./Components/Die";
import { nanoid } from "nanoid";
import "./App.css";
import RandomDie from "./Components/RandomDie";

function App() {
    type Dice = {
        id: string;
        val: number;
        isHeld: boolean;
    };

    const [dice, setDice] = useState(() => allNewDice());

    const [won, setWon] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);

    const [rollCount, setRollCount] = useState(0);

    const [second, setSecond] = useState(0);
    const [minute, setMinute] = useState(0);

    useEffect(() => {
        const allHeld = dice.every((die) => die.isHeld);
        const value = dice[0].val;
        const allVal = dice.every((die) => die.val === value);
        if (allHeld && allVal) {
            console.log("You Won!");
            setWon(true);
        }
    }, [dice]);

    var timer: any;

    useEffect(() => {
        if (second > 59) {
            setMinute((prev) => prev + 1);
            setSecond(0);
        }
    }, [second]);

    useEffect(() => {
        if (gameStarted) {
            setSecond(0);
            setMinute(0);
            timer = setInterval(() => {
                setSecond((prev) => prev + 1);
            }, 1000);
        }
        return () => {
            clearInterval(timer);
        };
    }, [gameStarted]);

    useEffect(() => {
        if (won) {
            setGameStarted(false);
        }
    }, [won]);

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
        if (!gameStarted && !won) {
            return <RandomDie />;
        }
        return <Die key={die.id} toggleHeld={toggleHeld} {...die} />;
    });

    function rollDice() {
        if (won) {
            setDice(allNewDice());
            setRollCount(0);
            setWon(false);
            return;
        } else {
            setDice((prevDie) => {
                return prevDie.map((die) => {
                    return die.isHeld
                        ? die
                        : { ...die, val: getRandomIntInclusive(1, 9) };
                });
            });
        }
        if (!gameStarted) {
            setGameStarted(true);
        }
        setRollCount((prev) => prev + 1);
    }

    return (
        <main>
            <div className="holder">
                {gameStarted && (
                    <div className="stat-container">
                        <p>
                            Rolls <span>{rollCount}</span>
                        </p>
                        <p>
                            Timer
                            <span>{minute < 10 ? "0" + minute : minute}</span>:
                            <span>{second < 10 ? "0" + second : second}</span>
                        </p>
                    </div>
                )}
            </div>

            {won && <Confetti />}
            <h1>Tenzies</h1>
            <div>
                {won ? (
                    <p>
                        You Won with <span className="bold">{rollCount} </span>
                        <span>{rollCount == 1 ? "Roll" : "Rolls"}</span> in{" "}
                        {minute > 0 && (
                            <span>
                                <span className="bold">{minute}</span>
                                <span>
                                    {" "}
                                    {minute == 1 ? "Minute" : "Minutes"} and
                                </span>
                            </span>
                        )}
                        <span className="bold"> {second} </span>
                        <span>{second == 1 ? "Second" : "Seconds"}</span>
                    </p>
                ) : (
                    "Get same numbers on all dice. Click the dice to freeze at current value between rolls."
                )}
            </div>
            <div className="die-container">{DiceDisplay}</div>
            <button className="roll-dice" onClick={rollDice}>
                {won ? "New Game" : gameStarted ? "Roll" : "Start Game"}
            </button>
        </main>
    );
}

export default App;
