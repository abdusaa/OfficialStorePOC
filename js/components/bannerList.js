import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  ViewPagerAndroid,
  Platform,
  View,
  Dimensions,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  Linking,
} from 'react-native'

const { height, width } = Dimensions.get('window')

const BannerList = ({ banners, onBannerPress, onViewAllPress }) => {
  return (
    <View>
      <ViewPagerAndroid
        initialPage={0}
        style={styles.viewPager}>
        {
          banners.map((banner, index) => (
            <View key={banner.banner_id}>
              <TouchableWithoutFeedback onPress={(e) => onBannerPress(e, banner)}>
                <Image source={{ uri: banner.image_url }} style={styles.pageStyle}></Image>
              </TouchableWithoutFeedback>
            </View> 
          ))
        }
      </ViewPagerAndroid>
      <Text
        style={styles.viewAll}
        onPress={onViewAllPress}> Lihat Semua Promo  >
    </Text>
    </View>
  )
}

var styles = StyleSheet.create({
  pageStyle: {
    alignItems: 'center',
    padding: 20,
    width: width,
    height: 156,
  },
  viewPager: {
    height: 156,
  },
  viewAll: {
    color: '#42b549',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'right',
    padding: 10
  }
})

BannerList.propTypes = {
  banners: PropTypes.array,
  onBannerPress: PropTypes.func,
  onViewAllPress: PropTypes.func,
}

export default BannerList