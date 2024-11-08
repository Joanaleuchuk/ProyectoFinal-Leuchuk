// eslint-disable-next-line no-unused-vars
import React from 'react';
import logo from './imagen/mascotasweb.jpg'; 
import styled from 'styled-components';

const Banner = () => {
    return (
        <ContenedorBanner>
          <h1>Petshop</h1>
      <BannerMascotienda>
        <BannerImage src={logo} alt="Logo" />
      </BannerMascotienda>
      </ContenedorBanner>
    );
  }
  
  export default Banner;

const BannerMascotienda = styled.div`
  position: relative;
  width: 80vw;
  height: 50vh;
  overflow: hidden;
`;

const BannerImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; 
`;

const ContenedorBanner = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: 100vh;
`;
