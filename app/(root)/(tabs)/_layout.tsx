import { Tabs } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Platform } from "react-native";
import { NativeTabs, Label, Icon } from "expo-router/unstable-native-tabs";
import { Feather } from "@expo/vector-icons";


const useNativeTabs=false ;
export default function TabLayout() {
  if (useNativeTabs) {
    return (
      <NativeTabs>
      <NativeTabs.Trigger name="index">
        <Icon drawable="ic_home" />
        <Label>Home</Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="transactions">
        <Icon drawable="ic_wallet" />
        <Label>Transactions</Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="assistant">
        <Icon drawable="ic_assistant" />
        <Label>Assistant</Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="profile">
        <Icon drawable="ic_person" />
        <Label>Profile</Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="add-transaction">
        <Icon drawable="ic_add" />
        <Label>Add</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
    )

  }else {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#4A9EFF",
        tabBarInactiveTintColor: "#5C5F68",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopColor: "#E8E6DF",
          paddingTop: 4,
          height: 64,
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: "Transactions",
          tabBarIcon: ({ color, size }) => (
            <Feather name="list" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="add-transaction"
        options={{
          title: "Add",
          tabBarIcon: ({ color, size }) => (
            <Feather name="plus-circle" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="assistant"
        options={{
          title: "Assistant",
          tabBarIcon: ({ color, size }) => (
            <Feather name="cpu" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
}