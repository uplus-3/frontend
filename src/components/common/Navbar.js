import React, { useState } from 'react';
import LogoUplus from '../../assets/images/logo_uplus.png';

import {
  AppBar,
  Toolbar,
  ButtonBase,
  Button,
  Collapse,
  styled,
  useTheme,
  Badge,
} from '@mui/material';
import { ShoppingCartOutlined } from '@mui/icons-material';

import { NavbarContent } from './NavbarContent';
import RoundBtn from './RoundBtn';
import SearchBar from './SearchBar';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const CustomAppbar = styled(AppBar)(({ theme }) => ({
  height: 60,
  width: '100%',
  minWidth: 1440,

  color: '#000',
  background: theme.palette.bg,
  boxShadow:
    '0px 2px 4px -1px rgb(0 0 0 / 3%), 0px 4px 5px 0px rgb(0 0 0 / 6%), 0px 1px 10px 0px rgb(0 0 0 / 4%)',
}));

const CustomToolbar = styled(Toolbar)(({ theme }) => ({
  width: 1440,
  margin: '0 auto',
}));

const MenuCollpase = styled(Collapse)({
  position: 'fixed',
  width: '100%',
  top: '60px',
  zIndex: 50,
});

const MenuDiv = styled('div')(({ theme }) => ({
  background: '#fff',
  display: 'flex',
  minHeight: 170,
  paddingTop: 20,
  paddingBottom: 10,
  paddingLeft: 350,
  gap: 50,
  boxShadow:
    '0px 2px 4px -1px rgb(0 0 0 / 2%), 0px 4px 5px 0px rgb(0 0 0 / 4%), 0px 1px 10px 0px rgb(0 0 0 / 3%)',
}));

const SubMenuWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  gap: 10,
});

const LogoImage = styled('img')({
  height: 24,
});

const TitleBtnWrapper = styled('div')({});

const CartBtnWrapper = styled('div')(({ theme }) => ({
  position: 'absolute',
  right: 120,
  cursor: 'pointer',

  svg: {
    fontSize: '1.875rem',
    verticalAlign: 'middle',
  },

  '& .MuiBadge-badge': {
    background: theme.palette.prime,
    color: '#fff',
  },
}));

const BuyBtnWrapper = styled('div')({
  position: 'absolute',
  right: 0,
});

const TitleBtn = styled(Button)(({ theme }) => ({
  fontFamily: 'LGSmart',
  color: '#000',
  height: 60,
  fontWeight: 600,
  marginLeft: 20,
  '&:hover': {
    color: theme.palette.prime,
    background: 'transparent',
  },
}));

const SubTitleBtn = styled(ButtonBase)({
  fontFamily: 'LGSmart',
  fontWeight: 600,
  paddingLeft: 10,
});

const SubItemBtn = styled(ButtonBase)({
  fontFamily: 'LGSmart',
  paddingLeft: 10,
});

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [cookie, setCookie] = useCookies(['cartCount']);
  const theme = useTheme();
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [beforeSelectedMenu, setBeforeSelectedMenu] = useState(null);

  // 로고 클릭시 홈으로 이동
  const handleLogoClick = () => {
    navigate('/');
  };

  // 메뉴를 눌러 페이지 이동 한 뒤
  const handleMenuClick = (url) => {
    setSelectedMenu(null);
    navigate(url);
  };

  // 장바구니 아이콘 클릭시 장바구니 페이지로 이동
  const handleCartClick = () => {
    navigate('/cart');
  };

  const compareLocation = (title) => {
    return NavbarContent[title].some((subTitle) => location.pathname.indexOf(subTitle.url) !== -1);
  };
  return (
    <>
      <CustomAppbar position="sticky">
        <CustomToolbar disableGutters>
          <ButtonBase disableRipple onClick={handleLogoClick}>
            <LogoImage alt="로고" src={LogoUplus} />
          </ButtonBase>
          {Object.keys(NavbarContent).map((mainTitle, idx) => {
            return (
              <div
                key={`${idx}-${mainTitle}`}
                onMouseLeave={() => setSelectedMenu(null)}
                onMouseEnter={() => {
                  setSelectedMenu(mainTitle);
                  setBeforeSelectedMenu(mainTitle);
                }}>
                <TitleBtnWrapper>
                  <TitleBtn
                    disableFocusRipple
                    disableRipple
                    style={{
                      color:
                        selectedMenu === mainTitle || compareLocation(mainTitle)
                          ? theme.palette.prime
                          : '#000',
                    }}>
                    {mainTitle}
                  </TitleBtn>
                </TitleBtnWrapper>
              </div>
            );
          })}
          <SearchBar />
          <CartBtnWrapper onClick={handleCartClick}>
            <Badge
              badgeContent={cookie.cartCount || 0}
              invisible={!!!cookie.cartCount || cookie.cartCount === '0'}>
              <ShoppingCartOutlined />
            </Badge>
          </CartBtnWrapper>
          <BuyBtnWrapper>
            <RoundBtn>구매조회</RoundBtn>
          </BuyBtnWrapper>
        </CustomToolbar>
      </CustomAppbar>
      <MenuCollpase
        in={Boolean(selectedMenu)}
        onMouseEnter={() => setSelectedMenu(beforeSelectedMenu)}
        onMouseLeave={() => {
          setSelectedMenu(null);
        }}>
        <MenuDiv>
          {!!selectedMenu &&
            NavbarContent[selectedMenu].map((subTitle, idx) => {
              return (
                <SubMenuWrapper key={`${idx}-${selectedMenu}-${subTitle.name}`}>
                  <SubTitleBtn onClick={() => handleMenuClick(subTitle.url)}>
                    {subTitle.name}
                  </SubTitleBtn>
                  {subTitle.children.map((subItem, idx) => {
                    return (
                      <SubItemBtn
                        key={`${idx}-${selectedMenu}-${subTitle.name}=${subItem.name}`}
                        onClick={() => handleMenuClick(`${subTitle.url}${subItem.url}`)}>
                        {subItem.name}
                      </SubItemBtn>
                    );
                  })}
                </SubMenuWrapper>
              );
            })}
        </MenuDiv>
      </MenuCollpase>
    </>
  );
}

export default Navbar;
