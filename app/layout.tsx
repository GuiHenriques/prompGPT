import '@/styles/globals.css'
import Nav from '@/components/Nav'
import Provider from '@/components/Provider'


interface LayoutProps {
    children: React.ReactNode
}

export const metadata = {
    title: 'PromGPT Layout',
    description: 'Discover GPT Prompts',
}

const RootLayout = ({children}: LayoutProps) => {
  return (
    <html lang="en">
        <body>
            <Provider >
                <div className="main">
                    <div className="gradient" />
                </div>
                <main className="app">
                
                    <Nav />
                    {children}
                </main>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout