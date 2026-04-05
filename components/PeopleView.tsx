import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { ReportModal } from "./ReportModal";

interface PeopleViewProps {
  isDesktop: boolean;
  onViewMyProfile: () => void;
  onProfileClick: (profileId: string, scrollToReviews?: boolean) => void;
}

interface UserProfile {
  id: string;
  name: string;
  handle: string;
  status: string;
  skills: string[];
  category: string;
  rating: number;
  reviewCount: number;
  image?: string;
}

const CATEGORIES = ["All", "Design", "Development", "Marketing", "Business"];

const MOCK_PROFILES: UserProfile[] = [
  { 
    id: "1", 
    name: "Sarah Jenkins", 
    handle: "sjenkins",
    status: "Product Designer & UX Specialist", 
    skills: ["UI Design", "UX Research", "Figma"], 
    category: "Design",
    rating: 4.9,
    reviewCount: 124,
    image: "https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "3", 
    name: "David Chen", 
    handle: "dchen",
    status: "Fullstack React Native Expert", 
    skills: ["React Native", "TypeScript", "Node.js"], 
    category: "Development",
    rating: 4.8,
    reviewCount: 86,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "p1", 
    name: "Alice Cooper", 
    handle: "acooper",
    status: "Looking for freelance mobile work.", 
    skills: ["React Native", "UI/UX", "Figma"], 
    category: "Design",
    rating: 4.7,
    reviewCount: 42,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "p4", 
    name: "Michael Chang", 
    handle: "mchang",
    status: "Senior Backend Architect", 
    skills: ["Python", "Django", "PostgreSQL"], 
    category: "Development",
    rating: 4.9,
    reviewCount: 156,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "p5", 
    name: "Emma Wilson", 
    handle: "ewilson",
    status: "Digital Growth & SEO Expert", 
    skills: ["SEO", "Content Marketing", "Ads"], 
    category: "Marketing",
    rating: 4.6,
    reviewCount: 67,
    image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "p6", 
    name: "James Carter", 
    handle: "jcarter",
    status: "Operations & Operations Strategist", 
    skills: ["Strategy", "Operations", "Agile"], 
    category: "Business",
    rating: 4.8,
    reviewCount: 31,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "p7", 
    name: "Olivia Martinez", 
    handle: "omartinez",
    status: "Brand Identity & Illustration", 
    skills: ["Branding", "Illustrator", "Typography"], 
    category: "Design",
    rating: 4.9,
    reviewCount: 89,
    image: "https://images.unsplash.com/photo-1531123897727-8f129e16fd3c?auto=format&fit=crop&w=400&q=80"
  },
];

export default function PeopleView({ isDesktop, onViewMyProfile, onProfileClick }: PeopleViewProps) {
  const { colors } = useTheme();
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [isReportModalVisible, setIsReportModalVisible] = useState(false);
  const [reportTargetName, setReportTargetName] = useState("");

  const filteredProfiles = activeFilter === "All" 
    ? MOCK_PROFILES 
    : MOCK_PROFILES.filter(p => p.category === activeFilter);

  const renderFilterPills = () => (
    <View style={[styles.filtersWrapper, { borderBottomColor: colors.border, backgroundColor: colors.background }]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersContainer}>
        {CATEGORIES.map((cat) => {
          const isActive = activeFilter === cat;
          return (
            <TouchableOpacity
              key={cat}
              style={[
                styles.filterPill,
                { backgroundColor: isActive ? colors.primary : colors.iconBackground, borderColor: colors.border }
              ]}
              onPress={() => setActiveFilter(cat)}
            >
              <Text style={[
                styles.filterText,
                { color: isActive ? colors.background : colors.text }
              ]}>
                {cat}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );

  const renderProfileCard = (profile: UserProfile) => (
    <TouchableOpacity 
      key={profile.id} 
      style={[
        styles.profileCard, 
        { 
          backgroundColor: colors.cardBackground, 
          borderColor: colors.border,
          zIndex: activeMenuId === profile.id ? 100 : 1
        }
      ]}
      onPress={() => {
        if (activeMenuId) {
          setActiveMenuId(null);
        } else {
          onProfileClick(profile.id);
        }
      }}
      activeOpacity={0.7}
    >
      <View style={styles.cardRow}>
        {/* Left Column: Squircle Avatar */}
        <View style={styles.avatarColumn}>
          {profile.image ? (
            <Image source={{ uri: profile.image }} style={styles.squircleAvatar} />
          ) : (
            <View style={[styles.squircleAvatar, { backgroundColor: colors.iconBackground, justifyContent: 'center', alignItems: 'center' }]}>
               <Text style={[styles.avatarText, { color: colors.text }]}>{profile.name.charAt(0)}</Text>
            </View>
          )}
        </View>

        {/* Right Column: Key Details */}
        <View style={styles.infoColumn}>
          <View style={styles.nameRow}>
            <Text style={[styles.profileName, { color: colors.text }]} numberOfLines={1}>
              {profile.name} <Text style={[styles.handleText, { color: colors.mutedText }]}>@{profile.handle}</Text>
            </Text>
            
            <View style={{ zIndex: 10 }}>
              <TouchableOpacity 
                style={styles.headerMenuBtn}
                onPress={() => setActiveMenuId(activeMenuId === profile.id ? null : profile.id)}
              >
                <Ionicons name="ellipsis-vertical" size={18} color={colors.text} />
              </TouchableOpacity>
              {activeMenuId === profile.id && (
                <View style={[styles.dropdownMenu, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
                   <TouchableOpacity 
                     style={styles.menuItem} 
                     onPress={() => {
                       setActiveMenuId(null);
                       setReportTargetName(profile.name);
                       setIsReportModalVisible(true);
                     }}
                   >
                     <Ionicons name="warning-outline" size={16} color="#FF3B30" />
                     <Text style={[styles.menuItemText, { color: "#FF3B30" }]}>Report User</Text>
                   </TouchableOpacity>
                </View>
              )}
            </View>
          </View>

          <TouchableOpacity 
            style={styles.ratingRow} 
            activeOpacity={0.6}
            onPress={() => onProfileClick(profile.id, true)}
          >
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={[styles.ratingText, { color: colors.text }]}>
              {profile.rating.toFixed(1)}
              <Text style={{ fontWeight: '400', color: colors.mutedText }}> ({profile.reviewCount} reviews)</Text>
            </Text>
          </TouchableOpacity>

          <Text style={[styles.profileStatus, { color: colors.secondaryText }]} numberOfLines={2}>
            {profile.status}
          </Text>

          <View style={styles.skillsRow}>
            {profile.skills.slice(0, 3).map((skill, index) => (
              <View key={index} style={[styles.miniSkillBadge, { backgroundColor: colors.iconBackground }]}>
                <Text style={[styles.miniSkillText, { color: colors.mutedText }]}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {renderFilterPills()}
      <ScrollView 
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={() => setActiveMenuId(null)}
        scrollEventThrottle={16}
      >
        {/* Call to Action for Profile */}
        <TouchableOpacity 
          style={[styles.ctaCard, { backgroundColor: colors.primary + '1A', borderColor: colors.primary }]}
          onPress={onViewMyProfile}
          activeOpacity={0.7}
        >
          <View style={styles.ctaContent}>
            <Ionicons name="person-circle" size={32} color={colors.primary} />
            <View style={styles.ctaTextContainer}>
              <Text style={[styles.ctaTitle, { color: colors.text }]}>Your Professional Profile</Text>
              <Text style={[styles.ctaSub, { color: colors.mutedText }]}>View your skills, activity, and update your information.</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.primary} />
        </TouchableOpacity>

        <View style={styles.tabContent}>
          {filteredProfiles.length > 0 ? (
            filteredProfiles.map(renderProfileCard)
          ) : (
            <Text style={{ color: colors.mutedText, textAlign: 'center', marginTop: 40 }}>No people found in this category.</Text>
          )}
        </View>
      </ScrollView>

      <ReportModal
        visible={isReportModalVisible}
        onClose={() => setIsReportModalVisible(false)}
        targetName={reportTargetName}
        isDesktop={isDesktop}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filtersWrapper: {
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  filtersContainer: {
    paddingHorizontal: 25,
    gap: 10,
  },
  filterPill: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
  },
  filterText: {
    fontSize: 14,
    fontWeight: "700",
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 25,
    paddingTop: 20,
    paddingBottom: 140, // Space for bottom nav
    maxWidth: 1000,
    width: "100%",
    alignSelf: "center",
  },
  ctaCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 25,
  },
  ctaContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 15,
  },
  ctaTextContainer: {
    flex: 1,
  },
  ctaTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  ctaSub: {
    fontSize: 14,
  },
  tabContent: {
    flex: 1,
  },
  profileCard: {
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    marginBottom: 15,
    boxShadow: "0 4 20 rgba(0,0,0,0.05)",
  },
  cardRow: {
    flexDirection: 'row',
    gap: 15,
  },
  avatarColumn: {
    width: 80,
    height: 80,
  },
  squircleAvatar: {
    width: 80,
    height: 80,
    borderRadius: 22,
  },
  infoColumn: {
    flex: 1,
    gap: 4,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  profileName: {
    fontSize: 18,
    fontWeight: "800",
    flex: 1,
    marginRight: 10,
  },
  handleText: {
    fontSize: 14,
    fontWeight: "400",
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginVertical: 2,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "700",
  },
  profileStatus: {
    fontSize: 14,
    lineHeight: 20,
  },
  skillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 8,
  },
  miniSkillBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  miniSkillText: {
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  avatarText: {
    fontSize: 24,
    fontWeight: "800",
  },
  headerMenuBtn: {
    padding: 5,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 30,
    right: 0,
    width: 140,
    borderRadius: 12,
    borderWidth: 1,
    padding: 10,
    boxShadow: "0 4 15 rgba(0,0,0,0.1)",
    zIndex: 100,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 5,
  },
  menuItemText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
