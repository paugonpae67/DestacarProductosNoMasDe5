import { get, post, put, destroy, patch } from './helpers/ApiRequestsHelper'

function getDetail (id) {
  return get(`products/${id}`)
}

function getProductCategories () {
  return get('productCategories')
}

function create (data) {
  return post('/products/', data)
}

function update (id, data) {
  return put(`products/${id}`, data)
}

function remove (id) {
  return destroy(`products/${id}`)
}

function changePromote (restaurantId, id) {
  return patch(`products/${restaurantId}/${id}/destacado`)
}

export { getDetail, getProductCategories, create, update, remove, changePromote }
