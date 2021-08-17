import React from "react";
import styled from "styled-components";
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


const Form = styled.form`
    padding: 6rem 0;
    width: 50%;
    margin: auto;
`
const InstructionText = styled.h2`
    text-align: center;
    font-weight: 400;
`
const MuiTextField = styled(TextField)`
    .MuiFormHelperText-root {
        font-size: 1.2rem;
    }
`
const MuiFormControl = styled(FormControl)`
    margin-bottom: 3rem !important;
`
const MuiFormControlLabel = styled(FormControlLabel)`
    .MuiFormControlLabel-label {
        font-size: 1.2rem !important;
    }
`
const MuiCheckbox = styled(Checkbox)`
    .MuiSvgIcon-root {
        font-size: 2rem !important;
    }
`
export default function ScheduleForm({watcher, setWatcher, scheduleDate, setScheduleDate, scheduleTime, setScheduleTime, scheduleDateValid, scheduleTimeValid}) {
    return (
        <>
            <InstructionText>
                Enter the PS5 drop date and time
            </InstructionText>
            <Form autoComplete="off">
                <MuiFormControl variant="outlined" fullWidth>
                    <MuiTextField disabled={watcher} id="schedule-date" error={!!scheduleDateValid} helperText={scheduleDateValid}  label="Date" type="date" InputProps={{style: {fontSize: 16}}} InputLabelProps={{shrink: true, style: {fontSize: 14}}} onChange={e => setScheduleDate(e.target.value)} value={scheduleDate}/>
                </MuiFormControl>
                <MuiFormControl variant="outlined" fullWidth>
                    <MuiTextField disabled={watcher} id="schedule-time" error={!!scheduleTimeValid} helperText={scheduleTimeValid}  label="Time" type="time" InputProps={{style: {fontSize: 16}}} InputLabelProps={{shrink: true, style: {fontSize: 14}}} value={scheduleTime} onChange={e => setScheduleTime(e.target.value)}/>
                </MuiFormControl>
                <MuiFormControlLabel
                    control={
                        <MuiCheckbox
                            checked={watcher}
                            onChange={setWatcher}
                            name="checkedB"
                            color="primary"
                        />
                    }
                    label="Check stock every 30 minutes and automatically buy when in stock"
                />
            </Form>
        </>
    )
}