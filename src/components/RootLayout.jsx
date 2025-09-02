import Header from "./Header"
import { Outlet } from "react-router"

const RootLayout = () => {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default RootLayout