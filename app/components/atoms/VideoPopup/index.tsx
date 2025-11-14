import React from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  StyleSheet,
  ModalProps,
} from 'react-native';
import Video, { ReactVideoSource } from 'react-native-video';

type VideoPopupProps = {
  visible: boolean;
  onClose: () => void;
  // Accepts both local file and remote URL
  source: ReactVideoSource;
};

const VideoPopup: React.FC<VideoPopupProps> = ({ visible, onClose, source }) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Video
            source={source}
            style={styles.video}
            controls
            resizeMode="contain"
          />
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <View style={styles.closeIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    height: '60%',
    backgroundColor: '#000',
    borderRadius: 10,
    overflow: 'hidden',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  closeBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeIcon: {
    width: 20,
    height: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
});

export default VideoPopup;
