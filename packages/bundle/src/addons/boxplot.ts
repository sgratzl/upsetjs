/**
 * @upsetjs/bundle
 * https://github.com/upsetjs/upsetjs
 *
 * Copyright (c) 2020 Samuel Gratzl <sam@sgratzl.com>
 */

import { UpSetCSSStyles, UpSetReactElement } from '../react';
import { UpSetAddon } from '@upsetjs/react';
import { boxplotAddon as boxplotAddonImpl, IBoxplotStylePlainProps } from '@upsetjs/addons';
import { ISetLike } from '@upsetjs/model';

export interface IBoxplotStyleProps extends IBoxplotStylePlainProps {
  /**
   * custom styles applied to the box element
   */
  boxStyle?: UpSetCSSStyles;
  /**
   * custom styles applied to the whisker element
   */
  lineStyle?: UpSetCSSStyles;
  /**
   * custom styles applied to the outlier elements
   */
  outlierStyle?: UpSetCSSStyles;
}

/**
 * generates a boxplot addon to render box plots as UpSet.js addon for aggregated set data
 * @param prop accessor or name of the property within the element
 * @param elems list of elements or their minimum / maximum value for specifying the data domain
 * @param options additional options
 */
export function boxplotAddon<T>(
  prop: keyof T | ((v: T) => number),
  elems: ReadonlyArray<T> | { min: number; max: number },
  options: Partial<Pick<UpSetAddon<ISetLike<T>, T, UpSetReactElement>, 'size' | 'position' | 'name'>> &
    IBoxplotStyleProps = {}
): UpSetAddon<ISetLike<T>, T, UpSetReactElement> {
  return boxplotAddonImpl(prop, elems, options);
}
