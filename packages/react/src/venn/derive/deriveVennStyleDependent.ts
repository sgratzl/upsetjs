/**
 * @upsetjs/react
 * https://github.com/upsetjs/upsetjs
 *
 * Copyright (c) 2020 Samuel Gratzl <sam@sgratzl.com>
 */

import { CSSProperties, ReactNode } from 'react';
import { VennDiagramMultiStyle, UpSetThemes } from '../../interfaces';

export default function deriveVennStyleDependent(
  theme: UpSetThemes,
  styles: VennDiagramMultiStyle<CSSProperties>,
  classNames: VennDiagramMultiStyle<string>,
  styleId: string,
  selectionColor: string,
  title: string | ReactNode,
  description: string | ReactNode
) {
  return {
    theme,
    styles,
    classNames: classNames,
    id: styleId,
    selectionColor,
    title,
    description,
  };
}

export declare type VennDiagramStyleInfo = ReturnType<typeof deriveVennStyleDependent>;