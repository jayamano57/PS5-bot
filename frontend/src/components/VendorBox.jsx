import React from "react";
import styled from 'styled-components';

const VendorBoxContainer = styled.div`
    height: 25rem;
    width: 25rem;
    display: flex;
    padding: 2rem;
    align-items: center;
    justify-content: center;
    border-radius: 1.8rem;
    box-shadow: 0 0 11px 0px #e2e2e2;
    transition: all 0.25s;
    &:hover {
        cursor: pointer;
        box-shadow: 0 0 13px 2px #cfcfcf;
        transform: translateY(-5px);
    }
    &:active {
        box-shadow: 0 0 11px 0px #e2e2e2;
        transform: translateY(0);
    }
    &:not(:last-child) {
        margin-right: 6rem;
    }
`
const Img = styled.img`
    max-height: 100%;
    max-width: 100%;
`

export default function VendorBox({handleOpen, logo, vendor}) {

    return (
        <VendorBoxContainer aria-label="walmart" onClick={handleOpen}>
            <Img src={logo} alt={`${vendor} logo`}/>
        </VendorBoxContainer>
    )
}