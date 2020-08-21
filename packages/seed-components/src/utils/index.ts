import { prefixCls } from '../constants';

export { default as omit } from './omit';

export function getPrefixCls(suffixCls = '') {
  return `${prefixCls}-${suffixCls}`;
}
