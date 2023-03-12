import React from "react";

const style = {
    paddingTop: '10px',
    fontSize: '11px',
    color: 'var(--error-color)',  
    transition: 'all 0.3s ease'    
}

export const FormItemError = ({status, message}) => {
  return !status && <div style={style}>{message}</div>
};
