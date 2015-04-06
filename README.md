# todo-server
docker buildfile and nodejs code for todo app server, to be called by the separate todo-web

This is intended to be downloaded and run by https://github.com/roundand/todo-root

Config
------

You no longer need to have an external MongoDB server available. The parent project now spins up a standard mongo image, and this is reference by the connection string to app/config.dev.js. This connection string can be customised for other configurations, as outlined in app/config.js
