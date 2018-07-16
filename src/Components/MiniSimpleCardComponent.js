import React, { Component } from 'react';
import {connect} from 'react-redux';


import "./MiniCardComponent.css";

const MiniCardComponent = ({ index, item, styleMiniCardArr, indexFocusCard}) => {
    const MiniForecastCardStyle = (index) => {
        return {
            left: styleMiniCardArr.left+styleMiniCardArr.width*index/8,
            top: styleMiniCardArr.top,
            width: (styleMiniCardArr.width/8)-5
        }
    };

    const VisibleClassName = () =>{
          if (indexFocusCard === index){
              return "Hidden ";
          }else{
              return "Visible";
          }
    };

    return (
        <div    className={"MiniSimpleCardComponent " + item.DayOfNight + " " + VisibleClassName()}
                id={index}
                key = {index}
                style={MiniForecastCardStyle(index)}
        >
            <section className={"MiniSimpleCard"}>
                <section >
                    {item.time}
                </section>
                <section>
                    <img    className="iconWeather"
                            src={item.src}
                            alt={item.description}
                            title={item.description}
                    />
                </section>
                <section >
                    {item.temperature}&#176;C
                </section>
                <section >
                    {item.pressure}hPa
                </section>
                <section >
                    {item.humidity}%
                </section>
                <section className="BottomMiniCard">
                    {item.windSpeed}m\c
                </section>
            </section>
        </div>
    );

};

export default connect(
    (state) => ({
        styleMiniCardArr: state.styleMiniCardArr,
        indexFocusCard: state.indexFocusCard
    }),

    dispatch => ({


    })
)(MiniCardComponent);