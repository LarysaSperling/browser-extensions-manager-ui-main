import Logo from './Logo.jsx';
import { IconMoon, IconSun } from './icons.jsx';
import './Header.css';

function Header({ theme, onToggleTheme }) {
  const isDark = theme === 'dark';

  return (
    <header className="header">
      <Logo />
      {/* Іконка показує, КУДИ перемкнемо: у світлій темі — місяць, у темній — сонце.
          aria-label описує дію, тому теж змінюється разом із темою. */}
      <button
        type="button"
        className="theme-toggle"
        aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
        onClick={onToggleTheme}
      >
        {isDark ? <IconSun /> : <IconMoon />}
      </button>
    </header>
  );
}

export default Header;
