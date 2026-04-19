import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  CardHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardSubtitles: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'space-between'
  },
  cardSubtitlesText: {
    fontWeight: 'bold'
  },
  cardSubtitlesText2: {
    color: 'grey',
    fontWeight: 'bold'
  },
});

export default styles;