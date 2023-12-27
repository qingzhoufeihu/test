import { Outlet } from "umi";
import styles from "./index.less";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function Layout() {
  return (
    <div className={styles.navs}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Outlet />
      </LocalizationProvider>
    </div>
  );
}
