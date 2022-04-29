// import React, { useState, useEffect, memo } from "react";
// import { Button, Modal } from "semantic-ui-react";

// export const countyMapChartView = (countyName) => {
//   let copyData2020 = jsonParseStringify(this.state.data_2020),
//     copyData2021 = jsonParseStringify(this.state.data_2021);

//   if (this.state.showUsaMap) {
//     if (JSON.stringify(this.state.showUsaMapDataObject) === "{}") {
//     } else {
//       copyData2020 = jsonParseStringify(
//         this.state.showUsaMapDataObject["requestData2020"]
//       );
//       copyData2021 = jsonParseStringify(
//         this.state.showUsaMapDataObject["requestData2021"]
//       );
//     }
//   }

//   let nameList = nameToObjectList(countyName),
//     dropDownValue = dropDownOptionValueTo[this.state.selectYearInModal],
//     dropDownQuarter = this.state.selectQuarterInModal;
//   let dataList = returnYearQuarterInMapChart(
//     copyData2020,
//     copyData2021,
//     dropDownValue,
//     dropDownQuarter
//   );
//   // console.log(dataList)

//   return (
//     <div>
//       <Menu compact style={{ position: "absolute", right: "150px" }}>
//         <Dropdown
//           value={this.state.selectYearInModal}
//           options={dropDownSearchOption}
//           onChange={(event, { value }) => {
//             this.setState({ selectYearInModal: value });
//           }}
//           simple
//           item
//         />
//       </Menu>
//       <Menu compact style={{ position: "absolute", right: "10px" }}>
//         <Dropdown
//           value={this.state.selectQuarterInModal}
//           options={[
//             { text: "Winter", value: "Winter" },
//             { text: "Spring", value: "Spring" },
//             { text: "Summer", value: "Summer" },
//             { text: "Fall", value: "Fall" },
//             { text: "Whole Year", value: "Whole Year" },
//           ]}
//           onChange={(event, { value }) => {
//             this.setState({ selectQuarterInModal: value });
//           }}
//           simple
//           item
//         />
//       </Menu>
//       {searchBarAllInOneFunction(
//         dataList[0],
//         dataList[1],
//         nameList,
//         dropDownValue
//       )}
//     </div>
//   );
// };

// export default MapCountyModal;
