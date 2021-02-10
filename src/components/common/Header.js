import React from 'react'

export default ({
  subTitle = '',
  description = '',
  date,
  layout = '',
  offset = 0,
}) => {
  const renderTitle = () => {
    switch (layout) {
      case 'post':
        return (
          <React.Fragment>
            <h1 className="display-1" id="post-title">
              {subTitle}
            </h1>
            <span>日期：</span>
            <time>{date}</time>
          </React.Fragment>
        )

      default:
        return (
          <React.Fragment>
            <h1 className="display-1" id="post-title">
              {subTitle}
            </h1>
            <h2>{description}</h2>
          </React.Fragment>
        )
    }
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
