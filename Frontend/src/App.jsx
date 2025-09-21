import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import Journal from './components/Journal';
import Insights from './components/Insights';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-sky-50 font-sans">
        <Sidebar />
        {/* KEY CHANGE: This container must be a flex container that allows its child to grow */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Chat />} />
              <Route path="/journal" element={<Journal />} />
              <Route path="/insights" element={<Insights />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </Router>
  );
}

export default App;