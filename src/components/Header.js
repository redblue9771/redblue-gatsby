import React from "react"

export default ({ location, title, children }) => {
  const renderTitle = () => {
    if (location.pathname === `${__PATH_PREFIX__}/`) {
      return (
        <>
          <h1 className="display-1" id="post-title">
            {title}
          </h1>
          <h2></h2>
        </>
      )
    } else {
      return (
        <>
          <h1 className="display-1" id="post-title">
            {title}
          </h1>
          <span>日期：</span>
          <time></time>
        </>
      )
    }
  }

  return (
    <div className="head">
      <div className="header">
        <header id="head">{renderTitle()}</header>
      </div>
      <div className="header-after"></div>
    </div>
  )
}
