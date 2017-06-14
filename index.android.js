/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import axios from 'axios'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ListView,
  fetch,
} from 'react-native';

export default class OfficialStorePOC extends Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      dataSource: ds.cloneWithRows([])
    }
  }

  componentDidMount() {
    const URL = `https://mojito.tokopedia.com/os/api/v1/brands/microsite/campaigns?device=lite&full_domain=tokopedia.lite:3000&image_size=200&image_square=true`
    axios.get(URL)
      .then((response) => {
        const campaigns = response.data.data.campaigns
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
        this.setState({
          dataSource: ds.cloneWithRows(campaigns)
        })
      })
      .catch((error) => {
        console.log('This is the error I got')
        console.log(error)
      })
  }

  renderCampaign = (c) => {
    const products = c.Products
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    const productGrid = []
    for (let i = 0; i < products.length; i += 2) {
      const productRow = []
      for (let j = i; j < i + 2; j += 1) {
        console.log(products[j].data)
        productRow.push(
          <View style={{flex: 1 }} key={products[j].data.id}>
            <Image source={{ uri: products[j].data.image_url }} style={{height: 185}}></Image>
            <Text>{products[j].data.name}</Text>
            <Text style={{ color: '#ff5722', fontSize: 13, fontWeight:'600', lineHeight: 20}}>{products[j].data.price}</Text>
          </View>
        )
      }
      productGrid.push(
        <View style={{ flex: 1, flexDirection: 'row', padding: 10, borderBottomColor: '#fff', borderBottomWidth: 1 }} key={i}>
          {productRow}
        </View>
      )
    }
    return (
      <View style={{ paddingBottom: 20 }}>
        < Image source={{ uri: c.mobile_url }} style={{ height: 110 }} />
        {productGrid}
        {/*<ListView
          dataSource={ds.cloneWithRows(products)}
          renderRow={this.renderProduct}
        ></ListView>*/}
      </View >
    )
  }

  renderProduct = (p) => {
    const product = p.data
    return <Text>{product.name}</Text>
  }

  render() {
    if (this.state.dataSource.rowIdentities[0].length === 0) {
      console.log('length zero called')
      return <Text>Loading...</Text>
    }
    return (
      <View style={styles.container}>
        <ListView
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={this.renderCampaign}>
        </ListView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#fff'
  },
});

AppRegistry.registerComponent('OfficialStorePOC', () => OfficialStorePOC);
