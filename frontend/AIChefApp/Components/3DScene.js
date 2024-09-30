import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const ThreeDScene = () => {
  return (
    <View style={styles.container}>
      <WebView 
        source={{ uri: 'https://skybox.blockadelabs.com/e/ce586b1079ee5875437ffdfb9387f6f8' }} 
        style={styles.webview} 
        allowsFullscreenVideo
        javaScriptEnabled
        domStorageEnabled
        allowsInlineMediaPlayback
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default ThreeDScene;
