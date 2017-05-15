import fetchData from './module/util/fetchData.js';

export const REQUEST_LIST = 'REQUEST_LIST';
export const RECEIVE_LIST = 'RECEIVE_LIST';
export const REQUEST_VOLUMECHART = 'REQUEST_VOLUMECHART';
export const RECEIVE_VOLUMECHART = 'RECEIVE_VOLUMECHART';
export const REQUEST_BASEDATA = 'REQUEST_BASEDATA';
export const RECEIVE_BASEDATA = 'RECEIVE_BASEDATA';
export const SET_PAGE_PARAMS = 'SET_PAGE_PARAMS';
export const SET_SOURCE_PARAMS = 'SET_SOURCE_PARAMS';
export const SET_QUERY_PARAMS = 'SET_QUERY_PARAMS';
export const SET_DATE_PARAMS = 'SET_DATE_PARAMS';


function requestList(params) {
    return {
        type: REQUEST_LIST
    };
}

function receiveList(lists) {
    return {
        type: RECEIVE_LIST,
        lists: lists
    };
}
function requestVolumeChart(params) {
    return {
        type: REQUEST_VOLUMECHART
    };
}
function receiveVolumeChart(volumeChart) {
    return {
        type: RECEIVE_VOLUMECHART,
        volumeChart: volumeChart
    };
}
function requestBaseData(params) {
    return {
        type: REQUEST_BASEDATA
    };
}
function receiveBaseData(data) {
    return {
        type: RECEIVE_BASEDATA,
        baseData: data
    };
}

export function setPageParams(params) {
    return {
        type: SET_PAGE_PARAMS,
        params: params
    };
}

export function setSourceParams(params) {
    return {
        type: SET_SOURCE_PARAMS,
        params: params
    };
}
export function setQueryParams(params) {
    return {
        type: SET_QUERY_PARAMS,
        params: params
    };
}
export function setDateParams(params) {
    return {
        type: SET_DATE_PARAMS,
        params: params
    };
}


export const fetchList = optData => {

    return (dispatch, getState) => {

        dispatch(requestList());
        let state = getState();

        let params = {
                page_no: optData ? optData.pageNo : state.page.pageNo,
                page_size: state.page.pageSize,
                source: state.source,
                query: encodeURIComponent(state.query),
                date_from: state.date.dateFrom,
                date_to: state.date.dateTo
            };
        let opt = {
                    url: '/getvlist',
                    type: 'post',
                    cache: false,
                    data: params
                };

        return fetchData({
                  url: opt.url,
                  type: opt.type,
                  dataType: 'json',
                  data: opt.data
              })
              .then(response => {
                  if (response.errno === 0) {
                      dispatch(receiveList(response.data.volume_list));
                      dispatch(setPageParams({
                          pageNo: +response.data.page_no,
                          pageSize: +response.data.page_size,
                          totalCount: +response.data.total_count
                      }));
                  }
              });
    };
}
export function fetchVolume() {

    return (dispatch, getState) => {
        let state = getState();

        dispatch(requestVolumeChart());

        let params = {
            source: state.source,
            query: encodeURIComponent(state.query),
            date_from: state.date.dateFrom,
            date_to: state.date.dateTo
        };
        let opt = {
                    url: '/getv',
                    type: 'post',
                    cache: false,
                    data: params
                };

        return fetchData({
                  url: opt.url,
                  type: opt.type,
                  dataType: 'json',
                  data: opt.data
              })
              .then(response => {
                  if (response.errno === 0) {
                      dispatch(receiveVolumeChart(response.data));
                  }
              });
    };
}
export const fetchBaseData = optData => {

    return (dispatch, getState) => {
        dispatch(requestList());
        let state = getState();

        let params = {
                source: state.source,
                query: encodeURIComponent(state.query),
                page_no: optData ? optData.pageNo : state.page.pageNo,
                page_size: state.page.pageSize,
                date_from: state.date.dateFrom,
                date_to: state.date.dateTo
            };
        let opt = {
                    url: '/getllist',
                    type: 'post',
                    cache: false,
                    data: params
                };

        return fetchData({
                  url: opt.url,
                  type: opt.type,
                  dataType: 'json',
                  data: opt.data
              })
              .then(response => {
                  if (response.errno === 0) {
                      dispatch(receiveBaseData(response.data.cnt_list));
                  }
                  dispatch(setPageParams({
                          pageNo: +response.data.page_no,
                          pageSize: +response.data.page_size,
                          totalCount: +response.data.total_count
                      }));
              });
    };
}