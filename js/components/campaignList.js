import React from 'react'
import PropTypes from 'prop-types'
import { 
  Text,
  View,
  ListView,
  StyleSheet,
  Image } from 'react-native'
import WishListButton from '../common/WishlistButton'

const CampaignList = ({ campaigns }) => {
  const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
  const campaignsData = ds.cloneWithRows(campaigns)

  return (
    <View style={styles.container}>
      <ListView
        enableEmptySections={true}
        dataSource={campaignsData}
        renderRow={renderCampaign}>
      </ListView>
    </View>
  )
}

const renderCampaign = (c) => {
  const products = c.Products
  const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
  const productGrid = []
  for (let i = 0; i < products.length; i += 2) {
    const productRow = []
    for (let j = i; j < i + 2; j += 1) {
      if (!products[j]) {
        break
      }
      productRow.push(
        <View style={{ flex: 1, borderColor: 'black', borderWidth: 1, borderColor: '#e0e0e0' }} key={products[j].data.id}>
          <Image source={{ uri: products[j].data.image_url }} style={{ height: 185 }}></Image>
          <Text style={{ fontSize: 13, fontWeight: "600" }}>{products[j].data.name}</Text>
          <Text style={{ color: '#ff5722', fontSize: 13, fontWeight: '600', lineHeight: 20 }}>{products[j].data.price}</Text>
          <WishListButton/>
        </View>
      )
    }
    productGrid.push(
      <View style={{ flex: 1, flexDirection: 'row', borderBottomColor: '#fff', borderBottomWidth: 1 }} key={i}>
        {productRow}
      </View>
    )
  }
  return (
    <View style={{ paddingBottom: 20 }}>
      <Text style={{ fontSize: 16, fontWeight: "600", margin: 10 }}>{c.title}</Text>
      < Image source={{ uri: c.mobile_url }} style={{ height: 110 }} />
      {productGrid}
    </View >
  )
}

CampaignList.propTypes = {
  campaigns: PropTypes.array
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#fff',
    
  },
});

export default CampaignList