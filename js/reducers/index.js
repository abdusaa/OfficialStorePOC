import { combineReducers } from 'redux'
import { PENDING, FULFILLED, REJECTED } from 'redux-promise-middleware'
import {
  FETCH_CAMPAIGNS,
  FETCH_BANNERS,
  FETCH_BRANDS,
  ADD_TO_WISHLIST,
  SLIDE_BRANDS
} from '../actions/actions'

const campaigns = (state = {
  items: [],
  isFetching: false,
}, action) => {
  switch (action.type) {
    case `${FETCH_CAMPAIGNS}_${PENDING}`:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case `${FETCH_CAMPAIGNS}_${FULFILLED}`:
      const campaignData = action.payload.data
      return {
        items: state.items.length === 0 ? [...state.items, ...campaignData] : [...state.items],
        isFetching: false,
      }
      return state
    case `${FETCH_CAMPAIGNS}_${REJECTED}`:
      return state

    case `${ADD_TO_WISHLIST}_${PENDING}`:
      return state
    case `${ADD_TO_WISHLIST}_${FULFILLED}`:
      return state
    case `${ADD_TO_WISHLIST}_${REJECTED}`:
      return state

    default:
      return state
  }
}

const banners = (state = {
  items: [],
  isFetching: false,
}, action) => {
  switch (action.type) {
    case `${FETCH_BANNERS}_${PENDING}`:
      return { ...state, isFetching: true }
    case `${FETCH_BANNERS}_${FULFILLED}`:
      const banners = action.payload.data.data.banners
      return {
        items: state.items.length === 0 ? [...state.items, ...banners] : [...state.items],
        isFetching: !state.isFetching
      }
      return state
    case `${FETCH_BANNERS}_${REJECTED}`:
      return state
    default:
      return state
  }
}

const brands = (state = {
  items: [],
  isFetching: false,
  pagination: {
    offset: 0,
    limit: 10
  },
  totalBrands: 0,
  grid: {
    data: [],
    index: 0,
    itemsToShow: 8,
  }
}, action) => {
  switch (action.type) {
    case `${FETCH_BRANDS}_${PENDING}`:
      return {
        ...state,
        isFetching: true,
      }
    case `${FETCH_BRANDS}_${FULFILLED}`:
      const brandsData = action.payload.data || []
      const totalBrands = action.payload.total_brands
      const items = [...state.items, ...brandsData]
      const pagination = {
        ...state.pagination,
        offset: items.length
      }

      const getVisibleGridData = (brands, count) => {
        const data = []
        let howMany = state.grid.itemsToShow
        let index = state.grid.index

        while (howMany--) {
          data.push(brands[index])
          index = (index + 1) % count
        }
        return {
          data,
          index,
          itemsToShow: 8
        }
      }
      return {
        items,
        isFetching: false,
        pagination,
        totalBrands,
        grid: getVisibleGridData(items, totalBrands)
      }
      return state
    case `${FETCH_BRANDS}_${REJECTED}`:
      return {
        ...state,
        isFetching: false,
      }
    case SLIDE_BRANDS:
      const getVisibleGridData1 = (brands, count) => {
        const data = []
        let howMany = state.grid.itemsToShow
        let index = state.grid.index

        while (howMany--) {
          data.push(brands[index])
          index = (index + 1) % count
        }
        return {
          data,
          index,
          itemsToShow: 8
        }
      }
      return {
        ...state,
        grid: getVisibleGridData1(state.items, state.totalBrands)
      }

    case `${ADD_TO_WISHLIST}_${PENDING}`:
      return state
    case `${ADD_TO_WISHLIST}_${FULFILLED}`:
      return state
    case `${ADD_TO_WISHLIST}_${REJECTED}`:
      return state
    default:
      return state
  }
}

const rootReducer = combineReducers({
  campaigns,
  banners,
  brands,
})

export default rootReducer