import styled from 'styled-components'

export const HeroContainer = styled.div`
    width:100%;
    height:500px;
    position:relative;
    z-index:1;
    background:#000;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
`
export const ContentWrapper = styled.div`
    max-width:700px;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    z-index:10;
    text-align:center;
    padding:18px 24px;
`
export const ContentH1 = styled.h1`
    color:red;
    font-size:30px;
`
export const ContentP = styled.p`
    color:#fff;
    font-size:16px;
    margin-top:22px;
    margin-bottom:27px;
    line-height:1.7;
    padding:0 30px;
`