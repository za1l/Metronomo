export default function PatternSelector({ selected, onSelect }) {
  const palos = ["Soleá", "Bulería", "Alegrías", "Tangos"];

  return (
    <div className="pattern-selector">
      {palos.map((palo) => (
        <button
          key={palo}
          className={
            selected.toLowerCase() === palo.toLowerCase() ? "active" : ""
          }
          onClick={() => onSelect(palo.toLowerCase())}
        >
          {palo}
        </button>
      ))}
    </div>
  );
}
