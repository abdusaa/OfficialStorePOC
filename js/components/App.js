import React, { Component } from 'react'
import { ScrollView, View, Text, Button, TouchableHighlight, Dimensions } from 'react-native'
import OfficialStoreIntro from '../components/OfficialStoreIntro'
import BannerContainer from '../containers/bannerContainer'
import CampaignContainer from '../containers/campaignContainer'
import BrandContainer from '../containers/brandContainer'
import Infographic from '../components/infographic'
import BackToTop from '../common/BackToTop/backToTop'
import Seo from '../components/seo'

const { height } = Dimensions.get('window')
const TRIGGER_BACK_TO_TOP = 60

export default class App extends Component {
  onBackToTopTap = () => {
    this.refs.scrollView.scrollTo({ x: 0, y: 0, animatd: true });
  }

  state = {
    isVisible: false
  }

  scrollPos = (event) => {
    this.setState({
      isVisible: event.nativeEvent.contentOffset.y > TRIGGER_BACK_TO_TOP
    })
    //console.warn(this.state.isVisible)
  }

  //showScrollToTop = () => this.scrollPos() > TRIGGER_BACK_TO_TOP

  render() {
    return (
      <View style={{backgroundColor: 'rgba(0, 0, 0, 0.05)'}}>
        <ScrollView ref="scrollView" showsVerticalScrollIndicator={false} onScroll={this.scrollPos} >
          <OfficialStoreIntro />
          <BannerContainer />
          <CampaignContainer />
          <BrandContainer />
           <Infographic />
          <Seo /> 
        </ScrollView>
       <BackToTop onTap={this.onBackToTopTap} isElVisible={this.state.isVisible} />
      </View>
    )
  }
}