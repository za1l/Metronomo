import { useEffect, useRef } from "react";

export default function AudioEngine({ isPlaying, currentStep, bpm }) {
  const audioContextRef = useRef(null);
  const highOscillatorRef = useRef(null);
  const lowOscillatorRef = useRef(null);

  const createContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext ||
        window.webkitAudioContext)();
    }
  };

  const createOscillator = (freq) => {
    const osc = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, audioContextRef.current.currentTime);
    osc.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);
    gainNode.gain.setValueAtTime(0.2, audioContextRef.current.currentTime);

    return { osc, gainNode };
  };

  const playStep = () => {
    if (currentStep % 12 === 0) {
      // Sonido grave para el primer tiempo del compás
      const { osc } = createOscillator(196);
      osc.start();
      osc.stop(audioContextRef.current.currentTime + 0.05);
    } else if (currentStep % 3 === 0) {
      // Sonido agudo para subdivisiones
      const { osc } = createOscillator(523);
      osc.start();
      osc.stop(audioContextRef.current.currentTime + 0.03);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      createContext();
      const interval = setInterval(playStep, (60 * 1000) / bpm);
      return () => clearInterval(interval);
    }
  }, [isPlaying, currentStep, bpm]);

  return (
    <button onClick={createContext} className="audio-init">
      Activar Audio
    </button>
  );
}
