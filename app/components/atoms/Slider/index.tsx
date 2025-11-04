import React, { useRef, useState, memo } from 'react';
import { View, Text, ImageBackground, Dimensions } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { Colors } from '../../../styles';
import GlobalStyles from '../../../styles/GlobalStyles';
import CustomButton from '../CustomButton/index';
import { CustomText } from '../Text';
import { skip, done, next } from '../../../types/constants';
import FontStyles from '../../../styles/FontStyles';
import colors from '../../../styles/colors';
import { fontColor, fS } from '../../../utils/spaces';
import { ms } from 'react-native-size-matters';

const { width, height } = Dimensions.get('screen');

type SlideItem = {
  key?: number;
  title?: string;
  text?: string;
  image?: string | any;
};

type OnboardingSliderProps = {
  slides?: SlideItem[];
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
      <View
        style={[
          GlobalStyles.slideinnerContainer,
          GlobalStyles.margin_bottom_10,
        ]}
      >
        <CustomText textStyle={[FontStyles.title]} title={item.title} />
        <CustomText
          textStyle={[fS(ms(10)), fontColor(colors.white)]}
          title={item.text}
        />
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

        <View style={[GlobalStyles.buttonContainer]}>
          <CustomButton
            title={index === slides.length - 1 ? done : next}
            onPress={handleNext}
            textStyles={[FontStyles.subTitle, fontColor(colors.white)]}
            buttonStyle={[GlobalStyles.width50]}
          />
          <CustomButton
            isTransparent={true}
            title={skip}
            onPress={handleSkip}
            textStyles={[FontStyles.subTitle, fontColor(colors.white)]}
            buttonStyle={[GlobalStyles.borderStyles, GlobalStyles.width50]}
          />
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

export default React.memo(OnboardingSlider);
