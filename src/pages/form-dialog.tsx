import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Item } from "./detail-table";

interface FormDialogProps {
  open: boolean;
  handleClose: () => void;
  data: Item;
}
interface ListItem {
  label: string;
  key: string;
  type: string;
  options?: { label: string; value: string }[];
}

const list: ListItem[] = [
  {
    label: "Item Name",
    key: "particularsEn",
    type: "input",
  },
  {
    label: "Hospital Int Code",
    key: "a",
    type: "input",
  },
  {
    label: "Fee For",
    key: "b",
    type: "select",
    options: [
      {
        label: "xxx",
        value: "xxx",
      },
    ],
  },
  {
    label: "Benefit Type 1",
    key: "a",
    type: "input",
  },
  {
    label: "Benefit Type 2",
    key: "a",
    type: "input",
  },
  {
    label: "Benefit Type 3",
    key: "a",
    type: "input",
  },
  {
    label: "Benefit Type 4",
    key: "a",
    type: "input",
  },
  {
    label: "Benefit Type 5",
    key: "a",
    type: "input",
  },
];

const createFormItem = (item: ListItem, data: Item) => {
  switch (item.type) {
    case "input":
      return (
        <TextField
          margin="dense"
          id={item.key}
          label={item.label}
          type="email"
          fullWidth
          variant="standard"
          defaultValue={item.key in data ? data[item.key] : ""}
        />
      );
    case "select":
      return (
        <FormControl
          variant="standard"
          sx={{ marginTop: "16px", width: "100%" }}
        >
          <InputLabel>{item.label}</InputLabel>
          <Select label={item.label}>
            {item.options?.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
  }
};
export default function FormDialog({
  open,
  handleClose,
  data,
}: FormDialogProps) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ paddingBottom: "4px" }}>
        Add New Particular
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          To add this new particular to database
        </DialogContentText>
        {list.map(item => createFormItem(item, data))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} style={{ color: "#F98639" }}>
          Cancel
        </Button>
        <Button onClick={handleClose} style={{ color: "#F98639" }}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
