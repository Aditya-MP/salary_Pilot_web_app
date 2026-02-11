import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Link, usePathname } from 'expo-router';
import { LayoutDashboard, PieChart, Newspaper, GraduationCap, LogOut, Settings } from 'lucide-react-native';

const MENU_ITEMS = [
    { name: 'Home', icon: LayoutDashboard, path: '/' },
    { name: 'Assets', icon: PieChart, path: '/portfolio' },
    { name: 'News', icon: Newspaper, path: '/news' },
    { name: 'Learn', icon: GraduationCap, path: '/learn' },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <View className="w-64 h-full bg-[#050816]/95 border-r border-white/10 pt-8 px-4 justify-between">
            <View>
                {/* Logo */}
                <View className="flex-row items-center mb-10 px-2">
                    <View className="w-8 h-8 bg-[#7C3AED] rounded-lg items-center justify-center mr-3">
                        <Text className="text-white font-bold text-lg">S</Text>
                    </View>
                    <Text className="text-white text-xl font-bold">Salary Pilot</Text>
                </View>

                {/* Menu */}
                <View className="space-y-2">
                    {MENU_ITEMS.map((item) => {
                        // Check if active. Note: pathname might be "/(tabs)/index" or "/" depending on how expo router handles it internally for tabs vs slot.
                        // With Slot in (tabs), paths will be / /portfolio etc relative to (tabs) IF mapped, but Slot usually renders children.
                        // Actually, in (tabs) directory, the routes are / /portfolio /news /learn.
                        // Let's assume standard paths.

                        // Fix: In (tabs) group, the path is actually just / for index, /portfolio for portfolio
                        // BUT, strictly, it is / (root) -> / (tabs) -> /index.
                        // If the user navigates to /portfolio, pathname is /portfolio.

                        const isActive = (item.path === '/' && pathname === '/') || (item.path !== '/' && pathname.startsWith(item.path));

                        return (
                            <Link key={item.name} href={item.path as any} asChild>
                                <TouchableOpacity
                                    className={`flex-row items-center px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-[#7C3AED]' : 'hover:bg-white/5'}`}
                                >
                                    <item.icon size={20} color={isActive ? 'white' : 'rgba(255,255,255,0.5)'} />
                                    <Text className={`ml-3 font-medium ${isActive ? 'text-white' : 'text-white/50'}`}>{item.name}</Text>
                                </TouchableOpacity>
                            </Link>
                        );
                    })}
                </View>
            </View>

            {/* Footer */}
            <View className="mb-8 px-2">
                <TouchableOpacity className="flex-row items-center px-4 py-3 rounded-xl hover:bg-white/5">
                    <Settings size={20} color="rgba(255,255,255,0.5)" />
                    <Text className="ml-3 text-white/50 font-medium">Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row items-center px-4 py-3 rounded-xl hover:bg-white/5 mt-1">
                    <LogOut size={20} color="rgba(255,255,255,0.5)" />
                    <Text className="ml-3 text-white/50 font-medium">Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
