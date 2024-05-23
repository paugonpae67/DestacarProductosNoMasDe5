import { Order, Product, Restaurant } from '../models/models.js'
const checkProductOwnership = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId, { include: { model: Restaurant, as: 'restaurant' } })
    if (req.user.id === product.restaurant.userId) {
      return next()
    } else {
      return res.status(403).send('Not enough privileges. This entity does not belong to you')
    }
  } catch (err) {
    return res.status(500).send(err)
  }
}
const checkProductRestaurantOwnership = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findByPk(req.body.restaurantId)
    if (req.user.id === restaurant.userId) {
      return next()
    } else {
      return res.status(403).send('Not enough privileges. This entity does not belong to you')
    }
  } catch (err) {
    return res.status(500).send(err)
  }
}

const checkProductHasNotBeenOrdered = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId, { include: { model: Order, as: 'orders' } })
    if (product.orders.length === 0) {
      return next()
    } else {
      return res.status(409).send('This product has already been ordered')
    }
  } catch (err) {
    return res.status(500).send(err.message)
  }
}

const checkNoMore5Products = async (req, res, next) => {
  try {
    if (req.body.destacado) {
      const products = await Product.count({
        where: {
          restaurantId: req.body.restaurantId,
          destacado: true
        }
      })
      if (products > 4) {
        return res.status(409).send('There are 5 products with destacado')
      } else {
        return next()
      }
    } else {
      return next()
    }
  } catch (error) {
    return res.status(500).send(error.message)
  }
}
export { checkProductOwnership, checkProductRestaurantOwnership, checkProductHasNotBeenOrdered, checkNoMore5Products }
