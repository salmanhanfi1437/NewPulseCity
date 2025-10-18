import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Dimensions,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import FastImage from 'react-native-fast-image';
import Images from '../../assets/images';
import config from '../config';
import { Colors } from '../../styles';
import colors from '../../styles/colors';
const { width, height } = Dimensions.get('window');
// --- Define your slide data ---
const slides = [
  {
    key: 1,
    title: config.CustomCarousel.welcomeTitle,
    text: config.CustomCarousel.welcomeSubtext,
    image: Images.boyposter, // Replace with your actual image path
  },
  {
    key: 2,
    title: config.CustomCarousel.organizeTasksTitle,
    text: config.CustomCarousel.organizeTasksSubtext,
    image: Images.vendor, // Replace with your actual image path
  },
  {
    key: 3,
    title: config.CustomCarousel.stayOnTrackTitle,
    text: config.CustomCarousel.stayOnTrackSubtext,
    image: Images.customerPoster, // Replace with your actual image path
  },
];

// --- Custom Component for the Slides (Optional, but recommended for styling) ---
const CustomSlide = ({ item }: any) => {
  // Use a placeholder image if you don't have images ready
  const imageSource = item.image
    ? item.image
    : { uri: 'https://via.placeholder.com/150' };

  return (
    <ImageBackground source={item.image} style={[styles.slide]}>
      <View style={{position:'absolute',}}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    </ImageBackground>
  );
};

// --- Main Onboarding Component ---
const OnboardingScreen = () => {
  const [showApp, setShowApp] = useState(false);

  const onDone = () => {
    // User finished the intro. Set state to navigate to the main app screen.
    setShowApp(true);
    console.log('Onboarding Finished!');
  };

  const onSkip = () => {
    // User skipped the intro.
    setShowApp(true);
    console.log('Onboarding Skipped!');
  };

  // If the user has finished/skipped, show the main content
  if (showApp) {
    return (
      <View style={styles.mainContent}>
        <Text style={styles.mainText}>Welcome to the Main App!</Text>
      </View>
    );
  }

  const _renderPagination = (activeIndex: number) => {
    return (
      <View style={styles.paginationContainer}>
        <View style={styles.paginationDots}>
          {slides.length > 1 &&
            slides.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  i === activeIndex ? styles.activeDot : styles.inactiveDot,
                ]}
              />
            ))}
        </View>
      </View>
    );
  };

  // Otherwise, render the slider
  return (
    <>
      <AppIntroSlider
        data={slides}
        renderItem={CustomSlide}
        onDone={onDone}
        onSkip={onSkip}
        showSkipButton={true}
        dotStyle={styles.dotStyle}
        activeDotStyle={styles.activeDotStyle}
        style={{ backgroundColor: colors.black }}
        renderNextButton={() => (
          <View style={styles.buttonCircle}>
            <Text style={{ color: '#fff', fontSize: 18 }}>Next</Text>
          </View>
        )}
        renderDoneButton={() => (
          <View style={styles.buttonCircle}>
            <Text style={{ color: '#fff', fontSize: 18 }}>Done</Text>
          </View>
        )}
        renderSkipButton={() => (
          <View>
            <Text style={{ color: '#fff', fontSize: 16 }}>Skip</Text>
          </View>
        )}
        renderPagination={_renderPagination}
      />
    </>
  );
};

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.black,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    textAlign: 'left',
  },
  text: {
    fontSize: 14,
    color: '#fff',
  },
  imagePlaceholder: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  imageText: {
    color: '#fff',
    fontSize: 14,
    fontStyle: 'italic',
  },
  buttonCircle: {
    width: 60,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotStyle: {
    backgroundColor: 'rgba(255, 255, 255, .3)',
  },
  activeDotStyle: {
    backgroundColor: 'rgba(255, 255, 255, .9)',
  },
  logo: {
    width: 160,
    height: 260,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
    // Note: The library applies a default container, we rely on marginHorizontal
  },
  // Style for the active (current) dot
  activeDot: {
    backgroundColor: '#FFFFFF', // Solid bright white
    width: 25, // Longer width for the active indicator
  },
  // Style for all inactive dots
  inactiveDot: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)', // Light semi-transparent white
    width: 8, // Standard width
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.2, // Area for all bottom elements
    paddingHorizontal: 30,
    paddingBottom: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  paginationDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20, // Space between dots and the Next button
  },
});

export default OnboardingScreen;
