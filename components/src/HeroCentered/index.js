// @flow

import * as React from 'react';
import styled, { css } from 'styled-components';
import Button from '@kiwicom/orbit-components/lib/Button';
import Stack from '@kiwicom/orbit-components/lib/Stack';
import media from '@kiwicom/orbit-components/lib/utils/mediaQuery';

import defaultTheme from '../defaultTheme';

const StyledHero = styled.div`
  background: black;
  height: 100%;
  height: 50vw;

  min-height: 400px;
  background-image: ${({ img }) => `url(${img})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom right;
  position: relative;
  overflow: hidden;

  ${media.tablet(css`
    max-height: 100%;
  `)};
`;

StyledHero.defaultProps = {
  theme: defaultTheme,
};

const StyledNavBarWrapper = styled.div`
  padding: 4.2vw 0 0 0;
  position: absolute;
  top: 0;
  width: 100%;
`;

const StyledStack = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const HeroImage = styled.div`
  height: 100%;
  width: 100%;
  background-image: ${({ img }) => `url(${img})`};
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  overflow: hidden;
`;

const HeroImageWrapper = styled.div`
  padding-top: 5.2vw;
  height: 60%;
  width: 90%;

  ${media.tablet(css`
    width: 70%;
    height: 60%;
  `)};
`;

HeroImageWrapper.defaultProps = {
  theme: defaultTheme,
};

const Hero = ({ backgroundImage, heroImage, navBar }) => {
  return (
    <StyledHero img={backgroundImage}>
      <StyledStack>
        {navBar && <StyledNavBarWrapper>{navBar}</StyledNavBarWrapper>}
        <Stack flex justify="center" align="center" direction="column">
          <HeroImageWrapper>
            <HeroImage img={heroImage} />
          </HeroImageWrapper>

          <Button>Register</Button>
        </Stack>
      </StyledStack>
    </StyledHero>
  );
};

export default Hero;