### Simple Calendar App
* After npm install, there is 1 external library which violated CSS import rule of NextJS, which needs to be altered manually for now.
* go to `node_modules` -> `react-date-picker` -> `dist` -> `entry.js`
* disable 2 lines of node require css: `require("react-calendar/dist/Calendar.css")` & `require("./DatePicker.css")`
* And then start!
---
# Features
* Weekday order change configuration
* Dynamic height of each row for each day box to contain up to 10 schedules
* Infinite vertical scrolling
* Detailed schedule list screen when single clicking each day box, with different layout for desktop & mobile
* Double clicking event + Single/Double click event on each schedule
* Drag & Select event on calendar day boxes
