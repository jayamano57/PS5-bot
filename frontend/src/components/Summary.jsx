import React from "react";
import styled from "styled-components";
import Button from '@material-ui/core/Button';

const SummaryContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`
const FormSummary = styled.div`
    padding: 6rem 0;
`
const InstructionText = styled.h2`
    text-align: center;
    font-weight: 400;
`

const MuiLoadingButton = styled(Button)`
    align-self: flex-end;
    margin-right: 6rem !important;
`

const SummaryDetails = styled.div`
    padding-top: 6rem;
    width: 90%;
    margin: auto;
`
const SummaryRowLabel = styled.div`
    color: #666666;
    font-size: 12px;
`
const SummaryGroup = styled.div`
    margin-bottom: 4rem;
    display: flex;
    flex-wrap: wrap;
    box-shadow: 0 0 3px 3px #dbdbdb;
    padding: 1.5rem;
    border-radius: 8px;
`
const SummaryRow = styled.div`
    padding: 1rem;
`

const SummaryRowValue = styled.div`
    font-size: 1.4rem;
`

export default function Summary({email, firstName, lastName, phoneNumber, address1, address2, city, state, zip, ccFirstName, ccLastName, cardNumber, ccMonth, ccYear, cvv, ccPhoneNumber, buyPs5, isLoading}) {
    function SummaryRowComp({label, value}) {
        return (
            <SummaryRow>
                <SummaryRowLabel>{label}</SummaryRowLabel>
                <SummaryRowValue>{value}</SummaryRowValue>
            </SummaryRow>
        )
    }
    return (
        <SummaryContainer>
            <FormSummary>
                <InstructionText>
                    Does this seem right?
                </InstructionText>
                <SummaryDetails>
                    <SummaryGroup>
                        <SummaryRowComp label="email" value={email}/>
                    </SummaryGroup>
                    <SummaryGroup>
                        <SummaryRowComp label="first name" value={firstName}/>
                        <SummaryRowComp label="last name" value={lastName}/>
                        <SummaryRowComp label="phone number" value={phoneNumber}/>
                        <SummaryRowComp label="street address" value={address1}/>
                        <SummaryRowComp label="apt, suite, etc" value={address2}/>
                        <SummaryRowComp label="city" value={city}/>
                        <SummaryRowComp label="state" value={state}/>
                        <SummaryRowComp label="zip code" value={zip}/>
                    </SummaryGroup>
                    <SummaryGroup>
                        <SummaryRowComp label="first name" value={ccFirstName}/>
                        <SummaryRowComp label="last name" value={ccLastName}/>
                        <SummaryRowComp label="card number" value={cardNumber}/>
                        <SummaryRowComp label="month" value={ccMonth}/>
                        <SummaryRowComp label="year" value={ccYear}/>
                        <SummaryRowComp label="cvv" value={cvv}/>
                        <SummaryRowComp label="phone number" value={ccPhoneNumber}/>
                    </SummaryGroup>
                </SummaryDetails>
            </FormSummary>
            <MuiLoadingButton variant="contained" color="primary" size="large" disabled={isLoading} onClick={buyPs5}>
                Looks Good!
            </MuiLoadingButton>
        </SummaryContainer>
    )
}