## Basic Information

This is the refactored frontend code of the Rice COMP590 Hope-Simpson Project Map part

The project can display the number of confirmed epidemics and trends in each state (or even each county) in the United States in 2020 and 2021 in a map or table mode.

## Project Introduction

The frontend application UI consists of two main parts, map view and chart view of Texas COVID-19 data, users can switch the view by toggling buttons at the top of the page. A Texas map is the default view of the webapp where users can hover the mouse around it to see each county name. Once a user clicks on a county, a chart will show up with the past COVID-19 data displayed. There are two filters, year and quarter, for users to customize for their intended view of data. There is another "Chart View" button on the home page. Once clicked, can take users to a more customizable and detailed view of data. Users can select the county through a search bar. Once users have selected the county, they can get a customized chart of the numbers of shift days, the number of moving average days and the median filters days of their choice.

## Refactor Function and Components

Originally, all the functionalities are located inside one main component. The monolithic structure makes the application hard to scale and debug. We have managed to break down the structure and turns many parts into smaller and reusable components. It helps future developers to build on top of the current frontend codebase.

## Demo and Graphics

![Alt text](./screenshots/CountyView.png?raw=true)
![Alt text](./screenshots/ChartView.png?raw=true)
![Alt text](./screenshots/ChartView2.png?raw=true)
![Alt text](./screenshots/MultiChartView.png?raw=true)
![Alt text](./screenshots/SplitChartView.png?raw=true)

## How to start the Project

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### `npm install`

This directive helps you to Install all the dependencies this project required in the local node_modules folder and generate a package-lock.json file based on the contents of the package.json file.\
Note that changes to the package-lock.json file should not be uploaded.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Project directory structure

```
.
├── App.css
├── App.js
├── App.test.js
├── components
│   ├── DisplayButton
│   │   ├── DisplayButton.js
│   │   └── index.js
│   ├── MapChart
│   │   └── countyMapView.js
│   ├── MapCountyModal
│   │   ├── MapCountyModal.js
│   │   └── index.js
│   ├── SimulateOption
│   │   ├── SimulateOption.js
│   │   └── index.js
│   ├── countyMapView
│   │   ├── CountyMapView.js
│   │   └── index.js
│   ├── csvToChart
│   │   ├── csvToChart.js
│   │   ├── csvToChartCSS
│   │   ├── csvToChartWidgets.js
│   │   ├── csvUtil.js
│   │   └── data.js
│   ├── csvWeb
│   │   ├── constValuesUtils.js
│   │   └── csvWeb.js
│   └── loadingWidgets
│       └── loadingWidgets.js
├── examples-app.scss.css
├── index.css
├── index.js
├── logo.svg
├── page
│   └── CountyView
│       └── countyView.js
├── reportWebVitals.js
├── setupTests.js
├── usaCounties
│   ├── texasCounties.js
│   └── usaCounties.js
└── utils
    ├── backendUtils.js
    ├── countyViewUtil.js
    └── usCountiesUtils.js

14 directories, 31 files
```

## Code function brief

**index.js** is the entry file of the project
The main page address is `src/page/CountyView/countyView.js`
The main page is divided into several modules, which are stored in the `src/component` folder

### Components

- `DisplayButton` is the button menu structure of the header, responsible for switching between different display modes
- `CountyMapView` form a map schema that displays confirmed diagnoses data within a state by selecting a state
- `MapCountyModal` is the pop-up structure of the diagnosis chart in the county displayed after clicking on the map
- `SimulateOption` is a menu bar for analyzing chart information in chart view mode
- `loadingWidgets` is the state displayed by the front-end while waiting for the back-end result data to return

### Pages

- `CountyView` is the main page for this application, it manages the states for all the components and state manipulation functions.

### utils

- `backendUtils` provides a function that appends a user provided string to the current backend URL.
- `countyViewutils` provides several helper functions for map display and data manipulation
- `usCountiesutils` provides several helper functions for data parsing and manipulation

### usaCounties

- `texasCounties` provides a complete list of counties in Texas, their names, ids and locations
- `texasCounties` provides a complete list of counties in USA, their names, ids and locations

## Technologies used

- ReactJS
- axios
- semantic-ui-react
