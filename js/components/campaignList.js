import React from 'react'
import PropTypes from 'prop-types'
import {
  Text,
  View,
  ListView,
  StyleSheet,
  Image
} from 'react-native'
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
        <View style={styles.productCell} key={products[j].data.id}>
          <View style={styles.productImageWrapper}>
            <Image source={{ uri: products[j].data.image_url }} style={styles.productImage} />
          </View>
          <Text style={styles.productName} ellipsizeMode='tail'
            numberOfLines={2}>{products[j].data.name}</Text>
          <View style={styles.priceWrapper}>
            <Text style={styles.price}>{products[j].data.price}</Text>
          </View>
          {/* <WishListButton /> */}
          <View style={styles.shopSection}>
            <View style={styles.shopImageWrapper}>
              <Image source={{ uri: products[j].brand_logo }} style={styles.shopImage} />
            </View>
            <View style={styles.shopNameWrapper}>
              <Text style={{ lineHeight: 15 }} ellipsizeMode='tail'
                numberOfLines={1}>{products[j].data.shop.name}</Text>
            </View>
          </View>
        </View>
      )
    }
    productGrid.push(
      <View style={styles.productRow} key={i}>
        {productRow}
      </View>
    )
  }
  return (
    <View style={{ paddingBottom: 20 }}>
      <Text style={styles.titleText}>{c.title}</Text>
      <Image source={{ uri: c.mobile_url }} style={{ height: 110 }} />
      {productGrid}
    </View >
  )
}

CampaignList.propTypes = {
  campaigns: PropTypes.array
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  titleText: {
    fontSize: 16,
    fontWeight: "600",
    margin: 10
  },
  productRow: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  productCell: {
    flex: 1 / 2,
    borderRightWidth: 1,
    borderColor: '#e0e0e0',
  },
  priceWrapper: {
    height: 34,
  },
  price: {
    color: '#ff5722',
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 20,
    paddingHorizontal: 10,
  },
  productName: {
    fontSize: 13,
    fontWeight: "600",
    color: 'rgba(0,0,0,.7)',
    height: 33.8,
    paddingHorizontal: 10,
  },
  productImageWrapper: {
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0)',
    padding: 10,
  },
  productImage: {
    height: 185,
    borderRadius: 3,
  },
  shopSection: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    borderStyle: 'dashed',
    borderTopWidth: 1,
    borderColor: '#e0e0e0',
    justifyContent: 'center',
  },
  shopImage: {
    width: 28,
    height: 28,
  },
  shopImageWrapper: {
    width: 30,
    height: 30,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  shopNameWrapper: {
    flex: 3 / 4,
    marginTop: 7,
    marginLeft: 10,
    marginBottom: 5,
    marginRight: 0,
  }
});

export default CampaignList