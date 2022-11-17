import React from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  useColorScheme,
  FlatList,
  Image,
  View
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

import {
  useQuery
} from "@tanstack/react-query"
import { getMarsPhotos } from "../../api"

import { getThemeStyles } from "./styles";

type ListScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList
>;

const ListScreen = ({ navigation }: ListScreenNavigationProp) => {
  const isDarkMode = useColorScheme() === "dark";
  const styles = getThemeStyles(isDarkMode);
  const { data, error, isLoading } = useQuery({ queryKey: ["photos"], queryFn: getMarsPhotos })

  const handleGoToImageView = (imgSrc: string) => {
    navigation.navigate("ImageViewScreen", { imageUrl: imgSrc })
  }

  return (
    <SafeAreaView style={styles.container}>
      {
        isLoading &&
        <View style={styles.msgContainer}>
          <Text>Loading...</Text>
        </View>
      }
      {
        error &&
        <View style={styles.msgContainer}>
          <Text>Something went wrong...</Text>
        </View>
      }
      {
        data &&
        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
          style={{ padding: 16 }}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.listItem} onPress={() => handleGoToImageView(item.img_src)}>
              <View>
                <Text style={styles.cameraTitle}>{item.camera.full_name}</Text>
                <Text style={styles.date}>{item.earth_date}</Text>
              </View>
              <Image source={{ uri: item.img_src }} style={styles.image} />
            </TouchableOpacity>
          )}
        />
      }
    </SafeAreaView>
  );
};


export default ListScreen;
