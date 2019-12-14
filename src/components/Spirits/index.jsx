import React from 'react'
import ArticleLayout from './Article.layout'
import TagIndexLayout from './TagIndex.layout'
import SeriesIndexLayout from './SeriesIndex.layout'
import CategoryIndexLayout from './CategoryIndex.layout'

export default ({ layout, ...props }) => {
  switch (layout) {
    case 'category':
      return <CategoryIndexLayout {...props} />
    case 'tag':
      return <TagIndexLayout {...props} />
    case 'series':
      return <SeriesIndexLayout {...props} />
    default:
      return <ArticleLayout {...props} />
  }
}
