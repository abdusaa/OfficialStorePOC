import React from 'react'
import { ScrollView, View, Text } from 'react-native'
import BannerContainer from '../containers/bannerContainer'
import CampaignContainer from '../containers/campaignContainer'
import BrandContainer from '../containers/brandContainer'
import Infographic from '../components/infographic'

const App = (props) => (
  <ScrollView>
    <BannerContainer />
    <CampaignContainer />
    <BrandContainer />
    <Infographic />
  </ScrollView>
)

export default App