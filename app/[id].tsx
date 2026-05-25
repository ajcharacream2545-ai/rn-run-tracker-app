import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Detail() {
  return (
    <View style={styles.container}>
      <View style={styles.blueHeader}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>รายละเอียดการวิ่ง</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>สถานที่วิ่ง</Text>
        <Text style={styles.value}>Test 2</Text>

        <Text style={styles.title}>ระยะทาง</Text>
        <Text style={styles.value}>1 km</Text>

        <Text style={styles.title}>วันที่วิ่ง</Text>
        <Text style={styles.value}>17 พฤษภาคม พ.ศ. 2569</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F6F8" },
  blueHeader: {
    backgroundColor: "#42A5F5",
    height: 90,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 35,
    paddingHorizontal: 15,
  },
  backBtn: { marginRight: 15 },
  headerTitle: { color: "#FFF", fontSize: 16, fontWeight: "600" },
  card: { backgroundColor: "#FFF", margin: 20, padding: 20, borderRadius: 12 },
  title: { fontSize: 12, color: "#888", marginTop: 10 },
  value: { fontSize: 16, fontWeight: "bold", color: "#333", marginBottom: 10 },
});
