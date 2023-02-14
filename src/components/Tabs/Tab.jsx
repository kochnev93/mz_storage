import React from "react";
import PropTypes from 'prop-types';


export const Tab = (props) => {

    return (
    <>
        {props.children}
    </>
    );
}

Tab.propTypes = {
    label: PropTypes.string.isRequired,
    children: PropTypes.node
};

Tab.defaultProps = {
    children: null
}