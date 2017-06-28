import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/EvilIcons';
import { Image, TouchableOpacity } from 'react-native'
class Wishlist extends Component {
  render() {
    return (
      <TouchableOpacity>
        <Icon name='heart' size={30} />
      </TouchableOpacity>
    )
  }
}

export default Wishlist
