import React, { Component } from "react";
import "../../examples-app.scss.css";

import axios from "axios";
import {
  abbrState,
  countyNameListToSearchBarOption,
  dropDownOptionValueTo,
  dropDownSearchOption,
  isEmpty,
  jsonParseStringify,
  multipleStyle,
  nameToObjectList,
  objectKeyArray,
  pureList,
  returnOption,
  returnYearQuarterInMapChart,
  searchBarAllInOneFunction,
  searchBarManyChartsFunction,
  stateCountiesData,
} from "../../utils/countyViewUtil";
import {
  Dimmer,
  Loader,
  Image,
  Segment,
  Menu,
  Dropdown,
  Header,
  Button,
  Form,
} from "semantic-ui-react";
import Multiselect from "multiselect-react-dropdown";
import CountyMapView from "../../components/CountyMapView";
import MapCountyModal from "../../components/MapCountyModal/MapCountyModal";
import DisplayButton from "../../components/DisplayButton/DisplayButton";
import SimulateOption from "../../components/SimulateOption/SimulateOption";

import { backendTo } from "../../utils/backendUtils";
import { USACounties } from "../../usaCounties/usaCounties";
import { texasCounties } from "../../usaCounties/texasCounties";
import { generateSVGMap, parseCountyList } from "../../utils/usCountiesUtils";
const usaCounties = USACounties();
const texasMap = texasCounties();
export function getLocationName(event) {
  return event.target.attributes.name.value;
}

export default class CountyView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,

      countyList: [],
      mapToCountyList: {},
      data_2021: Array(12)
        .fill(0)
        .map((row) => new Array(31).fill({})),
      data_2020: Array(12)
        .fill(0)
        .map((row) => new Array(31).fill({})),

      data_2021AllCounties: Array(12)
        .fill(0)
        .map((row) => new Array(31).fill({})),
      data_2020AllCounties: Array(12)
        .fill(0)
        .map((row) => new Array(31).fill({})),

      dataObject: {},

      selectedValue: [],
      selectedCountyList: [],
      selectText: "",
      selectYearInSearch: 0,
      selectYearInModal: 0,
      selectQuarterInModal: "Whole Year",
      chartButton: "",
      mapButton: "blue",
      oneChartButton: "",
      manyChartsButton: "",
      simulateButton: "",
      shiftDays: 0,
      movingAverageDays: 0,
      medianFiltersDays: 0,
      selectedStateInMapView: "TX",
      selectedObjectInMapView: texasMap,
      countyMapModalOpen: false,
      selectCountyName: "",
      errorMessageOpen: false,
      selectedCountyState: "",
      showUsaMap: false,
      showUsaMapDataObject: {},

      stateCountyDataMap: {},
    };
    //onSelect
    this.onSelect = this.onSelect.bind(this);
    //onRemove
    this.onRemove = this.onRemove.bind(this);
    this.handleLocationMouseOver = this.handleLocationMouseOver.bind(this);
    this.handleLocationMouseOut = this.handleLocationMouseOut.bind(this);
    this.handleLocationMouseMove = this.handleLocationMouseMove.bind(this);
    this.handleOnLocationClick = this.handleOnLocationClick.bind(this);
  }

  handleLocationMouseOver(event) {
    const pointedLocation = getLocationName(event);
    this.setState({ pointedLocation });
  }

  handleLocationMouseOut() {
    this.setState({
      pointedLocation: null,
      tooltipStyle: { display: "block" },
    });
  }

  handleLocationMouseMove(event) {
    const tooltipStyle = {
      display: "block",
      top: event.clientY + 10,
      left: event.clientX - 100,
    };
    this.setState({ tooltipStyle });
  }

  setCountyMapModal = (open) => {
    this.setState({ countyMapModalOpen: open });
  };

  async handleOnLocationClick(event) {
    let county = this.state.pointedLocation.toString().split(",")[0];
    let state = abbrState(
      this.state.pointedLocation.toString().split(",")[1].replace(/\s+/g, ""),
      "name"
    );

    let found_county = false;
    let dataObject = this.state.dataObject;
    let countyList = this.state.mapToCountyList[state];

    if (this.state.showUsaMap) {
      if (this.state.selectedStateInMapView === abbrState(state, "abbr")) {
        this.state.showUsaMapDataObject = jsonParseStringify(
          this.state.dataObject
        );
      } else {
        let object = await this.fetchDataByState(state);
        this.state.showUsaMapDataObject = jsonParseStringify(object);
      }
      found_county = true;
      this.setState({ showUsaMapDataObject: this.state.showUsaMapDataObject });
    } else {
      for (let i = 0; i < this.state.data_2020.length; i += 1) {
        for (let j = 0; j < this.state.data_2020[i].length; j += 1) {
          if (this.state.data_2020[i][j][county]) {
            found_county = true;
            break;
          }
        }
      }

      if (dataObject[state]) {
        found_county = true;
      }

      if (this.state.dataObject[state]) {
        console.log(this.state.dataObject[state]);
      }

      if (found_county) {
        console.log("find");
      } else {
        console.log("not find");
      }
    }

    this.setState({
      countyMapModalOpen: true,
      selectCountyName: this.state.pointedLocation.toString(),
      errorMessageOpen: !found_county,
    });
    // console.log(this.state.pointedLocation);
  }

  getLocationClassName = (location, index) => {
    // Generate random heat map
    // console.log(location.name)
    return `fillColorHeat${index % 4}`;
  };

  async componentDidMount() {
    await axios.get(backendTo("fetchAllData")).then((res) => {
      let responseData = res.data;
      console.log(responseData);
      this.state.data_2020 = responseData["data2020"];
      this.state.data_2021 = responseData["data2021"];
      for (let i = 0; i < this.state.data_2020.length; i += 1) {
        let currentValue = this.state.data_2020[i];
        for (let j = 0; j < currentValue.length; j += 1) {
          if (isEmpty(currentValue[j]) === false) {
            let countyList = Object.keys(currentValue[j]);
            if (countyList.length >= 1) {
              let index = countyList.indexOf("Date");
              if (index > -1) {
                countyList.splice(index, 1);
              }
              this.state.countyList = countyList;
              this.setState({ countyList: this.state.countyList });
              break;
            }
          }
        }
      }
      let dataObject = {};
      dataObject["data_2020"] = this.state.data_2020;
      dataObject["data_2021"] = this.state.data_2021;

      this.state.dataObject["Texas"] = jsonParseStringify(dataObject);
      this.state.loading = false;
      this.setState({ loading: false });

      this.setState({
        data_2020: this.state.data_2020,
        data_2021: this.state.data_2021,
        loading: this.state.loading,
        dataObject: this.state.dataObject,
      });
    });
  }

  async fetchDataByState(stateName) {
    this.setState({ loading: true });
    let returnObject = {};
    await axios.get(backendTo(`fetchStateData/${stateName}`)).then((res) => {
      let responseData = res.data;
      returnObject = responseData;
    });
    this.setState({ loading: false });
    return returnObject;
  }

  async fetchDataByStateCounty(stateName, countyName) {
    this.setState({ loading: true });
    let returnObject = {};
    await axios
      .get(backendTo(`fetchStateData/${stateName}+${countyName}`))
      .then((res) => {
        let responseData = res.data;
        returnObject = responseData;
      });
    this.setState({ loading: false });
    return returnObject;
  }

  onSelect(selectedList, selectedItem) {
    if (selectedList && selectedList.length >= 1) {
      this.setState({ selectText: "Backspace to remove " });
    } else {
      this.setState({ selectText: "Select..." });
    }
    this.setState({
      selectedCountyList: selectedList,
    });
  }

  onRemove(selectedList, removedItem) {
    if (selectedList && selectedList.length >= 1) {
      this.setState({ selectText: "Backspace to remove " });
    } else {
      this.setState({ selectText: "Select..." });
    }
    this.setState({
      selectedCountyList: selectedList,
    });
  }

  selectShiftDays = (e, { value }) => {
    this.setState({ shiftDays: value });
  };

  selecteStateInMapView = async (e, { value }) => {
    let object = generateSVGMap(value);
    let fullStateName = abbrState(value, "name");

    let dataObject = this.state.dataObject;
    let countyList = this.state.countyList;

    if (dataObject[fullStateName]) {
      //   console.log(dataObject[fullStateName]);
    } else {
      let returnObject = await this.fetchDataByState(fullStateName);
      let dataMap = {};
      dataMap["data_2020"] = returnObject.requestData2020;
      dataMap["data_2021"] = returnObject.requestData2021;
      dataObject[fullStateName] = dataMap;
      countyList = parseCountyList(dataMap["data_2021"]);
    }

    //await this.fetchDataByState(fullStateName);
    this.setState({
      selectedStateInMapView: value,
      selectedObjectInMapView: object,
      dataObject: dataObject,
      data_2020: dataObject[fullStateName]["data_2020"],
      data_2021: dataObject[fullStateName]["data_2021"],
      showUsaMap: false,
      countyList: countyList,
    });
  };

  selectMovingAverageDays = (e, { value }) => {
    this.setState({ movingAverageDays: value });
  };

  selectMedianFilterDays = (e, { value }) => {
    this.setState({ medianFiltersDays: value });
  };

  checkboxOnChange = (event, data) => {
    let defaultObjectView = texasMap;

    if (data.checked) {
      defaultObjectView = usaCounties;
    } else {
      defaultObjectView = generateSVGMap(this.state.selectedStateInMapView);
    }

    this.setState({
      selectedObjectInMapView: defaultObjectView,
      showUsaMap: data.checked,
    });
  };

  viewReturn() {
    if (this.state.oneChartButton === "blue") {
      return searchBarAllInOneFunction(
        jsonParseStringify(this.state.data_2020),
        jsonParseStringify(this.state.data_2021),
        jsonParseStringify(this.state.selectedCountyList),
        dropDownOptionValueTo[this.state.selectYearInSearch]
      );
    } else if (this.state.manyChartsButton === "blue") {
      return (
        <div>
          <SimulateOption
            state={this.state}
            selectShiftDays={this.selectShiftDays}
            selectMovingAverageDays={this.selectMovingAverageDays}
            selectMedianFilterDays={this.selectMedianFilterDays}
          />
          <Menu compact style={{ position: "absolute", right: "50px" }}>
            <Dropdown
              value={this.state.selectYearInSearch}
              options={dropDownSearchOption}
              onChange={(event, { value }) => {
                this.setState({ selectYearInSearch: value });
                // console.log(dropDownOptionValueTo[value]);
              }}
              simple
              item
            />
          </Menu>
          {searchBarManyChartsFunction(
            jsonParseStringify(this.state.data_2020),
            jsonParseStringify(this.state.data_2021),
            jsonParseStringify(this.state.selectedCountyList),
            dropDownOptionValueTo[this.state.selectYearInSearch],
            this.state.shiftDays,
            this.state.movingAverageDays,
            this.state.medianFiltersDays
          )}
        </div>
      );
    }
  }

  switchViewOnClick = (input) => {
    if (input === 1) {
      this.setState({
        oneChartButton: "blue",
        manyChartsButton: "",
        mapButton: "",
        chartButton: "",
      });
    } else if (input === 2) {
      this.setState({
        oneChartButton: "",
        manyChartsButton: "blue",
      });
    } else if (input === 3) {
      if (this.state.simulateButton === "blue") {
        this.setState({ simulateButton: "" });
      } else {
        this.setState({ simulateButton: "blue" });
      }
    } else if (input === -1) {
      this.setState({
        oneChartButton: "",
        manyChartsButton: "",
        mapButton: "blue",
        chartButton: "",
      });
    } else if (input === 0) {
      this.setState({
        oneChartButton: "blue",
        manyChartsButton: "",
        mapButton: "",
        chartButton: "",
      });
    }
  };

  countyMapChartView = (countyName) => {
    let copyData2020 = jsonParseStringify(this.state.data_2020),
      copyData2021 = jsonParseStringify(this.state.data_2021);

    if (this.state.showUsaMap) {
      if (JSON.stringify(this.state.showUsaMapDataObject) === "{}") {
      } else {
        copyData2020 = jsonParseStringify(
          this.state.showUsaMapDataObject["requestData2020"]
        );
        copyData2021 = jsonParseStringify(
          this.state.showUsaMapDataObject["requestData2021"]
        );
      }
    }

    let nameList = nameToObjectList(countyName),
      dropDownValue = dropDownOptionValueTo[this.state.selectYearInModal],
      dropDownQuarter = this.state.selectQuarterInModal;
    let dataList = returnYearQuarterInMapChart(
      copyData2020,
      copyData2021,
      dropDownValue,
      dropDownQuarter
    );
    // console.log(dataList)

    return (
      <div>
        <Menu compact style={{ position: "absolute", right: "150px" }}>
          <Dropdown
            value={this.state.selectYearInModal}
            options={dropDownSearchOption}
            onChange={(event, { value }) => {
              this.setState({ selectYearInModal: value });
            }}
            simple
            item
          />
        </Menu>
        <Menu compact style={{ position: "absolute", right: "10px" }}>
          <Dropdown
            value={this.state.selectQuarterInModal}
            options={[
              { text: "Winter", value: "Winter" },
              { text: "Spring", value: "Spring" },
              { text: "Summer", value: "Summer" },
              { text: "Fall", value: "Fall" },
              { text: "Whole Year", value: "Whole Year" },
            ]}
            onChange={(event, { value }) => {
              this.setState({ selectQuarterInModal: value });
            }}
            simple
            item
          />
        </Menu>
        {searchBarAllInOneFunction(
          dataList[0],
          dataList[1],
          nameList,
          dropDownValue
        )}
      </div>
    );
  };

  sectionDisplay() {
    //{ selectedStateInMapView, selecteStateInMapView, showUsaMap, onChange, mapControllers,tooltipStyle,pointedLocation }
    const mapControllers = {
      selectedObjectInMapView: this.state.selectedObjectInMapView,
      getLocationClassName: this.getLocationClassName,
      handleLocationMouseOver: this.handleLocationMouseOver,
      handleLocationMouseOut: this.handleLocationMouseOut,
      handleLocationMouseMove: this.handleLocationMouseMove,
      handleOnLocationClick: this.handleOnLocationClick,
    };

    if (this.state.chartButton === "blue" || this.state.mapButton === "blue") {
      return (
        <div>
          <CountyMapView
            selectedStateInMapView={this.state.selectedStateInMapView}
            selecteStateInMapView={this.selecteStateInMapView}
            showUsaMap={this.state.showUsaMap}
            onChange={this.checkboxOnChange}
            mapControllers={mapControllers}
            tooltipStyle={this.state.tooltipStyle}
            pointedLocation={this.state.pointedLocation}
          />

          <MapCountyModal
            setCountyMapModal={this.setCountyMapModal}
            state={this.state}
            countyMapChartView={this.countyMapChartView}
          />
        </div>
      );
    } else if (
      this.state.manyChartsButton === "blue" ||
      this.state.simulateButton === "blue" ||
      this.state.oneChartButton === "blue"
    ) {
      return (
        <div>
          <Multiselect
            options={countyNameListToSearchBarOption(this.state.countyList)} // Options to display in the dropdown
            selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
            onSelect={this.onSelect} // Function will trigger on select event
            onRemove={this.onRemove} // Function will trigger on remove event
            displayValue="name"
            showCheckbox={true}
            placeholder={this.state.selectText} // Property name to display in the dropdown options
            style={multipleStyle}
          />
          <Menu compact style={{ position: "absolute", right: "50px" }}>
            <Dropdown
              value={this.state.selectYearInSearch}
              options={dropDownSearchOption}
              onChange={(event, { value }) => {
                this.setState({ selectYearInSearch: value });
                // console.log(dropDownOptionValueTo[value]);
              }}
              simple
              item
            />
          </Menu>
          {this.viewReturn()}
        </div>
      );
    }
  }

  mainSearchView() {
    return (
      <div style={{ marginLeft: "50px", marginRight: "50px" }}>
        <br />
        <br />

        <Header as="h3" textAlign="center">
          {abbrState(this.state.selectedStateInMapView, "name") +
            " County View"}
        </Header>
        <Header as="h3" textAlign="center">
          <Button.Group basic>
            <DisplayButton
              state={this.state}
              switchViewOnClick={this.switchViewOnClick}
            />
          </Button.Group>
        </Header>

        <br />
        <br />

        {this.sectionDisplay()}
      </div>
    );
  }

  render() {
    if (this.state.loading) {
      return (
        <Segment>
          <Dimmer active inverted>
            <Loader size="large">Loading</Loader>
          </Dimmer>

          <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
          <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
          <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
          <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
          <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
          <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
        </Segment>
      );
    } else {
      return <div>{this.mainSearchView()}</div>;
    }
  }
}
