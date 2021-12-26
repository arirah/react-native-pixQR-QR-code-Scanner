import React, {Component} from 'react';
 
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import { StyleSheet } from 'react-native';

class ScanScreen extends Component {
  constructor(props) {
    super(props); 
  }
  onSuccess = e => { 
    this.props.getScanData(e.data)
  };
  
  render() {
    return (
      <QRCodeScanner
        onRead={this.onSuccess} 
        flashMode={RNCamera.Constants.FlashMode.off} // on/off/auto/tourch 
        reactivate={true} 
        containerStyle={styles.containerStyle}
        cameraStyle={styles.cameraStyle} 
        showMarker
        markerStyle={styles.markerStyle}
      />
    );
  }
} 

const styles = StyleSheet.create({
  markerStyle: {
    borderColor: '#55efc4',
    borderRadius: 20,
    width: 150,
    height: 150,
  },
  cameraStyle: {
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor:'#55efc4',
    borderRadius:20
  },
  containerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
});



export default ScanScreen;
