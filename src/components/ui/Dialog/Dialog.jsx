import React, {useRef, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { setVisibleDialog } from "../../../features/dialog/dialogSlice";

import styles from "./Dialog.module.scss";

const Dialog = (props) => {
  const dispatch = useDispatch();
  const dialogRef = useRef();
  console.log(dialogRef)
  const { visible } = useSelector((state) => state.dialog);


  useEffect(()=>{
    if(visible) dialogRef.current.show()
    dialogRef.current.close()
  }, [visible]);

  console.log("visible", visible);
  return (
    <dialog ref={dialogRef} className={styles.dialog}>
      <div className={styles.dialog__modal}>
        <p>Greetings, one and all!</p>
        <button
          onClick={() => {
            dispatch(setVisibleDialog({ visible: false }));
          }}
        >
          Закрыть
        </button>

        <form method="dialog">
          <button
            onClick={() => {
              dispatch(setVisibleDialog({ visible: false }));
            }}
          >
            Close
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default Dialog;
