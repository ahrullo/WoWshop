export function Footer() {
  return (
    <footer className="mt-16 border-t border-violet-100 bg-violet-50/50">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-zinc-600">
        <p className="font-semibold text-violet-900">WoWshop ✨</p>
        <p className="mt-1">Необычные и приятные мелочи для жизни: светильники, игрушки, аниме-товары и не только.</p>
        <p className="mt-4 text-xs text-zinc-400">© {new Date().getFullYear()} WoWshop. Демо-проект.</p>
      </div>
    </footer>
  );
}
