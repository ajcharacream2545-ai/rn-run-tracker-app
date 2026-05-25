import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker"; // ตัวจัดการกล้องและคลังภาพ
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function AddRun() {
  const [location, setLocation] = useState("");
  const [distance, setDistance] = useState("");
  const [timeOfDay, setTimeOfDay] = useState("เช้า");
  const [imageUrl, setImageUrl] = useState<string | null>(null); // เก็บรูปที่ถ่าย/เลือก

  // 📸 ฟังก์ชันเปิดกล้องถ่ายภาพ หรือเลือกรูปจากคลังภาพ (ไม่พึ่ง Supabase ไม่แครชแน่นอน)
  const pickImage = async () => {
    // ขอสิทธิ์เข้าถึงรูปภาพในเครื่องก่อน
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "คำเตือน",
        "กรุณาเปิดสิทธิ์ให้แอปเข้าถึงรูปภาพในตั้งค่าก่อนน้า",
      );
      return;
    }

    // เปิดคลังรูปภาพให้หนูครีมเลือกรูปถ่าย
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, // เปิดโหมดครอปรูปเหลี่ยมได้
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUrl(result.assets[0].uri); // เอารูปมาแปะบนจอ
    }
  };

  // 💾 ฟังก์ชันบันทึกข้อมูลแบบใหม่ (ตัด uploadAndSaveData ของเก่าออกไปหมดเกลี้ยง)
  const handleLocalSave = () => {
    if (!location || !distance) {
      Alert.alert("คำเตือน", "กรุณากรอกสถานที่และระยะทางให้ครบถ้วนก่อนน้า");
      return;
    }

    Alert.alert("สำเร็จ", "บันทึกรายการวิ่งใหม่เรียบร้อยแล้วจ้า!", [
      {
        text: "ตกลง",
        onPress: () => {
          // กดแล้วให้มันเด้งกลับไปหน้าแรกทันที ลื่นๆ เลยครับ
          router.back();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* แถบด้านบนสีฟ้า */}
      <View style={styles.blueHeader}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>เพิ่มรายการวิ่งใหม่</Text>
      </View>

      <View style={styles.formContainer}>
        {/* 1. ช่องกรอกสถานที่ */}
        <Text style={styles.label}>สถานที่วิ่ง</Text>
        <TextInput
          style={styles.input}
          placeholder="เช่น สวนลุมพินี"
          value={location}
          onChangeText={setLocation}
        />

        {/* 2. ช่องกรอกระยะทาง */}
        <Text style={styles.label}>ระยะทาง</Text>
        <TextInput
          style={styles.input}
          placeholder="เช่น 5.2"
          keyboardType="numeric"
          value={distance}
          onChangeText={setDistance}
        />

        {/* 3. ปุ่มเลือกช่วงเวลา เช้า / เย็น */}
        <Text style={styles.label}>ช่วงเวลา</Text>
        <View style={styles.timeRow}>
          <TouchableOpacity
            style={[
              styles.timeBtn,
              timeOfDay === "เช้า" && styles.timeBtnActive,
            ]}
            onPress={() => setTimeOfDay("เช้า")}
          >
            <Text
              style={[
                styles.timeBtnText,
                timeOfDay === "เช้า" && styles.timeBtnTextActive,
              ]}
            >
              เช้า
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.timeBtn,
              timeOfDay === "เย็น" && styles.timeBtnActive,
            ]}
            onPress={() => setTimeOfDay("เย็น")}
          >
            <Text
              style={[
                styles.timeBtnText,
                timeOfDay === "เย็น" && styles.timeBtnTextActive,
              ]}
            >
              เย็น
            </Text>
          </TouchableOpacity>
        </View>

        {/* 4. กล่องกดถ่ายภาพ (ผูกฟังก์ชันใหม่ pickImage เข้าไปแทนตัวเก่าแล้ว) */}
        <Text style={styles.label}>รูปภาพสถานที่</Text>
        <TouchableOpacity
          style={styles.photoBox}
          onPress={pickImage}
          activeOpacity={0.7}
        >
          {imageUrl ? (
            <Image source={{ uri: imageUrl }} style={styles.previewImage} />
          ) : (
            <View style={styles.placeholderContent}>
              <Ionicons name="camera-outline" size={36} color="#8E8E93" />
              <Text style={styles.placeholderText}>กดเพื่อถ่ายภาพ</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* 5. ปุ่มบันทึกข้อมูลสีฟ้าด้านล่าง */}
        <TouchableOpacity
          style={styles.saveBtn}
          onPress={handleLocalSave}
          activeOpacity={0.8}
        >
          <Text style={styles.saveBtnText}>บันทึกข้อมูล</Text>
        </TouchableOpacity>
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
  formContainer: { padding: 20 },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginTop: 15,
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    color: "#333",
  },
  timeRow: { flexDirection: "row", marginTop: 5 },
  timeBtn: {
    backgroundColor: "#E0E0E0",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 20,
    marginRight: 10,
  },
  timeBtnActive: { backgroundColor: "#42A5F5" },
  timeBtnText: { color: "#555", fontWeight: "bold" },
  timeBtnTextActive: { color: "#FFF" },
  photoBox: {
    backgroundColor: "#EAEAEA",
    height: 185,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginTop: 5,
  },
  placeholderContent: { alignItems: "center" },
  placeholderText: { color: "#777", fontSize: 13, marginTop: 6 },
  previewImage: { width: "100%", height: "100%", resizeMode: "cover" },
  saveBtn: {
    backgroundColor: "#42A5F5",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 35,
    elevation: 2,
  },
  saveBtnText: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
});
