# Green Building — редизайн greenbuilding.uz

Статичный одностраничный сайт по макету (hero → решения → проекты → почему мы + квиз → услуги → поколения теплиц → CTA → футер).
Без сборки: `index.html` + `assets/css/style.css` + `assets/js/main.js` (чистый JS, ES2017).

## Запуск локально
```bash
python3 -m http.server 8765
```
Открыть http://localhost:8765

## Что внутри
- **3 языка RU / UZ / EN** — RU записан прямо в разметке, UZ/EN в словаре `I18N` в `main.js` (ключи `data-i18n`). Выбор языка запоминается, можно открыть `?lang=uz`.
- **Формы** (квиз и «Оставить заявку») отправляются `fetch`-ом в `telegram.php` — тот же обработчик, что на текущем сайте.
  Поля: `name`, `tel` (как раньше) + новые `who`, `task`, `area`, `stage`, `message`, `form` (quiz / callback), `lang`.
  Текущий `telegram.php`, скорее всего, читает только `name` и `tel` — чтобы новые поля попадали в Telegram, их нужно добавить в обработчик.
- **Поколения теплиц** — интерактивная шкала 01→05: при первом показе сама проходит до 5-го поколения, дальше переключается кликом или стрелками. Схемы теплиц — собственные изометрические SVG, генерируются скриптом `tools/gen_iso.py` (`python3 tools/gen_iso.py --inline` обновляет их в `index.html`).
- **Галерея проектов** — лайтбокс на 31 реальное фото (стрелки, свайп, Esc).
- Адаптив: 1440 / 1024 / 760 / 375, бургер-меню, анимации появления (отключаются при `prefers-reduced-motion`).

## Изображения
- `assets/img/projects/*`, `assets/img/gen/*` — фото и рендеры с текущего greenbuilding.uz (собственные материалы компании).
- `assets/img/stock/*` — CC0 (без обязательной атрибуции):
  - `hero.webp` — WordPress Photo Directory (pd.w.org), «Inside a large greenhouse, rows of strawberry plants»
  - `rows.webp`, `cucumbers.webp` — WordPress Photo Directory
  - `tomatoes.webp` — Wikimedia Commons, «Tomatoes on the Vine (Unsplash)», CC0
  - `analytics.webp` — StockSnap.io, CC0
  Лучше заменить hero и карточки на собственные фото объектов компании, когда будут.

## Что уточнить у заказчика
- Логотип: стоит оригинальный логотип с greenbuilding.uz (`assets/img/logo.svg`, сжат svgo), фавиконка — значок теплицы из него. Логотип жёлто-оранжевый, сайт по макету зелёный — стоит обсудить, нужна ли зелёная версия логотипа.
- Цифры в блоке «Проекты» взяты с текущего сайта (1–5 поколений, 5+ стран, 360°). Если есть реальные «N проектов / N лет», их стоит поставить, как в макете.
- Соцсети: на старом сайте реальная ссылка только на Telegram (`t.me/greenbuilding`), Instagram/Facebook были заглушками.
