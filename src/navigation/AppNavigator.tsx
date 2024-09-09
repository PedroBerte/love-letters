// src/navigation/AppNavigator.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Goals from "../screens/Goals";
import Letters from "../screens/Letters";
import Emotions from "../screens/Emotions";
import HomeIcon from "../svgs/HomeIcon.svg";
import MessageIcon from "../svgs/MessageIcon.svg";
import TaskIcon from "../svgs/TaskListIcon.svg";
import EmotionsIcons from "../svgs/EmotionsIcon.svg";
import { COLORS } from "../constants/colors";
import { View, StyleSheet } from "react-native";
import Header from "../components/Header";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <>
      <Header />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size, focused }) => {
            if (route.name === "Metas") {
              return (
                <View style={styles.iconContainer}>
                  <TaskIcon
                    width={35 + (focused ? 3 : 0)}
                    height={35 + (focused ? 3 : 0)}
                    fill={focused ? COLORS.primaryBrown : COLORS.textDark}
                  />
                  {focused && <View style={styles.dot}></View>}
                </View>
              );
            }
            if (route.name === "Home") {
              return (
                <View style={styles.iconContainer}>
                  <HomeIcon
                    width={30 + (focused ? 3 : 0)}
                    height={30 + (focused ? 3 : 0)}
                    fill={focused ? COLORS.primaryBrown : COLORS.textDark}
                  />
                  {focused && <View style={styles.dot}></View>}
                </View>
              );
            }
            if (route.name === "Cartas") {
              return (
                <View style={styles.iconContainer}>
                  <MessageIcon
                    width={31 + (focused ? 3 : 0)}
                    height={31 + (focused ? 3 : 0)}
                    stroke={focused ? COLORS.primaryBrown : COLORS.textDark}
                  />
                  {focused && <View style={styles.dot}></View>}
                </View>
              );
            }
            if (route.name === "Emoções") {
              return (
                <View style={styles.iconContainer}>
                  <EmotionsIcons
                    width={31 + (focused ? 3 : 0)}
                    height={31 + (focused ? 3 : 0)}
                    stroke={focused ? COLORS.primaryBrown : COLORS.textDark}
                  />
                  {focused && <View style={styles.dot}></View>}
                </View>
              );
            }
          },
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            bottom: 30,
            right: 10,
            left: 10,
            position: "absolute",
            borderTopWidth: 0,
            borderRadius: 16,
            height: 70,
            shadowColor: "transparent",
          },
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Metas" component={Goals} />
        <Tab.Screen name="Cartas" component={Letters} />
        <Tab.Screen name="Emoções" component={Emotions} />
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  dot: {
    height: 8,
    width: 8,
    backgroundColor: COLORS.primaryBrown,
    borderRadius: 8,
  },
  iconContainer: {
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
});

export default AppNavigator;
