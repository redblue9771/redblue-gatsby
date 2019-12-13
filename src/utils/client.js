import ApolloClient from 'apollo-boost'
import fetch from 'isomorphic-fetch'

export default new ApolloClient({
  uri: 'https://api.github.com/graphql',
  headers: {
    Authorization: `Bearer ${process.env.GATSBY_GITHUB_TOKEN}`,
  },
  fetch,
})
