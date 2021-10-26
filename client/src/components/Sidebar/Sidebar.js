import styled from 'styled-components';
import { NavLink as Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

export const Wrapper = styled.div`
  background: #000;
  
  height: 100vh;
  width: 15vw;
  display: flex;
  flex-direction: column;
  padding 0.5rem;
  z-index: 10;

  @media screen and (max-width: 768px) {
    width: 25vw;
  }

`;

export const Bar = styled.div`
  text-align: center;
  color: #fff;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const Bars = styled(FaBars)`
  display: none;
  color: #fff;

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavLink = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  padding: 1rem 0.2rem;
  height: 80px;
  cursor: pointer;
  width: 100%;
  border-bottom: 1px solid #15cdfc;
  font-size: 20px;
  letter-spacing: 2px;

  &.active {
    color: #15cdfc;
  }
`;
