import React from "react";

export const FormItemModal = ({children, visible, style}) => {
  const styles = {
    ...style,
    //transition: 'all .3s ease .3s',
    //visibility: !visible ? 'visible' : 'hidden'
  }
  return <div style={styles}>{children}</div>;
};
