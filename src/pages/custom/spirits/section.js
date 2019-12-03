import { graphql } from 'gatsby'
import React from 'react'
import Spirits from '../../../components/Spirits'

export default (props) => <Spirits layout={props.pageContext.type} {...props} />
