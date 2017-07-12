import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Button,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
  Text,
  View,
  Image,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { addToWishlist, removeFromWishlist } from '../../actions/actions'

class Wishlist extends Component {
  _onTap = (isWishlist, pId) => {
    if (isWishlist) {
      this.props.dispatch(removeFromWishlist(pId))
    } else {
      this.props.dispatch(addToWishlist(pId))
    }
  }

  render() {
    const isWishlist = this.props.isWishlist || false
    const productId = this.props.productId
    const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity
    return (
      <View style={styles.wrapper}>
        <Touchable onPress={() => this._onTap(isWishlist, productId)} style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            {
              // isWishlist ? (<Icon name='ios-heart' size={25} color="#f33960" />) :
              //   (<Icon name='ios-heart-outline' size={25} />)

              isWishlist ? (<Image source={require('../Wishlist/assets/love.png')} style={{resizeMode: 'contain', width: 23, height: 20}} />) : (<Image source={require('../Wishlist/assets/notlove.png')} style={{resizeMode: 'contain', width: 23, height: 20}} />)
            }
          </View> 
        </Touchable>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    elevation: 1,
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: '#fff',
    borderWidth: 0,
    width: 45,
    height: 45,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 200
    }
  }
})

export default connect()(Wishlist)
