import React, {Component} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
  Linking,TextInput,
  ImageBackground,
} from 'react-native';

import ScanScreen from './src/ScanScreen';
import styled from 'styled-components/native';
import Clipboard from '@react-native-community/clipboard';
import URL from 'valid-url';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDarkMode: true,
      text: '',
      postURL:''
    };
    this.getScanData = this.getData.bind(this);
  }

  getData(data) {
    this.setState({
      text: data,
    });

    this.sendData()
  }

  clearData() {
    this.setState({
      text: '',
    });
  }

  showToast(text) {
    ToastAndroid.show(text, ToastAndroid.SHORT);
  }

  copyToClipboard() {
    Clipboard.setString(this.state.text);
    this.showToast('Copied !');
  }

  async openUrl() {
    const supported = await Linking.canOpenURL(this.state.text);
    if (supported) {
      await Linking.openURL(this.state.text);
    }
  }

  sendData(){
    axios.post(this.state.postURL,{data:this.state.text}).
    then(response=>{
      this.showToast('Data send successfully !');
    }).catch(error=>{
      this.showToast('POST data failed , check url');
    })
  }

  render() {
    return (
      <SafeAreaView style={styles.sectionContainer}>
        
          <ScrollView>
            <View style={{flexDirection: 'column'}}>
              <View style={{alignItems: 'center'}}>
                <Title> QR Scanner </Title>
              </View>
              <View style={{marginTop: 10, height: 300}}>
                <ScanScreen getScanData={this.getScanData} />
              </View>
              <View style={{marginTop: 10}}>
                <Label>Output:</Label>
                <TextArea>{this.state.text}</TextArea>

                <CustomTextInput value={(!this.state.postURL)?'http://':this.state.postURL} onChangeText={(e)=>{this.setState({postURL:e})}} placeholder="Enter post api"/>


                {this.state.text ? (
                  <TouchableOpacity
                    onPress={() => {
                      this.copyToClipboard();
                    }}>
                    <CustomButton> Copy to Clipboard </CustomButton>
                  </TouchableOpacity>
                ) : null}

                


                {URL.isUri(this.state.text) ? (
                  <TouchableOpacity
                    onPress={() => {
                      this.openUrl();
                    }}>
                    <CustomButton> Go to URL </CustomButton>
                  </TouchableOpacity>
                ) : null}

                

                {this.state.text ? (
                  <TouchableOpacity onPress={() => this.clearData()}>
                    <CustomButton> Clear </CustomButton>
                  </TouchableOpacity>
                ) : null}
                <Text
                  style={{
                    marginBottom: 10,
                    fontFamily: 'Quicksand-Medium',
                    fontSize: 30,
                  }}>
                  {' '}
                </Text>
              </View>
            </View>
          </ScrollView> 
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 0,
    padding: 0,
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#636e72',
  },
  buttonStyle: {
    borderRadius: 30,
  },
});

const Title = styled.Text`
  text-align: center;
  color: #55efc4;
  font-size: 40px;
  font-family: 'StickNoBills-Medium';
  margin-top:14px
`;

const CustomButton = styled.Text`
  padding: 10px;
  text-align: center;
  border-radius: 5px;
  color: #fff;
  font-size: 20px;
  background: #55efc4;
  margin: 5px 5px;
  font-family: 'Quicksand-Bold';
`;

const TextArea = styled.Text`
  padding: 10px 8px;
  background: #efefef;
  margin-top: 10px;
  border-radius: 5px;
  min-height: 60px;
  margin: 6px 6px;
`;

const Label = styled.Text`
  margin: 0px 5px;
  color: #fff;
  margin-bottom: 5px;
`;

const CustomTextInput = styled.TextInput`
  color:#636e72; 
  background:#fff;
  margin: 0px 5px;
  border-radius: 5px;
  margin: 5px 5px;
`
export default App;
