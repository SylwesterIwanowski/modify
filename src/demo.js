import * as React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

const filter = createFilterOptions();

export default function FreeSoloCreateOptionDialog() {
  const [value, setValue] = React.useState(null);
  const [open, toggleOpen] = React.useState(false);

  const handleClose = () => {
    setDialogValue({
      fName: "",
      lName: "",
      year: ""
    });

    toggleOpen(false);
  };

  const [dialogValue, setDialogValue] = React.useState({
    fName: "",
    lName: "",
    year: ""
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setValue({
      fName: dialogValue.fName,
      lName: dialogValue.lName,
      year: parseInt(dialogValue.year, 10)
    });

    handleClose();
  };

  return (
    <React.Fragment>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          if (newValue === "") {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              toggleOpen(true);
              setDialogValue({
                fName: newValue,
                lName: "",
                year: ""
              });
            });
          } else if (newValue && newValue.inputValue) {
            toggleOpen(true);
            setDialogValue({
              fName: newValue.inputValue,
              lName: "",
              year: ""
            });
          } else {
            setValue(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== "") {
            filtered.push({
              inputValue: params.inputValue,
              fName: `Dodaj imię  "${params.inputValue}"`
            });
          }

          return filtered;
        }}
        id="free-solo-dialog-demo"
        options={listNamePlayer}
        getOptionLabel={(option) => {
          // e.g value selected with enter, right from the input
          if (option === "") {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.fName + " " + option.lName;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(props, option) => (
          <li {...props}>
            {option.fName} {option.lName}
          </li>
        )}
        sx={{ width: 300 }}
        freeSolo
        renderInput={(params) => (
          <TextField {...params} label="Imie i nazwisko" />
        )}
      />
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Dodaj Zawodnika</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Wpisz imię, nazwisko, rok urodzenia. Zapisz
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="fName"
              value={dialogValue.fName}
              onChange={(event) =>
                setDialogValue({
                  ...dialogValue,
                  fName: event.target.value
                })
              }
              label="Imię"
              type="text"
              variant="standard"
            />

            <TextField
              autoFocus
              margin="dense"
              id="lName"
              value={dialogValue.lName}
              onChange={(event) =>
                setDialogValue({
                  ...dialogValue,
                  lName: event.target.value
                })
              }
              label="Nazwisko"
              type="text"
              variant="standard"
            />

            <TextField
              margin="dense"
              id="name"
              value={dialogValue.year}
              onChange={(event) =>
                setDialogValue({
                  ...dialogValue,
                  year: event.target.value
                })
              }
              label="Rok urodzenia"
              type="number"
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleClose}>
              Wyjdź
            </Button>
            <Button variant="outlined" type="submit">
              Zapisz
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const listNamePlayer = [
  { fName: "Sylwek", lName: "Iwan", year: 1992, id: 1 },
  { fName: "Kazik", lName: "Nowak", year: 1994, id: 2 },
  { fName: "Jeremii", lName: "Seba", year: 1993, id: 1 },
  { fName: "Adam", lName: "Kowal", year: 1994, id: 1 },
  { fName: "Grzegorz", lName: "Zero", year: 1995, id: 2 },
  { fName: "Amadi", lName: "Rosal", year: 1992, id: 1 }
];
