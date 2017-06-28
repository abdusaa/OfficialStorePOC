import React from 'react'
import { Button } from 'react-native'

const LoadMore = (props) => {
  console.log('LoadMore props', props)
  return (
    <Button
      title="Load More"
      color="#841584"
      accessibilityLabel="Load More Brands"
      onPress={() => { props.canFetch && !props.isFetching ? props.onLoadMore(props.limit, props.offset): null}}
    />
  )
}

export default LoadMore