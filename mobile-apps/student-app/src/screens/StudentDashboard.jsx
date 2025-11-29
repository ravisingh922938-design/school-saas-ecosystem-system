import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import StudentLayout from '../components/StudentLayout';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const StudentDashboard = () => {
  // Mock data - in a real app, this would come from an API
  const pendingFees = 2500;
  const hasPendingFees = pendingFees > 0;
  
  const performanceData = {
    labels: ['Sep', 'Oct', 'Nov'],
    datasets: [{
      data: [75, 82, 78],
      color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
      strokeWidth: 2
    }]
  };

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: '#3b82f6'
    }
  };

  return (
    <StudentLayout studentName="Arav" studentClass="10A">
      <ScrollView className="flex-1 px-4 py-2" showsVerticalScrollIndicator={false}>
        {/* Fee Alert Banner */}
        {hasPendingFees && (
          <View className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 mb-4">
            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center">
                <Ionicons name="alert-circle" size={24} color="#EF4444" />
                <Text className="text-red-800 font-medium ml-2">
                  Pending Fees: ₹{pendingFees.toLocaleString('en-IN')}
                </Text>
              </View>
              <TouchableOpacity className="bg-red-600 px-4 py-2 rounded-lg">
                <Text className="text-white font-medium">Pay Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Today's Updates - Horizontal Scroll */}
        <Text className="text-lg font-bold text-gray-800 mb-3">Today's Updates</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="mb-6"
          contentContainerStyle={{
            paddingRight: 20,
          }}
        >
          {/* Homework Card */}
          <View className="bg-white rounded-xl p-4 w-64 mr-3 shadow-sm" style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}>
            <View className="flex-row items-center mb-2">
              <View className="bg-blue-100 p-2 rounded-lg mr-3">
                <Ionicons name="book" size={20} color="#3B82F6" />
              </View>
              <Text className="font-medium text-gray-800">Homework</Text>
            </View>
            <Text className="text-gray-700 mb-3">Math Exercise 4.2</Text>
            <View className="flex-row items-center">
              <Ionicons name="time-outline" size={16} color="#6B7280" />
              <Text className="text-sm text-gray-500 ml-1">Due Tomorrow</Text>
            </View>
          </View>

          {/* Attendance Card */}
          <View className="bg-white rounded-xl p-4 w-64 mr-3 shadow-sm" style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}>
            <View className="flex-row items-center mb-2">
              <View className="bg-green-100 p-2 rounded-lg mr-3">
                <Ionicons name="checkmark-circle" size={20} color="#10B981" />
              </View>
              <Text className="font-medium text-gray-800">Attendance</Text>
            </View>
            <Text className="text-gray-700 mb-3">Present Today</Text>
            <View className="flex-row items-center">
              <Ionicons name="calendar-outline" size={16} color="#6B7280" />
              <Text className="text-sm text-gray-500 ml-1">{new Date().toLocaleDateString()}</Text>
            </View>
          </View>

          {/* Notice Card */}
          <View className="bg-white rounded-xl p-4 w-64 shadow-sm" style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}>
            <View className="flex-row items-center mb-2">
              <View className="bg-yellow-100 p-2 rounded-lg mr-3">
                <Ionicons name="megaphone" size={20} color="#F59E0B" />
              </View>
              <Text className="font-medium text-gray-800">Notice</Text>
            </View>
            <Text className="text-gray-700 mb-3">School Closed on Friday</Text>
            <View className="flex-row items-center">
              <Ionicons name="information-circle-outline" size={16} color="#6B7280" />
              <Text className="text-sm text-gray-500 ml-1">Important</Text>
            </View>
          </View>
        </ScrollView>

        {/* Live Class Section */}
        <View className="bg-indigo-50 rounded-xl p-4 mb-6">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-lg font-bold text-gray-800">Live Class</Text>
            <View className="flex-row items-center bg-red-100 px-2 py-1 rounded">
              <View className="w-2 h-2 bg-red-500 rounded-full mr-1"></View>
              <Text className="text-xs text-red-700 font-medium">LIVE</Text>
            </View>
          </View>
          <Text className="text-gray-700 mb-4">Science Class starting in 10 mins</Text>
          <TouchableOpacity className="bg-indigo-600 py-3 rounded-lg flex-row items-center justify-center">
            <Ionicons name="play-circle" size={20} color="white" />
            <Text className="text-white font-medium ml-2">Join Class</Text>
          </TouchableOpacity>
        </View>

        {/* Performance Graph */}
        <View className="bg-white rounded-xl p-4 mb-6 shadow-sm" style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}>
          <Text className="text-lg font-bold text-gray-800 mb-4">Test Marks Trend</Text>
          <View className="items-center">
            <LineChart
              data={performanceData}
              width={SCREEN_WIDTH - 48} // 32px padding (16px on each side)
              height={200}
              chartConfig={chartConfig}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
            <View className="flex-row justify-between w-full mt-2 px-4">
              {performanceData.labels.map((label, index) => (
                <Text key={index} className="text-xs text-gray-500">{label}</Text>
              ))}
            </View>
          </View>
          <View className="flex-row justify-between items-center mt-4">
            <View className="flex-row items-center">
              <View className="w-3 h-3 bg-blue-500 rounded-full mr-2"></View>
              <Text className="text-sm text-gray-600">Test Scores</Text>
            </View>
            <TouchableOpacity className="flex-row items-center">
              <Text className="text-blue-600 text-sm font-medium">View All</Text>
              <MaterialIcons name="chevron-right" size={20} color="#3B82F6" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </StudentLayout>
  );
};

export default StudentDashboard;
