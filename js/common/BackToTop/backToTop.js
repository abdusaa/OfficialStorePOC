import React from 'react'
import { View, TouchableOpacity, StyleSheet, Text, Image, Dimensions } from 'react-native'
// import Icon from 'react-native-vector-icons/EvilIcons'

const { width } = Dimensions.get('window')
let iconTop = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAMAAABI111xAAAAGFBMVEVMaXFLS0tLS0tLS0tLS0tLS0tLS0tLS0tOkU5DAAAAB3RSTlMAow+8kdY4HKnnKwAAAENJREFUCNdtztEOACAEBVBE/v+Po2Sp7oPZmQEggopwB1Ufdbt1WVU36VJ0GgGd6tbIGmqpvC2Ut+Wm0M9Nr1y+Y5sZxeMB3WD2HV4AAAAASUVORK5CYII='

const BackToTop = (props) => {
  return (
    <View style={{ alignItems: 'center'}}>
      {/*back to top absolute position*/}
      <TouchableOpacity style={[styles.backToTopFloat, props.isElVisible ? {bottom: 10} : { bottom: -40}]}
        underlayColor='#fff' onPress={() => props.onTap()}>
        {/* <View style={{ flex: 1, flexDirection: 'row', padding: 10, alignSelf: 'center', justifyContent: 'center', }}>
          <Text style={{ color: 'rgba(0,0,0,.7)', textAlign: 'center', fontSize: 13}}>Kembali ke atas</Text>
          <Icon name='chevron-up' size={30}/>
        </View> */}
        
        {/* using base64 for arrow icon, you can move the icon into img folder */}
        <Text style={{ color: 'rgba(0,0,0,.7)', marginRight: 7, lineHeight: 15}}>Kembali ke atas</Text>
        <Image source={{uri: iconTop}} style={styles.iconTop} />
        {/* <Icon name='chevron-up' size={30} />*/}
      </TouchableOpacity>


    </View>
  )
}

const styles = StyleSheet.create({
  backToTopFloat: {
    position: 'absolute',
    elevation: 2,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 25,
    height: 40,
    width: 170,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000000",
    shadowOpacity: 0.31,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },
  backToTopBottom: {
    width: width,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconTop: {
    width: 15,
    height: 15,
    resizeMode: 'contain'
  }
})

export default BackToTop