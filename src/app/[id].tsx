import { Ionicons } from "@expo/vector-icons";

import { router, useLocalSearchParams } from "expo-router";

import React from "react";

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Detail() {
  const { location, distance, time_of_day, run_date, image_url } =
    useLocalSearchParams();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerText}>รายละเอียดการวิ่ง</Text>
      </View>

      <Image source={{ uri: image_url as string }} style={styles.mainImage} />

      <View style={styles.card}>
        <Text style={styles.label}>สถานที่</Text>

        <Text style={styles.value}>{location}</Text>

        <View style={styles.divider} />

        <Text style={styles.label}>ระยะทาง (กม.)</Text>

        <Text style={styles.value}>{distance}</Text>

        <View style={styles.divider} />

        <Text style={styles.label}>ช่วงเวลา</Text>

        <View style={styles.timeRow}>
          <View
            style={[
              styles.timeBtn,
              {
                backgroundColor: time_of_day === "เช้า" ? "#0d8cff" : "#d9d9d9",
              },
            ]}
          >
            <Text style={styles.timeText}>เช้า</Text>
          </View>

          <View
            style={[
              styles.timeBtn,
              {
                backgroundColor: time_of_day === "เย็น" ? "#0d8cff" : "#d9d9d9",
              },
            ]}
          >
            <Text style={styles.timeText}>เย็น</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <Text style={styles.label}>วันที่วิ่ง</Text>

        <Text style={styles.value}>{run_date}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },

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

  mainImage: {
    width: "100%",
    height: 220,
  },

  card: {
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 20,
    padding: 20,
    elevation: 3,
  },

  label: {
    fontFamily: "Kanit_700Bold",
    color: "#666",
    marginBottom: 5,
  },

  value: {
    fontFamily: "Kanit_400Regular",
    fontSize: 16,
    color: "#111",
  },

  divider: {
    height: 1,
    backgroundColor: "#e6e6e6",
    marginVertical: 15,
  },

  timeRow: {
    flexDirection: "row",
    marginTop: 5,
  },

  timeBtn: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },

  timeText: {
    color: "#333",
    fontFamily: "Kanit_400Regular",
  },
});
