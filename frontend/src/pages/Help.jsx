import React, { useEffect, useState } from 'react';
import { getHelp } from '../api';

function Help() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const fetchHelp = async () => {
      try {
        const data = await getHelp();
        setFaqs(data);
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHelp();
  }, []);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Help & FAQs</h1>

      {loading ? (
        <p className="text-gray-500">Loading FAQs...</p>
      ) : faqs.length === 0 ? (
        <p className="text-gray-600 italic">No FAQs available at the moment.</p>
      ) : (
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white cursor-pointer transition hover:shadow-md"
              onClick={() => toggleFAQ(index)}
            >
              <h2 className="font-medium text-lg text-green-700 flex justify-between items-center">
                {faq.question}
                <span className="text-gray-400 ml-4">{openIndex === index ? '-' : '+'}</span>
              </h2>
              {openIndex === index && (
                <p className="text-gray-700 mt-2 leading-relaxed">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Help;