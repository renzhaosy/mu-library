import React from 'react';

interface IProps {
  size?: string | number;
  color?: string;
}

const LoadingIcon = (props) => {
  // const { size = 0, color = '' } = props;

  // const loadingSize = typeof size === 'string' ? size : String(size);
  // const sizeStyle = {
  //   width: size || '',
  //   height: size || '',
  // };
  // const colorStyle = {
  //   border: color ? `1px solid ${color}` : '',
  //   'border-color': color ? `${color} transparent transparent transparent` : '',
  // };
  // const ringStyle = { ...colorStyle, ...sizeStyle };

  return (
    <div className={'mu-loading'}>
      <div className={'mu-loading-ring'} ></div>
      <div className={'mu-loading-ring'} ></div>
      <div className={'mu-loading-ring'} ></div>
    </div>
  );
};

LoadingIcon.defaultProps = {
  size: 0,
};

export default LoadingIcon;
