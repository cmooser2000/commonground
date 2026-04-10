'use client'

import { CATEGORY_MAP } from '@/components/icons'

// ── Types ─────────────────────────────────────────────────────────────────────

type Props = {
  value: { category: string; iconKey: string } | null
  onChange: (value: { category: string; iconKey: string }) => void
}

// ── Category order ────────────────────────────────────────────────────────────

const CATEGORY_KEYS = [
  'tools',
  'garden',
  'camping',
  'kitchen',
  'moving',
  'kids',
  'skills',
  'emergency',
] as const

// ── Component ─────────────────────────────────────────────────────────────────

export default function IconPicker({ value, onChange }: Props) {
  const selectedCategory = value?.category ?? ''
  const selectedIconKey = value?.iconKey ?? ''

  const categoryEntry = selectedCategory ? CATEGORY_MAP[selectedCategory] : null

  function handleCategoryChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const cat = e.target.value
    if (!cat) return
    // If the previously selected icon belongs to the new category, keep it;
    // otherwise clear the icon selection so the user picks a fresh one.
    const isSameCategory = cat === selectedCategory
    if (isSameCategory && selectedIconKey) {
      onChange({ category: cat, iconKey: selectedIconKey })
    } else {
      // Auto-select nothing — force an explicit pick
      onChange({ category: cat, iconKey: '' })
    }
  }

  function handleIconClick(iconKey: string) {
    onChange({ category: selectedCategory, iconKey })
  }

  return (
    <div className="space-y-3">
      {/* Category dropdown */}
      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-charcoal text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent transition"
      >
        <option value="">Select a category…</option>
        {CATEGORY_KEYS.map((key) => (
          <option key={key} value={key}>
            {CATEGORY_MAP[key].label}
          </option>
        ))}
      </select>

      {/* Icon grid */}
      {categoryEntry ? (
        <div className="grid grid-cols-4 gap-3">
          {categoryEntry.icons.map((icon) => {
            const Icon = icon.component
            const isSelected = icon.key === selectedIconKey

            return (
              <button
                key={icon.key}
                type="button"
                onClick={() => handleIconClick(icon.key)}
                title={icon.label}
                className={[
                  'relative flex flex-col items-center gap-1.5 p-2 rounded-xl transition focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta',
                  isSelected
                    ? 'ring-[3px] ring-terracotta bg-terracotta/5'
                    : 'ring-1 ring-transparent hover:ring-gray-200 hover:bg-gray-50',
                ].join(' ')}
              >
                <Icon size={56} bgColor={categoryEntry.bgColor} />
                <span className="text-[10px] text-gray-500 leading-tight text-center line-clamp-2">
                  {icon.label}
                </span>
              </button>
            )
          })}
        </div>
      ) : (
        <div className="flex items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50 py-8 text-sm text-gray-400">
          Select a category to see icons
        </div>
      )}
    </div>
  )
}
