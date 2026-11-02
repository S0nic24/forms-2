import React, { useState, useEffect } from 'react';

function Form({ onSave, editDate, editDistance, isEditing }) {
  const [date, setDate] = useState('');
  const [distance, setDistance] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setDate(editDate);
    setDistance(editDistance);
    setError('');
  }, [editDate, editDistance]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const dateRegex = /^\d{2}\.\d{2}\.\d{2}$/;
    if (!dateRegex.test(date)) {
      setError('Формат даты: ДД.ММ.ГГ');
      return;
    }

    const dist = parseFloat(distance);
    if (isNaN(dist) || dist <= 0) {
      setError('Введите корректное расстояние');
      return;
    }

    setError('');
    onSave(date, dist);

    if (!isEditing) {
      setDate('');
      setDistance('');
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="input-group">
        <label>Дата (ДД.ММ.ГГ)</label>
        <input
          type="text"
          placeholder="ДД.ММ.ГГ"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label>Пройдено км</label>
        <input
          type="number"
          step="0.1"
          placeholder="0.0"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
        />
      </div>
      <button type="submit">OK</button>
      {error && <div className="form-error">{error}</div>}
    </form>
  );
}

export default Form;
