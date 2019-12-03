import React from 'react'
import ArticleLayout from './Article.layout'
import TagIndexLayout from './TagIndex.layout'
import SeriesIndexLayout from './SeriesIndex.layout'

export default ({ layout, ...props }) => {
  switch (layout) {
    case 'category':
      return <ArticleLayout {...props} />
    case 'tag':
      return <TagIndexLayout {...props} />
    case 'series':
      return <SeriesIndexLayout {...props} />
    default:
      return <ArticleLayout {...props} />
  }
}
