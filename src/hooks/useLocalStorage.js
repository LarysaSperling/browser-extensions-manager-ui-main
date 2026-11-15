import { useEffect, useState } from 'react';

// Власний хук = звичайна функція, назва якої починається з "use" і яка всередині використовує інші хуки.
// Працює як useState, але значення переживає перезавантаження сторінки.
//
// Використання (так само, як useState):
//   const [extensions, setExtensions] = useLocalStorage('key', initialValue);
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    // localStorage може бути недоступний (приватний режим, заблоковані cookies)
    // або містити зіпсований JSON — тоді тихо повертаємо початкове значення.
    try {
      const stored = window.localStorage.getItem(key);
      if (stored !== null) return JSON.parse(stored);
    } catch {
      // ігноруємо: нижче повернемо initialValue
    }
    return typeof initialValue === 'function' ? initialValue() : initialValue;
  });

  // Після кожної зміни значення — записуємо його в localStorage.
  // localStorage зберігає лише рядки, тому перетворюємо значення на JSON.
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // сховище переповнене або недоступне — сайт однаково працює, просто без збереження
    }
  }, [key, value]);

  return [value, setValue];
}
