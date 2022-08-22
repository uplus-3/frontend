import { useRoutes } from "react-router-dom";
import Navbar from "./common/Navbar";
import MainPage from "./pages/MainPage";
import DeviceOrderHistoryPage from "./pages/order/DeviceOrderHistoryPage";
import DeviceOrderPage from "./pages/order/DeviceOrderPage";
import DeviceDetailPage from "./pages/product/DeviceDetailPage";
import DeviceListPage from "./pages/product/DeviceListPage";
import SearchResultPage from "./pages/SearchResultPage";

function Router() {
    return useRoutes([
        {
            path : "",
            element : <Navbar />,
            children : [
                {
                    path : "",
                    element : <MainPage />
                },
                {
                    path : '5g-phone',
                    element : <DeviceListPage />,
                    children : [
                        {
                            path : 'samsung/:id',
                            element : <DeviceDetailPage />
                        },
                        {
                            path : 'apple/:id',
                            element : <DeviceDetailPage />
                        }
                    ]
                },
                {
                    path : '4g-phone',
                    element : <DeviceListPage />,
                    children : [
                        {
                            path : 'samsung/:id',
                            element : <DeviceDetailPage />
                        },
                        {
                            path : 'apple/:id',
                            element : <DeviceDetailPage />
                        }
                    ]
                },
                {
                    path : 'search/result',
                    element : <SearchResultPage />
                },
                {
                    path : 'order',
                    children : [
                        {
                            path : 'mobile',
                            element : <DeviceOrderPage />
                        },
                        {
                            path : ':id',
                            element : <DeviceOrderHistoryPage />
                        }
                    ]
                }
            ]
        }
    ])
}

export default Router;