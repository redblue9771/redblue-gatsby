import { graphql, Link } from 'gatsby'
import 'katex/dist/katex.min.css'
import React from 'react'
import '../assets/css/highlighting.css'
import { PageState } from '../components/MainLayout'

export default ({ data, pageContext }) => {
  const post = data.markdownRemark
  const { previous, next } = pageContext
  const { frontmatter } = post

  const { setCurrPageState } = React.useContext(PageState)

  React.useEffect(() => {
    setCurrPageState({
      title: frontmatter.title,
      subTitle: frontmatter.title,
      date: frontmatter.date,
      layout: 'post',
    })
  }, [])

  const renderAside = () => {
    return (
      <aside className="sticky-top float-md-right" id="blog-aside">
        <section>
          <div className="divider">
            <span />
            <span>更多</span>
            <span />
          </div>

          {previous && (
            <Link to={previous.fields.slug} rel="prev" className="d-block">
              上一篇：{previous.frontmatter.title}
            </Link>
          )}

          {next && (
            <Link to={next.fields.slug} rel="next" className="d-block">
              下一篇：{next.frontmatter.title}
            </Link>
          )}
        </section>
      </aside>
    )
  }

  return (
    <React.Fragment>
      <main id="blog-single">
        <address>
          <table className="copyright">
            <tbody>
              <tr>
                {frontmatter.original ? (
                  <React.Fragment>
                    <td>协议</td>
                    <td>遵照原文使用协议，详情查看原文出处。</td>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <td>协议</td>
                    <td>
                      采用
                      <a
                        rel="license"
                        href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
                        // eslint-disable-next-line react/jsx-no-target-blank
                        target="_blank"
                      >
                        <i className="fa fa-cc" />
                        知识共享署名 - 非商业性使用 -
                        相同方式共享4.0国际许可协议
                      </a>
                      进行许可
                    </td>
                  </React.Fragment>
                )}
              </tr>
              {/* <tr>
          <td>原文</td>

          <td>{{$.Permalink}}</td>
          {{else}} {{if eq (.Page.Param "original") "来自互联网"}}
          <td><a>{{- .Page.Param "original"}}</a></td>
          {{else}}
          <td><a href='{{.Page.Param "original"}}' target="_blank" rel="copyright">{{.Page.Param "original"}}</a></td>
          {{end -}} {{end -}}
        </tr> */}
              <tr>
                <td>作者</td>
                <td>{frontmatter.author}</td>
              </tr>
            </tbody>
          </table>
        </address>
        <div className="divider d-none d-md-block">
          <span />
          <span>正文</span>
          <span />
        </div>
        <article
          id="blog-article"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <p>（完）</p>
        <div className="divider">
          <span />
          <span>评论</span>
          <span />
        </div>
        {/* <script src="https://utteranc.es/client.js" repo="redblue9771/comments-for-redblue" issue-term="url" label="comment" theme="github-light" crossorigin="anonymous" async></script> */}
      </main>
      {renderAside()}
    </React.Fragment>
  )

  // return (
  //   <MainLayout location={location} title={siteTitle}>

  //           {post.fields.category && (
  //             <card className="my-4">
  //               <card>Filed Under</card>
  //               <card>
  //                 <Link to={`/category/${post.fields.category}`}>
  //                   {post.fields.category}
  //                 </Link>
  //               </card>
  //             </card>
  //           )}
  //           {post.fields.tags && (
  //             <card className="my-4">
  //               <card>Tags</card>
  //               <card>
  //                 {post.fields.tags.map(tag => (
  //                   <Link
  //                     to={`/tags/${tag}`}
  //                     className="badge badge-primary p-2 m-1"
  //                   >
  //                     {tag}
  //                   </Link>
  //                 ))}
  //               </card>
  //             </card>
  //           )}
  //           <card>
  //             <card>See our other posts</card>
  //             <card>
  //               {previous && (
  //                 <Link
  //                   to={previous.fields.slug}
  //                   rel="prev"
  //                   className="btn btn-secondary"
  //                 >
  //                   ← {previous.frontmatter.title}
  //                 </Link>
  //               )}

  //               {next && (
  //                 <Link
  //                   to={next.fields.slug}
  //                   rel="next"
  //                   className="btn btn-secondary"
  //                 >
  //                   {next.frontmatter.title} →
  //                 </Link>
  //               )}
  //             </card>
  //           </card>
  //         </div>
  //       </div>
  //     </container>
  //   </MainLayout>
  // )
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        original
        author
      }
      fields {
        slug
      }
    }
  }
`
