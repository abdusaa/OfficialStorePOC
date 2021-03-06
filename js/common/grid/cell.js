import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import LoadMoreButton from './loadBtn'

const Cell = ({ isLastRowCell, isLastCell, data, loadMore, limit, offset, onSlideMore, canFetch, isFetching }) => {

  const cellContent = isLastRowCell && isLastCell ? (
    <View style={{ flex: 1 / 3 }}>
      <LoadMoreButton
        onLoadMore={loadMore}
        onSlideMore={onSlideMore}
        limit={limit}
        offset={offset}
        canFetch={canFetch}
        isFetching={isFetching} />
    </View>
  ) : getCellContent(data)

  return cellContent
}

const getCellContent = (data) => {
  if (data) {
    return (
      <View style={styles.cellWrapper}>
        <Image style={styles.img} source={{ uri: data.microsite_url }} />
      </View>
    )
  }

  return null
}

const styles = StyleSheet.create({
  img: {
    width: 110,
    height: 90,
  },
  cellWrapper: {
    borderRightWidth: 1,
    borderColor: '#e0e0e0',
    height: 90,
    flex: 1 / 3,
    alignItems: 'center'
  }
})

export default Cell