'use client'
import Preview from '@/components/sandbox/Preview';
import { VmComponent } from '../vm/VmComponents';

import styled from 'styled-components';
const Tab = {
    Editor: 'Editor',
    Props: 'Props',
    Metadata: 'Metadata',
    Widget: 'Widget',
  };

const Layout = {
    Tabs: 'Tabs',
    Split: 'Split',
  };



const PreviewCode= () => {
    const renderCode = 'return <button>Click</button>';
    const jpath = "/nextjs-template/components/";
  return(<>
    {/* <Components src="influencer.testnet/widget/Greeter" /> */}
    <Preview tab={Tab.Widget} layout={Layout.Split} renderCode={renderCode} jpath={jpath} parsedWidgetProps={'{}'} isModule={'{}'}/>
    {/* <VmComponent src={"linearprotocol.near/widget/LiNEAR.Account"}/> */}
                        
  </>);
};


export default PreviewCode;