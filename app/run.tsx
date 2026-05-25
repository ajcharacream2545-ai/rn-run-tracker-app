import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// เรียกใช้รูปภาพโลโก้นักวิ่งตรงกลางจอ
const runimg = require("../assets/images/runlogo.png");

// 🏃‍♂️ ข้อมูลจำลองในเครื่องแบบการ์ดเดี่ยว Test 2 เป๊ะๆ
const STATIC_RUNS = [
  {
    id: "1",
    location: "Test 2",
    distance: 1,
    run_date: "2026-05-17",
    image_url: "https://via.placeholder.com/150",
  },
];

export default function Run() {
  const [runs] = useState(STATIC_RUNS);

  const renderItem = ({ item }: { item: (typeof STATIC_RUNS)[0] }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/${item.id}`)}
      activeOpacity={0.8}
    >
      {/* 1. รูปภาพเหลี่ยมมุมมนด้านซ้าย */}
      <Image source={{ uri: item.image_url }} style={styles.cardImage} />

      {/* 2. ข้อมูลตรงกลาง (สถานที่ และ วันที่ภาษาไทย) */}
      <View style={styles.cardContent}>
        <Text style={styles.locationText} numberOfLines={1}>
          {item.location}
        </Text>
        <Text style={styles.dateText}>
          {(() => {
            const date = new Date(item.run_date);
            const buddhistYear = date.getFullYear() + 543;
            return (
              new Intl.DateTimeFormat("th-TH", {
                day: "numeric",
                month: "long",
              }).format(date) +
              " พ.ศ. " +
              buddhistYear
            );
          })()}
        </Text>
      </View>

      {/* 3. ระยะทางและลูกศรชี้ไปทางขวา */}
      <View style={styles.rightSection}>
        <Text style={styles.distanceText}>{item.distance} km</Text>
        <Ionicons name="chevron-forward" size={16} color="#007AFF" />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* แถบด้านบนสุดสีฟ้า (Header) */}
      <View style={styles.blueHeader}>
        <Text style={styles.headerTitle}>Run Tracker V.1.0.0</Text>
      </View>

      {/* พื้นที่เนื้อหาหลักสีเทาอ่อนด้านล่างแถบฟ้า */}
      <View style={styles.mainContent}>
        {/* โลโก้นักวิ่งการ์ตูน */}
        <Image source={runimg} style={styles.imglogo} />

        {/* รายการแสดงการ์ดวิ่ง */}
        <FlatList
          data={runs}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listPadding}
          showsVerticalScrollIndicator={false}
          style={styles.flatListStyle}
        />
      </View>

      {/* ปุ่มบวกทรงสี่เหลี่ยมจัตุรัสมนสีฟ้าด้านขวาล่าง */}
      <TouchableOpacity
        style={styles.floatingBtn}
        onPress={() => router.push("/add")}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={26} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8", // สีพื้นหลังเทาอ่อนแกมฟ้าจางๆ ตามรูปเป๊ะ
  },
  blueHeader: {
    backgroundColor: "#42A5F5", // สีฟ้าสว่างของบาร์ด้านบน
    height: 85,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30, // จัดให้ข้อความอยู่ตรงกลางแถบพอดี ไม่จมหาย
  },
  headerTitle: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  mainContent: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  imglogo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginTop: 35,
    marginBottom: 25,
  },
  flatListStyle: {
    width: "100%",
  },
  listPadding: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 18, // ขอบการ์ดมนกำลังดีตามต้นฉบับ
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    // เงาซอฟต์ๆ สไตล์โมเดิร์น
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: "#EEE",
  },
  cardContent: {
    flex: 1,
    marginLeft: 16,
    justifyContent: "center",
  },
  locationText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2C3E50",
  },
  dateText: {
    fontSize: 12,
    color: "#95A5A6",
    marginTop: 4,
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  distanceText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#007AFF",
    marginRight: 6,
  },
  floatingBtn: {
    backgroundColor: "#42A5F5", // สีฟ้าโทนเดียวกับแถบด้านบน
    width: 52,
    height: 52,
    borderRadius: 12, // บังคับรูปทรงเหลี่ยมมุมมนตามรูปเดี๊ยะๆ
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 40,
    right: 25,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
});
