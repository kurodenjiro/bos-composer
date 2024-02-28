'use client';

import {
  Navbar as NavbarBase,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Avatar,
  Breadcrumbs,
  BreadcrumbItem,
  Input,
  Badge,
} from '@nextui-org/react';
import NotificationsCard from './notification-card';
import { Icon } from '@iconify/react';
import { AcmeIcon } from './social-icons';
import { useWalletSelector } from "@/context/WalletSelectorContext";
import type {
  AccountView,
  CodeResult,
} from "near-api-js/lib/providers/provider";
import { providers, utils } from "near-api-js";
import { useEffect, useState } from 'react';
export const Navbar = ({ onToggle }: { onToggle?: () => void }) => {
  const { selector, modal, accounts, accountId } = useWalletSelector();
  const [data,setData] = useState();
  const contractId ="social.near";

  const handleSignIn = () => {
    modal.show();
    };

  //console.log("dara",data)
  return (
    <NavbarBase
      classNames={{
        base: 'pt-2 px-0 lg:pt-4 lg:bg-transparent lg:backdrop-filter-none',
        wrapper: 'px-4 flex gap-3 rounded-medium border-small border-divider',
        item: 'data-[active=true]:text-primary',
      }}
      height="60px"
    >
      <NavbarBrand>
        <Button isIconOnly size="sm" variant="light" onPress={onToggle}>
          <Icon
            className="text-default-500"
            height={24}
            icon="solar:sidebar-minimalistic-outline"
            width={24}
          />
        </Button>
      </NavbarBrand>
      <Breadcrumbs className="hidden lg:flex" radius="full">
        <BreadcrumbItem>Apps</BreadcrumbItem>
        <BreadcrumbItem>iOS App</BreadcrumbItem>
        <BreadcrumbItem>TestFlight</BreadcrumbItem>
      </Breadcrumbs>

      {/* Right Menu */}
      <NavbarContent
        className="ml-auto h-12 max-w-fit items-center gap-0"
        justify="end"
      >
        {/* Search */}
        <NavbarItem className="mr-2 hidden sm:flex">
          <Input
            aria-label="Search"
            classNames={{
              inputWrapper: 'bg-content2 dark:bg-content1',
            }}
            labelPlacement="outside"
            placeholder="Search..."
            radius="full"
            startContent={
              <Icon
                className="text-default-500"
                icon="solar:magnifer-linear"
                width={20}
              />
            }
          />
        </NavbarItem>
        <NavbarItem className="hidden sm:flex">
          <Button isIconOnly radius="full" variant="light">
            <Icon
              className="text-default-500"
              icon="solar:sun-linear"
              width={24}
            />
          </Button>
        </NavbarItem>
        {/* Settings */}
        <NavbarItem className="hidden sm:flex">
          <Button isIconOnly radius="full" variant="light">
            <Icon
              className="text-default-500"
              icon="solar:settings-linear"
              width={24}
            />
          </Button>
        </NavbarItem>
        {/* Notifications */}
        <NavbarItem className="flex">
          <Popover offset={12} placement="bottom-end">
            <PopoverTrigger>
              <Button
                disableRipple
                isIconOnly
                className="overflow-visible"
                radius="full"
                variant="light"
              >
                <Badge color="danger" content="5" showOutline={false} size="md">
                  <Icon
                    className="text-default-500"
                    icon="solar:bell-linear"
                    width={22}
                  />
                </Badge>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="max-w-[90vw] p-0 sm:w-[380px]">
              <NotificationsCard className="w-full shadow-none" />
            </PopoverContent>
          </Popover>
        </NavbarItem>
        {/* User Menu */}
        {accountId?<NavbarItem className="px-2">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <button className="mt-1 h-8 w-8 outline-none transition-transform">
                <Badge
                  color="success"
                  content=""
                  placement="bottom-right"
                  shape="circle"
                >
                  <Avatar
                    size="sm"
                    src="https://i.pravatar.cc/150?u=a04258114e29526708c"
                  />
                </Badge>
              </button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{accountId}</p>
              </DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="team_settings">Team Settings</DropdownItem>
              <DropdownItem key="analytics">Analytics</DropdownItem>
              <DropdownItem key="system">System</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>:<Button onClick={handleSignIn} className='mx-5 px-3'>Login</Button>}
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu>
        <NavbarMenuItem>
          <Link className="w-full" color="foreground" href="#">
            Dashboard
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem isActive>
          <Link aria-current="page" className="w-full" color="primary" href="#">
            Deployments
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link className="w-full" color="foreground" href="#">
            Analytics
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link className="w-full" color="foreground" href="#">
            Team
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link className="w-full" color="foreground" href="#">
            Settings
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </NavbarBase>
  );
};
