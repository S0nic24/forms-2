import React, { useState } from 'react';

function App() {
  const [trainings, setTrainings] = useState([]);
  const [date, setDate] = useState('');
  const [distance, setDistance] = useState('');
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !distance) return;

    const dist = parseFloat(distance);
    if (isNaN(dist)) return;

    if (editingId !== null) {
      setTrainings((prev) =>
        prev.map((t) =>
          t.id === editingId ? { ...t, date, distance: dist } : t
        )
      );
      setEditingId(null);
    } else {
      const existing = trainings.find((t) => t.date === date);
      if (existing) {
        setTrainings((prev) =>
          prev.map((t) =>
            t.id === existing.id ? { ...t, distance: t.distance + dist } : t
          )
        );
      } else {
        setTrainings((prev) => [...prev, { id: Date.now(), date, distance: dist }]);
      }
    }

    setDate('');
    setDistance('');
  };

  const handleDelete = (id) =>
    setTrainings((prev) => prev.filter((t) => t.id !== id));

  const handleEdit = (t) => {
    setDate(t.date);
    setDistance(String(t.distance));
    setEditingId(t.id);
  };

  const sorted = [...trainings].sort((a, b) => {
    const da = new Date(a.date.split('.').reverse().join('-'));
    const db = new Date(b.date.split('.').reverse().join('-'));
    return db - da;
  });

  return (
    <div className="app">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Дата (ДД.ММ.ГГ)</label>
          <input
            type="text"
            placeholder="ДД.ММ.ГГ"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Пройдено км</label>
          <input
            type="number"
            step="0.1"
            placeholder="0.0"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            required
          />
        </div>
        <button type="submit">OK</button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setDate('');
              setDistance('');
            }}
          >
            Отмена
          </button>
        )}
      </form>

      <table>
        <thead>
          <tr>
            <th>Дата (ДД.ММ.ГГ)</th>
            <th>Пройдено км</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((t) => (
            <tr key={t.id}>
              <td>{t.date}</td>
              <td>{t.distance}</td>
              <td>
                <button className="action-btn" onClick={() => handleEdit(t)}>✎</button>
                <button className="action-btn" onClick={() => handleDelete(t.id)}>✕</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;