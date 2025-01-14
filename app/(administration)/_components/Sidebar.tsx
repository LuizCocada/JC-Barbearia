import { cn } from "@/lib/utils";
import Link from "next/link";


export type SidebarGenericProps<T = unknown> = {
    children?: React.ReactNode;
    className?: string;
} & T;


export function Sidebar({ children, className }: SidebarGenericProps) {
    return (
        <aside className={cn(['flex flex-col space-y-6 border-r-[0.1px] border-gray-300', className])}>
            {children}
        </aside>
    );
}


export function SidebarHeader({ children, className }: SidebarGenericProps) {
    return (
        <header className={cn(['flex items-center gap-2 px-6 py-2.5 border-b-[0.1px] border-gray-300 bg-card', className])}>
            {children}
        </header>
    );
}


// type SidebarImageHeaderProps = {
//     imageSrc: string;
//     alt: string;
// };

export function SidebarImageHeader({ children, className }: SidebarGenericProps) {
    return (
        <div className={cn(['', className])}>
            {children}
        </div>
    );
}

export function SidebarHeaderTitle({ children, className }: SidebarGenericProps) {
    return (
        <h2 className={cn(['text-xl font-bold', className])}>
            {children}
        </h2>
    );
}

export function SidebarMain({ children, className }: SidebarGenericProps) {
    return (
        <main className={cn(['pt-2 px-3', className])}>
            {children}
        </main>
    );
}


export function SidebarNav({ children, className }: SidebarGenericProps) {
    return (
        <nav className={cn(['', className])}>
            {children}
        </nav>
    );
}

export function SidebarNavHeader({ children, className }: SidebarGenericProps) {
    return (
        <header className={cn(['', className])}>
            {children}
        </header>
    );
}

export function SidebarNavHeaderTitle({ children, className }: SidebarGenericProps) {
    return (
        <h4 className={cn(['text-xs uppercase text-muted-foreground ml-3', className])}>
            {children}
        </h4>
    );
}

export function SidebarNavMain({ children, className }: SidebarGenericProps) {
    return (
        <main className={cn(['flex flex-col space-y-3', className])}>
            {children}
        </main>
    );
}

type SidebarNavLinkProps = {
    href: string;
    active?: boolean;
    handleClick?: () => void;
}



export function SidebarNavLink({ children, className, href, active, handleClick }: SidebarGenericProps<SidebarNavLinkProps>) {

    return (
        <Link onClick={handleClick} href={href} className={cn([
            'px-3 py-1 hover:bg-gray-200 rounded-xl',
            active && 'bg-primary hover:bg-primary',
            className
        ])}>
            {children}
        </Link>
    );
}

export function SidebarNavLinkBorder({ className }: SidebarGenericProps) {
    return (
        <div className={cn(['border-b-[0.1px] border-gray-300', className])}>
        </div>
    );
}

export function SidebarFooter({ children, className }: SidebarGenericProps) {
    return (
        <footer className={cn(['p-3 mt-auto border-t-[0.1px] border-gray-300', className])}>
            {children}
        </footer>
    );
}