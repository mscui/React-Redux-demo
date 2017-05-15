import {
  REQUEST_LIST,
  RECEIVE_LIST,
  REQUEST_VOLUMECHART,
  RECEIVE_VOLUMECHART,
  REQUEST_BASEDATA,
  RECEIVE_BASEDATA,
  SET_PAGE_PARAMS,
  SET_SOURCE_PARAMS,
  SET_QUERY_PARAMS,
  SET_DATE_PARAMS
} from '/page/module/Actions/Actions.jsx'

let initialState = {
    // isFetching 来显示是否加载数据
    isFetching: false,
    lists: [],
    pageParams: {
        pageNo: 0,
        pageSize: 20,
        totalCount: 0
    },
    query: '',
    source: '',
    baseData: [],
    volumeChart:[]
}


function listReducer(state = {
  isFetching: false,
  lists: []
}, action) {
  switch (action.type) {
      case REQUEST_LIST:
          return Object.assign({}, state, {
              isFetching: true
          });
      case RECEIVE_LIST:
          return Object.assign({}, state, {
              isFetching: false,
              lists: action.lists
          });
      default:
          return state;
    }
}
function volumeChartReducer(state = {
  isFetching: false,
  volumeChart: []
}, action) {
  switch (action.type) {
      case REQUEST_VOLUMECHART:
          return Object.assign({}, state, {
              isFetching: true
          });
      case RECEIVE_VOLUMECHART:
          return Object.assign({}, state, {
              isFetching: false,
              volumeChart: action.volumeChart
          });
      default:
          return state;
    }
}
function baseDataReducer(state = {
  isFetching: false,
  baseData: []
}, action) {
  switch (action.type) {
      case REQUEST_BASEDATA:
          return Object.assign({}, state, {
              isFetching: true
          });
      case RECEIVE_BASEDATA:
          return Object.assign({}, state, {
              isFetching: false,
              baseData: action.baseData
          });
      default:
          return state;
    }
}
function setSourceReducer(state = '', action) {
    switch (action.type) {
        case SET_SOURCE_PARAMS:
            return action.params;
        default:
            return state;
    }
}
function setQueryReducer(state = '速度与激情', action) {
    switch (action.type) {
        case SET_QUERY_PARAMS:
            return action.params;
        default:
            return state;
    }
}
function calDate () {
    let today = new Date();
    let day = today.getDay() < 10 ? '0' + today.getDay() : today.getDay();
    let month = (today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1);
    let year = today.getFullYear();

    let dateFrom = '';
    let dateTo = year + month + day;
    if (month === '01') {
        dateFrom = (year - 1) + '12' + day;
    } else {
        let m = (+month - 1) < 10 ? '0' + (+month - 1) : (+month - 1);
        dateFrom = year + m + day;
    }
    return {
        dateFrom: dateFrom,
        dateTo: dateTo
    }
}

const date = calDate();

function setDateReducer(state = {
    dateFrom: date.dateFrom,
    dateTo: date.dateTo
}, action) {
    switch (action.type) {
        case SET_DATE_PARAMS:
            return Object.assign({}, state, {
                dateFrom: action.params.dateFrom,
                dateTo: action.params.dateTo
            });
        default:
            return state;
    }
}
function setPageReducer(state = {
    pageNo: 1,
    pageSize: 20,
    totalCount: 0
}, action) {
    switch (action.type) {
        case SET_PAGE_PARAMS:
            return Object.assign({}, state, {
                pageNo: action.params.pageNo || state.pageNo,
                pageSize: action.params.pageSize || state.pageSize,
                totalCount: action.params.totalCount || 0
            });
        default:
            return state;
    }
}
function userNameReducer(state = '') {
    return state;
}

const rootReducer = Redux.combineReducers({
    data: listReducer,
    userName: userNameReducer,
    source: setSourceReducer,
    page: setPageReducer,
    query: setQueryReducer,
    volumeChart: volumeChartReducer,
    date: setDateReducer,
    baseData: baseDataReducer
});

export default rootReducer
