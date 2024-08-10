import Toast from "react-native-root-toast";
import { COLORS } from "../constants/colors";

type toastTypes = {
  toastMessage: string;
  type: "success" | "error" | "warning";
  onHidden?: () => void;
};

export default function showToast({
  toastMessage,
  type,
  onHidden,
}: toastTypes) {
  let showToast = Toast.show(toastMessage, {
    duration: Toast.durations.SHORT,
    position: Toast.positions.BOTTOM,
    animation: true,
    hideOnPress: true,
    backgroundColor: switchColorByToastType(type),
    onHidden: () => {
      if (onHidden) {
        onHidden();
      }
    },
  });
}

function switchColorByToastType(type: toastTypes["type"]): string {
  switch (type) {
    case "success":
      return COLORS.primaryBrown;
    case "error":
      return COLORS.UTILITIES.red;
    case "warning":
      return COLORS.UTILITIES.warning;
    default:
      return COLORS.primaryBrown;
  }
}
