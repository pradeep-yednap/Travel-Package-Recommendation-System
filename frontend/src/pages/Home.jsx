import React from "react";
import "../styles/home.css";
import { Container, Row, Col } from "reactstrap";
import { useState } from 'react';
import heroImg from "../assets/images/hero-img01.jpg";
import heroImg02 from "../assets/images/hero-img02.jpg";
import heroVideo from "../assets/images/hero-video.mp4";
import worldImg from "../assets/images/world.gif";
import experienceImg from '../assets/images/experience.png';
import Subtitle from "../shared/Subtitle";
import SearchBar from "../shared/SearchBar";
import MasonryImagesGallery from "../components/Image-gallery/MasonryImagesGallery";
import SearchResultList from "./SearchResultList";


const Home = () => {
  const [searchResults, setSearchResults] = useState([]);
  const handleSearchResults = (results) => {
    setSearchResults(results);
  };
  return (
    <>
      {/*------ hero section starts here ----------*/}
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <div className="hero__content">
                <div className="hero__subtitle d-flex align-items-center ">
                  <Subtitle subtitle={"know Before You Go"} />
                  <img src={worldImg} alt="" />
                </div>
                <h1>
                  {" "}
                  Welcome to the Gateway of Unforgettable{" "}
                  <span className="highlight">Adventures!</span>
                </h1>
                <p>
                  Dreaming of a getaway that perfectly matches your desires?
                  You're in the right place! At TravelerSathi, we believe that
                  every journey should be as unique as the traveler.
                </p>
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__img-box">
                <img src={heroImg} alt="" />
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__img-box">
                <video src={heroVideo} alt="" controls />
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__img-box">
                <img src={heroImg02} alt="" />
              </div>
            </Col>
            <SearchBar onSearch={handleSearchResults} />
            <SearchResultList searchResults={searchResults} />
          </Row>
        </Container>
      </section>

      

      {/*------------------ experience section start --------------*/}
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <div className="experience__content">
              <h5 className="services__subtitle">Experience</h5>
                <h2>
                  {" "}
                  With our all experience <br /> we will serve you
                </h2>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.<br/>
                  Culpa eos itaque repellat provident, reprehenderit repudiandae
                  quod obcaecati corporis sequi nostrum ipsum.
                </p>
              </div>

              <div className="counter__wrapper d-flex align-items-center gap-5">
                <div className="counter__box">
                  <span> 5k+</span>
                  <h6> Successfull Trip</h6>
                </div>
                <div className="counter__box">
                  <span> 500+</span>
                  <h6> Regular Clients</h6>
                </div>
                <div className="counter__box">
                  <span>5</span>
                  <h6> Years experience</h6>
                </div>
              </div>
            </Col>
            <Col lg="6">
              <div className="experience__img">
                <img src={experienceImg} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/*------------------ experience section end --------------*/}

      {/*------------------ gallery section start --------------*/}
      <section>
        <Container>
          <Row>
            <Col lg='12'>
            <h5 className="services__subtitle">Gallery</h5>
              <h2 className="gallery__tittle">Visit our customers tour gallery</h2>
            </Col>
            <Col lg='12'>
          <MasonryImagesGallery/>
            </Col>
          </Row>
        </Container>
      </section>
      {/*------------------ gallery section end --------------*/}

      {/*------------------ testimonial section start --------------*/}
      {/* <section>
        <Container>
          <Row>
            <Col lg='12'>
            <h5 className="services__subtitle">Fans Love</h5>
            <h2 className="testimonial__title"> What our fans says about us</h2>
            </Col>
            <Col lg='12'><Testimonials/> </Col>
          </Row>
        </Container>
      </section> */}
      {/*------------------ testimonial section end  --------------*/}


    </>
  );
};

export default Home;
