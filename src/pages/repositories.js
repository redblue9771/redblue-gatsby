import React from 'react'
import '../assets/css/timeline.min.css'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Icon from '@mdi/react'
import { mdiLoading } from '@mdi/js'
import { PageState } from '../components/MainLayout'

const GITHUB_QUERY = gql`
  {
    viewer {
      repositories(
        privacy: PUBLIC
        isFork: false
        first: 99
        orderBy: { field: UPDATED_AT, direction: DESC }
      ) {
        nodes {
          name
          description
          createdAt
          pushedAt
          updatedAt
          url
          forkCount
          stargazers {
            totalCount
          }
          licenseInfo {
            name
          }
          primaryLanguage {
            name
          }
          homepageUrl
        }
      }
      gists(
        privacy: PUBLIC
        first: 99
        orderBy: { field: UPDATED_AT, direction: DESC }
      ) {
        nodes {
          description
          updatedAt
          url
        }
      }
    }
  }
`

export default () => {
  const { setCurrPageState } = React.useContext(PageState)
  const { loading, error, data } = useQuery(GITHUB_QUERY)
  if (data) {
    console.log(data.viewer.repositories.nodes)
  }

  React.useEffect(() => {
    setCurrPageState({
      title: '项目',
      subTitle: '吾与徐工孰娴编码之技',
      description: 'One great project can change the world',
      layout: 'public',
    })
  }, [])

  return (
    <div className="col-md-12">
      <div className="row mb-5">
        <h3 className="mb-4">
          <a
            href="https://github.com/redblue9771"
            target="_blank"
            rel="noreferrer noopener"
          >
            <i className="fa fa-tags" /> Repositories
          </a>
        </h3>
        <div className="timeline timeline-single-column" id="github-list">
          {data &&
            data.viewer.repositories.nodes.map(
              ({
                name,
                description,
                createdAt,
                pushedAt,
                updatedAt,
                url,
                forkCount,
                stargazers: { totalCount: starCount },
                licenseInfo = { name: '' },
                primaryLanguage = { name: '' },
                homepageUrl,
              }) => (
                <div className="timeline-item" key={url}>
                  <div className="timeline-point timeline-point-info">
                    <i className="fa fa-star" />
                  </div>
                  <div className="timeline-event timeline-event-info">
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`${name} - ${description}`}
                    >
                      <div className="timeline-heading">
                        <h5 className="text-truncate">
                          <strong>{name || ''}</strong>
                        </h5>
                      </div>
                      <div className="timeline-body">
                        <p>{description}</p>
                        <small>
                          <i className="fa fa-code">
                            {primaryLanguage ? primaryLanguage.name : ''}
                          </i>
                          &nbsp;&nbsp;&nbsp;
                          <i className="fa fa-star-half-full">{starCount} </i>
                          &nbsp;&nbsp;&nbsp;
                          <i className="fa fa-code-fork"> {forkCount}</i>
                          &nbsp;&nbsp;&nbsp;
                          <i className="fa fa-balance-scale">
                            {licenseInfo ? licenseInfo.name : ''}
                          </i>
                        </small>
                      </div>
                      <div className="timeline-footer">
                        <p className="text-right text-truncate">
                          <i className="fa fa-terminal" />
                          <small>
                            最近一次更新：
                            {new Date(updatedAt).toLocaleDateString()}
                          </small>
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
              )
            )}
          {(loading || error) && (
            <div className="timeline-item">
              <div className="timeline-point timeline-point-info">
                <i className="fa fa-star" />
              </div>
              <div className="timeline-event timeline-event-info">
                <div className="timeline-heading">
                  <h5>
                    <strong>
                      <Icon path={mdiLoading} spin={1} size={1} />从
                      github.com/redblue9771 拉取中…
                    </strong>
                  </h5>
                </div>
                <div className="timeline-body">
                  <p>
                    <Icon path={mdiLoading} spin={1} size={1} />从
                    github.com/redblue9771 拉取中…
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="row">
        <h3 className="mb-4">
          <a
            href="https://gist.github.com/redblue9771"
            target="_blank"
            rel="noreferrer noopener"
          >
            <i className="fa fa-tags" /> Gist
          </a>
        </h3>
      </div>
      <div className="mb-4">
        <ul>
          {data &&
            data.viewer.gists.nodes.map(({ description, updatedAt, url }) => (
              <li key={url}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={description}
                >
                  {new Date(updatedAt).toLocaleDateString()} - {description}
                </a>
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}
