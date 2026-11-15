// Одна кнопка — два місця використання (під списком і в порожньому стані),
// тому винесена в окремий компонент: текст, стилі й aria-label задані один раз.
function ResetButton({ onReset }) {
  return (
    <button
      type="button"
      className="btn-outline"
      // Починається з видимого тексту "Reset" (правило label in name, як у Remove)
      aria-label="Reset extensions to default"
      onClick={onReset}
    >
      Reset
    </button>
  );
}

export default ResetButton;
