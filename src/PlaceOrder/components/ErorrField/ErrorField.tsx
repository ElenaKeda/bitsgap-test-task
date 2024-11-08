import { Typography } from "@mui/material";
import styles from "./ErrorField.module.scss";
import { observer } from "mobx-react";
import { useStore } from "PlaceOrder/context";

const ErrorField = observer(() => {
  const { isError } = useStore();

  if (!isError) return null;

  return (
    <div className={styles.errorBlock}>
      <Typography className={styles.errorText}>{"Error message"}</Typography>
    </div>
  );
});

export { ErrorField };
