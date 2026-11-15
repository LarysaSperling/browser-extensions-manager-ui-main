import Switch from './Switch.jsx';
import './ExtensionCard.css';

// Компонент нічого не знає про data.json: він отримує все потрібне через props.
// Тому його легко перевикористати для будь-якого розширення.
// Стан тут НЕ зберігається: картка лише показує isActive і повідомляє "мене перемкнули" через onToggle.
function ExtensionCard({ logo, name, description, isActive, onToggle, onRemove }) {
  return (
    <article className="card">
      <div className="card__info">
        {/* alt="" — логотип декоративний, назва вже є в заголовку поруч */}
        <img className="card__logo" src={logo} alt="" width="60" height="60" />
        <div>
          <h2 className="card__name">{name}</h2>
          <p className="card__description">{description}</p>
        </div>
      </div>

      <div className="card__actions">
        {/* Видимий текст — "Remove", але скрінрідер почує "Remove DevLens":
            інакше 12 однакових кнопок "Remove" не розрізнити.
            aria-label починається з видимого тексту — так голосове керування
            ("натисни Remove") теж знайде кнопку. */}
        <button
          type="button"
          className="card__remove"
          aria-label={`Remove ${name}`}
          onClick={onRemove}
        >
          Remove
        </button>
        <Switch checked={isActive} onChange={onToggle} label={name} />
      </div>
    </article>
  );
}

export default ExtensionCard;
