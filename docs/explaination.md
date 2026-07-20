in project-overview.md we wrote in line-189 :-

"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}

explaination : 

1. "start": "node server.js"

What it does: This is the standard command used to run your application in production (or when you just want to run it normally).

How you use it: You type npm start in your terminal.

Why it's important: Most hosting services (like Heroku, Render, or AWS) automatically look for an npm start script to know how to launch your application.

2. "dev": "nodemon server.js"

What it does: This is a convenience shortcut for development.

How you use it: You type npm run dev in your terminal.

Why nodemon? When you use node server.js, the server does not restart when you change your code. You would have to manually stop the server (Ctrl+C) and start it again every time you make a change. nodemon watches your files; the moment you save a file, it automatically restarts the server for you. This saves you alot of time while coding.

---------------------------------------------------------

when we installed vite by running npm create vite@latest , it generated the following files :-

client/
│
├── node_modules/  
├── public/
├── src/
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md

    File/Folder             Purpose
| `src/`              | Where you'll write almost all of 
| `public/`           | Static files like images and icons.             |
| `node_modules/`     | Installed packages (don't edit this).           |
| `package.json`      | Lists your project's dependencies and scripts.  |
| `package-lock.json` | Locks dependency versions for consistency.      |
| `vite.config.js`    | Configuration for Vite.                         |
| `index.html`        | The single HTML page that loads your React app. |


