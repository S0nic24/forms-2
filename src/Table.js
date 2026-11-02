import React from 'react';

function Table({ trainings, onDelete, onEdit }) {
  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>Дата (ДД.ММ.ГГ)</th>
          <th>Пройдено км</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        {trainings.length === 0 ? (
          <tr>
            <td colSpan="3" className="empty">Нет данных</td>
          </tr>
        ) : (
          trainings.map((t) => (
            <tr key={t.id}>
              <td>{t.date}</td>
              <td>{t.distance}</td>
              <td>
                <button className="action-btn" onClick={() => onEdit(t)}>✎</button>
                <button className="action-btn" onClick={() => onDelete(t.id)}>✕</button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default Table;