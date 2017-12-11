import { StyleSheet } from 'react-native';

import { vertical, horizontal, width } from '../../themes';

export default StyleSheet.create({
  paginationContainer: {
    position: 'absolute',
    flexDirection: 'row',
    marginVertical: vertical.xxSmall,
    justifyContent: 'center',
    bottom: 0,
    left: width * 0.25,
    right: width * 0.25,
    backgroundColor: 'rgba(255,255,255,.8)',
    padding: 5,
    borderRadius: 10
    
  },
  pagination: {
    width: 7,
    height: 7,
    borderRadius: 25,
    marginHorizontal: 4
  },
});
