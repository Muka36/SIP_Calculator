import React, { useState } from 'react';

const Tabs = ({ active, setActive }) => {

  return (
    <div className="flex items-center gap-4">
      {/* SIP Tab */}
      <button
        className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${
            active === 'SIP'
            ? 'bg-blue-100 text-[#4c6ef5] border border-[#4c6ef5]'
            : 'bg-transparent text-gray-500 hover:text-gray-700'
        }`}
        onClick={() => setActive('SIP')}
      >
        SIP
      </button>

      {/* Lumpsum Tab */}
      <button
        className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${
          active === 'Lumpsum'
            ? 'bg-blue-100 text-[#4c6ef5] border border-[#4c6ef5]'
            : 'bg-transparent text-gray-500 hover:text-gray-700'
        }`}
        onClick={() => setActive('Lumpsum')}
      >
        Lumpsum
      </button>
    </div>
  );
};

export default Tabs;
