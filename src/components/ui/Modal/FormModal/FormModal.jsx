import React from "react";

// Styles
import styles from "./FormModal.module.scss";

export const FormModal = ({columns = 1, children}) => {
  let propStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${columns}, auto)`,
    gridColumnGap: '10px',
    gridRowGap: '20px',
    gridAutoRows: 'auto'
  };

  return (
    <form style={propStyle}>
      {children}
    </form>
  );
};
