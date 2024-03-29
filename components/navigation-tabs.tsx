'use client';

import React from 'react';
import {
  Button,
  Tabs,
  Tab,
  AvatarGroup,
  Avatar,
  Chip,
  Tooltip,
  ScrollShadow,
  Divider,
} from '@nextui-org/react';
import { Icon } from '@iconify/react';
import PreviewCode from './PreviewCode/page';

export const NavigationTabs = () => {
  const [selectedTab, setSelectedTab] = React.useState('dashboard');

  const handleSelectionChange = React.useCallback((value: React.Key) => {
    // scroll to the selected category
    setSelectedTab(value.toString());
  }, []);

  const tabContent = React.useMemo(() => {
    switch (selectedTab) {
      case 'dashboard':
        return <PreviewCode/>;
      case 'deployments':
        return <h1>Dashboard</h1>;
      case 'analytics':
        return <h1>Analytics</h1>;
      case 'team':
        return <h1>Team</h1>;
      case 'settings':
        return <h1>Settings</h1>;
    }
  }, [selectedTab]);

  return (
    <div className="flex flex-col h-full gap-4">
      <ScrollShadow
        hideScrollBar
        className="flex w-full max-w-[1024px] h-14 justify-between gap-8 px-2"
        orientation="horizontal"
      >
        <Tabs
          selectedKey={selectedTab.toString()}
          aria-label="Navigation Tabs"
          classNames={{
            tabList: 'w-full relative rounded-none p-0 gap-4 lg:gap-6',
            tab: 'max-w-fit px-0 h-12',
            cursor: 'w-full',
            tabContent: 'text-default-400',
          }}
          radius="full"
          variant="underlined"
          onSelectionChange={handleSelectionChange}
        >
          <Tab key="dashboard" title="Dashboard" />
          <Tab
            key="deployments"
            title='Deployments'
          />
          <Tab key="analytics" title="Analytics" />
          <Tab key="team" title="Team" />
          <Tab key="settings" title="Settings" />
        </Tabs>
        
      </ScrollShadow>
      <section className="bg-content1 p-6 rounded-medium h-full">
        {tabContent}
      </section>
    </div>
  );
};
