import { useEffect, useState } from "react";
import "./App.css";
import { useMediaQuery } from "react-responsive";
import Dice from "./images/icon-dice.svg";
import PatternDividerDesktop from "./images/pattern-divider-desktop.svg";
import PatternDividerMobile from "./images/pattern-divider-mobile.svg";

function App() {
  const [quote, setQuote] = useState();
  const [id, setId] = useState(1);

  useEffect(
    function () {
      async function fetchQuotes() {
        const response = await fetch(`https://api.adviceslip.com/advice/${id}`);
        const data = await response.json();

        setQuote(data.slip?.advice);
      }
      fetchQuotes();
    },
    [id]
  );

  const generateQuoteHandler = function () {
    setId(Math.trunc(Math.random() * 20) + 1);
  };

  const isDesktopOrMobile = useMediaQuery({
    query: "(min-device-width: 425px)",
  });

  return (
    <main>
      <div className="container">
        <h1 className="heading">Advice #{id}</h1>

        {quote ? <p className="quote">{quote}</p> : <p></p>}

        {isDesktopOrMobile && (
          <img
            className="patternDivider"
            src={PatternDividerDesktop}
            alt=""
          ></img>
        )}

        {!isDesktopOrMobile && (
          <img
            className="patternDivider"
            src={PatternDividerMobile}
            alt=""
          ></img>
        )}

        <button onClick={generateQuoteHandler} className="dice">
          <img src={Dice} alt="dice"></img>
        </button>
      </div>
    </main>
  );
}

export default App;
