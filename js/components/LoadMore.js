import React from 'react'
import {
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
  Text,
  View,
  Dimensions
} from 'react-native'

const { width } = Dimensions.get('window')

const LoadMore = (props) => {
  const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity

  return (
    <Touchable
      onPress={() => { props.canFetch && !props.isFetching ? props.onLoadMore(props.limit, props.offset) : null }}>
      <View style={styles.container}>
      <View style={styles.button}>
        <Text style={styles.text}>Lihat Selebihnya</Text>
      </View>
      </View>
    </Touchable>
    {/* using touchable Opacity for android devices, and without view Container style *//* <TouchableOpacity
      onPress={() => { props.canFetch && !props.isFetching ? props.onLoadMore(props.limit, props.offset): null}}
      style={styles.osLoadMore}
      activeOpacity={0.8} >
      <Text style={styles.osLoadMoreText}>Load More</Text>
    </TouchableOpacity> */}
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 10,
    marginBottom: 30,
  },
  button: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#fff',
    paddingVertical: 18,
    borderRadius: 3,
  },
  text: {
    color: 'rgba(0,0,0,.38)',
    textAlign: 'center',
    fontWeight: '600',
    borderWidth: 0,
    backgroundColor: '#fff',

  }
})
export default LoadMore

// <Button
    //   title="Load More"
    //   color="#841584"
    //   accessibilityLabel="Load More Brands"
    //   onPress={() => { props.canFetch && !props.isFetching ? props.onLoadMore(props.limit, props.offset): null}}
    // />
  osLoadMore: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: width - this.marginLeft - this.marginRight,
    backgroundColor: '#FFF',
    marginTop: 10,
    paddingTop: 18,
    paddingBottom: 18,
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#E0E0E0'
  },
  osLoadMoreText: {
    color: 'rgba(0, 0, 0, 0.38)',
  }
})

export default LoadMore
