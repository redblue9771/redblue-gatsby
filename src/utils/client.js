import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import fetch from 'isomorphic-fetch'

const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://api.github.com/graphql', fetch }),
  headers: {
    Authorization: `Bearer ${process.env.GATSBY_GITHUB_TOKEN}`,
  },
  cache: new InMemoryCache(),
})

export default client
