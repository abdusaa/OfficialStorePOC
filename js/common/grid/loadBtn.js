import React from 'react'
import {
  View,
  Image,
  Button,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
  StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/Ionicons'

const loadMoreBtn = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAOCAMAAABaWb9VAAAARVBMVEVMaXFCtUlBtUhCtUlCtUk/tEZCtUk9s0U8s0Q9s0VBtUhCtUlBtEjO7MTW78tlw2hWvVp6y3pFtkvA5reH0Ya14q6T1ZFN/1A6AAAADXRSTlMADm0cIr80/u3UjUeDKdgoIgAAAKpJREFUKM+dksEWxBAMRdFqkqog6P9/6hhlTrfjreImEg9KrUgbi0DX/kKbIQAy2wvtFwFao3tsIYYQBd0vfVBHQMcPOZSObOusraTKnIvgLNhIUm4oCc05B0ppqCaxWhlInr1nvsWO/AmFOypwDmTl7sgnMIpibfFXAR47GmPuiHNE/RiB8NRwjaRwLDwncDM/mvDs4iAN5AOubFk42IL9hUteeMqVD/O3Ph7oErk3dMgBAAAAAElFTkSuQmCC'

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

  const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity

  return (
    <View>
      <Touchable onPress={_onClick}>
        <View style={styles.container}>
          <Icon name='ios-more' size={46} color='#42b549' />
          <Text style={styles.text}>Brand Laiyna</Text>
        </View>
      </Touchable>
    </View>
    {/* using touchableOpacity for android devices *//* <TouchableOpacity
      onPress={_onClick}
      activeOpacity={0.6}
    >
      <View style={styles.loadMore}>
        <Image source={{uri: loadMoreBtn}} style={{width: 36, height: 10, marginBottom: 3}} />
        <Text style={{color: '#42b549'}}>Other Brand</Text>
      </View>
    </TouchableOpacity> */}
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: '#42b549',
  loadMore: {
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default LoadMore