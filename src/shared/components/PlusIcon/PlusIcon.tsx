import { SvgIcon } from "@mui/material";
import cn from "classnames";

import styles from "./PlusIcon.module.scss";

interface Props {
  className?: string;
}

function PlusIcon({ className }: Props) {
  return (
    <SvgIcon
      width={24}
      height={24}
      className={cn(className, styles.root)}
      viewBox="0 0 24 24"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.5 12C2.5 6.48 6.98 2 12.5 2C18.02 2 22.5 6.48 22.5 12C22.5 17.52 18.02 22 12.5 22C6.98 22 2.5 17.52 2.5 12ZM13.5 13H16.5C17.05 13 17.5 12.55 17.5 12C17.5 11.45 17.05 11 16.5 11H13.5V8C13.5 7.45 13.05 7 12.5 7C11.95 7 11.5 7.45 11.5 8V11H8.5C7.95 11 7.5 11.45 7.5 12C7.5 12.55 7.95 13 8.5 13H11.5V16C11.5 16.55 11.95 17 12.5 17C13.05 17 13.5 16.55 13.5 16V13Z"
        fill="#0078FF"
      />
    </SvgIcon>
  );
}

export { PlusIcon };
