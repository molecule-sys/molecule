## Установка

  ```
  $ cd path/to/dir && npm i
  ```

## Development
Для запуска интерфейса "Оператор мойки" `npm run operator`

Для запуска интерфейса "Менеджер организации" `npm run org-manager`

Для запуска интерфейса "Менеджер системы" `npm run sys-manager`

## Production
Положить на сервер содержимое `app/dist/operator/` (для "Оператор мойки")

Положить на сервер содержимое `app/dist/org-manager/` (для "Менеджер организации")

Положить на сервер содержимое `app/dist/sys-manager/` (для "Менеджер системы")

Так же необходимо настроить сервер, подробнее [тут](https://github.com/ReactTraining/react-router/blob/v2.0.0-rc5/docs/guides/basics/Histories.md#configuring-your-server)

## Линтеры
  
  ```
  npm i -g stylelint eslint@3.12.2 eslint-config-airbnb@13.0.0 eslint-plugin-import@2.2.0 eslint-plugin-jsx-a11y@2.2.3 eslint-plugin-react @6.8.0
  ```
