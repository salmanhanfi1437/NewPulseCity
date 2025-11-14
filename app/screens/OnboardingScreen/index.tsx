import React from 'react';
import Images from '../../assets/images';
import config from '../config';
import OnboardingSlider from '../../components/atoms/Slider/index';
import { const_RESET_STORE, login } from '../../types/constants';
import { useDispatch } from 'react-redux';

const slidesData = [
  {
    key: 1,
    title: config.CustomCarousel.welcomeTitle,
    text: config.CustomCarousel.welcomeSubtext,
    image: Images.boyposter,
  },
  {
    key: 2,
    title: config.CustomCarousel.organizeTasksTitle,
    text: config.CustomCarousel.organizeTasksSubtext,
    image: Images.vendor,
  },
  {
    key: 3,
    title: config.CustomCarousel.stayOnTrackTitle,
    text: config.CustomCarousel.stayOnTrackSubtext,
    image: Images.customerPoster,
  },
];


const OnboardingScreen = ({ navigation }: { navigation: any }) => {

  const dispatch = useDispatch();


const moveToLoginScreen = () => {
     dispatch({ type: const_RESET_STORE });

    navigation.replace(login)
}

  const handleDone = () => {
    console.log('Onboarding Completed!');
    moveToLoginScreen();
  };

  const handleSkip = () => {
    console.log('Onboarding Skipped!');
    moveToLoginScreen();
  };

  return (
    <OnboardingSlider
      slides={slidesData}
      onDone={handleDone}
      onSkip={handleSkip}
    />
  );
};

export default OnboardingScreen;
