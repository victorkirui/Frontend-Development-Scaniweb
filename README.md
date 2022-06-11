### How to run

To run this project follow these steps

1. Clone it
2. Install dependencies
3. Add these scripts on your backend's endpoints package.json file

"scripts": {
"build": "tsc",
"start": "node dist/main.js",
"client": "npm start --prefix client",
"dev": "concurrently \"tsc -w\" \"nodemon dist/main.js\"",
"development": "concurrently \"tsc -w\" \"nodemon dist/main.js\" \"npm run client\""
}

4. From root run - `npm run development`
