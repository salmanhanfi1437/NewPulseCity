import React, { useRef, useState } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { Colors } from '../../../styles';
import GlobalStyles from '../../../styles/GlobalStyles';
import CustomButton from '../CustomButton/index';

type SlideItem = {
  key: number;
  title: string;
  text: string;
  image: string | any;
};

type OnboardingSliderProps = {
  slides: SlideItem[];
  onDone?: () => void;
  onSkip?: () => void;
};

const OnboardingSlider: React.FC<OnboardingSliderProps> = ({
  slides,
  onDone,
  onSkip,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef<AppIntroSlider>(null);

  const handleSkip = () => {
    if (onSkip) onSkip();
  };

  const handleNext = () => {
    if (activeIndex < slides.length - 1) {
      sliderRef.current?.goToSlide(activeIndex + 1, true);
    } else {
      onDone ? onDone() : handleSkip();
    }
  };

  const RenderSlide = ({ item }: { item: SlideItem }) => (
    <ImageBackground source={item.image} style={GlobalStyles.slide}>
      <View style={GlobalStyles.slideinnerContainer}>
        <Text style={GlobalStyles.title}>{item.title}</Text>
        <Text style={GlobalStyles.text}>{item.text}</Text>
      </View>
    </ImageBackground>
  );

  const renderPagination = (index: number) => {
    setActiveIndex(index);
    return (
      <View style={GlobalStyles.paginationContainer}>
        <View style={GlobalStyles.paginationDots}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={[
                GlobalStyles.dot,
                i === index ? GlobalStyles.activeDot : GlobalStyles.inactiveDot,
              ]}
            />
          ))}
        </View>

        <View style={GlobalStyles.buttonContainer}>
          <CustomButton
            title={index === slides.length - 1 ? 'Done' : 'Next'}
            onPress={handleNext}
            buttonStyle={{ backgroundColor: Colors.primaryColor }}
          />
          <CustomButton title="Skip" onPress={handleSkip} />
        </View>
      </View>
    );
  };

  return (
    <AppIntroSlider
      ref={sliderRef}
      data={slides}
      renderItem={RenderSlide}
      renderPagination={renderPagination}
      onSlideChange={setActiveIndex}
    />
  );
};

export default OnboardingSlider;
