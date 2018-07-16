import React, { Component } from 'react';
import {connect} from 'react-redux';

import MiniSimpleCardComponent from "./MiniSimpleCardComponent";
import MiniDetailCardComponent from "./MiniDetailCardComponent";

const SomeChildComponent = ({index, item, indexFocusCard, onFocusCard}) => {
    const MouseEnter = (event, index) => {
        event.preventDefault();
        //console.log(index);
        onFocusCard(index);

    };

    const MouseLeave = (event, index) => {
        event.preventDefault();
        //console.log(index);
        onFocusCard(-1);
    };

    return(
        <div    className={'MiniCardComponent'}
                onMouseEnter={(event) => {MouseEnter(event, index)}}
                onMouseLeave={(event) => {MouseLeave(event, index)}}
        >
            <MiniSimpleCardComponent    className={"Hidden"}
                                        index={index}
                                        item={item}
            />
            <MiniDetailCardComponent    index={index}
                                        minInform={item}
            />
        </div>
    );
};


export default connect(
    (state ) => ({
        indexFocusCard: state.indexFocusCard,
    }),

    dispatch => ({
        onFocusCard: ( pageMiniCard) => {
            const payload = pageMiniCard;
            dispatch({type: "FOCUS_CARD", payload})
        }
    })
)(SomeChildComponent);