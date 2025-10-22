import React from 'react';
import Images from '../../assets/images';
import config from '../config';
import OnboardingSlider from '../../components/atoms/Slider/index';

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

const OnboardingScreen = () => {
  const handleDone = () => {
    console.log('Onboarding Completed!');
  
  };

  const handleSkip = () => {
    console.log('Onboarding Skipped!');
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
