import Link from 'gatsby-plugin-transition-link/AniLink'
import parse from 'html-react-parser'
import 'katex/dist/katex.min.css'
import React, { useRef } from 'react'
import '../../assets/css/highlighting.css'
import { PageState } from '../common/MainLayout'

export default ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const { previous, next } = pageContext
  const { frontmatter, tableOfContents, html: _html } = post
  const commentRef = useRef(null)
  const { setCurrPageState } = React.useContext(PageState)

  React.useEffect(() => {
    setCurrPageState({
      title: frontmatter.title,
      subTitle: frontmatter.title,
      date: frontmatter.date,
      description: frontmatter.description,
      layout: 'post',
    })
  }, [frontmatter])

  console.log(post)

  React.useEffect(() => {
    const commentScript = document.createElement('script')
    commentScript.async = true
    commentScript.src = 'https://utteranc.es/client.js'
    commentScript.setAttribute('repo', 'redblue9771/comments-for-redblue') // PLEASE CHANGE THIS TO YOUR REPO
    commentScript.setAttribute('issue-term', 'url')
    commentScript.setAttribute('id', 'utterances')
    commentScript.setAttribute('theme', 'github-light')
    commentScript.setAttribute('crossorigin', 'anonymous')
    commentScript.setAttribute('label', 'comment')

    if (commentRef && commentRef.current) {
      commentRef.current.appendChild(commentScript)
    } else {
      console.log(`Error adding utterances comments on: ${commentRef}`)
    }
  }, [commentRef])

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
              <tr>
                <td>原文</td>
                <td>
                  {frontmatter.original === '来自互联网' ? (
                    frontmatter.original
                  ) : (
                    <a
                      href={frontmatter.original || location.href}
                      target="_blank"
                      rel="noopener noreferrer copyright"
                    >
                      {frontmatter.original || location.href}
                    </a>
                  )}
                </td>
              </tr>
              <tr>
                <td>作者</td>
                <td>{frontmatter.author}</td>
              </tr>
              <tr>
                <td>标签</td>
                <td>{frontmatter.tags.join('、')}</td>
              </tr>
            </tbody>
          </table>
        </address>

        <div className="divider d-none d-md-block">
          <span />
          <span>📖 正文</span>
          <span />
        </div>
        <article id="blog-article">{parse(_html)}</article>
        <p>（完）</p>
        <div className="divider">
          <span />
          <span>🙋 评论</span>
          <span />
        </div>
        <div ref={commentRef} className="comment" />
      </main>

      <aside className="sticky-top float-md-right" id="blog-aside">
        <section>
          <div className="divider">
            <span />
            <span>📚 目录</span>
            <span />
          </div>

          <nav id="TableOfContents">{parse(tableOfContents)}</nav>
        </section>
        <section>
          <div className="divider">
            <span />
            <span>🧐 更多</span>
            <span />
          </div>

          {previous && (
            <React.Fragment>
              <span style={{ fontSize: 'smaller' }}>上一篇：</span>
              <Link to={previous.fields.slug} rel="prev" className="d-block">
                {previous.frontmatter.title}
              </Link>
            </React.Fragment>
          )}

          {next && (
            <React.Fragment>
              <span style={{ fontSize: 'smaller' }}>下一篇：</span>
              <Link to={next.fields.slug} rel="next" className="d-block">
                {next.frontmatter.title}
              </Link>
            </React.Fragment>
          )}
        </section>
      </aside>
    </React.Fragment>
  )

  // return (
  //   <MainLayout location={location} title={siteTitle}>

  //           {post.fields.category && (
  //             <card className="my-4">
  //               <card>Filed Under</card>
  //               <card>
  //                 <Link fade  to={`/category/${post.fields.category}`}>
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
  //                   <Link fade
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
  //                 <Link fade
  //                   to={previous.fields.slug}
  //                   rel="prev"
  //                   className="btn btn-secondary"
  //                 >
  //                   ← {previous.frontmatter.title}
  //                 </Link>
  //               )}

  //               {next && (
  //                 <Link fade
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
