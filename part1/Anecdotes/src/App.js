import React, { useState } from "react";
import "./App.css";


const Header = ({ title }) => <h2>{title}</h2>

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>

const Anecdote = ({ anecdote, vote }) => {
  return (
    <>
    <div>{anecdote}</div>
    <div>Has {vote} votes</div>
    </>
  );
};

const WinningAnecdote = ({ anecdotes, votes }) => {
  if (votes.reduce((a, b) => a + b, 0) > 0) {
    const winning = votes.indexOf(Math.max(...votes));
    return <Anecdote anecdote={anecdotes[winning]} vote={votes[winning]} />;
  } else {
    return <div>No votes given.</div>;
  }
}




function App({ anecdotes }) {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  console.log(votes);
  const rndm = () => setSelected(Math.floor(Math.random() * anecdotes.length));


  const voting = () => {
    const _votes = [...votes];
      _votes[selected] += 1;
      setVotes(_votes);
  }

  return (
    
    <>
    {console.log(anecdotes)}
      <div><Header title="Anecdote of the day"/></div>
      <div><Anecdote anecdote={anecdotes[selected]} vote={votes[selected]} /></div>
      <div>
        <Button text="Generate random Anecdotes" onClick={rndm} />
        <Button text="Vote" onClick={voting}/>
        <Header title="Anecdote with this most votes" />
        <WinningAnecdote anecdotes={anecdotes} votes={votes} />
      </div>
    </>
  );
};

export default App;
