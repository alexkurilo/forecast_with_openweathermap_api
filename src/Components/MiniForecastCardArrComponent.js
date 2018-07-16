import React, { Component } from 'react';
import {connect} from 'react-redux';

import MiniCardComponent from "./MiniCardComponent";
import "./MiniForecastCardArrComponent.css";

let left = 0;
let top = 0;
let width = 0;
let bottom = 0;

class MiniForecastCardArr extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount (){
        left = this.refs.MiniForecastCardArr.getBoundingClientRect().left;
        top = this.refs.MiniForecastCardArr.getBoundingClientRect().top;
        width = this.refs.MiniForecastCardArr.getBoundingClientRect().width;
        bottom = this.refs.MiniForecastCardArr.getBoundingClientRect().bottom;
        if ((this.props.styleMiniCardArr.left !== left) || (this.props.styleMiniCardArr.top !== top) || (this.props.styleMiniCardArr.width !== width) || (this.props.styleMiniCardArr.bottom !== bottom)){
            this.props.onMiniForecastCardStyle(left, top, width, bottom);
        }
    }

    render() {
        return (
            <section    className="MiniForecastCardArr"
                        ref="MiniForecastCardArr"
            >
                {this.props.MiniForecastCardArr.map((item, index) =>
                    <MiniCardComponent  key={index}
                                        item={item}
                                        index={index}
                    />
                )}
            </section>
        );
    }
}

export default connect(
    (state) => ({
        forecastInfoDetail: state.forecastInfoDetail,
        countriesObj: state.countriesObj,
        selectedCities: state.selectedCities,
        forecastInfo: state.forecastInfo,
        page: state.page,
        indexFocusCard: state.indexFocusCard,
        styleMiniCardArr: state.styleMiniCardArr
    }),

    dispatch => ({
        onMiniForecastCardStyle: (left, top, width, bottom) => {
            const payload = {left, top, width, bottom};
            dispatch({type: "STYLE_MINI_CARD_ARR", payload})
        }
    })
)(MiniForecastCardArr);