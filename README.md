# LG Uplus 인턴 3조
> 기존 Lguplus 홈페이지를 분석하여 기본 기능을 구현하고 개선사항을 적용하여 UI/UX 개선

[김수현](https://github.com/HiBird00) [김형준](https://github.com/hjkim0822) [성아영](https://github.com/Sungayoung) [윤병찬](https://github.com/Chaaany) [이일환](https://github.com/pppp0722)

<a href="https://github.com/uplus-3/frontend/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=uplus-3/frontend" />
</a>

## 배포 사이트
http://uplus3-dev.s3-website.ap-northeast-2.amazonaws.com


## 개발 환경
- Library : React, Redux, Mui, sweetalert2
- Node.js : 16.17.0
- Package Manager : yarn
- Development Environment : CRA

## 페이지
- Main : [성아영](https://github.com/Sungayoung)
- Devices
  - List : [김수현](https://github.com/HiBird00)
  - Device Comparison : [김수현](https://github.com/HiBird00)
  - Detail : [성아영](https://github.com/Sungayoung)
- Search : 
  - Search Bar : [성아영](https://github.com/Sungayoung)
  - Result : [이일환](https://github.com/pppp0722)
- Order
  - Form : [성아영](https://github.com/Sungayoung)
  - History : [윤병찬](https://github.com/Chaaany)
  - Update : [윤병찬](https://github.com/Chaaany)


## 파일 디렉토리 구성
```
📦src
 ┣ 📂assets
 ┃ ┣ 📂fonts
 ┃ ┃ ┣ 📜LGSmHaB.ttf
 ┃ ┃ ┣ 📜LGSmHaL.ttf
 ┃ ┃ ┣ 📜LGSmHaR.ttf
 ┃ ┃ ┗ 📜LGSmHaSB.ttf
 ┃ ┗ 📂images
 ┃ ┃ ┣ 📜icon-kakao.png
 ┃ ┃ ┣ 📜logo_uplus.png
 ┃ ┃ ┣ 📜SM-F721N-blue-0.jpg
 ┃ ┃ ┣ 📜SM-F721N-gold-0.jpg
 ┃ ┃ ┣ 📜SM-F721N-graphite-0.jpg
 ┃ ┃ ┗ 📜SM-F721N-purple-0.jpg
 ┣ 📂components
 ┃ ┣ 📂cart
 ┃ ┃ ┣ 📜CartList.js
 ┃ ┃ ┣ 📜CartListEmpty.js
 ┃ ┃ ┗ 📜CartLIstItem.js
 ┃ ┣ 📂common
 ┃ ┃ ┣ 📜Error.js
 ┃ ┃ ┣ 📜Loading.js
 ┃ ┃ ┣ 📜Navbar.js
 ┃ ┃ ┣ 📜NavbarContent.js
 ┃ ┃ ┣ 📜RoundBtn.js
 ┃ ┃ ┣ 📜ScrollTopBtn.js
 ┃ ┃ ┣ 📜SearchBar.js
 ┃ ┃ ┗ 📜SquareBtn.js
 ┃ ┣ 📂device
 ┃ ┃ ┣ 📂compare
 ┃ ┃ ┃ ┣ 📜DeviceCompareInfo.js
 ┃ ┃ ┃ ┣ 📜DeviceCompareInfoContent.js
 ┃ ┃ ┃ ┣ 📜DeviceCompareInfoPlan.js
 ┃ ┃ ┃ ┣ 📜DeviceCompareInfoPlanItem.js
 ┃ ┃ ┃ ┣ 📜DeviceCompareInfoPrice.js
 ┃ ┃ ┃ ┣ 📜DeviceCompareInfoPriceItem.js
 ┃ ┃ ┃ ┣ 📜DeviceCompareInfoSpec.js
 ┃ ┃ ┃ ┣ 📜DeviceCompareItem.js
 ┃ ┃ ┃ ┣ 📜DeviceCompareItemSelect.js
 ┃ ┃ ┃ ┣ 📜DeviceCompareItemSelector.js
 ┃ ┃ ┃ ┗ 📜DeviceCompareTab.js
 ┃ ┃ ┣ 📂launching
 ┃ ┃ ┃ ┗ 📜LaunchingDeviceListItem.js
 ┃ ┃ ┣ 📂search
 ┃ ┃ ┃ ┣ 📜DeviceSearchList.js
 ┃ ┃ ┃ ┗ 📜DeviceSearchListItem.js
 ┃ ┃ ┣ 📜DeviceItemImage.js
 ┃ ┃ ┣ 📜DeviceItemInfo.js
 ┃ ┃ ┣ 📜DeviceList.js
 ┃ ┃ ┣ 📜DeviceListFileterContents.js
 ┃ ┃ ┣ 📜DeviceListFilter.js
 ┃ ┃ ┣ 📜DeviceListHeader.js
 ┃ ┃ ┗ 📜DeviceListItem.js
 ┃ ┣ 📂modal
 ┃ ┃ ┣ 📜DaumPostCodeModal.js
 ┃ ┃ ┣ 📜DeviceCompareModal.js
 ┃ ┃ ┣ 📜LaunchingDeviceDetailModal.js
 ┃ ┃ ┗ 📜PriceCompareModal.js
 ┃ ┗ 📂order
 ┃ ┃ ┣ 📜OrderForm.js
 ┃ ┃ ┣ 📜OrderReceipt.js
 ┃ ┃ ┗ 📜OrderSearchForm.js
 ┣ 📂layout
 ┃ ┗ 📜MainLayout.js
 ┣ 📂lib
 ┃ ┣ 📂api
 ┃ ┃ ┣ 📜cart.js
 ┃ ┃ ┣ 📜client.js
 ┃ ┃ ┣ 📜device.js
 ┃ ┃ ┣ 📜order.js
 ┃ ┃ ┣ 📜plan.js
 ┃ ┃ ┣ 📜search.js
 ┃ ┃ ┗ 📜test.js
 ┃ ┣ 📂hooks
 ┃ ┃ ┣ 📜useAlert.js
 ┃ ┃ ┣ 📜useCart.js
 ┃ ┃ ┗ 📜useInput.js
 ┃ ┗ 📜utils.js
 ┣ 📂modules
 ┃ ┣ 📂actions
 ┃ ┃ ┣ 📜devicesSlice.js
 ┃ ┃ ┣ 📜errorSlice.js
 ┃ ┃ ┣ 📜loadingSlice.js
 ┃ ┃ ┗ 📜planSlice.js
 ┃ ┣ 📂sagas
 ┃ ┃ ┣ 📜devicesSaga.js
 ┃ ┃ ┗ 📜planSaga.js
 ┃ ┣ 📜index.js
 ┃ ┗ 📜store.js
 ┣ 📂pages
 ┃ ┣ 📂cart
 ┃ ┃ ┗ 📜CartListPage.js
 ┃ ┣ 📂order
 ┃ ┃ ┣ 📜DeviceOrderAddressUpdatePage.js
 ┃ ┃ ┣ 📜DeviceOrderHistoryPage.js
 ┃ ┃ ┣ 📜DeviceOrderPage.js
 ┃ ┃ ┗ 📜DeviceOrderSearchInputPage.js
 ┃ ┣ 📂product
 ┃ ┃ ┣ 📜DeviceDetailPage.js
 ┃ ┃ ┗ 📜DeviceListPage.js
 ┃ ┣ 📜MainPage.js
 ┃ ┣ 📜NotFoundPage.js
 ┃ ┗ 📜SearchResultPage.js
 ┣ 📂theme
 ┃ ┗ 📜theme.js
 ┣ 📜App.css
 ┣ 📜App.js
 ┣ 📜index.css
 ┣ 📜index.js
 ┣ 📜reset.css
 ┗ 📜router.js
 ```
