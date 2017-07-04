import React, { Component } from 'react'
import { ScrollView, View, Text, Button, StyleSheet, TouchableHighlight, Dimensions } from 'react-native'
import BannerContainer from '../containers/bannerContainer'
import CampaignContainer from '../containers/campaignContainer'
import BrandContainer from '../containers/brandContainer'
import Infographic from '../components/infographic'
import BackToTop from '../common/BackToTop/backToTop'

export default class App extends Component {
  onBackToTopTap = () => {
    this.refs.scrollView.scrollTo({ x: 0, y: 0, animatd: true });
  }

  render() {
    return (
      <View>
        <ScrollView ref="scrollView">
          <BannerContainer />
          <CampaignContainer />
          <BrandContainer />
          <Infographic />
        </ScrollView>
        <BackToTop onTap={this.onBackToTopTap} />
      </View>
    )
  }
}