/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
/**
 * Internal dependencies
 */
import { ReactComponent as FlipHorizontal } from '../../../icons/flip_horizontal.svg';
import { ReactComponent as FlipVertical } from '../../../icons/flip_vertical.svg';
import Toggle from '../../form/toggle';
import getCommonObjectValue from '../utils/getCommonObjectValue';
import { getDefinitionForType } from '../../../elements';

function FlipControls({ selectedElements, onSetProperties }) {
  const flip = getCommonObjectValue(
    selectedElements,
    'flip',
    ['horizontal', 'vertical'],
    false
  );
  const [state, setState] = useState({
    flip,
  });
  useEffect(() => {
    setState({ flip });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flip.horizontal, flip.vertical]);

  const canFlip = selectedElements.every(
    ({ type }) => getDefinitionForType(type).canFlip
  );

  const updateProperties = useCallback(() => {
    onSetProperties(({ flip: oldFlip }) => {
      return {
        ...state,
        flip:
          // Ensure flip change only if flip controls are actually visible (canFlip).
          canFlip ? state.flip : oldFlip,
      };
    });
  }, [canFlip, onSetProperties, state]);

  useEffect(() => {
    updateProperties();
  }, [state.flip.horizontal, state.flip.vertical, updateProperties]);

  const onChange = (value) => {
    setState({
      ...state,
      flip: value,
    });
  };

  return (
    <>
      <Toggle
        icon={<FlipHorizontal />}
        value={flip.horizontal}
        onChange={(horizontal) => {
          onChange({ ...flip, horizontal });
        }}
      />
      <Toggle
        icon={<FlipVertical />}
        value={flip.vertical}
        onChange={(vertical) => {
          onChange({ ...flip, vertical });
        }}
      />
    </>
  );
}

FlipControls.propTypes = {
  selectedElements: PropTypes.array.isRequired,
  onSetProperties: PropTypes.func.isRequired,
};

export default FlipControls;
