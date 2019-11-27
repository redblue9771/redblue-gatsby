import React from 'react'
import { Link, graphql } from 'gatsby'

import Icon from '@mdi/react'
import { mdiLoading } from '@mdi/js'
import MainLayout from '../components/MainLayout'
import SEO from '../components/seo'

import Carousel from '../components/Carousel'

export default ({ data, location }) => {
  const siteTitle = `${data.site.siteMetadata.title} - 其实你知的我是那面`
  const posts = data.allMarkdownRemark.edges

  return (
    <MainLayout
      location={location}
      sectionProps={{
        title: '凡所有相，皆是虚妄',
        subTitle: 'JUST FOR MAN FASHION NEWISM',
      }}
      fluid
    >
      <div className="limit-area text-center index-module-0">
        <h2>·&nbsp;推荐&nbsp;·</h2>
        <Carousel />
        <div>
          <div height="20vh,40vh" width="75vw,70vw" />
        </div>
        <img
          src="/img/gopher_head.png"
          alt=""
          className="trans-img div-shadow"
        />
      </div>
      <div className="index-module-1 text-center div-shadow">
        <h2>I'm RedBlue</h2>
        <h3>你好，我是赤琦</h3>
        <div className="row limit-area">
          <div className="col-md-4 pd-1 text-center bg-color-blue">
            <dl>
              <dt>
                <h4>·&nbsp;博文&nbsp;·</h4>
              </dt>
              {posts.map(({ node }) => {
                const title = node.frontmatter.title || node.fields.slug
                return (
                  <dd key={node.fields.slug}>
                    <Link
                      className="d-block text-truncate"
                      to={node.fields.slug}
                    >
                      {title}
                    </Link>
                    <time className="d-block text-truncate">
                      {node.frontmatter.date}
                    </time>
                  </dd>
                )
              })}
              <dd>
                <a href="" className="d-block text-truncate" />
              </dd>
            </dl>
          </div>
          <div className="col-md-4 pd-1 text-center bg-color-white">
            <dl id="github-list">
              <dt>
                <h4>·&nbsp;项目&nbsp;·</h4>
              </dt>
              <dd>
                <p>
                  <Icon path={mdiLoading} spin={1} size={1} />从
                  github.com/redblue 拉取中…
                </p>
              </dd>
            </dl>
          </div>
          <div className="col-md-4 pd-1 text-center bg-color-red">
            <dl>
              <dt>
                <h4>·&nbsp;关于&nbsp;·</h4>
              </dt>
              <dd>
                <p>
                  🙋‍♂️ 赤琦：赤红色的美玉
                  <br />✨ RedBlue：据赤红，琦蓝而译
                </p>
              </dd>
              <dd>
                <p>
                  <i className="la la-location-arrow"> </i>
                  Lcation：福州
                </p>
              </dd>
              <dd>
                <p>
                  <i className="la la-graduation-cap"> </i>
                  专业：物联网工程
                </p>
              </dd>
              <dd>
                <p>
                  <i className="la la-atom"></i>
                  简介：来自彩云之南的 95
                  后男孩，偏执的完美主义者，体现在方方面面。
                  <br />
                  爱科技、爱搞机、爱摄影、爱一切美好的事物，追求源于热爱。
                </p>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div className="limit-area pt-5">
        <h4 className="d-block text-center">·&nbsp;编码统计&nbsp;·</h4>
        <figure>
          <embed src="https://wakatime.com/share/@redblue/31eeb3ce-ba04-46d4-be43-9c09edf88c5c.svg" />
        </figure>
      </div>
    </MainLayout>
  )
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { fields: { draft: { ne: false } } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 5
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
