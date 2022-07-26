/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

import JSResourceReferenceImpl from 'src/react/packages/react-server-dom-relay/src/__mocks__/JSResourceReferenceImpl';

const ReactFlightDOMRelayClientIntegration = {
  resolveModuleReference(moduleData) {
    return new JSResourceReferenceImpl(moduleData);
  },
  preloadModule(moduleReference) {},
  requireModule(moduleReference) {
    return moduleReference._moduleId;
  },
};

module.exports = ReactFlightDOMRelayClientIntegration;
