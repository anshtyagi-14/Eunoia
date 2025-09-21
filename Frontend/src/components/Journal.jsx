import React, { useState, useEffect } from 'react';
import AnimatedPage from './AnimatedPage';
import TextareaAutosize from 'react-textarea-autosize';

function Journal() {
  const [entries, setEntries] = useState(() => {
    const savedEntries = localStorage.getItem('journalEntries');
    return savedEntries ? JSON.parse(savedEntries) : [];
  });
  const [newEntry, setNewEntry] = useState('');

  useEffect(() => {
    localStorage.setItem('journalEntries', JSON.stringify(entries));
  }, [entries]);

  const handleSave = () => {
    if (!newEntry.trim()) return;
    const entry = {
      id: Date.now(),
      text: newEntry,
      // KEY CHANGE: Using toLocaleString() to include the time
      date: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true }),
    };
    setEntries(prev => [entry, ...prev]);
    setNewEntry('');
  };

  return (
    <AnimatedPage>
      <div className="h-full max-w-4xl mx-auto grid grid-rows-[auto_1fr] gap-4 p-6 lg:p-10">
        
        {/* Header and New Entry Input */}
        <div>
          <h2 className="text-2xl font-bold text-sky-900 border-b border-sky-200 pb-2">My Journal</h2>
          <div className="mt-4">
            <TextareaAutosize
              value={newEntry}
              onChange={(e) => setNewEntry(e.target.value)}
              placeholder="Write about your day..."
              minRows={3}
              className="w-full p-3 border-slate-300 bg-white text-slate-800 border rounded-t-lg focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
            />
            <button
              onClick={handleSave}
              className="w-full bg-sky-500 text-white font-semibold p-2 rounded-b-lg hover:bg-sky-600 disabled:bg-sky-300 transition-colors"
              disabled={!newEntry.trim()}
            >
              Save Entry
            </button>
          </div>
        </div>

        {/* Past Entries */}
        <div className="overflow-y-auto custom-scrollbar bg-white rounded-xl shadow-lg border border-sky-100 p-4">
          {entries.length > 0 ? (
            entries.map(entry => (
              <div key={entry.id} className="bg-sky-50 p-4 rounded-lg mb-3 border border-sky-100">
                <p className="text-sm text-slate-500 mb-2">{entry.date}</p>
                <p className="text-slate-700 whitespace-pre-wrap">{entry.text}</p>
              </div>
            ))
          ) : (
            <p className="text-slate-500 text-center mt-10">Progress, not perfection.</p>
          )}
        </div>
      </div>
    </AnimatedPage>
  );
}

export default Journal;