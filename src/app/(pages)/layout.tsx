import { LayoutProps } from "@/typings";

export default function Layout({ modal, children }: LayoutProps) {
    return (
        <>
            {modal}
            {children}
        </>
    );
}