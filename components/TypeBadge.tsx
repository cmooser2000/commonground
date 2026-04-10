type PostType = 'lend' | 'give' | 'request' | 'skill';

type Props = {
  type: PostType;
  className?: string;
};

const typeConfig: Record<
  PostType,
  { label: string; bgClass: string; textClass: string }
> = {
  lend: {
    label: 'Lend',
    bgClass: 'bg-dusty-blue',
    textClass: 'text-white',
  },
  give: {
    label: 'Give',
    bgClass: 'bg-sage',
    textClass: 'text-white',
  },
  request: {
    label: 'Request',
    bgClass: 'bg-golden',
    textClass: 'text-charcoal',
  },
  skill: {
    label: 'Skill',
    bgClass: 'bg-terracotta',
    textClass: 'text-white',
  },
};

export default function TypeBadge({ type, className = '' }: Props) {
  const { label, bgClass, textClass } = typeConfig[type];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide ${bgClass} ${textClass} ${className}`}
    >
      {label}
    </span>
  );
}
