/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { _getProvider } from '@firebase/app-exp';
import { FirebaseApp } from '@firebase/app-types-exp';
import { Analytics } from '@firebase/analytics-types-exp';
import { Provider } from '@firebase/component';
import {
  isIndexedDBAvailable,
  validateIndexedDBOpenable,
  areCookiesEnabled,
  isBrowserExtension
} from '@firebase/util';
import { ANALYTICS_TYPE } from './constants';
import { AnalyticsService } from './factory';

export {
  logEvent,
  setCurrentScreen,
  setUserId,
  setUserProperties,
  setAnalyticsCollectionEnabled,
  settings
} from './factory';

declare module '@firebase/component' {
  interface NameServiceMapping {
    [ANALYTICS_TYPE]: AnalyticsService;
  }
}

/**
 * Returns a Firebase Analytics instance for the given app.
 *
 * @public
 *
 * @param app - The FirebaseApp to use.
 */
export function getAnalytics(app: FirebaseApp): Analytics {
  // Dependencies
  const analyticsProvider: Provider<'analytics-exp'> = _getProvider(
    app,
    ANALYTICS_TYPE
  );
  const analyticsInstance = analyticsProvider.getImmediate();
  return analyticsInstance;
}

/**
 * This is a public static method provided to users that wraps four different checks:
 *
 * 1. Check if it's not a browser extension environment.
 * 2. Check if cookies are enabled in current browser.
 * 3. Check if IndexedDB is supported by the browser environment.
 * 4. Check if the current browser context is valid for using IndexedDB.open().
 *
 * @public
 *
 */
export async function isSupported(): Promise<boolean> {
  if (isBrowserExtension()) {
    return false;
  }
  if (!areCookiesEnabled()) {
    return false;
  }
  if (!isIndexedDBAvailable()) {
    return false;
  }

  try {
    const isDBOpenable: boolean = await validateIndexedDBOpenable();
    return isDBOpenable;
  } catch (error) {
    return false;
  }
}
