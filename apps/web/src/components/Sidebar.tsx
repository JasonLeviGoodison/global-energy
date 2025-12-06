"use client";

import { ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import { Server, Key, BarChart3, ChevronLeft, ChevronRight, Network, Box } from "lucide-react";
import { navStyles, createText } from "@/lib/designSystem";
import { motion, AnimatePresence } from "framer-motion";

type NavItem = {
  title: string;
  href: string;
  icon: typeof Server;
};

const navItems: NavItem[] = [
  { title: "Managed Inference", href: "/dashboard/models", icon: Server },
  { title: "Orchestration", href: "/dashboard/orchestration", icon: Network },
  { title: "Instances", href: "/dashboard/instances", icon: Box },
  { title: "API Keys", href: "/dashboard/api-keys", icon: Key },
  { title: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
];

const EXPANDED_WIDTH = 240;
const COLLAPSED_WIDTH = 80;

export function Sidebar({ children }: { children: ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const pathname = usePathname();

  return (
    <div className="flex h-screen overflow-hidden">
      <motion.aside
        initial={false}
        animate={{ width: isExpanded ? EXPANDED_WIDTH : COLLAPSED_WIDTH }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={navStyles.floating + " m-4 rounded-xl flex flex-col relative shadow-sm"}
      >
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute -right-3 top-6 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white border border-slate-200 shadow-sm text-slate-500 hover:bg-slate-50 transition-colors"
        >
          {isExpanded ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
        </button>

        <div className="flex items-center gap-3 p-6 border-b border-slate-200/60">
          <AnimatePresence>
            {isExpanded && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className={createText(
                  "heading",
                  "text-base whitespace-nowrap overflow-hidden ml-2"
                )}
              >
                General Compute
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              item={item}
              isExpanded={isExpanded}
              isActive={pathname === item.href}
            />
          ))}
        </nav>

        <div className="p-4 border-t border-slate-200/60">
          <AccountFooter isExpanded={isExpanded} />
        </div>
      </motion.aside>

      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}

function NavItem({
  item,
  isExpanded,
  isActive,
}: {
  item: NavItem;
  isExpanded: boolean;
  isActive: boolean;
}) {
  const Icon = item.icon;

  return (
    <Link href={item.href}>
      <motion.div
        className={`
          flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all
          ${
            isActive
              ? "bg-indigo-50 border border-indigo-100"
              : "hover:bg-slate-50 border border-transparent"
          }
        `}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Icon size={20} className={isActive ? "text-indigo-600" : "text-slate-400"} />
        <AnimatePresence>
          {isExpanded && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
              className={`
                text-sm font-medium whitespace-nowrap overflow-hidden
                ${isActive ? "text-indigo-900" : "text-slate-600"}
              `}
            >
              {item.title}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </Link>
  );
}

function AccountFooter({ isExpanded }: { isExpanded: boolean }) {
  const { user } = useUser();
  const displayName = user?.firstName || user?.username || "User";

  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200">
      <UserButton afterSignOutUrl="/" />
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="text-sm text-slate-900 font-medium whitespace-nowrap">{displayName}</p>
            <p className="text-xs text-slate-500 whitespace-nowrap">
              {user?.primaryEmailAddress?.emailAddress}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
