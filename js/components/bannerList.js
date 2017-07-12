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

import Swiper from 'react-native-swiper'

const { height, width } = Dimensions.get('window')

const BannerList = ({ banners, onBannerPress, onViewAllPress }) => {
  const topBanners = banners.filter(banner => banner.html_id === 0)
  return (
    <View height={215} backgroundColor={'rgba(0, 0, 0, 0.05)'} paddingBottom={10}>
      <Swiper 
        autoplay={true}
        showsPagination={true}
        autoplayTimeout={5}
        height={205}
        style={styles.bannerSwipe}
        paginationStyle={styles.bannerPagination}
        activeDotColor={'#FF5722'}
        >
        {
          topBanners.map((banner, index) => (
            <TouchableWithoutFeedback key={index} onPress={(e) => onBannerPress(e, banner)}>
              <View key={banner.banner_id} style={styles.bannerBox}>
                <Image source={{ uri: banner.image_url }} style={styles.pageStyle} />
              </View>
            </TouchableWithoutFeedback>
          ))
        }
      </Swiper>
      {/* <ViewPagerAndroid
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
      </ViewPagerAndroid>  */}
      <Text
        style={styles.viewAll}
        onPress={onViewAllPress}> Lihat Semua Promo  >
      </Text>
    </View>
  )
}

var styles = StyleSheet.create({
  container: {
    //marginVertical: 10
  },
  bannerBox: {
    width: width,
    height: 180
  },
  pageStyle: {
    alignItems: 'center',
    width: width,
    height: 180,
    resizeMode: 'contain',
  },
  viewAll: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    color: '#42b549',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'right',
    padding: 10
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerPagination: {
    justifyContent: 'flex-start',
    position: 'absolute',
    width: 210,
    left: 10,
    bottom: 0,
  }
})

BannerList.propTypes = {
  banners: PropTypes.array,
  onBannerPress: PropTypes.func,
  onViewAllPress: PropTypes.func,
}

export default BannerList