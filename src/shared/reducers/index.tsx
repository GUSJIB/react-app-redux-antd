import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import authentication from './authentication';
import spening from './speningSlice';
import counter from './counterSlice';


const rootReducer = {
  authentication,
  loadingBar,
  spening,
  counter,
};

export default rootReducer;
