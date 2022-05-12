import React, { useState } from "react";

export default function Leaderboard(props: {
  minute: number;
  second: number;
  rollCount: number;
}) {
  /* 

    Fetch scores from localstorage and display in table
    Sort array with new score and save top 3 if person enter name and press save button
    
*/

  const [scoreList, setScoreList] = useState<any[]>(
    JSON.parse(localStorage.getItem("score-data") || "[]")
  );
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function submitName(e: any) {
    e.preventDefault();
    if (name.length == 0) {
      //error
      return;
    }
    setSubmitted(true);
    console.log("name is " + name);
    scoreList.push({
      name: name,
      minute: props.minute,
      second: props.second,
      rolls: props.rollCount,
    });

    scoreList.sort((a, b) => {
      if (a.rolls === b.rolls) {
        if (a.minute === b.minute) {
          return a.second < b.second ? -1 : 1;
        } else {
          return a.minute < b.minute ? -1 : 1;
        }
      } else {
        return a.rolls < b.rolls ? -1 : 1;
      }
    });

    let newArr: any[] = [];
    let s = scoreList.length;
    if (s > 3) {
      s = 3;
    }
    for (let i = 0; i < s; i++) {
      newArr.push(scoreList[i]);
    }
    setScoreList([...newArr]);
    localStorage.setItem("score-data", JSON.stringify(newArr));
  }
  function hanleChanges(e: any) {
    setName(e.target.value);
  }

  const DataDisplay = scoreList.map((score, ind) => {
    return (
      <tr key={ind}>
        <td>#{ind + 1}</td>
        <td>{score.name}</td>
        <td>{score.rolls}</td>
        <td>
          {(score.minute < 10 && "0") + score.minute}:
          {(score.second < 10 && "0") + score.second}
        </td>
      </tr>
    );
  });

  return (
    <div>
      {submitted ? (
        <span>Submitted!</span>
      ) : (
        <form>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            required
            value={name}
            onChange={hanleChanges}
          />
          <button className="sub-btn" onClick={submitName}>
            Submit
          </button>
        </form>
      )}
      <table className="mytable">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Rolls</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>{DataDisplay}</tbody>
      </table>
    </div>
  );
}
