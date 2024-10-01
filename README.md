# API для социальной сети MySocial

Используемые технологии:

1. NodeJS
2. ExpressJS
3. ORM Sequelize
4. MySQL

## Запуск проекта

1. Склонировать проект по ссылке https://github.com/antgrakhov/mysocial.git
2. Установить зависимости в корне проекта командой `npm install` или `yarn`
3. Создать файл `.env` из примера `.env.default`, а также файл `config/config.json` из примера, прописав в них данные для подключения к базе
4. Создать базу данных под названием `mysocial` (или любым другим) в среде *MySQL/MariaDb*, а затем с помощью миграции создать таблицы, выполнив в корне проекта `npx sequelize-cli db:migrate`, а затем залив тестовые данные из файла `seeders/data.json` выполнив в корне проекта `npx sequelize-cli db:seed:all`
5. Запустить проект из корня командой `yarn start`, открыть в браузере адрес http://127.0.0.1:3000