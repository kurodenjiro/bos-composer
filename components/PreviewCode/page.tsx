'use client'
import Preview from '@/components/sandbox/Preview';
import Button from 'react-bootstrap/Button';
import ReactDomServer from 'react-dom/server';


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
  const code = ReactDomServer.renderToString(<Button>click</Button>)
    const renderCode = `return ${code};`;
    const jpath = "/nextjs-template/components/";
  return(<>
    {/* <Components src="influencer.testnet/widget/Greeter" /> */}
    <Preview tab={Tab.Widget} layout={Layout.Split} renderCode={renderCode} jpath={jpath} parsedWidgetProps={'{}'} isModule={'{}'}/>
    {/* <VmComponent src={"linearprotocol.near/widget/LiNEAR.Account"}/> */}
                        
  </>);
};


export default PreviewCode;