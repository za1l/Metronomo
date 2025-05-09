export default function RhythmGrid({ matrix, onCellToggle }) {
  const handleToggle = (rowIndex, cellIndex) => {
    const newCells = matrix[rowIndex].map((cell, i) =>
      i === cellIndex ? !cell : cell
    );
    onCellToggle(rowIndex, newCells);
  };

  return (
    <div className="rhythm-grid">
      {matrix.map((row, rowIndex) => (
        <div key={rowIndex} className="rhythm-row">
          {row.map((active, cellIndex) => (
            <button
              key={cellIndex}
              className={`rhythm-cell ${active ? "active" : ""}`}
              onClick={() => handleToggle(rowIndex, cellIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
