import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import res from "./apiResponse.json";
import DetailTable from "./detail-table";
import styles from "./index.less";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  key: string;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export default function HomePage() {
  const data = res.data;
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {data.pages.map((page, index) => (
            <Tab
              label={`PAGE${index + 1}`}
              {...a11yProps(index)}
              key={page.fileName}
            />
          ))}
        </Tabs>
      </Box>

      {data.pages.map((page, index) => {
        return (
          <CustomTabPanel value={value} index={index} key={page.fileName}>
            <div className={styles.flex}>
              <img src={page.fileName} alt="" width="50%" />
              <DetailTable rows={page.items} />
            </div>
          </CustomTabPanel>
        );
      })}
    </div>
  );
}
