import Icon from "@/Components/Icon";
import { formatEmployeeName } from "@/Pages/utils";
import { Avatar, AvatarFallback } from "@/Components/ui/avatar";
import { Bell, LogOut } from "lucide-react";
import { Head, Link, usePage } from "@inertiajs/react";

export default function AuthenticatedLayout({
    children,
    header,
    className = "",
}) {
    const { user, roles = [] } = usePage().props.auth;
    const employee = usePage().props.auth.employee;
    const employeeName =
        formatEmployeeName(employee) || user.name || user.email;
    const initials = employeeName
        .split(/\s+/)
        .filter(Boolean)
        .map((part) => part[0])
        .filter((_, index, parts) => index === 0 || index === parts.length - 1)
        .join("")
        .toUpperCase();

    return (
        <div
            className={
                "min-h-screen bg-[#0d0d1a] bg-[radial-gradient(ellipse_at_95%_5%,#7b2fff28,transparent_45%),radial-gradient(circle,#ff3af219_1px,transparent_1px)] [background-size:auto,24px_24px] font-['DM_Sans',sans-serif] [&_a:focus-visible]:outline-2 [&_button:focus-visible]:outline-2 [&_input:focus-visible]:outline-2 [&_:focus-visible]:outline-[#00f5d4] [&_:focus-visible]:outline-offset-4 motion-reduce:[&_*]:!transition-none " +
                className
            }
        >
            <Head>
                <link
                    head-key="workspace-fonts"
                    href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Outfit:wght@500;600;700;800;900&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <header className="border-b border-[#443250] bg-[#171124]">
                <div className="mx-auto max-w-[1440px] px-5 min-[601px]:px-10 flex flex-wrap items-center justify-between gap-5 py-6">
                    <Link
                        href={route(
                            roles.includes("admin")
                                ? "adminmodule.index"
                                : roles.includes("employee")
                                  ? "employeemodule.index"
                                  : "profile.edit",
                        )}
                        className="flex items-center gap-3 font-['Outfit',sans-serif] text-2xl font-black leading-none text-white"
                    >
                        <span
                            aria-hidden="true"
                            className="grid h-[41px] w-[38px] -rotate-[8deg] place-items-center rounded-xl border-[3px] border-[#ffe600] bg-[#ff3af2] text-[#0d0d1a] shadow-[4px_4px_0_#7b2fff,6px_6px_0_#00f5d4]"
                        >
                            <Icon className="h-6 w-6" />
                        </span>
                        <span>
                            SDO<span className="text-[#ff3af2]">.</span>DOCS
                            <small className="mt-2 block font-['DM_Sans',sans-serif] text-[7px] tracking-[1.5px]">
                                DOCUMENT TRACKING SYSTEM
                            </small>
                        </span>
                    </Link>
                    <div className="flex min-w-0 items-center gap-3 text-xs max-[600px]:w-full">
                        <Link
                            href={route("profile.edit")}
                            aria-label={`View profile for ${employeeName}`}
                            className="flex min-w-0 items-center gap-3 rounded-xl max-[600px]:flex-1"
                        >
                            <span className="min-w-0 text-right max-[600px]:flex-1">
                                <span
                                    className="block truncate text-sm font-semibold text-white max-w-[280px]"
                                    title={employeeName}
                                >
                                    {employeeName}
                                </span>
                                <span
                                    className="mt-1 block max-w-[280px] truncate text-xs text-[#c4b6d6]"
                                    title={employee?.station?.name}
                                >
                                    {employee?.station?.name ||
                                        "No station assigned"}
                                </span>
                            </span>
                            <Avatar className="!h-11 !w-11 border border-[#765094]">
                                <AvatarFallback className="bg-[#382449] font-bold text-[#00f5d4]">
                                    {initials}
                                </AvatarFallback>
                            </Avatar>
                        </Link>
                        <button
                            type="button"
                            aria-label="Notifications"
                            title="Notifications"
                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#665080] bg-[#211632] text-[#c4b6d6] transition-colors hover:border-[#00f5d4]/50 hover:bg-[#382449] hover:text-[#00f5d4]"
                        >
                            <Bell
                                size={20}
                                strokeWidth={1.8}
                                aria-hidden="true"
                            />
                        </button>
                        <Link
                            href={route("logout")}
                            method="post"
                            as="button"
                            aria-label="Log out"
                            title="Log out"
                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-red-400/25 bg-red-400/5 text-red-400 transition-colors hover:border-red-400/60 hover:bg-red-400/15 hover:text-red-300"
                        >
                            <LogOut
                                size={20}
                                strokeWidth={1.8}
                                aria-hidden="true"
                            />
                        </Link>
                    </div>
                </div>
            </header>
            {header && (
                <div className="mx-auto max-w-[1440px] px-5 pt-6 text-white min-[601px]:px-10 [&_h2]:text-white">
                    {header}
                </div>
            )}
            <main>{children}</main>
            <footer className="mx-auto w-full max-w-[1440px] px-5 pb-6 pt-8 min-[601px]:px-10">
                <div className="flex flex-wrap items-center justify-between gap-5 border-t-2 border-dashed border-[#7b2fff] pt-5 text-[11px] text-[#cbbbdc]">
                    <strong className="font-['Outfit',sans-serif] text-xl text-white">
                        SDO<span className="text-[#ff3af2]">.</span>DOCS
                    </strong>
                    <span>A little structure. A lot of possibility.</span>
                </div>
            </footer>
        </div>
    );
}
