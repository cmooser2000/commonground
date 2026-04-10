'use client'

type NotificationPref = 'instant' | 'digest' | 'never'

type Props = {
  value: NotificationPref
  onChange: (value: NotificationPref) => void
}

const OPTIONS: {
  value: NotificationPref
  emoji: string
  title: string
  description: string
}[] = [
  {
    value: 'instant',
    emoji: '📬',
    title: 'Every new post',
    description:
      'Get an email each time someone posts. Recommended for small or quiet groups.',
  },
  {
    value: 'digest',
    emoji: '📰',
    title: 'Daily digest',
    description: 'One summary email per day. Good for busier communities.',
  },
  {
    value: 'never',
    emoji: '🔕',
    title: 'Never',
    description: "I'll check the app myself.",
  },
]

export default function NotificationPrefPicker({ value, onChange }: Props) {
  return (
    <div className="flex flex-col gap-3 w-full">
      {OPTIONS.map((option) => {
        const isSelected = value === option.value
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={[
              'w-full text-left rounded-xl px-4 py-4 transition-all cursor-pointer',
              isSelected
                ? 'border-2 border-terracotta bg-terracotta/5'
                : 'border border-gray-200 bg-white hover:border-gray-300',
            ].join(' ')}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl leading-none mt-0.5" aria-hidden="true">
                {option.emoji}
              </span>
              <div>
                <p className="font-semibold text-charcoal text-sm">
                  {option.title}
                </p>
                <p className="text-sm text-gray-500 mt-0.5">
                  {option.description}
                </p>
              </div>
            </div>
          </button>
        )
      })}
    </div>
  )
}
