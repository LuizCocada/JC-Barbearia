import { cn } from "@/lib/utils";


export type DashboardPageGenericProps<T = unknown> = {
    children: React.ReactNode;
    className?: string;
} & T;


export function DashboardPage({ children, className }: DashboardPageGenericProps) {
    return (
        <section className={cn(['', className])}>
            {children}
        </section>
    );
}

export function DashboardPageHeader({ children, className }: DashboardPageGenericProps) {
    return (
        <header className={cn(['flex items-center gap-2 px-6 py-3.5 border-b-[0.1px] bg-card', className])}>
            {children}
        </header>
    );
}

export function DashboardPageHeaderTitle({ children, className }: DashboardPageGenericProps) {
    return (
        <h1 className={cn(['', className])}>
            {children}
        </h1>
    );
}

export function DashboardPageHeaderNav({ children, className }: DashboardPageGenericProps) {
    return (
        <nav className={cn(['', className])}>
            {children}
        </nav>
    );
}

export function DashboardPageMain({ children, className }: DashboardPageGenericProps) {
    return (
        <main className={cn(['', className])}>
            {children}
        </main>
    );
}