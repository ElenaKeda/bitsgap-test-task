import { IconButton } from "@mui/material";
import styles from "./AddTakeProfitButton.module.scss";
import { observer } from "mobx-react";
import { useStore } from "PlaceOrder/context";
import { PlusIcon } from "shared/components/PlusIcon/PlusIcon";
import { MAX_PROFIT_TARGETS } from "PlaceOrder/constants";
import { useMemo } from "react";

const AddTakeProfitButton = observer(() => {
  const { takeProfitTargets } = useStore();

  const profitNumber = takeProfitTargets.length || 0;
  const newNumber = useMemo(() => profitNumber + 1, [profitNumber]);

  if (profitNumber === MAX_PROFIT_TARGETS) return null;

  return (
    <div className={styles.addButtonBlock}>
      <IconButton aria-label="add" onClick={() => console.log("add")}>
        <PlusIcon className={styles.button} />
      </IconButton>

      <div className={styles.label}>{`Add profit target ${newNumber}/5`}</div>
    </div>
  );
});

export { AddTakeProfitButton };
