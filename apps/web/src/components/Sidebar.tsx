"use client";

import { ReactNode, useState, useEffect } from "react";
import Link from "next/link";
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
        className={navStyles.floating + " m-4 rounded-3xl flex flex-col relative"}
      >
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute -right-3 top-6 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white/10 border border-white/20 backdrop-blur-md hover:bg-white/20 transition-colors"
        >
          {isExpanded ? (
            <ChevronLeft size={14} className="text-white" />
          ) : (
            <ChevronRight size={14} className="text-white" />
          )}
        </button>

        <div className="flex items-center gap-3 p-6 border-b border-white/10">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex-shrink-0">
            <span className="font-bold text-white text-lg">N</span>
          </div>
          <AnimatePresence>
            {isExpanded && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className={createText("heading", "text-lg whitespace-nowrap overflow-hidden")}
              >
                Global AI
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

        <div className="p-4 border-t border-white/10">
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
          flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all
          ${
            isActive
              ? "bg-white/15 border border-white/20"
              : "hover:bg-white/10 border border-transparent"
          }
        `}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Icon size={20} className={isActive ? "text-emerald-400" : "text-white/80"} />
        <AnimatePresence>
          {isExpanded && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
              className={`
                text-sm font-medium whitespace-nowrap overflow-hidden
                ${isActive ? "text-white" : "text-white/80"}
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
    <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10">
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
            <p className="text-sm text-white font-medium whitespace-nowrap">{displayName}</p>
            <p className="text-xs text-white/60 whitespace-nowrap">
              {user?.primaryEmailAddress?.emailAddress}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
