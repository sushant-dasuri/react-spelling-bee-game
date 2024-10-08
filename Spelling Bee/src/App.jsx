import { useState, useEffect } from "react";
import { Header } from "./components/Header.jsx";
import { Score } from "./components/Score.jsx";
import { Honeycomb } from "./components/Honeycomb.jsx";
import {Guess} from './components/Guess.jsx';
import {CorrectGuesses} from './components/CorrectGuesses.jsx';
import "./App.css";

function App() {
  const [data, setData] = useState();
  const [guess, setGuess] = useState("");
  const [correctGuesses, setCorrectGuesses] = useState([]);

  const addLetter = (letter) => {
    setGuess((g) => g + letter);
  };

  const removeLetter = () => {
    setGuess(guess.slice(0, -1));
  };

  const addCorrectGuess = () => {
    setCorrectGuesses([...correctGuesses, guess]);
  }

  const checkGuess = () => {
    if(correctGuesses.includes(guess)) {
        console.log("Already Found");
    }
    
    else if (data.answers && data.answers.includes(guess)) {
      addCorrectGuess(guess);
      console.log("Good Job");
    } 
    else {
      console.log("Not in the list");
    }

    setGuess('');
  };

  useEffect(() => {
    async function fetchData() {
      const result = await fetch("/api/data.json", {
        headers: { "Content-Type": "application/json" },
      });
      const json = await result.json();
      setData(json.data.today);
    }
    fetchData();
  }, []);

  return (
    <>
      {data ? (
        <>
          <Header date={data.displayDate} editor={data.editor} />
          <Score correctGuesses={correctGuesses}></Score>
          <CorrectGuesses correctGuesses={correctGuesses}></CorrectGuesses>
          <section className="container">
            <div className="inputs">
              <div className="center">
                <Guess guess={guess} centerLetter={data.centerLetter} outerLetters={data.outerLetters}></Guess>
                <Honeycomb
                  centerLetter={data.centerLetter}
                  outerLetters={data.outerLetters}
                  validLetters={data.validLetters}
                  addLetter={addLetter}
                  removeLetter={removeLetter}
                  checkGuess={checkGuess}
                ></Honeycomb>
              </div>
            </div>
          </section>
        </>
      ) : (
        <p>...Loading</p>
      )}
    </>
  );
}

export default App;
