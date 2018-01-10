import { StyleSheet } from 'react-native';

import { vertical, horizontal, width } from '../../themes';

export default StyleSheet.create({
  paginationContainer: {
    position: 'absolute',
    flexDirection: 'row',
    marginVertical: vertical.xxSmall,
    justifyContent: 'center',
    bottom: -8,
    backgroundColor: 'rgba(255,255,255,.8)',
    paddingVertical: 4,
    width: '100%',
    overflow: 'hidden'
    
  },
  pagination: {
    width: 7,
    height: 7,
    borderRadius: 25,
    marginHorizontal: 4,
  },
});
