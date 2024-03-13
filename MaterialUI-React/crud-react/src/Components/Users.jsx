import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, InputLabel, ListItemText, MenuItem, OutlinedInput, Radio, RadioGroup, Select, TextField } from '@mui/material'
import React, { useState } from 'react'
import Axios from 'axios';

const Users = () => {
    const [person, setPerson] = useState({
        fname: "",
        gender: "",
        areasOfInterest: [],
        favNames: []
    })
    const [personName, setPersonName] = useState([]);
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const names = [
        'Oliver Hansen',
        'Van Henry',
        'April Tucker',
        'Ralph Hubbard',
        'Omar Alexander',
        'Carlos Abbott',
        'Miriam Wagner',
        'Bradley Wilkerson',
        'Virginia Andrews',
        'Kelly Snyder',
    ];
    const handleChange = (event) => {
        const newPerson = { ...person };
        if (event.target.name === "areasOfInterest") {
            if (event.target.checked) {
                console.log(event)
                newPerson.areasOfInterest.push(event.target.value);
            }
            else {
                console.log(event)
                const index = newPerson.areasOfInterest.indexOf(event.target.value);
                newPerson.areasOfInterest.splice(index, index)
            }
        } else if (event.target.name === "favNames") {
            console.log(event.target.value)
            const {
                target: { value },
            } = event;
            setPersonName(
                // On autofill we get a stringified value.
                typeof value === 'string' ? value.split(',') : value,
            );
            newPerson[event.target.name] = event.target.value
        } else {
            newPerson[event.target.name] = event.target.value
        }
        // newPerson.favNames = event.target.value
        setPerson(newPerson)
    }

    const addUser = () => {
        Axios.post("http://localhost:3001/users", person);
        clearForm();
    }
    const clearForm = () => {
        setPerson({
            fname: "",
            gender: "",
            areasOfInterest: [],
            favNames: []
        })
    }
    return (
        <div>
            <FormControl>
                <FormLabel>Full Name</FormLabel>
                <TextField id="outlined-basic" label="FullName" variant="outlined" name='fname' value={person.fname} onChange={handleChange} />

                <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                >
                    <FormControlLabel onChange={handleChange} name='gender' checked={person.gender === "female"} value="female" control={<Radio />} label="Female" />
                    <FormControlLabel onChange={handleChange} name='gender' checked={person.gender === "male"} value="male" control={<Radio />} label="male" />
                    <FormControlLabel onChange={handleChange} name='gender' checked={person.gender === "other"} value="other" control={<Radio />} label="other" />
                </RadioGroup>

                <FormLabel>Areas of Interest</FormLabel>
                <FormGroup>
                    <FormControlLabel onChange={handleChange} name='areasOfInterest' value={"HTML"} checked={person.areasOfInterest.includes("HTML")} control={<Checkbox />} label="HTML" />
                    <FormControlLabel onChange={handleChange} name='areasOfInterest' value={"CSS"} checked={person.areasOfInterest.includes("CSS")} control={<Checkbox />} label="CSS" />
                    <FormControlLabel onChange={handleChange} name='areasOfInterest' value={"JS"} checked={person.areasOfInterest.includes("JS")} control={<Checkbox />} label="JS" />
                    <FormControlLabel onChange={handleChange} name='areasOfInterest' value={"REACTJS"} checked={person.areasOfInterest.includes("REACTJS")} control={<Checkbox />} label="REACTJS" />
                </FormGroup>

                <FormLabel>Places to Visit</FormLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    name='favNames'
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput label="Places to Visit" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {names.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={personName.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select> <br />
            </FormControl>
            <div>
                <Button variant='contained' onClick={addUser}>Add Person</Button>
            </div>

        </div>
    )
}

export default Users
