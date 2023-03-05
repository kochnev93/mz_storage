import React from "react";

const style = {
    paddingTop: '10px',
    fontSize: '11px',
    color: 'red',      
}

export const FormItemError = ({status, message}) => {
  return !status && <div style={style}>{message}</div>
};
