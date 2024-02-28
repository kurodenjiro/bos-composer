'use client';

import type { ReactNode } from 'react';
import Button from "react-bootstrap/Button"
import React,{useEffect} from 'react';
import {
  Avatar,
  ScrollShadow,
  Spacer,
  Tooltip,
} from '@nextui-org/react';
import { usePathname } from 'next/navigation';
import { Icon } from '@iconify/react';
import { useMediaQuery } from 'usehooks-ts';
import { useAuthStore } from '@/stores/auth';
import { AcmeLogo } from './acme';
import { sectionItemsWithTeams } from './sidebar-items';
import { cn } from '../utils/cn';

import Sidebar from './sidebar';
import { Navbar } from './navbar';
import { useInitNear, Widget } from 'near-social-vm';
/**
 *  This example requires installing the `usehooks-ts` package:
 * `npm install usehooks-ts`
 *
 * import {useMediaQuery} from "usehooks-ts";
 */
export const SidebarWrapper = ({ children }: { children?: ReactNode }) => {
  const accountId = useAuthStore((store) => store.accountId);
  const requestSignInWithWallet = useAuthStore((store) => store.requestSignInWithWallet);
  const vmNear = useAuthStore((store) => store.vmNear);
  useEffect(() => {
    if (vmNear?.selector) {
      vmNear.selector
        .then((selector: any) => {
          const walletSelectorState = selector.store.getState();

          if (walletSelectorState.selectedWalletId === 'my-near-wallet') {
            return selector.wallet('my-near-wallet');
          }
        })
        .then((MyNearWallet: any) => {
          if (MyNearWallet) {
            MyNearWallet.signIn({
              contractId: vmNear.config.contractName,
            });
          }
        });
    }
  }, [vmNear]);
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const isCompact = isCollapsed || isMobile;

  const pathname = usePathname();
  const currentPath = pathname.split('/')?.[1];

  const onToggle = React.useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);
  //console.log("Acc",)
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <div
        className={cn(
          'relative flex h-full w-72 flex-col !border-r-small border-divider p-6 duration-250 ease-in-out transition-width',
          {
            'w-16 items-center px-2 py-6': isCompact,
          }
        )}
      >
        <Spacer y={20} />
        {/* <Button onClick={requestSignInWithWallet}>Login</Button> */}
        {accountId==''?<Button onClick={requestSignInWithWallet}>Login</Button>:<div className="d-flex align-items-center gap-3 px-3">
          {/* <Avatar
            isBordered
            className="flex-none"
            size="sm"
          /> */}
          <img width={40} className='rounded-circle' src={`https://i.near.social/magic/large/https://near.social/magic/img/account/${accountId}`} alt="logo" />
          <div
            className={cn('flex max-w-full flex-col', { hidden: isCompact })}
          >
            <p className="truncate text-small font-medium">
              {accountId}
            </p>
            <p className="truncate text-tiny text-default-400">
              Product Designer
            </p>
          </div>
        </div>}
        <ScrollShadow className="-mr-6 h-full max-h-full py-6 pr-6">
          <Sidebar className='text-decoration-none' style={{textDecoration:'none'}}
            defaultSelectedKey="home"
            selectedKeys={[currentPath]}
            isCompact={isCompact}
            items={sectionItemsWithTeams}
          />
        </ScrollShadow>
        <Spacer y={2} />
        
      </div>
      <div className="w-full flex-1 flex-col p-4 ">
        {/* <Navbar onToggle={onToggle} /> */}
        {children}
      </div>
    </div>
  );
};
