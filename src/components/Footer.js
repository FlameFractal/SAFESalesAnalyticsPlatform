import React from 'react';
import styled from 'styled-components'

const FooterP = styled.p`
    font-size: 0.8em;
    font-family: CustomFont;
    margin-top: 10em;`;

const Footer = () => (
    <FooterP>Source: American Community Survrey (ACS) 2016. Religousity data is by Pew Research <a href="http://www.pewresearch.org/fact-tank/2016/02/29/how-religious-is-your-state/?state=alabama">link</a></FooterP>
)

export default Footer;


