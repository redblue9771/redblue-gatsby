import gql from 'graphql-tag'
import React from 'react'
import Repositories from '../../components/Repositories'

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

export default (props) => <Repositories {...props} />
