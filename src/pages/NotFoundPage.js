import React from 'react';
import { Helmet } from 'react-helmet-async';

function NotFoundPage(props) {
  return (
    <div>
      <Helmet>
        <title> 페이지를 찾을 수 없습니다. | 엘지유플 최강 3조</title>
      </Helmet>
      404
    </div>
  );
}

export default NotFoundPage;
