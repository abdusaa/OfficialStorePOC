import React from 'react'
import PropTypes from 'prop-types'
import {
  Text,
  View,
  ListView,
  StyleSheet,
  Image,
  Linking,
  TouchableWithoutFeedback,
} from 'react-native'
// import Icon from 'react-native-vector-icons/EvilIcons';
import WishListButton from '../common/Wishlist/WishlistButton'

// base64 icon arrow left
let iconArrowLeft = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAASCAMAAABYd88+AAAAJFBMVEVMaXFCtklEuE1CtklDtklCtklCt0pEt0tHvFFDt0pCtklCtUkTJ4UyAAAAC3RSTlMA9ibcW7RKQRJzkSHJrzwAAABNSURBVAjXZc5LDgAhCANQRMQP97+vspjaiax4ibaIqAlmlKhKINlR6Z96Ch+1RsT8aSGlHTU0pIwf+hvB4Vw74x60aPdsGALcNnHHugEqcwKnDQT24AAAAABJRU5ErkJggg=='

const CampaignList = ({ campaigns, onCampaignPress }) => {
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
  const products = c.Products || []
  const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
  const productGrid = []
  let isDiscount = false
  if (products.length > 0) {
    for (let i = 0; i < products.length; i += 2) {
      const productRow = []
      for (let j = i; j < i + 2; j += 1) {
        if (!products[j]) {
          break
        }

        if (products[j].data.discount_percentage) {
          isDiscount = true
        }

        productRow.push(
          <View style={styles.productCell} key={products[j].data.id}>
            <TouchableWithoutFeedback onPress={() => Linking.openURL(products[j].data.url)}>
              <View>
                <View style={styles.productImageWrapper}>
                  <Image source={{ uri: products[j].data.image_url }} style={styles.productImage} />
                </View>
                <Text style={styles.productName} ellipsizeMode='tail'
                  numberOfLines={2}>{products[j].data.name}</Text>
              </View>
            </TouchableWithoutFeedback>
            <View style={styles.productGridPrice}>
              <View style={styles.productGridNormalPrice}>
                <Text style={styles.productGridNormalPriceText}>{products[j].data.original_price}</Text>
              </View>
            </View>
            <View style={styles.priceWrapper}>
              <Text style={styles.price}>{products[j].data.price}</Text>
              {/* <View style={styles.productCashback} key={1}>
                <Text style={styles.cashbackText}>ggsgsgs</Text>
              </View> */}
            </View>
            <View style={styles.productBadgeWrapper}>
              {
                products[j].data.labels.map((l, index) => {
                  let labelTitle = l.title
                  if (l.title.indexOf('Cashback') > -1) {
                    labelTitle = 'Cashback'
                  }
                  const key = `${products[j].id}-${labelTitle}`
                  switch (labelTitle) {
                    case 'PO':
                    case 'Grosir':
                      return (
                        <View style={styles.productLabel} key={index}>
                          <Text style={styles.labelText}>{l.title}</Text>
                        </View>)
                    case 'Cashback':
                      return (
                        <View style={styles.productCashback} key={index}>
                          <Text style={styles.cashbackText}>{l.title}</Text>
                        </View>
                      )
                    default:
                      return null
                  }
                })
              }
            </View>
            <TouchableWithoutFeedback onPress={() => Linking.openURL(products[j].data.shop.url)}>
              <View style={styles.shopSection}>
                <View style={styles.shopImageWrapper}>
                  <Image source={{ uri: products[j].brand_logo }} style={styles.shopImage} />
                </View>
                <View style={styles.shopNameWrapper}>
                  <Text style={{ lineHeight: 15 }} ellipsizeMode='tail'
                    numberOfLines={1}>{products[j].data.shop.name}</Text>
                </View>
                {
                  products[j].data.labels.map((badge, index) => {
                    if (badge.title === 'Free Return') {
                      return (
                        <View style={styles.badgeFreeReturn}>
                          <Image style={{resizeMode: 'contain', width: 20, height: 20}} source={badge.image_url} />
                        </View>
                      )
                    }
                  })
                }
              </View>
            </TouchableWithoutFeedback>
            <WishListButton
              isWishlist={products[j].data.is_wishlist || false}
              productId={products[j].data.id} />
          </View>
        )
      }
      productGrid.push(
        <View style={styles.productRow} key={i}>
          {productRow}
        </View>
      )
    }
  }
  return (
    <View style={{ backgroundColor: '#FFF', marginTop: 20, marginBottom: 10 }}>
      {
        c.html_id === 6 ? null : <Text style={styles.titleText}>{c.title}</Text>
      }
      {
        c.html_id === 6 ? (
          <TouchableWithoutFeedback onPress={() => Linking.openURL(c.redirect_url)}>
            <Image source={{ uri: c.image_url }} style={{ resizeMode: 'contain', }} />
          </TouchableWithoutFeedback>
        ) :
          (
            <TouchableWithoutFeedback onPress={() => Linking.openURL(c.redirect_url_mobile)}>
              <Image source={{ uri: c.mobile_url }} style={{ height: 110 }} />
            </TouchableWithoutFeedback>
          )
      }
      {productGrid}
      {
        c.html_id === 6 ? null : (<View style={styles.viewAll}>
          <Text style={styles.viewAllText} onPress={() => Linking.openURL(c.redirect_url_mobile)}>View All </Text>
          <Image source={{uri: iconArrowLeft}} style={styles.iconArrowLeft} />
          {/* <Icon name='chevron-right' size={30} /> */}
        </View>)
      }
    </View>
  )
}

const _onClick = () => {

}

CampaignList.propTypes = {
  campaigns: PropTypes.array
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
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
    height: 20,
    flex: 1,
    flexDirection: 'row'
  },
  price: {
    color: '#ff5722',
    fontSize: 14,
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
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0)',
    padding: 10,
  },
  productImage: {
    height: 185,
    borderRadius: 3,
  },
  productBadgeWrapper: {
    //backgroundColor: 'red',
    height: 27,
    paddingVertical: 5,
    paddingHorizontal: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  productCashback: {
    borderRadius: 3,
    marginRight: 3,
    padding: 3,
    backgroundColor: '#42b549',
  },
  cashbackText: {
    color: '#fff',
    fontSize: 10,
  },
  shopSection: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    //borderStyle: 'dashed',
    borderTopWidth: 1,
    borderColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
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
    marginLeft: 7,
    marginBottom: 5,
    marginRight: 0,
  },
  viewAll: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  viewAllText: {
    color: '#42b549',
    fontSize: 13,
  },
  iconArrowLeft: {
    width: 6,
    height: 10,
    marginHorizontal: 10
  },
  productLabel: {
    padding: 3,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    marginRight: 3,
    padding: 3,
    backgroundColor: '#fff',
    borderRadius: 3,
  },
  labelText: {
    fontSize: 10,
  },
  productGridPrice: {

  },
  productGridNormalPrice: {
    paddingHorizontal: 10,
  },
  productGridNormalPriceText: {
    fontSize: 10,
    fontWeight: '600',
    lineHeight: 20,
    color: 'rgba(0,0,0,.5)',
    textDecorationLine: 'line-through',
  },
  badgeFreeReturn: {
    width: 20,
    height: 20,
    //backgroundColor: 'black',
    marginLeft: 4,
  }
});

export default CampaignList