
import { isValidAttribute } from 'dompurify';
import { mapValues } from 'lodash';
import {
  CommitButton,
  EthersProviderContext,
  useAccount,
  useCache,
  useInitNear,
  useNear,
  utils,
  Widget,
} from 'near-social-vm';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import { setupWalletSelector } from '@near-wallet-selector/core';
import { setupMyNearWallet } from '@near-wallet-selector/my-near-wallet';
import { setupNightly } from '@near-wallet-selector/nightly';
import { useEthersProviderContext } from '@/data/web3';
import { useVmStore } from '@/stores/vm';
import { optOut, recordHandledError, recordWalletConnect, reset as resetAnalytics } from '@/utils/analytics';
import {
  commitModalBypassAuthorIds,
  commitModalBypassSources,
  isLocalEnvironment,
  networkId,
} from '@/utils/config';


export default function VmInitializer() {
  const ethersProviderContext = useEthersProviderContext();
  const { initNear } = useInitNear();
  const near = useNear();
  const cache = useCache();
  const setVmStore = useVmStore((store) => store.set);

  useEffect(() => {
    initNear &&
      initNear({
        networkId,
        walletConnectCallback: recordWalletConnect,
        errorCallback: recordHandledError,
        selector: setupWalletSelector({
          network: networkId,
          modules: [    
            setupMyNearWallet(),
            setupNightly(),
          ],
        }),
        customElements: {
          Link: ({ to, href, ...rest }: { to: string | object | undefined; href: string | object }) => {
            const cleanProps = mapValues({ to, href, ...rest }, (val: any, key: string) => {
              if (!['to', 'href'].includes(key)) return val;
              if (key === 'href' && !val) val = to;
              return typeof val === 'string' && isValidAttribute('a', 'href', val) ? val : 'about:blank';
            });

            return <Link {...cleanProps} />;
          },
          AnalyticsCookieConsent: ({ all, onlyRequired }: { all: boolean; onlyRequired: boolean }) => {
            localStorage.setItem('cookiesAcknowledged', all ? 'all' : ' only_required');
            optOut();
            return <></>;
          },
        },
        features: {
          enableComponentSrcDataKey: true,
          enableWidgetSrcWithCodeOverride: isLocalEnvironment,
        },
      });
  }, [initNear]);

  

  useEffect(() => {
    setVmStore({
      cache,
      CommitButton,
      ethersContext: ethersProviderContext,
      EthersProvider: EthersProviderContext.Provider,
      Widget,
      near,
    });
  }, [cache, ethersProviderContext, setVmStore, near]);

  return <></>;
}
