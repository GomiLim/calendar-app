### Simple Calendar App
* After npm install, there is 1 external library which violated CSS import rule of NextJS, which needs to be altered manually for now.
* go to `node_modules` -> `react-date-picker` -> `dist` -> `entry.js`
* disable 2 lines of node require css: `require("react-calendar/dist/Calendar.css")` & `require("./DatePicker.css")`
* And then start!
