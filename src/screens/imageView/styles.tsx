import { StyleSheet, Platform } from "react-native"
import Colors from "../../constants/Colors";

const baseStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  bottomContainer: {
    height: 300,
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    width: "100%"
  },
  bottomTabs: {
    width: "100%",
    height: 100,
    borderTopWidth: 1,
    flexDirection: "row"
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  modalContainer: {
    backgroundColor: Colors.zircon,
    flex: 1,
    marginTop: Platform.OS === 'android' ? 20 : 60,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowColor: Colors.battleShipGrey,
    shadowRadius: 2,
    shadowOpacity: 0.2,
    elevation: 4,
  },
  cancelBtn: {
    fontSize: 20,
    color: Colors.amaranth
  },
  scanQrBtnLabel: {
    fontSize: 20,
    color: Colors.blueZodiac
  }
});

const darkTheme = StyleSheet.create({
  ...baseStyles,
  container: {
    ...baseStyles.container,
    backgroundColor: Colors.blueZodiac
  },
  bottomTabs: {
    ...baseStyles.bottomTabs,
    backgroundColor: Colors.athensGray,
    borderColor: Colors.gray
  },
  bottomContainer: {
    ...baseStyles.bottomContainer,
    backgroundColor: Colors.blueZodiac
  }
})

const lightTheme = StyleSheet.create({
  ...baseStyles,
  container: {
    ...baseStyles.container,
    backgroundColor: Colors.white
  },
  bottomTabs: {
    ...baseStyles.bottomTabs,
    backgroundColor: Colors.athensGray,
    borderColor: Colors.gray
  },
  bottomContainer: {
    ...baseStyles.bottomContainer,
    backgroundColor: Colors.white
  },
})

const getThemeStyles = (isDarkMode: boolean) => {
  return isDarkMode ? darkTheme : lightTheme;
}

export {
  getThemeStyles
};