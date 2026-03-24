import AdminDashboard from "@/components/AdminDashboard";
import AdminReviewView from "@/components/AdminReviewView";
import NotificationsView from "@/components/NotificationsView";
import PeopleView from "@/components/PeopleView";
import ProfileEditorView from "@/components/ProfileEditorView";
import ProfileView from "@/components/ProfileView";
import PublicProfileView, { PublicProfileData } from "@/components/PublicProfileView";
import SearchView from "@/components/SearchView";
import SettingsView from "@/components/SettingsView";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import Animated, { 
    useAnimatedStyle, 
    useSharedValue, 
    withSpring 
} from "react-native-reanimated";
import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import AppLogo from "../components/AppLogo";
import ChatView from "../components/ChatView";
import { useTheme } from "../context/ThemeContext";

interface CardData {
  id: string;
  type: "skill" | "request";
  title: string;
  author: string;
  price?: string;
  image: string;
  description: string;
}

const SAMPLE_DATA: CardData[] = [
  {
    id: "1",
    type: "skill",
    title: "UI/UX Design Studio",
    author: "Sarah Jenkins",
    description: "I help early-stage startups build their first digital services with high-end minimal design.",
    image: "https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "2",
    type: "request",
    title: "Need a React Native Developer",
    author: "Startup Inc",
    description: "Looking for an experienced dev to help finish our MVP. Budget flexible.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80",
    price: "$50-$100/hr"
  },
  {
    id: "3",
    type: "skill",
    title: "Fullstack Development",
    author: "David Chen",
    description: "React Native specialist available for building scalable mobile applications.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "4",
    type: "request",
    title: "Logo Design for Bakery",
    author: "Sweet Treats",
    description: "Need a rustic logo for my new organic bakery. Willing to pay upfront.",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80",
    price: "$200"
  },
  {
    id: "5",
    type: "skill",
    title: "Social Media Manager",
    author: "Mia Wong",
    description: "I grow Instagram accounts from 0 to 10k followers using organic strategies.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "6",
    type: "request",
    title: "Python Tutor Needed",
    author: "James Miller",
    description: "College student looking for someone to explain Data Science fundamentals.",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80",
    price: "$30/hr"
  },
  {
    id: "7",
    type: "skill",
    title: "Professional Translation",
    author: "Luigi Rossi",
    description: "Italian to English technical translation. 10 years experience in engineering docs.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "8",
    type: "request",
    title: "Wedding Photographer",
    author: "The Johnsons",
    description: "Looking for a candid photographer for a small garden wedding in June.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    price: "$1500"
  },
  {
    id: "9",
    type: "skill",
    title: "SEO Audit Specialist",
    author: "Kevin Patel",
    description: "Get a comprehensive report on why your website isn't ranking on Google.",
    image: "https://images.unsplash.com/photo-1571721795195-a2cb2d33e00d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "10",
    type: "request",
    title: "Interior Design Consultation",
    author: "Modern Living",
    description: "Need help choosing furniture and colors for a 2-bedroom apartment.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
    price: "$100/session"
  },
  {
    id: "11",
    type: "skill",
    title: "Cyber Security Expert",
    author: "Alex Rivera",
    description: "Penetration testing and vulnerability assessment for small businesses.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "12",
    type: "request",
    title: "App Video Ad Creation",
    author: "AppDev Team",
    description: "Need a 30-second animated video for our new fitness app. Assets provided.",
    image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=800&q=80",
    price: "$500"
  },
];

function ContentCard({ data, isDesktop, onPress }: { data: CardData; isDesktop: boolean; onPress?: () => void }) {
  const { colors } = useTheme();
  return (
    <TouchableOpacity 
      style={[styles.card, isDesktop && styles.desktopCard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}
      onPress={onPress}
    >
      <View style={styles.cardHeader}>
        <View style={[styles.badge, { backgroundColor: data.type === 'skill' ? colors.primary : colors.iconBackground }]}>
          <Text style={[styles.badgeText, { color: data.type === 'skill' ? colors.background : colors.text }]}>
            {data.type === 'skill' ? 'SKILL' : 'REQUEST'}
          </Text>
        </View>
        <Ionicons name="heart-outline" size={20} color={colors.text} />
      </View>
      
      <View style={styles.cardContent}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>{data.title}</Text>
        <Text style={[styles.cardAuthor, { color: colors.secondaryText }]}>by {data.author}</Text>
        <Text style={[styles.cardDescription, { color: colors.mutedText }]} numberOfLines={2}>{data.description}</Text>
      </View>

      <View style={styles.cardFooter}>
        {data.price && <Text style={[styles.priceText, { color: colors.text }]}>{data.price}</Text>}
        <TouchableOpacity style={[styles.viewButton, { backgroundColor: colors.primary }]}>
          <Text style={[styles.viewButtonText, { color: colors.background }]}>View</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

export default function FeedScreen() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { role } = useLocalSearchParams();
  const isAdmin = role === "admin";
  const { colors, isDark } = useTheme();
  const isDesktop = width >= 768;
  const [activeTab, setActiveTab] = useState("home");
  const [feedTab, setFeedTab] = useState<"skill" | "request">("skill");
  const [isMobileChatActive, setIsMobileChatActive] = useState(false);
  const [isSettingsActive, setIsSettingsActive] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isProfileEditorActive, setIsProfileEditorActive] = useState(false);
  const [isNotificationsActive, setIsNotificationsActive] = useState(false);
  const [isAdminReviewActive, setIsAdminReviewActive] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<PublicProfileData | null>(null);
  const [directChatId, setDirectChatId] = useState<string | null>(null);
  const activeTabX = useSharedValue(0);
  const indicatorWidth = useSharedValue(0);
  const [tabLayouts, setTabLayouts] = useState<{[key: string]: {x: number, width: number}}>({});

  const navItems = [
    { name: "home", icon: "home-outline", label: "Home" },
    { name: "chat", icon: "chatbubble-outline", label: "Chat" },
    ...(isAdmin ? [{ name: "admin", icon: "shield-checkmark-outline", label: "Admin" }] : []),
    { name: "discover", icon: "compass-outline", label: "People" },
    { name: "profile", icon: "person-outline", label: "Profile" },
  ];

  useEffect(() => {
    const layout = tabLayouts[activeTab];
    if (layout) {
        activeTabX.value = withSpring(layout.x);
        indicatorWidth.value = withSpring(layout.width);
    }
  }, [activeTab, tabLayouts, activeTabX, indicatorWidth]);

  const animatedIndicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: activeTabX.value }],
      width: indicatorWidth.value,
    };
  });

  useEffect(() => {
    if (activeTab !== "profile") {
      setIsSettingsActive(false);
    }
    if (activeTab !== "chat") {
      setDirectChatId(null);
    }
    setIsSearchActive(false);
    setIsProfileEditorActive(false);
    setIsNotificationsActive(false);
    setIsAdminReviewActive(false);
    setSelectedProfile(null);
  }, [activeTab]);

  const handleProfileClick = (profileId: string) => {
    // In a real app, you'd fetch the profile data here. 
    // For now, we'll mock it based on the person clicked.
    const mockProfile: PublicProfileData = {
      id: profileId,
      name: profileId === "1" ? "Sarah Jenkins" : "David Chen",
      handle: profileId === "1" ? "sjenkins" : "dchen",
      description: profileId === "1" 
        ? "I help early-stage startups build their first digital services with high-end minimal design. Over 5 years of experience in mobile and web design."
        : "React Native specialist available for building scalable mobile applications. Passionate about clean code and performance.",
      skills: profileId === "1" ? ["UI Design", "UX Research", "Figma", "Branding"] : ["React Native", "TypeScript", "Firebase", "Node.js"],
      contact: "+1 (555) 123-4567",
      image: profileId === "1" 
        ? "https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&w=800&q=80"
        : "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    };
    setSelectedProfile(mockProfile);
  };

  const handleChatFromProfile = (profileId: string) => {
    setSelectedProfile(null);
    setDirectChatId(profileId);
    setActiveTab("chat");
  };

  const renderLogo = () => (
    <View style={styles.logoBox}>
      <AppLogo />
    </View>
  );

  const renderTopBar = () => {
    const isInSettings = activeTab === "settings" || (activeTab === "profile" && isSettingsActive);
    let title: React.ReactNode = "Your Feed";
    if (selectedProfile) title = selectedProfile.name;
    else if (isSearchActive) title = "Search";
    else if (isProfileEditorActive) title = "Profile Editor";
    else if (isNotificationsActive) title = "Notifications";
    else if (isAdminReviewActive) title = "Review Center";
    else if (activeTab === "admin") title = "Admin Panel";
    else if (activeTab === "chat") title = "Chats";
    else if (activeTab === "discover") {
      title = (
        <View style={styles.stackedTitleContainer}>
          <Text style={[styles.stackedTitleText, { color: colors.text }]}>People</Text>
        </View>
      );
    }
    else if (activeTab === "profile") title = isSettingsActive ? "Settings" : "Profile";
    else if (activeTab === "settings") title = "Settings";

    return (
      <View style={[styles.topBar, !isDesktop && styles.topBarMobile, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
        {((isInSettings || (isSearchActive && !isDesktop) || isProfileEditorActive || (isNotificationsActive && !isDesktop) || selectedProfile || (isAdminReviewActive && !isDesktop)) && !isDesktop) ? (
          <TouchableOpacity 
            style={styles.backButtonContainer} 
            onPress={() => {
              if (selectedProfile) setSelectedProfile(null);
              else if (isSearchActive) setIsSearchActive(false);
              else if (isProfileEditorActive) setIsProfileEditorActive(false);
              else if (isNotificationsActive) setIsNotificationsActive(false);
              else if (isAdminReviewActive) setIsAdminReviewActive(false);
              else if (activeTab === "settings") setActiveTab("home");
              else setIsSettingsActive(false);
            }}
          >
            <View style={[styles.backButtonCircle, { backgroundColor: colors.iconBackground }]}>
              <Ionicons name="arrow-back" size={24} color={colors.text} />
            </View>
          </TouchableOpacity>
        ) : renderLogo()}
        <View style={styles.topBarTitleContainer}>
          {typeof title === "string" ? (
            <Text style={[styles.topBarTitle, { color: colors.text }]}>{title}</Text>
          ) : (
            title
          )}
        </View>
        {!isInSettings && !isSearchActive && !isProfileEditorActive && !isNotificationsActive && !selectedProfile && !isAdminReviewActive && activeTab !== "admin" && (
          <View style={styles.utilitySection}>
            <View style={styles.topIcons}>
              {activeTab !== "chat" && (activeTab !== "profile" || !isDesktop) && (
                <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => {
                      if (activeTab === "profile") {
                        setIsSettingsActive(true);
                      } else {
                        setIsSearchActive(!isSearchActive);
                      }
                    }}
                  >
                    <Ionicons
                      name={activeTab === "profile" ? "settings-outline" : "search-outline"}
                      size={28}
                      color={colors.text}
                    />
                  </TouchableOpacity>
              )}
              {activeTab === "chat" && (
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => setActiveTab("discover")}
                >
                  <Ionicons name="people-outline" size={28} color={colors.text} />
                </TouchableOpacity>
              )}
              <TouchableOpacity 
                style={styles.iconButton}
                onPress={() => setIsNotificationsActive(!isNotificationsActive)}
              >
                <Ionicons 
                  name={isNotificationsActive ? "notifications" : "notifications-outline"} 
                  size={28} 
                  color={colors.text} 
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
        {(isInSettings || isSearchActive || isNotificationsActive || selectedProfile || isAdminReviewActive) && (
          <View style={styles.utilitySection}>
            {isDesktop && (isSearchActive || isNotificationsActive || selectedProfile || isAdminReviewActive) && (
              <TouchableOpacity 
                style={[styles.iconButton, { marginRight: 20 }]}
                onPress={() => {
                  setIsSearchActive(false);
                  setIsNotificationsActive(false);
                  setSelectedProfile(null);
                  setIsAdminReviewActive(false);
                }}
              >
                <Ionicons name="close-outline" size={32} color={colors.text} />
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    );
  };

  const renderNavItem = (name: string, icon: any, label: string) => {
    const isActive = activeTab === name;
    const isSpecial = name === "admin";
    const showSpecialStyle = isSpecial && !isDesktop;

    return (
      <TouchableOpacity 
        key={name} 
        activeOpacity={0.7}
        onLayout={(event) => {
            const { x, width } = event.nativeEvent.layout;
            setTabLayouts(prev => ({ ...prev, [name]: { x, width } }));
        }}
        style={[
          isDesktop ? styles.sideNavItem : styles.bottomNavItem,
          isDesktop && isActive && [styles.sideNavItemActive, { backgroundColor: colors.iconBackground }],
        ]}
        onPress={() => setActiveTab(name)}
      >
        <View style={[
          styles.navIconContainer, 
          showSpecialStyle && [styles.specialIconContainer, { backgroundColor: colors.primary }],
          isActive && showSpecialStyle && { 
            borderColor: colors.background, 
            borderWidth: 2,
            shadowColor: colors.primary,
            shadowOpacity: 0.8,
            shadowRadius: 15,
            elevation: 20
          }
        ]}>
          <Ionicons 
            name={isActive ? icon.replace("-outline", "") : icon} 
            size={showSpecialStyle ? 28 : 24} 
            color={showSpecialStyle ? colors.background : (isActive ? colors.primary : colors.mutedText)} 
          />
        </View>
        {(isDesktop || (isActive && !isSpecial)) && (
          <Text style={[
            isDesktop ? styles.sideNavLink : styles.bottomNavLabel,
            { color: isActive ? (isDesktop ? colors.primary : colors.text) : colors.mutedText }
          ]}>
            {label}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Desktop Sidebar */}
        {isDesktop && (
          <View style={[styles.sidebar, { backgroundColor: colors.background, borderColor: colors.border }]}>
            <View style={styles.sidebarContent}>
              <Text style={[styles.sidebarTitle, { color: colors.mutedText }]}>Menu</Text>
              {navItems.map(item => renderNavItem(item.name, item.icon, item.label))}
              <View style={[styles.sidebarDivider, { backgroundColor: colors.border }]} />
              {renderNavItem("settings", "settings-outline", "Settings")}
            </View>
          </View>
        )}

        <View style={[styles.mainContent, { backgroundColor: colors.background }]}>
          {(!isDesktop && activeTab === "chat" && isMobileChatActive) ? null : renderTopBar()}
          
          {selectedProfile ? (
            <PublicProfileView 
              isDesktop={isDesktop} 
              profile={selectedProfile} 
              onBack={() => setSelectedProfile(null)}
              onChat={handleChatFromProfile}
            />
          ) : isAdminReviewActive ? (
            <AdminReviewView 
              isDesktop={isDesktop} 
              onBack={() => setIsAdminReviewActive(false)} 
            />
          ) : isSearchActive ? (
            <SearchView isDesktop={isDesktop} onBack={() => setIsSearchActive(false)} />
          ) : isNotificationsActive ? (
            <NotificationsView isDesktop={isDesktop} />
          ) : isProfileEditorActive ? (
            <ProfileEditorView isDesktop={isDesktop} onBack={() => setIsProfileEditorActive(false)} />
          ) : (
            <>
              {activeTab === "home" && (
                <View style={styles.feedWrapper}>
                  <ScrollView 
                    style={styles.feedScroll}
                    contentContainerStyle={[styles.feedContainer, { paddingTop: 165, paddingBottom: 140 + insets.bottom }]}
                    showsVerticalScrollIndicator={false}
                  >
                    <View style={styles.cardsGrid}>
                      {SAMPLE_DATA.filter(item => item.type === feedTab).map((item) => (
                        <ContentCard 
                          key={item.id} 
                          data={item} 
                          isDesktop={isDesktop} 
                          onPress={() => handleProfileClick(item.id)}
                        />
                      ))}
                    </View>
                  </ScrollView>

                  {/* Floating Tab Banner (Matches PeopleView) */}
                  <View style={[styles.bannerContainer, { backgroundColor: isDark ? 'rgba(30,30,30,0.9)' : 'rgba(255,255,255,0.9)', borderColor: colors.border }]}>
                    <Text style={[styles.bannerText, { color: colors.text }]}>
                      Find expert help or profitable gigs around you!
                    </Text>
                    <View style={[styles.tabSwitcher, { backgroundColor: colors.iconBackground }]}>
                      <TouchableOpacity
                        style={[styles.tabButton, feedTab === "skill" && [styles.tabButtonActive, { backgroundColor: colors.primary }]]}
                        onPress={() => setFeedTab("skill")}
                      >
                        <Text style={[styles.tabText, { color: colors.mutedText }, feedTab === "skill" && [styles.tabTextActive, { color: colors.background }]]}>
                          Find Experts
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.tabButton, feedTab === "request" && [styles.tabButtonActive, { backgroundColor: colors.primary }]]}
                        onPress={() => setFeedTab("request")}
                      >
                        <Text style={[styles.tabText, { color: colors.mutedText }, feedTab === "request" && [styles.tabTextActive, { color: colors.background }]]}>
                          Find Gigs
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}

              {activeTab === "chat" && (
                <ChatView 
                  isDesktop={isDesktop} 
                  onActiveChatChange={setIsMobileChatActive} 
                  initialActiveChat={directChatId}
                />
              )}

              {activeTab === "discover" && (
                <PeopleView 
                  isDesktop={isDesktop} 
                  onEditProfile={() => setIsProfileEditorActive(true)} 
                  onProfileClick={handleProfileClick}
                />
              )}

              {activeTab === "admin" && isAdmin && (
                <AdminDashboard 
                  isDesktop={isDesktop} 
                  onReviewAll={() => setIsAdminReviewActive(true)}
                />
              )}

              {activeTab === "profile" && (
                isSettingsActive ? (
                  <SettingsView isDesktop={isDesktop} onBack={() => setIsSettingsActive(false)} />
                ) : (
                  <ProfileView isDesktop={isDesktop} />
                )
              )}

              {activeTab === "settings" && (
                <SettingsView isDesktop={isDesktop} onBack={() => setActiveTab("home")} />
              )}

              {/* Mobile Bottom Nav */}
              {(!isDesktop && 
                ["home", "chat", "discover", "profile", "admin"].includes(activeTab) && 
                !(activeTab === "chat" && isMobileChatActive) && 
                !isSettingsActive && !isProfileEditorActive) && (
                <>
                  <LinearGradient
                    colors={['transparent', isDark ? colors.background + 'CC' : colors.background + 'E6', colors.background]}
                    style={[styles.footerTranslucent, { height: 120 + insets.bottom }]}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 0.4 }}
                  />
                  <View style={[styles.bottomNav, { backgroundColor: colors.background + 'B3', borderColor: colors.border, bottom: Math.max(insets.bottom, 10) }]}>
                    <Animated.View style={[styles.activeIndicator, animatedIndicatorStyle, { backgroundColor: colors.primary + '1A' }]} />
                    <View style={styles.bottomNavContent}>
                      {navItems.map(item => renderNavItem(item.name, item.icon, item.label))}
                    </View>
                  </View>
                </>
              )}
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    flexDirection: "row",
  },
  sidebar: {
    width: 280,
    borderRightWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
  },
  sidebarContent: {
    padding: 20,
  },
  sidebarTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#999",
    textTransform: "uppercase",
    marginBottom: 20,
    letterSpacing: 1,
  },
  sideNavItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 8,
    borderRadius: 15,
  },
  sideNavItemActive: {
    // Background color set dynamically
  },
  sideNavLink: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 15,
  },
  sidebarDivider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 20,
  },
  mainContent: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topBar: {
    height: 90,
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
    zIndex: 100,
    paddingHorizontal: 0,
    overflow: "hidden",
  },
  topBarMobile: {
    height: 50,
  },
  topBarTitleContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: -1,
  },
  topBarTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#000",
    letterSpacing: -0.5,
  },
  stackedTitleContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  stackedTitleText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#000",
    lineHeight: 20,
  },
  stackedTitleAmp: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    lineHeight: 14,
    marginVertical: 1,
  },
  logoBox: {
    width: 120,
    borderRightWidth: 1,
    borderColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    height: "100%",
  },
  backButtonContainer: {
    width: 120,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  backButtonCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  utilitySection: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
  },
  topIcons: {
    flexDirection: "row",
  },
  iconButton: {
    marginLeft: 25,
  },
  feedWrapper: {
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
    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.12)",
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
    // Background color set dynamically
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
  },
  tabTextActive: {
    // Color set dynamically
  },
  feedScroll: {
    flex: 1,
  },
  feedContainer: {
    paddingHorizontal: 25,
    maxWidth: 1000,
    width: "100%",
    alignSelf: "center",
  },
  feedHeader: {
    marginBottom: 30,
  },
  feedTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#000",
  },
  feedSubtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 6,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#eee",
    padding: 16,
    width: "100%",
  },
  cardsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
  },
  mobileList: {
    gap: 20,
  },
  desktopGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
  },
  desktopCard: {
    width: "48%",
    minWidth: 300,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  badge: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#333",
  },
  cardContent: {
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
    marginBottom: 4,
  },
  cardAuthor: {
    fontSize: 13,
    color: "#666",
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#f5f5f5",
    paddingTop: 15,
  },
  ratingBox: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 4,
  },
  priceText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#000",
    flex: 1,
  },
  viewButton: {
    backgroundColor: "#000",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  viewButtonText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
  bottomNav: {
    position: "absolute",
    bottom: 10,
    left: 20,
    right: 20,
    height: 70,
    borderRadius: 35,
    borderWidth: 0.5,
    paddingHorizontal: 10,
    paddingBottom: Platform.OS === "ios" ? 5 : 0,
    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.15)",
    elevation: 10,
    overflow: "visible",
  },
  bottomNavContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  activeIndicator: {
    position: "absolute",
    height: 44, // Matches standard icon container height
    borderRadius: 22,
    top: 13, // Center vertically (70 - 44 = 26 / 2 = 13)
  },
  footerTranslucent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
  },
  bottomNavItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  navIconContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  bottomNavLabel: {
    fontSize: 10,
    fontWeight: "700",
    marginTop: 2,
  },
  specialIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.25)",
    elevation: 8,
    transform: [{ translateY: -15 }],
  },
});
