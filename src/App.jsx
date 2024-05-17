import { useState } from "react";
import logo from "./assets/game-logo.png";
import Board from "./components/Board";

function App() {
  const [size, setSize] = useState(3);
  const [clicked, setClicked] = useState(false);

  const handleNewGame = () => {
    setSize(3);
    setClicked(false)
  }

  const handleSize = () => {
    if (size < 2) {
      setSize(3);
    }
    if(size > 10){
      setSize(10);
    }
    setClicked(true);
  };
  return (
    <div>
      <header className="flex items-center justify-between px-10 max-[500px]:px-5 py-5 bg-gradient-to-tr from-amber-600 via-yellow-500 to-orange-400">
        <img src={logo} alt="LOGO" className="w-10" />
        <h2 className="text-2xl max-[500px]:text-xl font-bold bg-gradient-to-r from-rose-600 via-green-500 to-red-400 text-transparent bg-clip-text">
          TIC TAC TOE
        </h2>
        <button onClick={handleNewGame} className="px-5 max-[500px]:px-3 py-3 bg-blue-500 shadow-xl trtansition active:scale-100 duration-200 hover:scale-x-105 hover:shadow-cyan-500/50 outline-none text-white rounded-lg font-semibold">
          New Game
        </button>
      </header>
      <main>
        {!clicked ? (
          <div className="text-center mt-10">
            <label htmlFor="input" className="text-lg mr-5 max-[500px]:text-base max-[500px]:mr-3">
              Value for the box size(3 to 10) :{" "}
            </label>
            <input
              type="number"
              id="input"
              value={size}
              min={3}
              max={10}
              onChange={(e) => setSize(e.target.value)}
              className="outline-none px-3 mb-2 border-b-2 border-stone-300 text-center w-32 max-[500px]:w-16 focus:border-cyan-500"
            />
            <button
              onClick={handleSize}
              className="ml-5 px-5 py-1 bg-transparent border border-black rounded-lg hover:bg-slate-400 hover:text-white"
            >
              Ok
            </button>
          </div>
        ) : <Board size={size} onNewGame={handleNewGame} /> }

      </main>
    </div>
  );
}

export default App;
