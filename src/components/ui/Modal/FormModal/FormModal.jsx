import React from "react";

// Styles
import formStyle from "./FormModal.module.scss";

export const FormModal = ({columns = 1, styles, children}) => {
  let propStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gridColumnGap: '10px',
    gridRowGap: '20px',
    gridAutoRows: 'auto',
    alignContent: 'space-between',
    ...styles,
  };

  return (
    <form className={formStyle.form} style={propStyle}>
      {children}
    </form>
  );
};
