import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image, ScrollView, StyleSheet, Button } from 'react-native'
import LoadMore from './LoadMore'
import Grid from '../common/grid/grid'

const BrandList = (props) => {
  console.log('Brand List props', props)
  const gridProps = {
    rows: 3,
    columns: 3,
  }

  return (
    <View>
      <Grid {...gridProps}/>
      {
        props.brands.map(b => (
          <View key={b.id} style={styles.brandContainer}>
            <View style={styles.shopHeadContainer}>
              <View style={styles.shopImageWrapper}>
                <Image style={styles.shopImage} source={{ uri: b.logo_url }} />
              </View>
              <Text
                style={styles.shopName}
                ellipsizeMode='tail'
                numberOfLines={1}>
                {b.name}
              </Text>
              {/* <Button
                onPress={() => {}}
                title="Favoritkan"
                color="#42b549"
              /> */}
            </View>
            <View style={styles.productsWrapper}>
              <ScrollView
                horizontal={true}
                automaticallyAdjustContentInsets={false}
                showsHorizontalScrollIndicator={false}>
                {
                  b.products.map(p => (
                    <View style={styles.thumb} key={p.id}>
                      <Image style={styles.productImage} source={{ uri: p.image_url }} />
                      <Text style={styles.productName}
                        ellipsizeMode='tail'
                        numberOfLines={2}>{p.name}
                      </Text>
                      <View style={styles.productNameContainer}>
                        <Text style={styles.price} >{p.price}</Text>
                        {
                          p.badges.map((b, i) => b.title === 'Free Return' ? (
                            <Image source={{ uri: b.image_url }} style={styles.badgeImage} key={i} />
                          ) : null)
                        }
                      </View>
                      <View style={styles.label}>
                        {
                          p.labels.map((l, index) => (
                            <View style={styles.productLabel} key={index}>
                              <Text style={styles.labelText}>{l.title}</Text>
                            </View>
                          ))
                        }
                      </View>
                    </View>
                  ))
                }
              </ScrollView>
            </View>
          </View>
        ))
      }
      <LoadMore
        onLoadMore={props.loadMore}
        offset={props.offset}
        limit={props.limit}
        canFetch={props.canFetch}
        isFetching={props.isFetching} />
    </View>
  )
}

const styles = StyleSheet.create({
  brandContainer: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    marginBottom: 10,
    borderColor: '#e0e0e0',
  },
  thumb: {
    padding: 7,
    borderRightWidth: 1,
    borderColor: '#e0e0e0',
  },
  productImage: {
    height: 135,
    width: 135,
  },
  shopHeadContainer: {
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
    flex: 1,
    flexDirection: 'row',
    padding: 10
  },
  shopImageWrapper: {
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#e0e0e0',
  },
  shopImage: {
    width: 50,
    height: 50,
    borderRadius: 3,
  },
  shopName: {
    marginTop: 5,//'5 5 8 10'
    marginRight: 5,
    marginBottom: 8,
    marginLeft: 10,
    fontWeight: "600",
    fontSize: 14,
    color: 'rgba(0,0,0,.7)'
  },
  productsWrapper: {
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  price: {
    color: '#ff5722',
    fontSize: 13,
    lineHeight: 18
  },
  productNameContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  productName: {
    width: 135,
    paddingTop: 4,
    paddingBottom: 4,
  },
  label: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 5,
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
  badgeImage: {
    height: 16,
    width: 16,
    alignSelf: 'flex-end'
  }
})

export default BrandList