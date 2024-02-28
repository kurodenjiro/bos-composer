"use client";
import {type ReactNode} from "react";
import {NextUIProvider} from "@nextui-org/react";
import {useRouter} from "next/navigation";
import { WalletSelectorContextProvider } from "@/context/WalletSelectorContext";
import { useBosLoaderInitializer } from '@/hooks/useBosLoaderInitializer';
import dynamic from 'next/dynamic';
const VmInitializer = dynamic(() => import('../components/vm/VmInitializer'), {
  ssr: false,
});


export function AppProvider({children }:{children:ReactNode}) {
  useBosLoaderInitializer();
  const router = useRouter();
  return (
    <NextUIProvider navigate={router.push}>
      <WalletSelectorContextProvider>
        <VmInitializer/>
        {children}
        </WalletSelectorContextProvider>
    </NextUIProvider>
  );
}
