import React from 'react';
import styled from 'styled-components'

const HeaderDiv = styled.div`
    font-family: CustomFont;
    text-align: center;
    `;
const DescriptionP = styled.p`
    width: 70%;
    text-align: left;
    margin-left: auto;
    margin-right: auto;`;

const Header = () => (
    <HeaderDiv>
        <h1>American Community Survey Data from the Census Bureau (census.gov)</h1>
        <DescriptionP>
            SAFE Final Year Project
        </DescriptionP>
    </HeaderDiv>
)

export default Header;


