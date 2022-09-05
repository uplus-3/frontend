/**
 * 담당자 : 성아영
 */
export const NavbarContent = {
  '모바일 기기': [
    {
      name: '5G 휴대폰',
      url: '5g-phone',
      children: [
        { name: '전체', url: '' },
        { name: '삼성', url: '/?company=삼성' },
        { name: '애플', url: '/?company=애플' },
        { name: '기타', url: '/?company=기타' },
      ],
    },
    {
      name: '4G 휴대폰',
      url: '4g-phone',
      children: [
        { name: '전체', url: '' },
        { name: '삼성', url: '/?company=삼성' },
        { name: '애플', url: '/?company=애플' },
        { name: '기타', url: '/?company=기타' },
      ],
    },
  ],
};
