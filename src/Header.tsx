import styled, { keyframes } from 'styled-components';
import logo from './logo.svg';

const HeaderDiv = styled.div`
    display: fixed;
    color: white;
    width: 100%;
    z-index: 1;
    top: 0;
    left: 0;
    
    padding-top: 0.5rem;
`;

const AppLogoSpin = keyframes`
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
`;

const AppLogo = styled.img`
    height: 5vmin;
    pointer-events: none;

    @media (prefers-reduced-motion: no-preference) {
      animation: ${AppLogoSpin} infinite 20s linear;
    }
`;

const Link = styled.a`
    color: unset;
    display: flex;
    text-decoration: none;
    
    height: 100%;
    padding: 0.25rem;
    border-bottom: 1px solid #61dafb;
    cursor: pointer;

    font-family: 'Courier', 'Roboto Mono' ,monospace;
    transition: all 0.25s ease;

    &:hover {
        background-color: #61dafb;
        color: #282c34;
    }
`;

const Center = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
`;

const Paragraph = styled.p`
    margin: 0;
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: 0.2rem;
`;

const Header = () => (
    <HeaderDiv>
        <Center>
            <AppLogo src={logo} alt="logo" />
            <Paragraph>
                Created by <Link href="https://linkedin.com/in/rhbuckley">@rhbuckley</Link> using React.
            </Paragraph>
        </Center>
    </HeaderDiv>
);

export default Header;