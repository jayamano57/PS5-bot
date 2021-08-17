import React from "react";
import styled from "styled-components";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';



const Form = styled.form`
    display: grid;
    grid-row-gap: 1.6rem;
    padding: 6rem 0;
    width: 60%;
    margin: auto;
`
const InstructionText = styled.h2`
    text-align: center;
    font-weight: 400;
`
const MuiInputLabel = styled(InputLabel)`
    font-size: 1.4rem !important;
`
const MuiTextField = styled(TextField)`
    .MuiFormHelperText-root {
        margin: 0 !important;
        font-size: 1.2rem;
    }
`
const MuiHelperText = styled(FormHelperText)`
    margin: 0 !important;
    font-size: 1.2rem !important;
`
const CardInfoGroup = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
`
const SelectFormGroup = styled(FormControl)`
    flex: 1;
    margin-right: 1rem !important;
`
const MuiSelect = styled(Select)`
    font-size: 1.4rem !important;
    .MuiSelect-root {
        padding-left: 4px;
    }
`
const MuiMenuItem = styled(MenuItem)`
    font-size: 1.4rem !important;
`

export default function CreditCardForm({firstName, setFirstName, firstNameValid, lastName, setLastName, lastNameValid, cardNumber, setCardNumber, cardNumberValid,  month, setMonth, monthValid, year, setYear, yearValid, cvv, setCvv, cvvValid,  phoneNumber, setPhoneNumber, phoneNumberValid}) {
    return (
        <>
            <InstructionText>
                Enter your credit card information
            </InstructionText>
            <Form autoComplete="off">
                    <FormControl>
                        <MuiTextField error={!!firstNameValid} helperText={firstNameValid} onChange={e => setFirstName(e.target.value)} value={firstName} required id="first-name" label="First name" inputProps={{style: {fontSize: 14, paddingLeft: 4}}} InputLabelProps={{style: {fontSize: 14}}} />
                    </FormControl>
                    <FormControl >
                        <MuiTextField error={!!lastNameValid} helperText={lastNameValid} onChange={e => setLastName(e.target.value)} value={lastName} required id="last-name" label="Last name" inputProps={{style: {fontSize: 14, paddingLeft: 4}}} InputLabelProps={{style: {fontSize: 14}}}/>
                    </FormControl>
                    <FormControl >
                        <MuiTextField error={!!cardNumberValid} helperText={cardNumberValid} onChange={e => setCardNumber(e.target.value)} value={cardNumber} required id="card-number" label="Card number" inputProps={{style: {fontSize: 14, paddingLeft: 4}}} InputLabelProps={{style: {fontSize: 14}}} type="number"/>
                    </FormControl>
                    <CardInfoGroup>
                        <SelectFormGroup error={!!monthValid}>
                            <MuiInputLabel id='month-label'>MM</MuiInputLabel>
                            <MuiSelect  onChange={e => setMonth(e.target.value)} value={month} labelId="month-label" id="month"> 
                                <MuiMenuItem value={"01"}>01</MuiMenuItem>
                                <MuiMenuItem value={"02"}>02</MuiMenuItem>
                                <MuiMenuItem value={"03"}>03</MuiMenuItem>
                                <MuiMenuItem value={"04"}>04</MuiMenuItem>
                                <MuiMenuItem value={"05"}>05</MuiMenuItem>
                                <MuiMenuItem value={"06"}>06</MuiMenuItem>
                                <MuiMenuItem value={"07"}>07</MuiMenuItem>
                                <MuiMenuItem value={"08"}>08</MuiMenuItem>
                                <MuiMenuItem value={"09"}>09</MuiMenuItem>
                                <MuiMenuItem value={"10"}>10</MuiMenuItem>
                                <MuiMenuItem value={"11"}>11</MuiMenuItem>
                                <MuiMenuItem value={"12"}>12</MuiMenuItem>
                            </MuiSelect>
                            <MuiHelperText>{monthValid}</MuiHelperText>
                        </SelectFormGroup>
                        <SelectFormGroup error={!!yearValid}>
                            <MuiInputLabel id='year-label'>YY</MuiInputLabel>
                            <MuiSelect onChange={e => setYear(e.target.value)} value={year} labelId="year-label" id="year"> 
                                <MuiMenuItem value={"2021"}>2021</MuiMenuItem>
                                <MuiMenuItem value={"2022"}>2022</MuiMenuItem>
                                <MuiMenuItem value={"2023"}>2023</MuiMenuItem>
                                <MuiMenuItem value={"2024"}>2024</MuiMenuItem>
                                <MuiMenuItem value={"2025"}>2025</MuiMenuItem>
                                <MuiMenuItem value={"2026"}>2026</MuiMenuItem>
                                <MuiMenuItem value={"2027"}>2027</MuiMenuItem>
                                <MuiMenuItem value={"2028"}>2028</MuiMenuItem>
                                <MuiMenuItem value={"2029"}>2029</MuiMenuItem>
                                <MuiMenuItem value={"2030"}>2030</MuiMenuItem>
                                <MuiMenuItem value={"2031"}>2031</MuiMenuItem>
                            </MuiSelect>
                            <MuiHelperText>{yearValid}</MuiHelperText>
                        </SelectFormGroup>
                        <FormControl >
                            <MuiTextField error={!!cvvValid} helperText={cvvValid} onChange={e => setCvv(e.target.value)} value={cvv} required id="cvv" label="CVV" inputProps={{style: {fontSize: 14, paddingLeft: 4}, maxlength: 3, pattern:"[0-9]*"}} InputLabelProps={{style: {fontSize: 14}}} inputmode="numeric" type="password"/>
                        </FormControl>
                    </CardInfoGroup>
                    <FormControl >
                        <MuiTextField error={!!phoneNumberValid} helperText={phoneNumberValid}  onChange={e => setPhoneNumber(e.target.value)} value={phoneNumber} required id="phone-number" label="Phone number" inputProps={{style: {fontSize: 14, paddingLeft: 4}}} InputLabelProps={{style: {fontSize: 14}}} type="tel"/>
                    </FormControl>
            </Form>
        </>
    )
}