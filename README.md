Чтобы это всё заработало вам нужна node.js. Проверить есть ли она у вас можно командой `node -v` в терминале. Если нет, то скачейте и установите по <a href="https://nodejs.org/en/download/">ссылке</a>

А если есть, то вот несоколько простых шагов.
1. Скачайте, клонируйте или форкните репозитарий. В терминале внутри этого репозитария пропишите `npm install` и дождитесь пока всё установится.
2. В папке `/contracts` можете написать сколько угодно конрактов, в стокльки угодно файлах. Главное чтобы все эти файлы имели расширение `.sol`.
3. Для деплоя на локалку перейдите в файл `scripts/deploy.js` в шапке есть подробная инструкция.
4. Для деплоя на реальную сеть создайте в корне файл `.env` где надо указать название сети (NETWORK), url из <a href="https://infura.io/">инфуры</a> (INFURA_URL) и приватный ключ кошелька (PRIVATE_KEY), который будет за этот деплой платить. 
5. После запуска скрипта, все необходимые для подключения файлы буду в папке `/client/contracts`. Фронтенд работает на <a href="https://nextjs.org/">next.js</a>, так же к нему сразу подкючен <a href="https://tailwindcss.com/">tailwind</a>. Весь фронт лежит в папке `/client`, чтобы он заработал надо находясь в терминале прописать сначала `npm install`, а потом `npx next dev`.

Приятной разработки)

