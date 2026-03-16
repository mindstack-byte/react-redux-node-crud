import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { productsList } from '../utils/constants.js'
import { addItem, removeItem } from '../store/actions/cartActions.js'

function Products() {
  const [products, setProducts] = useState(productsList)
  const dispatch = useDispatch()
  const productCount = useSelector((state) => state.cart.count)

  const handleAdd = (id) => {
    dispatch(addItem())
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, stock: p.stock + 1 } : p,
      ),
    )
  }

  const handleRemove = (id) => {
    dispatch(removeItem())
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id && p.stock > 0 ? { ...p, stock: p.stock - 1 } : p,
      ),
    )
  }

  return (
    <section className="products-section">
      <div className="products-header-row">
        <div className="products-header">
          <h1 className="products-title">Products List</h1>
          <p className="products-subtitle">
            A sample list of computer products with quick add / remove inventory
            actions.
          </p>
        </div>

        <button type="button" className="products-cart-pill">
          <span className="products-cart-icon">🛒</span>
          <span className="products-cart-count">{productCount}</span>
        </button>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <article key={product.id} className="product-card">
            <div className="product-image-wrap">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
            </div>
            <div className="product-body">
              <h2 className="product-name">{product.name}</h2>
              <p className="product-category">{product.category}</p>
              <p className="product-price">${product.price.toFixed(2)}</p>
            </div>
            <div className="product-footer">
              <span
                className={`product-stock ${product.stock === 0 ? 'product-stock-out' : ''
                  }`}
              >
                {product.stock === 0 ? 'Out of stock' : `In stock: ${product.stock}`}
              </span>
              <div className="product-actions">
                <button
                  type="button"
                  className="product-btn"
                  onClick={() => handleRemove(product.id)}
                  disabled={product.stock === 0}
                >
                  Remove
                </button>
                <button
                  type="button"
                  className="product-btn product-btn-primary"
                  onClick={() => handleAdd(product.id)}
                >
                  Add
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Products

