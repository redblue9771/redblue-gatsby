import React from 'react'

import './Geometric.css'

const container = ({ children }) => (
  <div className="main-timeline">{children}</div>
)

const item = ({
  key,
  date,
  title,
  description,
  component: Component,
  ...other
}) =>
  Component ? (
    <Component
      className="timeline"
      key={key || date || title || description}
      {...other}
    >
      <div className="timeline-icon" />
      <div className="timeline-content">
        <span className="date">{date}</span>
        <h5 className="title">{title}</h5>
        <p className="description">{description}</p>
      </div>
    </Component>
  ) : (
    <div className="timeline" key={key || date || title || description}>
      <div className="timeline-icon" />
      <div className="timeline-content">
        <span className="date">{date}</span>
        <h5 className="title">{title}</h5>
        <p className="description">{description}</p>
      </div>
    </div>
  )

export default {
  container,
  item,
}
