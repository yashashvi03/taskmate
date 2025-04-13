"use client"

const categories = [
  { value: "all", label: "All Categories" },
  { value: "Work", label: "💼 Work" },
  { value: "Personal", label: "👤 Personal" },
  { value: "Health", label: "🏥 Health" },
  { value: "Education", label: "🎓 Education" },
  { value: "Shopping", label: "🛒 Shopping" },
  { value: "Finance", label: "💰 Finance" },
  { value: "Other", label: "📌 Other" },
]

function CategoryFilter({ categoryFilter, setCategoryFilter }) {
  return (
    <div className="w-full md:w-48">
      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg transition-colors"
      >
        {categories.map((category) => (
          <option key={category.value} value={category.value}>
            {category.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default CategoryFilter
