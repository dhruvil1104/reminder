import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState('')
  const navigate = useNavigate()

  const handleClick = () => {
    if (selectedCategory === 'INSURANCE') {
      navigate('/InsuranceForm')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#F2EFE7] to-[#9ACBD0]">
      <div className="flex items-center space-x-4 p-6 bg-[#F2EFE7]/90 border border-[#48A6A7] rounded-xl shadow-2xl">
        
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#48A6A7] focus:border-[#48A6A7] outline-none transition-all duration-300"
        >
          <option value="" disabled>
            Select Category
          </option>
          <option value="MNC">MNC</option>
          <option value="INSURANCE">INSURANCE</option>
        </select>

        <button
          onClick={handleClick}
          className="px-6 py-3 bg-[#006A71] text-white font-semibold rounded-lg hover:bg-[#04848A] focus:ring-2 focus:ring-[#48A6A7] focus:ring-offset-2 transition-all duration-300"
        >
          OK
        </button>
      </div>
    </div>
  )
}

export default Categories
