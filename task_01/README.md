# task_01

## Основные команды

**build** - сборка
**build:watch** - сборка и отслеживание собранных изменений для фронтендов на SystemJs [Подробнее](https://github.com/dodopizza/create-micro-frontend-app/tree/master/packages/vite-app-plugin#%D1%87%D1%82%D0%BE-%D0%B4%D0%B5%D0%BB%D0%B0%D1%82%D1%8C-%D0%B5%D1%81%D0%BB%D0%B8-%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D1%83%D0%B5%D1%82%D1%81%D1%8F-%D1%81%D1%82%D0%B0%D1%80%D1%8B%D0%B9-appshell-%D1%81-systemjs)
**serve** - запуск для разработки
**lint** - запуск линтера
**lint:fix** - запуск автофикса для линтера
**test** - запуск тестов

## Структура проекта

~~~
task_01
├── .vscode // Настройки для VSCode
├── .yarn // Кеш и инстанс Yarn
├── src
├    ├── app
├    ├    ├── App.spec.tsx // Пример теста для компонента
├    ├    ├── App.tsx // Основной компонент
├    ├    ├── index.html // Точка входа для dev-server
├    ├    ├── index.tsx // Точка входа для dev-server
├    ├    └── singleSpa.tsx // Точка входа для production
├    └── shared
├         ├── lib
├         ├    └──logger
├         ├        └── logger.ts // Конфигурация логгера
├         └── types
├              └── global.d.ts // Глобальные типы
├── eslint.config.js // Конфигурация ESLint
├── .gitignore
├── .pnp.cjs // Файл с картой зависимостей для PnP
├── .pnp.loader.mjs // Файл с картой зависимостей для PnP в формате ESM
├── .yarnrc.yml // Конфигурация Yarn
├── package.json
├── README.md
├── tsconfig.json // Конфигурация TypeScript
├── vite.config.ts // Конфигурация Vite
├── vitest.config.ts // Конфигурация Vitest
└── yarn.lock
~~~

## Разработка на стенде

Разработка ведется с использованием import-map-overrides на нужном стенде.
Включается с помощью **localStorage.setItem('devtools', true).**
Оверрайд для стенда https://localhost:3000/singleSpa.tsx

### Подробнее про работу скриптов для сборки и разработки

Расширенные возможности и переопределение дефолтного поведения [Readme](https://github.com/dodopizza/create-micro-frontend-app/tree/master/packages/vite-app-plugin)

### Архитектура

Проект подготовлен для работы по feature-sliced архитектуре. Подробнее в [документации](https://feature-sliced.github.io/documentation/)
