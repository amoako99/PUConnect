import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { GlassContainer } from "./GlassContainer";

type AdminTab = "verifications" | "reports" | "feedback";

interface AdminReviewViewProps {
  isDesktop: boolean;
  onBack: () => void;
}

const MOCK_VERIFICATIONS = [
  { id: "v1", name: "Sarah Jenkins", type: "Profile Update", status: "Pending", time: "10m ago" },
  { id: "v2", name: "David Chen", type: "New Account", status: "In Review", time: "25m ago" },
  { id: "v3", name: "Alex Rivera", type: "Skill Verification", status: "Pending", time: "1h ago" },
];

const MOCK_REPORTS = [
  { id: "r1", user: "John Doe", reason: "Inappropriate content", reporter: "Sarah J.", time: "2h ago" },
  { id: "r2", user: "Unknown User", reason: "Spam behavior", reporter: "System", time: "5h ago" },
];

const MOCK_FEEDBACK = [
  { id: "f1", user: "Jacob Zero", suggestion: "Add dark mode toggle to quick settings", time: "1d ago" },
  { id: "f2", user: "Alice Cooper", suggestion: "Improve search filtering for skill levels", time: "2d ago" },
];

export default function AdminReviewView({ isDesktop, onBack }: AdminReviewViewProps) {
  const { colors, isDark } = useTheme();
  const [activeTab, setActiveTab] = useState<AdminTab>("verifications");

  const renderTabHeader = () => (
    <View style={[styles.bannerContainer, { backgroundColor: isDark ? 'rgba(30, 30, 30, 0.9)' : 'rgba(255, 255, 255, 0.9)', borderColor: colors.border }]}>
      <Text style={[styles.bannerText, { color: colors.text }]}>
        Moderation Center
      </Text>
      <View style={[styles.tabSwitcher, { backgroundColor: colors.iconBackground }]}>
        {(["verifications", "reports", "feedback"] as AdminTab[]).map((tab) => {
          const isActive = activeTab === tab;
          const labels = {
            verifications: "Queue",
            reports: "Reports",
            feedback: "Feedback"
          };
          return (
            <TouchableOpacity
              key={tab}
              style={[styles.tabButton, isActive && [styles.tabButtonActive, { backgroundColor: colors.primary }]]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, { color: colors.mutedText }, isActive && [styles.tabTextActive, { color: colors.background }]]}>
                {labels[tab]}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );

  const renderVerifications = () => (
    <View style={styles.listContainer}>
      {MOCK_VERIFICATIONS.map((item) => (
        <GlassContainer key={item.id} style={[styles.itemCard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
          <View style={styles.itemHeader}>
            <View>
              <Text style={[styles.itemName, { color: colors.text }]}>{item.name}</Text>
              <Text style={[styles.itemType, { color: colors.mutedText }]}>{item.type}</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: colors.iconBackground }]}>
              <Text style={[styles.statusText, { color: colors.primary }]}>{item.status}</Text>
            </View>
          </View>
          <View style={styles.itemFooter}>
            <Text style={[styles.itemTime, { color: colors.mutedText }]}>{item.time}</Text>
            <View style={styles.actionButtons}>
              <TouchableOpacity style={[styles.actionBtn, styles.approveBtn, { backgroundColor: colors.primary }]}>
                <Text style={[styles.actionBtnText, { color: colors.background }]}>Approve</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.iconBackground }]}>
                <Text style={[styles.actionBtnText, { color: colors.text }]}>Reject</Text>
              </TouchableOpacity>
            </View>
          </View>
        </GlassContainer>
      ))}
    </View>
  );

  const renderReports = () => (
    <View style={styles.listContainer}>
      {MOCK_REPORTS.map((item) => (
        <GlassContainer key={item.id} style={[styles.itemCard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
          <View style={styles.itemHeader}>
            <View>
              <Text style={[styles.itemName, { color: colors.text }]}>Report: {item.user}</Text>
              <Text style={[styles.itemType, { color: "#FF3B30" }]}>{item.reason}</Text>
            </View>
            <Ionicons name="alert-circle" size={24} color="#FF3B30" />
          </View>
          <Text style={[styles.itemDescription, { color: colors.secondaryText }]}>
            Reported by <Text style={styles.bold}>{item.reporter}</Text> • {item.time}
          </Text>
          <View style={styles.itemFooter}>
            <View style={styles.actionButtons}>
              <TouchableOpacity style={[styles.actionBtn, { backgroundColor: "#FF3B30" }]}>
                <Text style={[styles.actionBtnText, { color: "#fff" }]}>Take Action</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.iconBackground }]}>
                <Text style={[styles.actionBtnText, { color: colors.text }]}>Dismiss</Text>
              </TouchableOpacity>
            </View>
          </View>
        </GlassContainer>
      ))}
    </View>
  );

  const renderFeedback = () => (
    <View style={styles.listContainer}>
      {MOCK_FEEDBACK.map((item) => (
        <GlassContainer key={item.id} style={[styles.itemCard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
          <View style={styles.itemHeader}>
            <Text style={[styles.itemName, { color: colors.text }]}>{item.user}</Text>
            <Text style={[styles.itemTime, { color: colors.mutedText }]}>{item.time}</Text>
          </View>
          <Text style={[styles.itemDescription, { color: colors.secondaryText }]}>
            "{item.suggestion}"
          </Text>
          <View style={styles.itemFooter}>
            <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.iconBackground }]}>
              <Text style={[styles.actionBtnText, { color: colors.text }]}>Mark as Read</Text>
            </TouchableOpacity>
          </View>
        </GlassContainer>
      ))}
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {renderTabHeader()}
      <ScrollView 
        style={styles.scroll} 
        contentContainerStyle={[
          styles.content, 
          isDesktop && styles.desktopContent,
          !isDesktop && styles.mobileContent
        ]}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === "verifications" && renderVerifications()}
        {activeTab === "reports" && renderReports()}
        {activeTab === "feedback" && renderFeedback()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bannerContainer: {
    position: "absolute",
    top: 15,
    width: "92%",
    maxWidth: 960,
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 15,
    borderRadius: 30,
    borderWidth: 1,
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 30,
    elevation: 5,
  },
  bannerText: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 22,
    marginBottom: 15,
  },
  tabSwitcher: {
    flexDirection: "row",
    borderRadius: 20,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 16,
  },
 tabButtonActive: {
    // Handled in JSX with backgroundColor
  },
  tabText: {
    fontSize: 13,
    fontWeight: "600",
  },
  tabTextActive: {
    // Handled in JSX with color
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingTop: 140, // Space for the pill-shaped floating banner + its top margin
    paddingBottom: 120,
  },
  mobileContent: {
    paddingBottom: 140, // Extra space for mobile bottom nav
  },
  desktopContent: {
    maxWidth: 800,
    alignSelf: "center",
    width: "100%",
    paddingTop: 150,
  },
  listContainer: {
    gap: 20,
  },
  itemCard: {
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "700",
  },
  itemType: {
    fontSize: 14,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  itemDescription: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 20,
  },
  bold: {
    fontWeight: "700",
  },
  itemFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemTime: {
    fontSize: 13,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 10,
  },
  actionBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  approveBtn: {
    // backgroundColor: colors.primary,
  },
  actionBtnText: {
    fontSize: 14,
    fontWeight: "600",
  },
});
