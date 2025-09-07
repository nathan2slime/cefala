import { Dimensions } from "react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

/**
 * Converte um valor de px para um valor responsivo baseado na altura do device.
 * @param px Valor em pixels de referência (base 800px de altura, por exemplo)
 */
export function responsiveHeightPx(px: number, baseHeight: number = 800) {
  return (px / baseHeight) * SCREEN_HEIGHT;
}
