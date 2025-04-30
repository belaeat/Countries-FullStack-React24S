import Footer from "../Footer/Footer";
import { Navigation } from "../Navigation";
import { ReactNode } from "react";

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div>
            <Navigation />
            {children}
            <Footer></Footer>
        </div>
    );
};

export default Layout; 