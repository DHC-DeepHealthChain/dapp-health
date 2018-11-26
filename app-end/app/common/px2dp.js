import { Dimensions } from 'react-native';

const deviceWidthDp = Dimensions.get('window').width;
const uiWidthtPx = 750;
export default function px2dp(uiElementPx) {
  return uiElementPx * deviceWidthDp / uiWidthtPx;
}