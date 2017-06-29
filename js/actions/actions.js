import axios from 'axios'
import find from 'lodash/find'

const ENDPOINT = 'https://mojito.tokopedia.com/os/api/v1/brands'

export const FETCH_CAMPAIGNS = 'FETCH_CAMPAIGNS'
export const fetchCampaigns = () => ({
  type: FETCH_CAMPAIGNS,
  payload: axios.get('https://mojito.tokopedia.com/os/api/v1/brands/microsite/campaigns?device=lite&full_domain=tokopedia.lite:3000&image_size=200&image_square=true')
})

export const FETCH_BANNERS = 'FETCH_BANNERS'
export const fetchBanners = () => ({
  type: FETCH_BANNERS,
  payload: axios.get('https://mojito.tokopedia.com/os/api/v1/brands/microsite/banners?device=2')
})

export const FETCH_BRANDS = 'FETCH_BRANDS'
export const fetchBrands = (limit, offset) => ({
  type: FETCH_BRANDS,
  payload: axios.get(`https://mojito.tokopedia.com/os/api/v1/brands/list?device=lite&microsite=true&user_id=0&limit=${limit}&offset=${offset}`)
    .then(response => {
      const brands = response.data.data
      const total_brands = response.data.total_brands
      let shopList = brands.map(shop => ({
        id: shop.shop_id,
        name: shop.shop_name,
        brand_img_url: shop.brand_img_url,
        logo_url: shop.logo_url,
        microsite_url: shop.microsite_url,
        shop_mobile_url: shop.shop_mobile_url,
        shop_domain: shop.shop_domain,
      }))
      let shopIds = brands.map(shop => shop.shop_id)
      shopIds = shopIds.toString()
      const shopCount = shopIds.length

      return axios.get(`${ENDPOINT}/microsite/products?device=lite&source=osmicrosite&rows=4&full_domain=tokopedia.lite:3000&ob=11&image_size=200&image_square=true&brandCount=${shopCount}&brands=${shopIds}`)
        .then(response => response.data.data.brands)
        .then(brandsProducts => {
          shopList = shopList.map(shop => {
            const shopProduct = find(brandsProducts, product => {
              return product.brand_id === shop.id
            })

            if (shopProduct && shopProduct.data) {
              shop.products = shopProduct.data.map(product => ({
                id: product.id,
                name: product.name,
                price: product.price,
                image_url: product.image_url,
                is_wishlist: false,
                url: product.url,
                shop_name: product.shop.name,
                labels: product.labels,
                badges: product.badges,
              }))
              return shop
            } else {
              shop.products = []
              return shop
            }
          })
          return {
            data: shopList,
            total_brands,
          }
        })
    })
})

export const SLIDE_BRANDS = 'SLIDE_BRANDS'
export const slideBrands = () => ({
  type: SLIDE_BRANDS
})

function getProductIdList(products) {
  const productIdList = []
  products.forEach((product) => {
    productIdList.push(product.data.map(p => p.id))
  })
  const pIds = []
  productIdList.forEach((p) => {
    p.forEach(o => {
      pIds.push(o)
    })
  })
  return pIds
}

export const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST'
export const addToWishlist = (productId) => ({
  type: ADD_TO_WISHLIST,
  payload: axios.post(`https://mojito.tokopedia.com/v1/products/${productId}/wishlist`)
})


