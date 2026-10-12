import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import chatApi from '../api/chatApi';
import { FiMessageSquare, FiX, FiArrowRight } from 'react-icons/fi';

/**
 * Unified SmartLMS Navigation Header component.
 * Features live Class Connect navigation and unread notifications.
 */
export default function Header({
  icon = '📚',
  portalBadge = 'Student Portal',
  badgeVariant = 'blue',
  tabs = [],
}) {
  const { user, logout } = useAuth();
  const [unreadInfo, setUnreadInfo] = useState({ unreadCount: 0 });
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);

  // Poll unread count periodically for accurate notification badge
  useEffect(() => {
    if (!user) return;

    const fetchUnread = () => {
      chatApi
        .getUnreadCount()
        .then((res) => {
          if (res?.data?.data) {
            setUnreadInfo(res.data.data);
          }
        })
        .catch(() => {});
    };

    fetchUnread();
    const interval = setInterval(fetchUnread, 5000);
    return () => clearInterval(interval);
  }, [user]);

  // Badge variant styling
  const badgeStyles = {
    blue: 'bg-blue-50 text-blue-700 border-blue-200/80',
    indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
    purple: 'bg-purple-50 text-purple-700 border-purple-200/80',
  }[badgeVariant] || 'bg-blue-50 text-blue-700 border-blue-200/80';

  // Role display label
  const roleLabel =
    user?.role === 'ROLE_ADMIN'
      ? 'Admin'
      : user?.role === 'ROLE_TEACHER'
      ? 'Teacher'
      : 'Student';

  const isClassConnectPage = window.location.pathname === '/class-connect';

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 sm:gap-6">
        {/* Left Section: Brand & Navigation */}
        <div className="flex items-center gap-3 sm:gap-6 min-w-0">
          {/* Logo & Portal Badge */}
          <div
            className="flex items-center gap-2 shrink-0 cursor-pointer"
            onClick={() => {
              if (user?.role === 'ROLE_ADMIN') window.location.href = '/admin/dashboard';
              else if (user?.role === 'ROLE_TEACHER') window.location.href = '/teacher/dashboard';
              else window.location.href = '/student/dashboard';
            }}
          >
            <span className="text-xl sm:text-2xl leading-none select-none">{icon}</span>
            <span className="text-lg sm:text-xl font-bold text-blue-700 tracking-tight whitespace-nowrap">
              SmartLMS
            </span>
            <span
              className={`hidden md:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${badgeStyles} whitespace-nowrap`}
            >
              {portalBadge}
            </span>
          </div>

          {/* Role Navigation Tabs */}
          {tabs.length > 0 && (
            <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-1 scrollbar-none">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={tab.onClick}
                  className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition whitespace-nowrap shrink-0 ${
                    tab.active
                      ? 'bg-blue-50 text-blue-700 border border-blue-200/60 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          )}
        </div>

        {/* Right Section: Class Connect, User Profile & Logout */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0 relative">
          {/* Class Connect Direct Link Pill */}
          {!isClassConnectPage && (
            <a
              href="/class-connect"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/80 transition relative shadow-2xs"
              title="Open Class Connect group chat"
            >
              <span>💬</span>
              <span className="hidden sm:inline">Class Connect</span>
              {unreadInfo.unreadCount > 0 && (
                <span className="px-1.5 py-0.2 bg-rose-600 text-white rounded-full text-[10px] font-bold animate-pulse">
                  {unreadInfo.unreadCount > 99 ? '99+' : unreadInfo.unreadCount}
                </span>
              )}
            </a>
          )}

          {/* Chat Notifications Dropdown Trigger */}
          <div className="relative">
            <button
              onClick={() => setShowNotificationDropdown(!showNotificationDropdown)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition relative"
              title="Class Connect Notifications"
              aria-label="Class Notifications"
            >
              <FiMessageSquare className="text-lg" />
              {unreadInfo.unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white animate-ping" />
              )}
            </button>

            {/* Notification Preview Dropdown */}
            {showNotificationDropdown && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50 animate-fadeIn text-left">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                    <span>💬</span> Class Connect Notifications
                  </div>
                  <button
                    onClick={() => setShowNotificationDropdown(false)}
                    className="p-1 text-slate-400 hover:text-slate-600 rounded"
                  >
                    <FiX />
                  </button>
                </div>

                <div className="py-3">
                  {unreadInfo.unreadCount > 0 ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          {unreadInfo.unreadCount} unread message{unreadInfo.unreadCount > 1 ? 's' : ''}
                        </span>
                        {unreadInfo.lastMessageTime && (
                          <span className="text-[10px] text-slate-400">
                            {new Date(unreadInfo.lastMessageTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        )}
                      </div>
                      <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-200/60">
                        <div className="text-xs font-bold text-slate-800">
                          {unreadInfo.lastSenderName || 'Classmate'}
                        </div>
                        <p className="text-xs text-slate-600 truncate mt-0.5">
                          {unreadInfo.lastMessageSnippet || 'New message in CSE Class Group'}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-4 text-xs text-slate-500">
                      No unread messages. You're all caught up!
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <a
                    href="/class-connect"
                    onClick={() => setShowNotificationDropdown(false)}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 bg-[#176B52] hover:bg-[#135742] text-white rounded-xl text-xs font-semibold transition shadow-xs"
                  >
                    <span>Open Class Connect</span>
                    <FiArrowRight />
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* User Name & Role Pill */}
          <div className="flex items-center gap-2 text-right">
            <div className="hidden sm:block">
              <div className="text-xs sm:text-sm font-semibold text-slate-800 truncate max-w-[140px] sm:max-w-[180px]">
                {user?.name || 'User'}
              </div>
              <div className="text-[11px] text-slate-500 font-medium">
                {user?.email}
              </div>
            </div>
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200 whitespace-nowrap">
              {roleLabel}
            </span>
          </div>

          {/* Logout Action */}
          <button
            onClick={logout}
            className="inline-flex items-center justify-center px-3 py-1.5 text-xs sm:text-sm font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200/70 rounded-lg transition whitespace-nowrap"
            title="Sign out of your account"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
