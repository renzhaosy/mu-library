import React from 'react';
import cls from 'classnames';
import { omit, getPrefixCls } from '../../utils';
import { tuple, Omit } from '../../utils/type';
import LoadingIcon from './loading';
import './style/index.less';

const ButtonTypes = tuple('default', 'primary', 'ghost', 'dashed', 'link');
export type ButtonType = typeof ButtonTypes[number];
const ButtonHTMLTypes = tuple('submit', 'button', 'reset');
export type ButtonHTMLType = typeof ButtonHTMLTypes[number];

const ButtonSizeTypes = tuple('sm', 'lg');
export type ButtonSizeType = typeof ButtonSizeTypes[number];

interface BaseButtonProps {
  type?: ButtonType;
  size?: ButtonSizeType;
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  loading?: boolean;
  block?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

export type AnchorButtonProps = {
  href: string;
  target?: string;
} & BaseButtonProps &
  Omit<React.AnchorHTMLAttributes<any>, 'type' | 'onClick'>;

export type NativeButtonProps = {
  htmlType?: ButtonHTMLType;
} & BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<any>, 'type' | 'onClick'>;

export type ButtonProps = Partial<AnchorButtonProps & NativeButtonProps>;

interface IButtonState {}

const BaseButton: React.ForwardRefRenderFunction<any, ButtonProps> = (
  props,
  ref,
) => {
  const buttonRef = ref || React.createRef<HTMLElement>();

  const {
    loading,
    htmlType,
    onClick,
    type,
    size,
    block,
    children,
    className,
    disabled,
    ...rest
  } = props;

  const prefixCls = getPrefixCls('btn');
  const rootClass = cls(
    prefixCls,
    {
      [`${prefixCls}-${type}`]: type,
      [`${prefixCls}-${size}`]: size,
      [`${prefixCls}-loading`]: loading,
      [`${prefixCls}-block`]: block,
    },
    className,
  );

  const iconNode = loading ? <LoadingIcon  /> : null;
  
  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>,
  ) => {
    if (loading || disabled) {
      return;
    }
    if (onClick) {
      (onClick as React.MouseEventHandler<
        HTMLButtonElement | HTMLAnchorElement
      >)(e);
    }
  };

  if (rest.href !== undefined) {
    return (
      <a
        href={rest.href}
        {...rest}
        className={rootClass}
        onClick={handleClick}
        ref={buttonRef}
      >
        {iconNode}
        {children}
      </a>
    );
  }

  const button = (
    <button
      type={htmlType}
      disabled={disabled}
      {...rest}
      className={rootClass}
      onClick={handleClick}
      ref={buttonRef}
    >
      {iconNode}
      {children}
    </button>
  );

  return button;
};

const Button = React.forwardRef<unknown, ButtonProps>(BaseButton);

export default Button;
