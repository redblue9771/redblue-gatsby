import React from 'react'

const Footer = () => {
  return (
    <div className="container-fluid floor" id="fl">
      <div className="floor-info-before" />
      <div className="floor-info">
        <footer>
          <p>版权所有 &copy; 2017 - {new Date().getFullYear()} 赤琦</p>
          <p>
            Copyright &copy; 2017 - {new Date().getFullYear()} RedBlue. All
            Rights Reserved.
          </p>
          <p>
            <a href="/index.xml" target="_blank">
              <i className="las la-rss" /> RSS
            </a>
            丨
            <a href="https://github.com/redblue9771" target="_blank">
              <i className="lab la-github" /> GitHub
            </a>
            丨
            <a href="mailto:redblue9771@icloud.com" target="_blank">
              <i className="las la-at" /> E-mail
            </a>
          </p>
          <p>复兴中华 - 新中国、新时代、新青年 - 中华复兴</p>
        </footer>
      </div>
    </div>
  )
}
export default Footer
