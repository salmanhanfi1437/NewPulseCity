import { mvs } from "react-native-size-matters";

const layout = {
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: mvs(16),
  },
};

export default layout;