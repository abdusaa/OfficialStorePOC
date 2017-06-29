import React from 'react'
import { View, Image, Button } from 'react-native'
import PropTypes from 'prop-types'

const LoadMore = ({ onLoadMore, onSlideMore, offset, limit, canFetch, isFetching }) => {
  _onClick = () => {
    if (isFetching) {
      return
    } else {
      if (canFetch) {
        onLoadMore(limit, offset)
      } else {
        onSlideMore()
      }
    }
  }

  return (
    <Button
      onPress={_onClick}
      title="Brand Laiyna"
      color="#42b549"
    />
  )
}

export default LoadMore