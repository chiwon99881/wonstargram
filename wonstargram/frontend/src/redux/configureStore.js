import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { routerMiddleware } from "react-router-redux";
import { connectRouter } from "connected-react-router";
import createHistory from "history/createBrowserHistory";
import { composeWithDevTools } from "redux-devtools-extension";
import { i18nState } from "redux-i18n";
import user from "redux/modules/user";
import photos from "./modules/photos";

const env = process.env.NODE_ENV;

const history = createHistory();

const middlewares = [thunk, routerMiddleware(history)];

if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

const reducer = combineReducers({
  router: connectRouter(history),
  user,
  photos,
  i18nState
});

let store = initialState =>
  createStore(reducer, composeWithDevTools(applyMiddleware(...middlewares)));

export { history };
export default store();
