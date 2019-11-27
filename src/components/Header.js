import React from "react"

export default ({ location, title, date, children }) => {
  const renderTitle = () => {
    if (location.pathname === `${__PATH_PREFIX__}/`) {
      return (
        <React.Fragment>
          <h1 className="display-1" id="post-title">
            {title}
          </h1>
          <h2 />
        </React.Fragment>
      )
    } 
      return (
        <React.Fragment>
          <h1 className="display-1" id="post-title">
            {title}
          </h1>
          <span>日期：</span>
          <time>{date}</time>
        </React.Fragment>
      )
    
  }

  return (
    <div className="head">
      <div className="header">
        <header id="head">{renderTitle()}</header>
      </div>
      <div className="header-after" />
    </div>
  )
}
