import { supabase } from "../../services/supabase";
import { RunItem } from "../../types";

import { Ionicons } from "@expo/vector-icons";

import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";

import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Run() {
  const [runs, setRuns] = useState<RunItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadRuns = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("runs")
      .select("*")
      .order("id", { ascending: false });

    if (!error && data) {
      setRuns(data);
    }

    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      loadRuns();
    }, []),
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Run Tracker V.1.0.0</Text>
      </View>

      <Image
        source={require("@/assets/images/runlogo.png")}
        style={styles.logo}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0d8cff" />
      ) : (
        <FlatList
          data={runs}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: 100,
          }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                router.push({
                  pathname: "/[id]",
                  params: {
                    id: item.id.toString(),
                    location: item.location,
                    distance: item.distance.toString(),
                    time_of_day: item.time_of_day,
                    run_date: item.run_date,
                    image_url: item.image_url,
                  },
                })
              }
            >
              <Image
                source={{ uri: item.image_url }}
                style={styles.cardImage}
              />

              <View style={styles.cardDetail}>
                <Text style={styles.location}>{item.location}</Text>

                <Text style={styles.date}>
                  {new Date(item.run_date).toLocaleDateString("th-TH", {
                    day: "numeric",
                    month: "long",
                  })}{" "}
                  พ.ศ. {new Date(item.run_date).getFullYear() + 543}
                </Text>
              </View>

              <Text style={styles.distance}>{item.distance} km</Text>
            </TouchableOpacity>
          )}
        />
      )}

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => router.push("/add")}
      >
        <Ionicons name="add" size={35} color="#fff" />
      </TouchableOpacity>
    </View>
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

  headerText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Kanit_700Bold",
  },

  logo: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginVertical: 15,
  },

  card: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 15,
    marginBottom: 12,
    elevation: 3,
  },

  cardImage: {
    width: 75,
    height: 60,
    borderRadius: 10,
  },

  cardDetail: {
    flex: 1,
    marginLeft: 10,
  },

  location: {
    fontSize: 15,
    fontFamily: "Kanit_700Bold",
    color: "#333",
  },

  date: {
    fontSize: 12,
    color: "#777",
    fontFamily: "Kanit_400Regular",
  },

  distance: {
    color: "#0d8cff",
    fontFamily: "Kanit_700Bold",
  },

  addBtn: {
    position: "absolute",
    right: 25,
    bottom: 35,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#0d8cff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});
