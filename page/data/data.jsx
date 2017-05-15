import reducer from '/page/module/Reducers/Reducers.jsx';
import App from 'DataApp.jsx';
const ReduxThunk = window.ReduxThunk.default;

const Provider = ReactRedux.Provider;

const middleware = [ ReduxThunk ];
// if (process.env.NODE_ENV !== 'production') {
//   middleware.push(createLogger())
// }

const store = Redux.createStore(
  reducer,
  Redux.applyMiddleware(...middleware)
);

console.log(store.getState());
store.subscribe(() => {
      console.log(store.getState());
    }
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)