import { configureStore } from '@reduxjs/toolkit'
import productAPI from './services/product.service'

export const store = configureStore({
  reducer: {
    "product": productAPI.reducer,
  },
  middleware: defaultMiddleware => defaultMiddleware().concat(productAPI.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
