/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-shadow */
/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
/* eslint-disable keyword-spacing */
/**
* Sample React Native App
* https://github.com/facebook/react-native
*
* @format
* @flow strict-local
*/
import {
SafeAreaView,
StyleSheet,
Text,
View,
Button,
FlatList,
ActivityIndicator,
TouchableOpacity,Image,
ScrollView,Dimensions,ImageBackground,Share,
} from 'react-native';

import React, {useEffect, useState} from 'react';

import {setupPlayer, addTracks} from '../trackPlayerServices';
import TrackPlayer, {
useTrackPlayerEvents,
usePlaybackState,
useProgress,useTrackPlayerProgress,
Event,
State,
} from 'react-native-track-player';
import Icon from 'react-native-vector-icons/FontAwesome';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';
import { useNetInfo } from '@react-native-community/netinfo';
import NoInternet from './NoInternet';
import mobileAds, { MaxAdContentRating } from 'react-native-google-mobile-ads';

import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import Loader1 from './Loader';
const { width,height } = Dimensions.get('window');
function Playlist() {
  const [queue, setQueue] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(0);

  const [playerpage, setplayerpage] = useState('');

async function loadPlaylist() {
const queue = await TrackPlayer.getQueue();
setQueue(queue);
}

useEffect(() => {
loadPlaylist();
}, []);

useTrackPlayerEvents([Event.PlaybackTrackChanged], event => {
if (event.state === State.nextTrack) {

TrackPlayer.getCurrentTrack().then(index => setCurrentTrack(index));

}
});

function PlaylistItem({index, title, isCurrent,url}) {
//const navigation = useNavigation();
// const [loading,setLoading] = useState(false)
const netInfo = useNetInfo();
function handleItemPress() {

TrackPlayer.skip(index);
//console.log(index)

// navigation.navigate('player', {index})
//setplayerpage('1');
}

return (
<View style={{justifyContent:'space-around'}}>
<TouchableOpacity onPress={handleItemPress}>
<ImageBackground  style={{width:width,height:70}} source={require('../assets/logo1_4_640x100.jpg')} >
<Text
style={{top:0,
...styles.playlistItem,
...{backgroundColor: isCurrent ? 'transparent' : 'transparent'},
...{color:isCurrent ? '#00FF00' : '#FFD700'},
}}>
{index + 1}.{title}

</Text>

</ImageBackground>
</TouchableOpacity>
{/* <Ionicons style={{}}
name="play-skip-back-sharp"
size={10} color="transparent"
backgroundColor="transparent"

/> */}
</View>
);
}

// function Renderitems ({item, index}) {


//     <PlaylistItem
//     index={index}
//     title={item.title}
//     isCurrent={currentTrack === index}
//     />


// }
function Renderitem({item,index}) {
  return (
  <PlaylistItem
  index={index}
  title={item.title}
  
  isCurrent={currentTrack === index}
  />
  );}

  const ITEM_HEIGHT = 5; // fixed height of item component
const getItemLayout = (queue, index) => {
  return {
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * queue.length,
    index,
  };
};
return (

<View style={styles.playlist}>
<Text style={{color:'#FFD700',fontStyle:"normal",fontSize:20,textAlign:'center',backgroundColor:'black'}}>Voice:MISHARY RASHID ALAFASY</Text>

<FlatList style={{paddingTop:0}}
data={queue}
removeClippedSubviews={true}
initialNumToRender={113}
nestedScrollEnabled
scrollEnabled={true}
maxToRenderPerBatch={113}
updateCellsBatchingPeriod={113}
windowSize={21}
getItemLayout={getItemLayout}

renderItem={Renderitem}
/>

<Controls />
</View>

);
}

  // function Renderitem({PlaylistItem,item,index,currentTrack}) {
  // return (
  // <PlaylistItem
  // index={index}
  // title={item.title}
  // isCurrent={currentTrack === index}
  // />
  // )}

function Controls({onShuffle,loading}) {
const playerState = usePlaybackState();
const progress = useProgress();
//const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-8343081326487707/9503096096';

const adUnitId = 'ca-app-pub-8343081326487707/9503096096';

mobileAds()
  .setRequestConfiguration({
    // Update all future requests suitable for parental guidance
    maxAdContentRating: MaxAdContentRating.PG,

    // Indicates that you want your content treated as child-directed for purposes of COPPA.
    tagForChildDirectedTreatment: true,

    // Indicates that you want the ad request to be handled in a
    // manner suitable for users under the age of consent.
    tagForUnderAgeOfConsent: true,

    // An array of test device IDs to allow.
    testDeviceIdentifiers: ['EMULATOR'],
  })
  .then(() => {
    // Request config successfully set!
  });

  const shareUrl = async (url) => {
  try {
    await Sharing.shareAsync(url);
  } catch (error) {
    console.log('Error sharing:', error);
  }
};


// const onShare = async () => {
//   try {
//     const result = await Share.share({
//       title: 'App link',
//       message:
//         'Quranplayer (Mishary Rashid Alafasy)    https://play.google.com/store/apps/details?id=com.quran.surah'
//     });
//     if (result.action === Share.sharedAction) {
//       if (result.activityType) {
//         // shared with activity type of result.activityType
//       } else {
//         // shared
//       }
//     } else if (result.action === Share.dismissedAction) {
//       // dismissed
//     }
//   } catch (error) {
//     Alert.alert(error.message);
//   }
// };
async function handlePlayPress() {
if ((await TrackPlayer.getState()) === State.Playing) {
TrackPlayer.pause();
} else {
TrackPlayer.play();
}
}

return (
<View
style={{width:width, marginBottom:0,backgroundColor:'#F5F5F5', flexDirection: 'row', flexWrap: 'wrap',justifyContent:'center'}}>
{/* {loading ? <ActivityIndicator size='large' color="#00ff00" /> : ''} */}
<TrackProgress />
<Slider
style={styles.progressBar}
value={progress.position}
minimumValue={0}
maximumValue={progress.duration}
thumbTintColor="#32CD32"
minimumTrackTintColor="black"
maximumTrackTintColor="#32CD32"
onSlidingComplete={async value => {
await TrackPlayer.seekTo(value);
}}
onValueChange={async i =>{await TrackPlayer.seekTo(value.progress.duration);}}

/>
<View style={{width:width,flexDirection: 'row',justifyContent:'space-around'}}>
<Ionicons style={{}}
name="play-skip-back-sharp"
size={38} color="#32cd32"
backgroundColor="white"
onPress={() => TrackPlayer.skipToPrevious()}
/>
<Ionicons style={{}}
name="play-back"
size={38} color="#32cd32"
backgroundColor="white"
onPress={() => TrackPlayer.seekTo(progress.position - 10)}
/>
<Ionicons style={{top:-10}}
name={playerState === State.Playing ? 'ios-pause-circle' : 'ios-play-circle'}
size={65} color="#32cd32"
backgroundColor="transparent"
onPress={handlePlayPress}
/>
<Ionicons style={{}}
name="play-forward"
size={38} color="#32cd32"
backgroundColor="white"
onPress={() => TrackPlayer.seekTo(progress.position + 10)}
/>
<Ionicons style={{}}
name="play-skip-forward-sharp"
size={38} color="#32cd32"
backgroundColor="transparent"
onPress={() => TrackPlayer.skipToNext()}
/>
{/* <Ionicons style={{}}
name="share-social"
size={38} color="#BDB76B"
backgroundColor="transparent"
onPress={() => onShare()}
/> */}
</View>
<BannerAd
      unitId={adUnitId}
      size={BannerAdSize.BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />
</View>
);
}

function TrackProgress() {
const {position, duration} = useProgress(200);
const [loading,setLoading] = useState(false);
const onShare = async () => {
  try {
    const result = await Share.share({
      title: 'App link',
      message:
        ' Sharing App Quranplayer(by:Mishary Rashid Alafasy)    https://play.google.com/store/apps/details?id=com.quran.surah',
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    Alert.alert(error.message);
  }
};
function format(seconds) {
let mins = parseInt(seconds / 60)
.toString()
.padStart(2, '0');
let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
return `${mins}:${secs}`;
}

const [info, setInfo] = useState({});
useEffect(() => {
setTrackInfo();
}, []);

useTrackPlayerEvents([Event.PlaybackTrackChanged], event => {
if (event.state === State.nextTrack) {
setTrackInfo();
}
});

async function setTrackInfo() {

  setLoading(true);
const track = await TrackPlayer.getCurrentTrack();
const info = await TrackPlayer.getTrack(track);
setInfo(info);
setLoading(false);


}

function zeroformat() {
  return(
    <>
    {/* <ActivityIndicator size='large' color="#ffffff" /> */}
    <Loader1/>
    <Text style={styles.songTitle}>{info.title}  {format(position)}/{format(duration)}</Text><Ionicons style={{}}
      name="share-social"
      size={38} color="#32cd32"
      backgroundColor="transparent"
      onPress={() => onShare()} /></>
  )
}

function uploadformat() {
  return(
    <><Text style={styles.songTitle}>{info.title}  {format(position)}/{format(duration)}</Text><Ionicons style={{}}
      name="share-social"
      size={38} color="#32cd32"
      backgroundColor="transparent"
      onPress={() => onShare()} /></>

  )
}
function combinedzerouploadformat() {
  {format(duration) === '00:00' ? zeroformat() : uploadformat() }
  
}
return (
<View style={{flexDirection:'row',justifyContent:'space-evenly',width:width}}>
 {loading ? <Loader1/> : '' }
 
 {format(duration) === '00:00' ? zeroformat() : uploadformat() }
{/* <Text style={styles.songTitle}>{info.title}  {format(position)}/{format(duration)}</Text>
<Ionicons style={{}}
name="share-social"
size={38} color="#BDB76B"
backgroundColor="transparent"
onPress={() => onShare()}
/> */}

</View>
);


}
function Header() {
const [info, setInfo] = useState({});
useEffect(() => {
setTrackInfo();
}, []);

useTrackPlayerEvents([Event.PlaybackTrackChanged], event => {
if (event.state === State.nextTrack) {
setTrackInfo();
}
});

async function setTrackInfo() {
const track = await TrackPlayer.getCurrentTrack();
const info = await TrackPlayer.getTrack(track);
setInfo(info);
}

return (
<View>
<Text style={styles.songTitle}>{info.title}</Text>

{/* <Text style={styles.artistName}>{info.artist}</Text> */}
</View>
);
}

export default function Home() {
const [isPlayerReady, setIsPlayerReady] = useState(false);
const progress = useProgress();
const netInfo = useNetInfo();

//const { position, duration, bufferedPosition, percentComplete } = useProgress();
//  const pos = async () => await TrackPlayer.getPosition();
// console.log(TrackPlayer.getPosition())
// // subtract 10 seconds from position
// const reverse = pos - 10;
// const forward = pos + 10;

// seek to new position

useEffect(() => {
async function setup() {
let isSetup = await setupPlayer();

const queue = await TrackPlayer.getQueue();
if (isSetup && queue.length <= 0) {
await addTracks();
}

setIsPlayerReady(isSetup);
}

setup();
}, []);

if (!isPlayerReady) {
return (
<SafeAreaView style={styles.container}>
<ActivityIndicator size="large" color="black" />
</SafeAreaView>
);
}

return (
<SafeAreaView style={styles.container}>



{netInfo.isConnected ? '' : <NoInternet/>}

<Playlist />

</SafeAreaView>
);
}


const styles = StyleSheet.create({
container: {
width:width,height:height,
justifyContent: 'center',
padding: 0,paddingBottom:0,
backgroundColor: '#00008b',
}, bottomSection: {
borderTopColor: 'black',
borderWidth: 1,
width: width,
alignItems: 'center',
paddingVertical: 15,
},container1: {
  flex: 1,
  justifyContent: 'center',
},
horizontal: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  padding: 10,
},
progressBar: {
width: width - 30,
height: 20,
marginTop: 0,
flexDirection: 'row',top:0,
},
playlist: {
width:width,
height:height,
marginTop: 0,
marginBottom: 0,
},
playlistItem: {
fontSize: 20,
paddingTop: 10,
paddingBottom: 10,
paddingLeft: 0,
paddingRight: 0,
borderRadius: 0,
textAlign:'center',
},
trackProgress: {
marginTop: 0,
textAlign: 'center',
fontSize: 40,
color: '#eee',
},
songTitle: {

textAlign:'center',
fontSize: 20,
marginTop: 0,padding:10,
color: '#32cd32',
},
artistName: {
fontSize: 24,
color: '#888',
},
});


 
 


