import React from 'react'
import { Link } from 'gatsby'
import { Helmet } from 'react-helmet'
import carousel from '../../data/carousel.json'

export default () => {
  return (
    <div
      id="carouselExampleCaptions"
      className="carousel slide"
      data-ride="carousel"
    >
      <div className="carousel-inner">
        {Object.values(carousel).map(
          ({ title, link, cover, description }, index) => (
            <div
              className={`carousel-item ${index ? '' : 'active'}`}
              key={title}
            >
              <a href={link} target="_blank" rel="noolopp">
                <img className="d-block w-100" alt={title} src={cover} />
                <div className="carousel-caption d-block">
                  <h4>
                    <font style={{ verticalAlign: 'inherit' }}>{title}</font>
                  </h4>
                  <p>
                    <font style={{ verticalAlign: 'inherit' }}>
                      {description}
                    </font>
                  </p>
                </div>
              </a>
            </div>
          )
        )}
      </div>
      <a
        className="carousel-control-prev"
        href="#carouselExampleCaptions"
        role="button"
        data-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
      </a>
      <a
        className="carousel-control-next"
        href="#carouselExampleCaptions"
        role="button"
        data-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
      </a>
      <Helmet>
        <script src="/js/bootstrap-native-v4.min.js" />
      </Helmet>
    </div>
  )
}
