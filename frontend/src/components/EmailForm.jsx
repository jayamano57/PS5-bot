import React from "react";
import styled from "styled-components";
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';


const Form = styled.form`
    padding: 6rem 0;
    width: 75%;
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

export default function EmailForm({email, setEmail, emailValid}) {
    return (
        <>
            <InstructionText>
                Please enter your email address so we can contact you our bot's results
            </InstructionText>
            <Form>
                <FormControl variant="outlined" fullWidth>
                    <MuiTextField error={!!emailValid} helperText={emailValid} required aria-describedby="email-error-text" id="email-input" label="Email Address" inputProps={{style: {fontSize: 16}}} value={email} onChange={e => setEmail(e.target.value)} InputLabelProps={{style: {fontSize: 14}}} type="email"/>
                </FormControl>
            </Form>
        </>
    )
}