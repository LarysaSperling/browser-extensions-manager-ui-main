import './Switch.css';

// Тумблер на основі справжнього <input type="checkbox">.
// Браузер безкоштовно дає: фокус клавішею Tab, перемикання пробілом,
// стан checked для скрінрідера. role="switch" уточнює: це "вимикач" (on/off), а не галочка.
function Switch({ checked, onChange, label }) {
  return (
    <label className="switch">
      <input
        type="checkbox"
        role="switch"
        className="switch__input"
        checked={checked}
        onChange={onChange}
        aria-label={label}
      />
      {/* Видима частина тумблера — просто декорація, тому aria-hidden */}
      <span className="switch__track" aria-hidden="true" />
    </label>
  );
}

export default Switch;
