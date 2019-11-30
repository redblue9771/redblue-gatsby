import React from 'react'
import { PageState } from '../components/MainLayout'
import libraries from '../data/libraries.json'

export default ({ data }) => {
  const { setCurrPageState } = React.useContext(PageState)

  React.useEffect(() => {
    setCurrPageState({
      title: '藏经',
      subTitle: '博采众长',
      description: '君知其难，则自能旁搜博采',
      layout: 'public',
    })
  }, [])

  return (
    <section>
      {Object.keys(libraries).map((libTitle) => (
        <React.Fragment key={libTitle}>
          <h3 className="mb-3 text-new">{libTitle}</h3>
          <ul>
            {Object.values(libraries[libTitle]).map(
              ({ name, author, path, description, keywords }) => (
                <li id={name} className="clearfix mb-3" key={name}>
                  <div>
                    {name} - {author}
                  </div>
                  <div className="text-muted">简述：{description}</div>

                  <div className="text-muted tags mb-3">
                    关键词：{keywords.join('、')}
                  </div>
                  <a
                    className="btn btn-outline-primary float-right btn-sm"
                    href={`/libraries/${path}`}
                    target="_blank"
                    rel="contents noopener noreferrer"
                    download
                  >
                    Download / Read
                  </a>
                </li>
              )
            )}
          </ul>
        </React.Fragment>
      ))}
    </section>
  )
}
