import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const StudentLayout = ({ children, studentName = 'Arav', studentClass = '10A' }) => {
  const insets = useSafeAreaInsets();
  
  // Navigation items for the bottom tab
  const navItems = [
    { id: 'home', label: 'Home', icon: 'home-outline', activeIcon: 'home' },
    { id: 'academics', label: 'Academics', icon: 'book-outline', activeIcon: 'book' },
    { id: 'fees', label: 'Fees', icon: 'card-outline', activeIcon: 'card' },
    { id: 'menu', label: 'Menu', icon: 'grid-outline', activeIcon: 'grid' },
  ];
  const [activeTab, setActiveTab] = React.useState('home');

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" />
      
      {/* Top Header */}
      <View className="flex-row items-center justify-between px-4 py-3 bg-white rounded-b-3xl shadow-md" style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
      }}>
        <View className="w-10 h-10 rounded-full bg-blue-100 items-center justify-center">
          <Text className="text-blue-600 font-bold text-lg">S</Text>
        </View>
        
        <View className="items-center">
          <Text className="text-lg font-semibold text-gray-800">{studentName}</Text>
          <Text className="text-sm text-gray-500">Class {studentClass}</Text>
        </View>
        
        <TouchableOpacity className="p-2">
          <Ionicons name="notifications-outline" size={24} color="#4B5563" />
          <View className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </TouchableOpacity>
      </View>
      
      {/* Scrollable Content */}
      <ScrollView 
        className="flex-1" 
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
      
      {/* Bottom Navigation */}
      <View 
        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl pt-3 px-2"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 10,
          paddingBottom: insets.bottom > 0 ? insets.bottom : 12,
        }}
      >
        <View className="flex-row justify-around items-center">
          {navItems.map((item) => (
            <TouchableOpacity 
              key={item.id}
              className={`items-center py-2 px-4 rounded-2xl ${activeTab === item.id ? 'bg-blue-50' : ''}`}
              onPress={() => setActiveTab(item.id)}
            >
              <Ionicons 
                name={activeTab === item.id ? item.activeIcon : item.icon} 
                size={24} 
                color={activeTab === item.id ? '#2563EB' : '#6B7280'} 
              />
              <Text 
                className={`text-xs mt-1 ${activeTab === item.id ? 'text-blue-600 font-medium' : 'text-gray-500'}`}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default StudentLayout;
