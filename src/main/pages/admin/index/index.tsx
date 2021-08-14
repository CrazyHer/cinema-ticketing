import { inject, observer } from 'mobx-react';
import React from 'react';

const Index = (props: any) => {
  return <div>首页</div>;
};
export default inject()(observer(Index));
