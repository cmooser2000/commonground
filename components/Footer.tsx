const kofiUrl = process.env.NEXT_PUBLIC_KOFI_URL || '#';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full py-6 px-4 text-center">
      <p className="text-xs text-charcoal opacity-50 leading-relaxed">
        CommonGround is free and community-supported. If it&apos;s been useful, you can{' '}
        <a
          href={kofiUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:opacity-80 transition-opacity"
        >
          buy me a coffee ☕
        </a>
      </p>
      <p className="text-xs text-charcoal opacity-35 mt-1">
        &copy; {year} CommonGround
      </p>
    </footer>
  );
}
