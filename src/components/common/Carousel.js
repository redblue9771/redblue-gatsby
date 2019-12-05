import React from 'react'

import Carousel from 'react-bootstrap/Carousel'
import carouselData from '../../data/carousel.json'

export default () => {
  return (
    <Carousel interval={3000} indicators={false}>
      {Object.values(carouselData).map(
        ({ title, link, cover, description }) => (
          <Carousel.Item
            key={link}
            as="a"
            href={link}
            target="_blank"
            rel="noolopp"
          >
            <img
              className="d-block w-100"
              alt={title}
              title={title}
              src={cover}
            />
            <Carousel.Caption>
              <h4>
                <font style={{ verticalAlign: 'inherit' }}>{title}</font>
              </h4>
              <p>
                <font style={{ verticalAlign: 'inherit' }}>{description}</font>
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        )
      )}
    </Carousel>
  )
}
