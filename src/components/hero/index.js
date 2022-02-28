import React from 'react'
import { HeroContainer,ContentWrapper,ContentH1,ContentP } from './HeroElements'
import { BtnWrap,Button } from '../Button'


const Hero = () => {
  return (
    <>
        <HeroContainer>
            <ContentWrapper>
                <ContentH1>Hello World</ContentH1>
                <ContentP>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh</ContentP>
                <BtnWrap>
                    <Button to="signin" primary={true} big={true}>Get Started</Button>
                </BtnWrap>
            </ContentWrapper>
        </HeroContainer>
    </>
  )
}

export default Hero