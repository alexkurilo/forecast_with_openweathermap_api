import React, { Component } from 'react';
import {connect} from 'react-redux';

const InputCountryComponent = ({}) => {


    return(
        <div>
            InputCountryComponent
            <input/>
        </div>
    );
};


export default connect(
    (state ) => ({

    }),

    dispatch => ({

    })
)(InputCountryComponent);