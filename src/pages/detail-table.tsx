import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AddIcon from "@mui/icons-material/AddCircleOutline";
import FormDialog from "./form-dialog";
import style from "./detail-table.less";
import { useState } from "react";
interface option {
  id: number;
  value: string;
}
export interface Item {
  netAmount: number;
  chargeDate: string;
  particularsEn: string;
  matchOptions: option[];
  originalIndex: number;
  [key: string]: any;
}
interface DetailTable {
  rows: Item[];
}
export default function DetailTable(props: DetailTable) {
  const { rows } = props;
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleAdd = (index: number) => {
    setActiveIndex(index);
    handleClickOpen();
  };
  return (
    <>
      <TableContainer component={Paper} sx={{ width: "50vw" }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#D1FDE1" }}>
            <TableRow>
              <TableCell>Charge Date</TableCell>
              <TableCell>Particulars</TableCell>
              <TableCell>Match Items</TableCell>
              <TableCell>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => {
              const error =
                row.particularsEn.toUpperCase() !== row.matchOptions[0].value;
              const amount = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(row.netAmount);

              return (
                <TableRow
                  key={row.originalIndex}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <DatePicker defaultValue={dayjs(row.chargeDate)} />
                  </TableCell>
                  <TableCell>
                    <div className={style.container}>
                      <div>{row.particularsEn}</div>
                      <AddIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => handleAdd(index)}
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <FormControl sx={{ m: 1, width: 300 }}>
                      <Select
                        value={row.matchOptions[0].value}
                        style={{
                          backgroundColor: error ? "#FFB2B3" : "white",
                        }}
                      >
                        {row.matchOptions.map(option => (
                          <MenuItem key={option.id} value={option.value}>
                            {option.value}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    <OutlinedInput value={amount} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <FormDialog
        open={open}
        handleClose={handleClose}
        data={rows[activeIndex]}
      />
    </>
  );
}
