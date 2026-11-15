import './ExtensionCard.css';

// Компонент нічого не знає про data.json: він отримує все потрібне через props.
// Тому його легко перевикористати для будь-якого розширення.
function ExtensionCard({ logo, name, description }) {
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
        <button type="button" className="card__remove">
          Remove
        </button>
        {/* Тут буде тумблер (компонент Switch) — крок 4 */}
      </div>
    </article>
  );
}

export default ExtensionCard;
