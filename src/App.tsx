import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AdminLayout from './components/layout/admin/AdminLayout'
import ProductAdd from './pages/admin/product/add'
import ProductUpdate from './pages/admin/product/edit'
import Dashboard from './pages/admin/product'

const router = createBrowserRouter([
  {
    path: '/', element: <AdminLayout />, children: [
      { path: '/', element: <Dashboard /> },
      { path: 'add', element: <ProductAdd /> },
      { path: ':id/edit', element: <ProductUpdate /> },
    ]
  }
])
function App() {
  return <RouterProvider router={router} />
}

export default App
