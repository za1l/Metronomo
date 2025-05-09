import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useReducer, useEffect } from "react";
import PatternSelector from "./components/PatternSelector";
import RhythmGrid from "./components/RhythmGrid";
import MetronomeClock from "./components/MetronomeClock";
import AudioEngine from "./components/AudioEngine";

const initialState = {
  isPlaying: false,
  bpm: 120,
  currentStep: 0,
  selectedPattern: "solea",
  rhythmMatrix: Array(12).fill(Array(4).fill(false)),
};

function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_PLAY":
      return { ...state, isPlaying: !state.isPlaying };
    case "SET_BPM":
      return { ...state, bpm: action.payload };
    case "NEXT_STEP":
      return { ...state, currentStep: (state.currentStep + 1) % 12 };
    case "SELECT_PATTERN":
      return { ...state, selectedPattern: action.payload };
    case "UPDATE_RHYTHM":
      const newMatrix = state.rhythmMatrix.map((row, i) =>
        i === action.payload.row ? action.payload.cells : row
      );
      return { ...state, rhythmMatrix: newMatrix };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!state.isPlaying) {
      dispatch({ type: "NEXT_STEP", payload: 0 });
    }
  }, [state.isPlaying]);

  return (
    <div className="flamenco-app">
      <AudioEngine
        isPlaying={state.isPlaying}
        currentStep={state.currentStep}
        bpm={state.bpm}
        dispatch={dispatch}
      />
      <MetronomeClock currentStep={state.currentStep} />
      <PatternSelector
        selected={state.selectedPattern}
        onSelect={(pattern) =>
          dispatch({ type: "SELECT_PATTERN", payload: pattern })
        }
      />
      <RhythmGrid
        matrix={state.rhythmMatrix}
        onCellToggle={(row, cells) =>
          dispatch({ type: "UPDATE_RHYTHM", payload: { row, cells } })
        }
      />
      <div className="controls">
        <button onClick={() => dispatch({ type: "TOGGLE_PLAY" })}>
          {state.isPlaying ? "Detener" : "Iniciar"}
        </button>
        <input
          type="number"
          value={state.bpm}
          onChange={(e) =>
            dispatch({ type: "SET_BPM", payload: Number(e.target.value) })
          }
        />
      </div>
    </div>
  );
}

export default App;
