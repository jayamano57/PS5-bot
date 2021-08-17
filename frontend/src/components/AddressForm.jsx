import React from "react";
import styled from "styled-components";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { device } from '../deviceBP';



const Form = styled.form`
    flex: 1;
    padding: 6rem 0;
    width: 75%;
    margin: auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 2rem;
    @media ${device.tablet} {
		grid-template-columns: 1fr;
	}
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
const FormColumn = styled.div`
    display: grid;
    grid-row-gap: 2rem;
    grid-template-rows: repeat(4, 1fr);
`
const StateZipGroup = styled.div`
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

export default function AddressForm({firstName, setFirstName, firstNameValid, lastName, setLastName, lastNameValid, phoneNumber, setPhoneNumber, phoneNumberValid, address1, setAddress1, address1Valid, address2, setAddress2, city, setCity, cityValid, state, setState, stateValid, zip, setZip, zipValid}) {
    
    const states = [
        'AL','AK','AS','AZ','AR','CA','CO','CT','DE','DC','FM','FL','GA',
        'GU','HI','ID','IL','IN','IA','KS','KY','LA','ME','MH','MD','MA',
        'MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND',
        'MP','OH','OK','OR','PW','PA','PR','RI','SC','SD','TN','TX','UT',
        'VT','VI','VA','WA','WV','WI','WY'
       ];
    
    return (
        <>
            <InstructionText>
                Enter your shipping/billing address information
            </InstructionText>
            <Form autoComplete="off">
                <FormColumn>
                    <FormControl >
                        <MuiTextField error={!!firstNameValid} helperText={firstNameValid} onChange={e => setFirstName(e.target.value)} value={firstName} required id="first-name" label="First name" inputProps={{style: {fontSize: 14, paddingLeft: 4}}} InputLabelProps={{style: {fontSize: 14}}} />
                    </FormControl>
                    <FormControl >
                        <MuiTextField error={!!lastNameValid} helperText={lastNameValid} onChange={e => setLastName(e.target.value)} value={lastName} required id="last-name" label="Last name" inputProps={{style: {fontSize: 14, paddingLeft: 4}}} InputLabelProps={{style: {fontSize: 14}}}/>
                    </FormControl>
                    <FormControl >
                        <MuiTextField error={!!phoneNumberValid} helperText={phoneNumberValid} onChange={e => setPhoneNumber(e.target.value)} value={phoneNumber} required id="phone-number" label="Phone number" inputProps={{style: {fontSize: 14, paddingLeft: 4}, maxLength: 10}} InputLabelProps={{style: {fontSize: 14}}} type="tel"/>
                    </FormControl>
                </FormColumn>
                <FormColumn>
                    <FormControl >
                        <MuiTextField error={!!phoneNumberValid} helperText={phoneNumberValid} onChange={e => setAddress1(e.target.value)} value={address1} required id="address-1" label="Street address" inputProps={{style: {fontSize: 14, paddingLeft: 4}}} InputLabelProps={{style: {fontSize: 14}}}/>
                    </FormControl>

                    <FormControl >
                        <MuiTextField onChange={e => setAddress2(e.target.value)} value={address2} id="address-2" label="Apt, suite, etc (optional)" inputProps={{style: {fontSize: 14, paddingLeft: 4}}} InputLabelProps={{style: {fontSize: 14}}}/>
                    </FormControl>
                    <FormControl >
                        <MuiTextField error={!!cityValid} helperText={cityValid} onChange={e => setCity(e.target.value)} value={city} required id="city" label="City" inputProps={{style: {fontSize: 14, paddingLeft: 4}}} InputLabelProps={{style: {fontSize: 14}}}/>
                    </FormControl>
                    <StateZipGroup>
                        <SelectFormGroup error={!!stateValid}>
                            <MuiInputLabel id='state-label' error={!!stateValid} >State</MuiInputLabel>
                            <MuiSelect error={!!stateValid}labelId="state-label" id="state" value={state} onChange={e => setState(e.target.value)}>
                                {states.map(state => <MuiMenuItem value={state}>{state}</MuiMenuItem>)}
                            </MuiSelect>
                            <MuiHelperText>{stateValid}</MuiHelperText>
                        </SelectFormGroup>
                        <FormControl >
                            <MuiTextField error={!!zipValid} helperText={zipValid} onChange={e => setZip(e.target.value)} value={zip} required id="zip" label="Zip Code" inputProps={{style: {fontSize: 14, paddingLeft: 4}, maxLength: 5, pattern:"[0-9]*"}} InputLabelProps={{style: {fontSize: 14}}} inputmode="numeric" />
                        </FormControl>
                    </StateZipGroup>
                </FormColumn>
            </Form>
        </>
    )
}