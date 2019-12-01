import React from 'react'
import { Link, graphql } from 'gatsby'

import Icon from '@mdi/react'
import { mdiLoading } from '@mdi/js'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { PageState } from '../components/MainLayout'
import SEO from '../components/SEO'

import Carousel from '../components/Carousel'

import GitHub from '../assets/img/undraw_developer_activity.svg'

const GITHUB_QUERY = gql`
  {
    viewer {
      repositories(
        privacy: PUBLIC
        isFork: false
        first: 5
        orderBy: { field: UPDATED_AT, direction: DESC }
      ) {
        nodes {
          name
          description
          url
        }
      }
    }
  }
`

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      filter: { fields: { draft: { ne: true } } }
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

export default ({
  data: {
    allMarkdownRemark: { edges: posts = [] },
  },
}) => {
  const { setCurrPageState } = React.useContext(PageState)
  const { loading, error, data } = useQuery(GITHUB_QUERY)

  console.log(GitHub)

  React.useEffect(() => {
    setCurrPageState({
      title: 'RedBlue | 赤琦',
      subTitle: '凡所有相，皆是虚妄',
      description: 'JUST FOR MAN FASHION NEWISM',
      layout: 'home',
    })
  }, [])

  return (
    <React.Fragment>
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
            </dl>
          </div>
          <div
            className="col-md-4 pd-1 text-center bg-color-white"
            style={{
              background: `url(${GitHub}) #fff`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundOrigin: 'content-box',
            }}
          >
            <dl
              id="github-list"
              style={{ backgroundColor: 'rgba(255,255,255,0.618)' }}
            >
              <dt>
                <h4>·&nbsp;项目&nbsp;·</h4>
              </dt>

              {(loading || error) && (
                <dd>
                  <p>
                    <Icon path={mdiLoading} spin={1} size={1} />
                    `从 github.com/redblue9771 拉取中…`
                  </p>
                </dd>
              )}
              {data &&
                data.viewer.repositories.nodes.map(
                  ({ name, description, url }) => (
                    <dd key={name}>
                      <a
                        href={url}
                        className="d-block text-truncate"
                        target="_blank"
                        rel=""
                      >
                        {name}
                        <time className="d-block text-truncate">
                          {description || 'No Description'}
                        </time>
                      </a>
                    </dd>
                  )
                )}
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
                  <i className="la la-atom" />
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
          <object
            title="编码统计"
            type="image/svg+xml"
            data="https://wakatime.com/share/@redblue/31eeb3ce-ba04-46d4-be43-9c09edf88c5c.svg"
          />
        </figure>
      </div>
    </React.Fragment>
  )
}
