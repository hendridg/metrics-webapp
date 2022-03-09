import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import styled from 'styled-components';

const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 10rem;
  @media (min-width: 600px) {
    font-size: 1.2rem;
  }
  @media (min-width: 600px) {
    margin-top: 1.5rem;
    font-size: 1.4rem;
  }
`;

function NoDataAvaible() {
  return (
    <CarouselProvider
      naturalSlideWidth={100}
      naturalSlideHeight={200}
      totalSlides={3}
      interval={3000}
      isPlaying
      infinite
    >
      <Slider>
        <Slide index={0}>
          <ImgContainer>
            <img
              src="/hands-bubbles-solid.svg"
              style={{
                width: '8em',
                height: '8em',
              }}
              alt="hands wash"
            />
            <h3>Wash your hands</h3>
          </ImgContainer>
        </Slide>
        <Slide index={1}>
          <ImgContainer>
            <img
              src="/syringe-svgrepo-com.svg"
              style={{
                width: '8em',
                height: '8em',
              }}
              alt="hands wash"
            />
            <h3>Vaccine</h3>
          </ImgContainer>
        </Slide>
        <Slide index={2}>
          <ImgContainer>
            <img
              src="/avatar-face-mask.svg"
              style={{
                width: '8em',
                height: '8em',
              }}
              alt="hands wash"
            />
            <h3>Use the mask</h3>
          </ImgContainer>
        </Slide>
      </Slider>
    </CarouselProvider>
  );
}

export default NoDataAvaible;
