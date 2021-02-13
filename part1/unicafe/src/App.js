import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const total = good + neutral + bad;

  console.log(total);

  return (
    <div>
      <h1>Give your Feedback</h1>
      <Button
        good={good}
        neutral={neutral}
        bad={bad}
        setGood={setGood}
        setBad={setBad}
        setNeutral={setNeutral}
      />
      <Statistics good={good} neutral={neutral} bad={bad} total={total} />
    </div>
  );
};

const Button = ({ good, neutral, bad, setGood, setBad, setNeutral }) => {
  return (
    <>
      <span>
        <button onClick={() => setGood(good + 1)}>Good</button>
      </span>
      <span>
        <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
      </span>
      <span>
        <button onClick={() => setBad(bad + 1)}>Bad</button>
      </span>
    </>
  );
};

const Statistic = ({ text, value }) => {
  return (
    <>
      <table className="list">
        <tr>
          <th className="list-item">
            {text} {value}
          </th>
        </tr>
      </table>
    </>
  );
};

const Statistics = ({ good, neutral, bad, total }) => {
  return (
    <div>
      {total === 0 ? (
        "No feedbacks given"
      ) : (
        <div>
          <Statistic text="Good" value={good} />
          <Statistic text="Neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="total" value={total} />
          <ul className="list">
            <li className="list-item">average {good / neutral / bad}</li>

            <li className="list-item">
              positive {good * neutral * bad * 0.3} %
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
