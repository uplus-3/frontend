import { Navigate, useRoutes } from 'react-router-dom';

import MainLayout from './layout/MainLayout';
import MainPage from './pages/MainPage';
import NotFoundPage from './pages/NotFoundPage';
import DeviceOrderHistoryPage from './pages/order/DeviceOrderHistoryPage';
import DeviceOrderSearchInputPage from './pages/order/DeviceOrderSearchInputPage';
import DeviceOrderPage from './pages/order/DeviceOrderPage';
import DeviceDetailPage from './pages/product/DeviceDetailPage';
import DeviceListPage from './pages/product/DeviceListPage';
import SearchResultPage from './pages/SearchResultPage';
import CartListPage from './pages/cart/CartListPage';

function Router() {
  return useRoutes([
    {
      path: '',
      element: <MainLayout />,
      children: [
        {
          path: '',
          element: <MainPage />,
        },
        {
          path: '5g-phone',
          children: [
            {
              path: '',
              element: <DeviceListPage />,
            },
            {
              path: ':id',
              element: <DeviceDetailPage />,
            },
          ],
        },
        {
          path: '4g-phone',
          children: [
            {
              path: '',
              element: <DeviceListPage />,
            },
            {
              path: ':id',
              element: <DeviceDetailPage />,
            },
          ],
        },
        {
          path: 'search/result',
          element: <SearchResultPage />,
        },
        {
          path: 'order',
          children: [
            {
              path: 'mobile',
              element: <DeviceOrderPage />,
            },
            {
              path: ':id',
              element: <DeviceOrderHistoryPage />,
            },
            {
              path: 'search',
              element: <DeviceOrderSearchInputPage />,
            },
          ],
        },
        {
          path: 'cart',
          element: <CartListPage />,
        },
        { path: '/404', element: <NotFoundPage /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

export default Router;
