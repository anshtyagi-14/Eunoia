import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { PhoneIcon, XMarkIcon } from '@heroicons/react/24/solid';
import AnimatedPage from './AnimatedPage';

// Helpline data organized for clarity
const helplines = [
  { name: 'Tele-Manas (Govt. of India)', number: '14416', description: '24/7 national mental health support.', website: 'https://telemanas.mohfw.gov.in/' },
  { name: 'Vandrevala Foundation', number: '9999 666 555', description: '24/7 crisis intervention and counseling.', website: 'https://www.vandrevalafoundation.com/' },
  { name: 'KIRAN (Govt. of India)', number: '1800-599-0019', description: 'Mental health rehabilitation services.', website: 'https://depwd.gov.in/en' },
  { name: 'Aasra', number: '98204 66728', description: 'Emotional support for those in distress.', website: 'http://www.aasra.info/' },
];

function Insights() {
  const [insight, setInsight] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal

  const generateInsight = async () => {
    setIsLoading(true);
    setInsight('');
    const savedEntries = localStorage.getItem('journalEntries');
    if (!savedEntries || JSON.parse(savedEntries).length === 0) {
      setInsight("You need to write at least one journal entry to get an insight.");
      setIsLoading(false);
      return;
    }
    const entries = JSON.parse(savedEntries);
    const combinedText = entries.slice(0, 5).map(e => e.text).join('\n---\n');
    try {
      // --- Start of Corrected Code ---
      const API_URL = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${API_URL}/api/v1/aura/insights`, { message: combinedText });
      // --- End of Corrected Code ---
      setInsight(response.data.reply);
    } catch (error) {
      console.error("Error fetching insight:", error);
      setInsight("Sorry, I couldn't generate an insight right now. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatedPage>
      {/* Applying the same CSS Grid layout as the Chat page */}
      <div className={`h-full max-w-4xl mx-auto grid grid-rows-[auto_1fr] gap-4 p-6 lg:p-10 transition-filter duration-300 ${isModalOpen ? 'filter blur-sm' : ''}`}>
        
        {/* Header: First row (auto height) */}
        <div className="flex justify-between items-center border-b border-sky-200 pb-2">
          <h2 className="text-2xl font-bold text-sky-900">Generate Insights</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors shadow-sm"
          >
            <PhoneIcon className="w-5 h-5" />
            <span>Get Help</span>
          </button>
        </div>

        {/* Main Content Area: Second row (takes up all available space) */}
        <div className="overflow-y-auto custom-scrollbar">
          <p className="text-slate-600 mb-6">
            Click the button below to use AI to analyze your recent journal entries for patterns or themes.
          </p>
          <button
            onClick={generateInsight}
            disabled={isLoading}
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-green-300 transition-colors"
          >
            {isLoading ? 'Analyzing...' : 'Generate Insight'}
          </button>

          {insight && (
            <div className="mt-6 bg-white p-6 rounded-lg shadow-md border border-sky-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Here's your insight:</h3>
              <p className="text-gray-700 whitespace-pre-wrap">{insight}</p>
            </div>
          )}
        </div>
      </div>

      {/* Helpline Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center p-4 z-50"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 relative"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
              <h3 className="text-xl font-bold text-sky-900 mb-4">Emergency Helplines</h3>
              <p className="text-sm text-slate-600 mb-6">If you are in a crisis or any other person may be in danger, please don't use this app. Get help from one of these resources immediately.</p>
              
              <div className="space-y-4">
                {helplines.map((line) => (
                  <div key={line.name} className="border-b border-sky-100 pb-3">
                    <p className="font-semibold text-slate-800">{line.name}</p>
                    <p className="text-slate-600">{line.description}</p>
                    <div className="mt-2 flex items-center gap-4">
                      <a href={`tel:${line.number}`} className="text-sky-600 font-bold text-lg">{line.number}</a>
                      <a href={line.website} target="_blank" rel="noopener noreferrer" className="text-sky-600 text-sm hover:underline">Visit Website</a>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatedPage>
  );
}

export default Insights;