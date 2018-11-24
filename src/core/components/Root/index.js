/* @flow */
import * as React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { CookiesProvider, Cookies } from 'react-cookie';
import { Provider } from 'react-redux';
import config from 'config';

import I18nProvider from 'core/i18n/Provider';
import type { I18nType } from 'core/types/i18n';
import type { ReduxStore } from 'core/types/redux';
import type { ReactRouterHistoryType } from 'core/types/router';

type Props = {|
  _config?: typeof config,
  children: React.Node,
  cookies?: typeof Cookies,
  history: ReactRouterHistoryType,
  i18n: I18nType,
  store: ReduxStore,
|};

const Root = ({
  _config = config,
  children,
  history,
  i18n,
  store,
  cookies = null,
}: Props) => (
  <I18nProvider i18n={i18n}>
    <Provider store={store} key="provider">
      <ConnectedRouter history={history}>
        <CookiesProvider cookies={cookies}>
          {/* $FLOW_FIXME: https://github.com/facebook/react/issues/12553 */}
          {_config.get('enableStrictMode') ? (
            <React.StrictMode>{children}</React.StrictMode>
          ) : (
            children
          )}
        </CookiesProvider>
      </ConnectedRouter>
    </Provider>
  </I18nProvider>
);

export default Root;
