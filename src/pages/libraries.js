import React from 'react'
import MainLayout from '../components/MainLayout'

export default ({ data, location }) => {
  return (
    <MainLayout
      location={location}
      sectionProps={{
        title: '博采众长',
        subTitle: '君知其难，则自能旁搜博采',
      }}
    >
      <section>
        <h3 className="mb-3 text-new" />
        <ul>
          <li id="{{.name}}" className="clearfix mb-3">
            <div>《 .name 》-.author</div>
            <div className="text-muted">简述：.description</div>

            <div className="text-muted tags mb-3">
              关键词：.tag
              <a rel="bookmark" />
            </div>
            <a
              className="btn btn-outline-primary float-right btn-sm"
              href="/libraries/{{.path}}"
              target="_blank"
              rel="contents"
            >
              Download / Read
            </a>
          </li>
        </ul>
      </section>
    </MainLayout>
  )
}
