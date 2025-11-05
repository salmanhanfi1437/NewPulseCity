import React from 'react';
import { View, StyleSheet, ScrollView, ViewStyle } from 'react-native';
import { ms, mvs } from 'react-native-size-matters';
import { DivSVG, GrillSVG, ZuvyLogo } from '../../../assets/svg';
import { Colors } from '../../../styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomText } from '../Text';
import GlobalStyles from '../../../styles/GlobalStyles';
import { useTranslation } from 'react-i18next';
import FontStyles from '../../../styles/FontStyles';
import { flexGrow, fontColor, fS } from '../../../utils/spaces';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import colors from '../../../styles/colors';
import { Left } from '../../../utils/spaces';
type BgProps = {
  title?: string;
  subTitle?: string;
  children?: React.ReactNode;
  enableKeyboardScroll?: boolean; // 👈 new prop
  div?: boolean;
  KeyboardAwareScrollViewStyles?: ViewStyle | ViewStyle[];
  GrillVisible?: boolean;
};

const BackgroundPrimaryColor = ({
  title,
  subTitle,
  children,
  div,
  KeyboardAwareScrollViewStyles,
  GrillVisible = true,
}: BgProps) => {
  const { t } = useTranslation();
  const { bottom, alignItems, alignSelf, width, ...restStyles } =
    GlobalStyles.paginationContainer;

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER AREA */}

      {div ? (
        <View style={[styles.header, { flexDirection: 'column' }]}>
          <DivSVG />
          <CustomText
            title={t('Verify Your Identity')}
            textStyle={[
              FontStyles.mobileText,
              GlobalStyles.containerPaddings,
              { fontWeight: 'bold', fontSize: ms(22) },
            ]}
          />
          <CustomText
            title={t(
              'Complete your KYC to unlock full access and transactions',
            )}
            textStyle={[
              FontStyles.imageText,
              fontColor(colors.white),
              fS(12),
              { textAlign: FontStyles.subTitle.textAlign },
            ]}
          />
        </View>
      ) : (
        <View style={styles.header}>
          <View style={[!GrillVisible && styles.grillVisableStyle]}>
            <ZuvyLogo height={ms(70)} width={ms(180)} style={{ right: 12 }} />
            <CustomText
              title={t(title)}
              textStyle={[
                FontStyles.mobileText,
                GlobalStyles.containerPaddings,
                { fontWeight: 'bold', fontSize: ms(22) },
              ]}
            />
            <CustomText
              title={t(subTitle)}
              textStyle={[
                FontStyles.imageText,
                fontColor('rgba(255, 255, 255, 0.8)'),
                { textAlign: FontStyles.subTitle.textAlign },
              ]}
            />
          </View>
          {GrillVisible && (
            <GrillSVG
              style={[restStyles, GlobalStyles.textConatiner, Left(100)]}
            />
          )}
        </View>
      )}

      {/* CONTENT AREA */}
      <KeyboardAwareScrollView
        style={[GlobalStyles.keyboardView, KeyboardAwareScrollViewStyles]}
        contentContainerStyle={flexGrow(1)}
        enableOnAndroid={true}
        extraScrollHeight={80}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {children}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.primaryColor },
  header: {
    alignItems: 'center',
    marginTop: mvs(50),
    flexDirection: 'row',
    ...GlobalStyles.width50,
    alignSelf: 'center',
  },

  whiteContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    marginTop: mvs(20),
    paddingVertical: mvs(15),
    paddingHorizontal: ms(20), // ✅ add this
  },
  grillVisableStyle: {
    alignSelf: 'center',
    alignItems: 'center',
    width: GlobalStyles.width50.width,
  },
});

export default React.memo(BackgroundPrimaryColor);
