import React, { useState } from 'react';
import Form from './Form';
import Table from './Table';
import './index.css';

function App() {
  const [trainings, setTrainings] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editDate, setEditDate] = useState('');
  const [editDistance, setEditDistance] = useState('');

  const handleSave = (date, distance) => {
    if (editId !== null) {
      setTrainings((prev) =>
        prev.map((t) => (t.id === editId ? { ...t, date, distance } : t))
      );
      setEditId(null);
      setEditDate('');
      setEditDistance('');
    } else {
      const existing = trainings.find((t) => t.date === date);
      if (existing) {
        setTrainings((prev) =>
          prev.map((t) =>
            t.id === existing.id ? { ...t, distance: t.distance + distance } : t
          )
        );
      } else {
        setTrainings((prev) => [...prev, { id: Date.now(), date, distance }]);
      }
    }
  };

  const handleDelete = (id) => {
    setTrainings((prev) => prev.filter((t) => t.id !== id));
  };

  const handleEdit = (training) => {
    setEditId(training.id);
    setEditDate(training.date);
    setEditDistance(String(training.distance));
  };

  const sortedTrainings = [...trainings].sort((a, b) => {
    const dateA = new Date(a.date.split('.').reverse().join('-'));
    const dateB = new Date(b.date.split('.').reverse().join('-'));
    return dateB - dateA;
  });

  return (
    <div className="app-container">
      <Form 
        onSave={handleSave} 
        editDate={editDate} 
        editDistance={editDistance} 
        isEditing={editId !== null} 
      />
      <Table 
        trainings={sortedTrainings} 
        onDelete={handleDelete} 
        onEdit={handleEdit} 
      />
    </div>
  );
}

export default App;
