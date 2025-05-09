export default function MetronomeClock({ currentStep }) {
  const steps = 12;
  const rotation = (currentStep * 360) / steps;

  return (
    <div className="metronome-clock">
      <div className="needle" style={{ transform: `rotate(${rotation}deg)` }} />
      <div className="compas-marks">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className={`mark ${i % 3 === 0 ? "strong" : "weak"}`}
            style={{ transform: `rotate(${i * 30}deg)` }}
          />
        ))}
      </div>
    </div>
  );
}
