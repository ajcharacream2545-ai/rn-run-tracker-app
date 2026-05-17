import { supabase } from "../../services/supabase";

import { Ionicons } from "@expo/vector-icons";

import * as ImagePicker from "expo-image-picker";

import { router } from "expo-router";
import React from "react";

import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Add() {
  const [location, setLocation] = React.useState("");
  const [distance, setDistance] = React.useState("");
  const [timeOfDay, setTimeOfDay] = React.useState("เช้า");

  const [imageUri, setImageUri] = React.useState<string | null>(null);

  const [base64Image, setBase64Image] = React.useState<string | null>(null);

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("กรุณาอนุญาตให้เข้าถึงกล้อง");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      setBase64Image(result.assets[0].base64 || null);
    }
  };

  const uploadAndSaveData = async () => {
    if (!location || !distance || !base64Image) {
      Alert.alert("กรุณากรอกข้อมูลให้ครบ");
      return;
    }

    const fileName = `run_${Date.now()}.jpg`;

    const byteCharacters = atob(base64Image);

    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    const { error: uploadError } = await supabase.storage
      .from("run_bk")
      .upload(fileName, byteArray, {
        contentType: "image/jpeg",
      });

    if (uploadError) {
      Alert.alert(uploadError.message);
      return;
    }

    const image_url = supabase.storage.from("run_bk").getPublicUrl(fileName)
      .data.publicUrl;

    const { error: insertError } = await supabase.from("runs").insert({
      location: location,
      distance: parseFloat(distance),
      time_of_day: timeOfDay,
      run_date: new Date().toISOString().split("T")[0],
      image_url: image_url,
    });

    if (insertError) {
      Alert.alert(insertError.message);
      return;
    }

    Alert.alert("บันทึกข้อมูลสำเร็จ");

    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#f2f2f2" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerText}>เพิ่มรายการวิ่งใหม่</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.label}>สถานที่วิ่ง</Text>

        <TextInput
          value={location}
          onChangeText={setLocation}
          placeholder="เช่น สวนลุมพินี"
          style={styles.input}
        />

        <Text style={styles.label}>ระยะทาง</Text>

        <TextInput
          value={distance}
          onChangeText={setDistance}
          placeholder="เช่น 5.2"
          keyboardType="numeric"
          style={styles.input}
        />

        <Text style={styles.label}>ช่วงเวลา</Text>

        <View style={styles.timeRow}>
          <TouchableOpacity
            style={[
              styles.timeBtn,
              timeOfDay === "เช้า" && styles.timeBtnActive,
            ]}
            onPress={() => setTimeOfDay("เช้า")}
          >
            <Text style={styles.timeText}>เช้า</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.timeBtn,
              timeOfDay === "เย็น" && styles.timeBtnActive,
            ]}
            onPress={() => setTimeOfDay("เย็น")}
          >
            <Text style={styles.timeText}>เย็น</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>รูปภาพสถานที่</Text>

        <TouchableOpacity style={styles.photoBox} onPress={takePhoto}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.previewImg} />
          ) : (
            <View style={styles.photoEmpty}>
              <Ionicons name="camera-outline" size={36} color="#aaa" />

              <Text style={styles.photoText}>กดเพื่อถ่ายภาพ</Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveBtn} onPress={uploadAndSaveData}>
          <Text style={styles.saveText}>บันทึกข้อมูล</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: "#0d8cff",
    justifyContent: "center",
    alignItems: "center",
  },

  backBtn: {
    position: "absolute",
    left: 15,
  },

  headerText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Kanit_700Bold",
  },

  content: {
    padding: 20,
  },

  label: {
    fontFamily: "Kanit_700Bold",
    marginBottom: 8,
  },

  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
    fontFamily: "Kanit_400Regular",
  },

  timeRow: {
    flexDirection: "row",
    marginBottom: 18,
  },

  timeBtn: {
    paddingVertical: 8,
    paddingHorizontal: 22,
    borderRadius: 20,
    backgroundColor: "#e6e6e6",
    marginRight: 10,
  },

  timeBtnActive: {
    backgroundColor: "#0d8cff",
  },

  timeText: {
    color: "#333",
    fontFamily: "Kanit_400Regular",
  },

  photoBox: {
    height: 180,
    borderRadius: 12,
    backgroundColor: "#e9e9e9",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  photoEmpty: {
    alignItems: "center",
  },

  previewImg: {
    width: "100%",
    height: "100%",
  },

  photoText: {
    color: "#999",
    marginTop: 5,
    fontFamily: "Kanit_400Regular",
  },

  saveBtn: {
    backgroundColor: "#0d8cff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 24,
  },

  saveText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Kanit_700Bold",
  },
});
