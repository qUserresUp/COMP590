
import React, { useState, useEffect, memo } from "react";
import {
    Dropdown,
    Form,
    Checkbox
} from 'semantic-ui-react'
import {
    dropDownStateFullNameList,
    generateSVGMap,
    parseCountyList,
    returnFullNameList
} from "../../utils/usCountiesUtils";
import { SVGMap } from 'react-svg-map';

import { USACounties } from "../../usaCounties/usaCounties";
import { texasCounties } from "../../usaCounties/texasCounties";
const usaCounties = USACounties();
const texasMap = texasCounties();

export const CountyMapView = ({
    selectedStateInMapView,
    selecteStateInMapView,
    showUsaMap,
    onChange,
    mapControllers,
    tooltipStyle,
    pointedLocation }) => {

    return (
        <div>
            <Form.Group widths='equal' style={{ display: 'flex', alignItems: 'center' }}>
                {/* Select the state you want to display from the drop-down box，support search state name */}
                <Form.Field
                    control={Dropdown}
                    search selection
                    value={selectedStateInMapView}
                    options={dropDownStateFullNameList()}
                    onChange={selecteStateInMapView}
                />
                {/* Directly show a map of the entire USA */}
                <Checkbox label='Show USA Map' value={showUsaMap} onChange={onChange} style={{ marginLeft: 8 }} />

            </Form.Group>

            <div className="CountyMap">
                <SVGMap
                    map={mapControllers.selectedObjectInMapView}
                    locationClassName={mapControllers.getLocationClassName}
                    onLocationMouseOver={mapControllers.handleLocationMouseOver}
                    onLocationMouseOut={mapControllers.handleLocationMouseOut}
                    onLocationMouseMove={mapControllers.handleLocationMouseMove}
                    onLocationClick={mapControllers.handleOnLocationClick}
                />
            </div>
            <div className="examples" style={tooltipStyle}>
                {pointedLocation}
            </div>
        </div>
    );
};

export default CountyMapView;