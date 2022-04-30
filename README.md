## Basic Information
This is the frontend code of the Rice COMP590 Hope-Simpson Project Map part

The project can display the number of confirmed epidemics and trends in each state (or even each county) in the United States in 2020 and 2021 in a map or table mode.


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

## Code function brief

**index.js** is the entry file of the project
The main page address is `src/page/CountyView/countyView.js`
The main page is divided into several modules, which are stored in the `src/component folder`

- DisplayButton is the button menu structure of the header, responsible for switching between different display modes
- The files in countyMapView form a map schema that displays confirmed diagnoses data within a state by selecting a state
- MapCountyModal is the pop-up structure of the diagnosis chart in the county displayed after clicking on the map
- SimulateOption is a menu bar for analyzing chart information in chart view mode
- loadingWidgets is the state displayed by the front-end while waiting for the back-end result data to return
