import './globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@near-wallet-selector/modal-ui/styles.css';
import { SidebarWrapper } from '@/components/sidebar-wrapper';

import { AppProvider } from '@/providers/app-provider';
import { NavigationTabs } from '@/components/navigation-tabs';
import Head from 'next/head';
export const metadata = {
  title: 'BOS Composer',
  description: 'Generated by BOS Composer',
}

export default function RootLayout({children }:{children:React.ReactNode}) {

  return (
    <>
    <Head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossOrigin="anonymous"/>
    </Head>
    <html lang="en" className="bg-white">
      <body>
        <AppProvider>
          <SidebarWrapper>
            <main className="mt-4 h-full w-full overflow-visible">
              <div className="flex h-[90%] w-full flex-col gap-4 p-6 rounded-medium border-small border-divider">
                {children}
                <NavigationTabs />
                
              </div>
            </main>
          </SidebarWrapper>
        </AppProvider>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossOrigin="anonymous"></script>
      </body>
    </html>
    </>
    
  )
}
