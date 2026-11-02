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

  const handleDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');

    if (value.length > 6) {
      value = value.slice(0, 6);
    }

    if (value.length > 2 && value.length <= 4) {
      value = `${value.slice(0, 2)}.${value.slice(2)}`;
    } else if (value.length > 4) {
      value = `${value.slice(0, 2)}.${value.slice(2, 4)}.${value.slice(4)}`;
    }

    setDate(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (date.length !== 8) {
      setError('Введите дату полностью (ДД.ММ.ГГ)');
      return;
    }

    const dist = parseFloat(distance);
    if (isNaN(dist) || dist <= 0) {
      setError('Введите положительное число км');
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
          onChange={handleDateChange}
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
