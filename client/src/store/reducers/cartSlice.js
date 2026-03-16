import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  count: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state) {
      state.count += 1
    },
    removeItem(state) {
      if (state.count > 0) {
        state.count -= 1
      }
    },
    resetCart(state) {
      state.count = 0
    },
  },
})

export const { addItem, removeItem, resetCart } = cartSlice.actions

export default cartSlice.reducer

