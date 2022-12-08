/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './main.css';
import Slider from 'react-slick';

import { useSelector, useDispatch } from 'react-redux';
import { SpinnerRoundOutlined } from 'spinners-react';
import Navbar from './Navbar';
// import { useNavigate } from 'react-router-dom';

import {
  getAllCars,
  getCarsStatus,
  // getCarsError,
  fetchCars,
  // getCarDetails,
} from '../redux/carSlice';

function MainPage() {
  // const navigate = useNavigate();

  const dispatch = useDispatch();
  const cars = useSelector(getAllCars);
  const status = useSelector(getCarsStatus);
  // const error = useSelector(getCarsError);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCars());
    }
  }, [status, dispatch]);

  // const showDetailsPage = (id) => {
  //   dispatch(getCarDetails(id));
  //   navigate(`/cars/${id}`);
  // };

  let content;
  if (status === 'loading') {
    content = (
      <div className="loader">
        Loading Cars ..
        <SpinnerRoundOutlined color="black" size={100} />
      </div>
    );
  } else if (status === 'succeeded') {
    content = cars.map((car) => (
      // eslint-disable-next-line react/jsx-key
      <div className="card">
        <div className="car-background">
          <div className="card-top">
            <img
              src={car.image}
              alt={car.name}
            />
          </div>
        </div>
        <h1 className="carname">{car.name}</h1>
        {/* <div className="card-bottom">
          <h3>{car.name}</h3>
        </div> */}
      </div>
    ));
  }

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="Main">
      <Navbar />
      <div className="headline">
        <h1>LATEST MODELS</h1>
        <p>Please select a Tesla Model</p>
      </div>
      <div className="slider-container">
        <div className="slider">
          <Slider {...settings}>
            {content}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
