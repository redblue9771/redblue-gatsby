import React from 'react'

export default ({ title = '', subTitle = '', date }) => {
  const renderTitle = () => {
    if (date) {
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
      <React.Fragment>
        <h1 className="display-1" id="post-title">
          {title}
        </h1>
        <h2>{subTitle}</h2>
      </React.Fragment>
    )
  }

  return (
    <div className="head">
      <div className="header">
        <header id="head" data-sal="fade">
          {renderTitle()}
        </header>
      </div>
      <div className="header-after" />
    </div>
  )
}
