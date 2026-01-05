const MainLayout = ({children} : {children: React.ReactNode}) => {
    return <div>
        <header className="border-b border-black p-4 font-serif">
            LitEnglish
        </header>
        <main className="p-4">
            {children}
        </main>
    </div>
}
export default MainLayout;
