import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SettingsViewProps {
  isDesktop: boolean;
  onBack: () => void;
}

export default function SettingsView({ isDesktop, onBack }: SettingsViewProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const renderSettingRow = (icon: string, label: string, value?: React.ReactNode, onPress?: () => void) => (
    <TouchableOpacity 
      style={styles.settingRow} 
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.settingLeft}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon as any} size={20} color="#000" />
        </View>
        <Text style={styles.settingLabel}>{label}</Text>
      </View>
      <View style={styles.settingRight}>
        {value}
        {onPress && <Ionicons name="chevron-forward" size={18} color="#ccc" style={{ marginLeft: 10 }} />}
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Settings Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 44 }} /> {/* Spacer */}
      </View>

      {/* Appearance Group */}
      <View style={styles.group}>
        <Text style={styles.groupTitle}>Appearance</Text>
        <View style={styles.card}>
          {renderSettingRow(
            "moon-outline", 
            "Dark Mode", 
            <Switch 
              value={isDarkMode} 
              onValueChange={setIsDarkMode}
              trackColor={{ false: "#eee", true: "#000" }}
              thumbColor="#fff"
            />
          )}
          <View style={styles.divider} />
          {renderSettingRow("color-palette-outline", "Theme Color", <Text style={styles.valueText}>Monochrome</Text>, () => {})}
        </View>
      </View>

      {/* Account Group */}
      <View style={styles.group}>
        <Text style={styles.groupTitle}>Account</Text>
        <View style={styles.card}>
          {renderSettingRow("person-outline", "Edit Profile", null, () => {})}
          <View style={styles.divider} />
          {renderSettingRow(
            "notifications-outline", 
            "Notifications", 
            <Switch 
              value={notificationsEnabled} 
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: "#eee", true: "#000" }}
              thumbColor="#fff"
            />
          )}
          <View style={styles.divider} />
          {renderSettingRow("shield-checkmark-outline", "Privacy", null, () => {})}
        </View>
      </View>

      {/* About Group */}
      <View style={styles.group}>
        <Text style={styles.groupTitle}>System</Text>
        <View style={styles.card}>
          {renderSettingRow("trash-outline", "Clear Cache", null, () => {})}
          <View style={styles.divider} />
          {renderSettingRow("information-circle-outline", "About", <Text style={styles.valueText}>v1.0.4</Text>, () => {})}
        </View>
      </View>

      {/* Session Group */}
      <View style={styles.group}>
        <Text style={styles.groupTitle}>Session</Text>
        <View style={styles.card}>
          <TouchableOpacity style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <View style={styles.iconContainer}>
                <Ionicons name="log-out-outline" size={20} color="#FF3B30" />
              </View>
              <Text style={[styles.settingLabel, { color: "#FF3B30" }]}>Log Out</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 140,
    maxWidth: 800,
    alignSelf: "center",
    width: "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
    paddingTop: 10,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#000",
  },
  group: {
    marginBottom: 30,
  },
  groupTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#999",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginLeft: 15,
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#eee",
    overflow: "hidden",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.03)",
    elevation: 2,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 18,
    paddingHorizontal: 20,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  settingRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  valueText: {
    fontSize: 14,
    color: "#999",
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: "#f5f5f5",
    marginLeft: 70,
  },
});

