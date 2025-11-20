import { StyleSheet } from 'react-native';
import spacing from './spacing';
import colors from './color';
import { ms, mvs } from 'react-native-size-matters';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },

  title: {
    fontSize: ms(16),
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.md,
  },

  text: {
    fontSize: ms(14),
    color: colors.text,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  card: {
    backgroundColor: '#fff',
    padding: spacing.md,
    borderRadius: mvs(10),
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: mvs(8),
    elevation: 3,
  },

  button: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: spacing.md,
  },

  buttonText: {
    color: '#fff',
    fontSize: ms(14),
    fontWeight: 'bold',
  },
});
