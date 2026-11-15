import Logo from './Logo.jsx';
import { IconMoon } from './icons.jsx';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <Logo />
      {/* Поки що кнопка нічого не робить — тему підключимо на кроці 8 */}
      <button type="button" className="theme-toggle" aria-label="Switch to dark theme">
        <IconMoon />
      </button>
    </header>
  );
}

export default Header;
