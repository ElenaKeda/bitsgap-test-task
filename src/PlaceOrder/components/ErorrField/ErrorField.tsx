import { Typography } from "@mui/material";
import styles from "./ErrorField.module.scss";
import { observer } from "mobx-react";
import { useStore } from "PlaceOrder/context";

const ErrorField = observer(() => {
  const { error } = useStore();

  if (!error.isShowError) return null;

  return (
    <div className={styles.errorBlock}>
      <Typography className={styles.errorText}>{error.message}</Typography>
    </div>
  );
});

export { ErrorField };
