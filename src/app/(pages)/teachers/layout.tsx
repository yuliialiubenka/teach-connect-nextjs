import { LayoutProps } from "@/typings";

export default function Layout({ children, modal }: LayoutProps) {
    return (
        <>
            {children}
            {modal}
        </>
    );
}