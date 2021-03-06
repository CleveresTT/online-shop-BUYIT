# Информация о проекте

### Это исходный код клиентской части моего интернет-магазина, которая реализована с использованием следующего стека технологий:

- #### `1` - React

Этот фреймворк является основой приложения.

- #### `2` - MobX

Необходим для стейт-менеджмента, без которого разработа была бы намного труднее. 

- #### `3` - React Router

Эта библиотека обеспечивает роутинг по страницам интернет-магазина. Есть главная страница, страница авторизации и регистрации, страницы девайсов, страница администрации. Кроме этого, предоставляет доступ к хукам `useLocation`, `useHistory` и `useParams`, необходимые для взаимодейсвтия с сервером и браузером.

- #### `4` - React BootStrap

Для того, чтобы не тратить много сил на стилизацию, я решил использовать готовые стилизованные компоненты из `React BootStrap`. Используемых компонент слишком много, чтобы их перечислять.

- #### `4` - Axios

Эта библиотека обеспечивает простую отправку запросов по URL-адресам. Учитывая, что адресов, по которым делаются запросы, достаточно много и они имеют разный уровень доступа в зависимости от роли пользователя, использование `Axios` очень целесообразно.

#

Реализованы хранилища стейтов; компоненты страниц и отдельных их частей(панели брендов, типов, таблицы девайсов и панель страниц); взаимодействие с сервером - функции для отправки запросов и обработка ответов.

#

В итоге в интернет магазине реализована регистрация и авторизация, навигация по магазину, вывод девайсов по брендам и типам, возможность поставить девайсам оценку, добавлять новые девайсы через страницу администрации.

Выполнение этого проекта сильно приблизило меня к понимаю того, как ведется разработка сложных комерческих проектов и пользу от проведеной работы трудно переоценить.
