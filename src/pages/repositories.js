import React from 'react'
import MainLayout from '../components/MainLayout'
import '../assets/css/timeline.min.css'

export default ({ location }) => {
  return (
    <MainLayout location={location} title="aa">
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
            <div className="timeline-item">
              <div className="timeline-point timeline-point-info">
                <i className="fa fa-star" />
              </div>
              <div className="timeline-event timeline-event-info">
                <div className="timeline-heading">
                  <h5>
                    <strong>
                      <i className="fa fa-spinner fa-pulse" /> 从
                      github.com/redblue 拉取中…
                    </strong>
                  </h5>
                </div>
                <div className="timeline-body">
                  <p>
                    <i className="fa fa-spinner fa-pulse" /> 从
                    github.com/redblue 拉取中…
                  </p>
                </div>
              </div>
            </div>
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
      </div>
    </MainLayout>
  )
}
