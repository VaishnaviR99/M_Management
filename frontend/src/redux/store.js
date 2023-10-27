import {applyMiddleware,combineReducers,compose,legacy_createStore,} from "redux";

  import reducer from "./auth/reducer"
import {lanreducer} from "./translate/reducer"
const reducers=combineReducers({
   auth:reducer,
   lang:lanreducer
 
  })
  
  export const store = legacy_createStore(reducers);