/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import useLexicalEditable from '@lexical/react/useLexicalEditable';
import * as React from 'react';

import {useCanShowPlaceholder} from './shared/useCanShowPlaceholder';
import {ErrorBoundaryType, useDecorators} from './shared/useDecorators';
import {usePlainTextSetup} from './shared/usePlainTextSetup';

export function PlainTextPlugin({
  contentEditable,
  placeholder,
  ErrorBoundary,
}: {
  contentEditable: React.ReactElement;
  placeholder:
    | ((isEditable: boolean) => null | React.ReactElement)
    | null
    | React.ReactElement;
  ErrorBoundary: ErrorBoundaryType;
}): React.ReactElement {
  const [editor] = useLexicalComposerContext();
  const decorators = useDecorators(editor, ErrorBoundary);
  usePlainTextSetup(editor);

  return (
    <>
      {contentEditable}
      <Placeholder content={placeholder} />
      {decorators}
    </>
  );
}

function Placeholder({
  content,
}: {
  content:
    | ((isEditable: boolean) => null | React.ReactElement)
    | null
    | React.ReactElement;
}): null | React.ReactElement {
  const [editor] = useLexicalComposerContext();
  const showPlaceholder = useCanShowPlaceholder(editor);
  const editable = useLexicalEditable();

  if (!showPlaceholder) {
    return null;
  }

  if (typeof content === 'function') {
    return content(editable);
  } else {
    return content;
  }
}
