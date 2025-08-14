import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 100,
    padding: 8,
    marginHorizontal: 80,
    marginBottom: 20,
    position: 'absolute',
    bottom: 0,
    shadowColor: '#E7E7E7',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tabItem: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    backgroundColor: '#568FF8',
    borderRadius: 5000,
  },
});

export default styles;
