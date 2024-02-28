'use client'

import { useInitNear, Widget } from 'near-social-vm';

import { isValidAttribute } from 'dompurify';
import { mapValues } from 'lodash';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { setupWalletSelector } from '@near-wallet-selector/core';
import { setupMyNearWallet } from '@near-wallet-selector/my-near-wallet';
import { setupNightly } from '@near-wallet-selector/nightly';
import { optOut, recordHandledError, recordWalletConnect, reset as resetAnalytics } from '@/utils/analytics';
import {
  isLocalEnvironment,
  networkId,
} from '@/utils/config';

const Components = ({ src,props }:{src:any,props:any}) =>{
  const { initNear } = useInitNear();
  
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
        },
        features: {
          enableComponentSrcDataKey: true,
          enableWidgetSrcWithCodeOverride: isLocalEnvironment,
        },
      });
  }, [initNear]);

  return <Widget src={src} props={props}/>;
}



const PreviewCode= () => {
  const [widget,selectWidget] = useState(null);
  console.log("widget",widget);
  return(<>
    <Components src="magicbuild.near/widget/add-block-button" props={{selectWidget}}/>
    {widget&&<Components src={widget} props={{}}/>}
    {/* <Preview tab={Tab.Widget} layout={Layout.Split} renderCode={renderCode} jpath={jpath} parsedWidgetProps={'{}'} isModule={'{}'}/> */}
    {/* <VmComponent src={"linearprotocol.near/widget/LiNEAR.Account"} props={{}} key={`preview-${jpath}`}/> */}
                        
  </>);
};


export default PreviewCode;