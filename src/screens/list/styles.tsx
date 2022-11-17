import { StyleSheet } from "react-native"
import Colors from "../../constants/Colors";

const baseStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  listItem: {
    paddingHorizontal: 10, 
    paddingVertical: 10, 
    borderRadius: 8, 
    
    borderWidth: 1, 
    marginBottom: 10, 
    flexDirection: "row", 
    justifyContent: "space-between",
    alignItems: "center",
  },
  cameraTitle: {
    
    fontWeight: "700"
  },
  date: {
    color: Colors.mintGreen,
    marginTop: 5
  },
  image: {
    width: 40, 
    height: 40, 
    borderRadius: 8
  },
  msgContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

const darkTheme = StyleSheet.create({
  ...baseStyles,
  container: {
    ...baseStyles.container,
    backgroundColor: Colors.blueZodiac
  },
  listItem: {
    ...baseStyles.listItem,
    borderColor: Colors.heather,
    backgroundColor: Colors.bermudaGray
  },
  cameraTitle: {
    ...baseStyles.cameraTitle,
    color: Colors.white
  },
  date: {
    ...baseStyles.date,
    color: Colors.mintGreen
  }
})

const lightTheme = StyleSheet.create({
  ...baseStyles,
  container: {
    ...baseStyles.container,
    backgroundColor: Colors.white
  },
  listItem: {
    ...baseStyles.listItem,
    borderColor: Colors.slateGray,
    backgroundColor: Colors.zircon
  },
  cameraTitle: {
    ...baseStyles.cameraTitle,
    color: Colors.bermudaGray
  },
  date: {
    ...baseStyles.date,
    color: Colors.mintGreen
  }
})

const getThemeStyles = (isDarkMode: boolean) => {
  return isDarkMode ? darkTheme : lightTheme;
}

export {
  getThemeStyles
};