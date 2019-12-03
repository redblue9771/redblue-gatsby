import React from 'react'
import { graphql, Link } from 'gatsby'
import MainLayout from '../common/MainLayout'
import SEO from '../common/SEO'
import Carousel from '../common/Carousel'

export default ({ location }) => {
  return (
    <MainLayout location={location} title="404 Not Found">
      <main className="text-center">
        <img alt="404" src="/img/404.svg" />
        <div className="alert alert-primary" role="alert">
          <h4>
            页面不存在，旧站的页面链接已经改变，请到
            <Link to="/"> 主页 </Link>中寻找
          </h4>
        </div>
        <h4>来看看这些吧</h4>
        <Carousel />
      </main>
    </MainLayout>
  )
}
