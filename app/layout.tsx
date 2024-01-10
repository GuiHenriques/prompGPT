import '@/styles/globals.css'


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
                <div className="main">
                    <div className="gradient" />
                </div>
                <main className="app">
                    {children}
                </main>
        </body>
    </html>
  )
}

export default RootLayout