import * as React from "react";
import Svg, { G, Polygon, Path, Rect } from "react-native-svg";

const QrCodeIcon = ({ style, fill = "currentColor", width, height, ...props }: any) => (
    <Svg
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 512 512"
        style={{
            enableBackground: "new 0 0 512 512",
        }}
        xmlSpace="preserve"
        {...props}
    >
        <G>
            <Polygon points="34.1,34.1 170.7,34.1 170.7,0 0,0 0,170.7 34.1,170.7  " />
            <Path d="M170.7,170.7V68.3H68.3v102.4H170.7z M102.4,102.4h34.1v34.1h-34.1V102.4z" />
            <Polygon points="332.8,0 332.8,34.1 477.9,34.1 477.9,170.7 512,170.7 512,0  " />
            <Path d="M443.7,170.7V68.3H341.3v102.4H443.7z M375.5,102.4h34.1v34.1h-34.1V102.4z" />
            <Polygon points="34.1,341.3 0,341.3 0,512 170.7,512 170.7,477.9 34.1,477.9  " />
            <Path d="M102.4,341.3H68.3v102.4h102.4V341.3H102.4z M136.5,409.6h-34.1v-34.1h34.1V409.6z" />
            <Polygon points="477.9,477.9 332.8,477.9 332.8,512 512,512 512,341.3 477.9,341.3  " />
            <Polygon points="273.1,307.2 409.6,307.2 409.6,375.5 443.7,375.5 443.7,273.1 273.1,273.1  " />
            <Polygon points="443.7,443.7 443.7,409.6 238.9,409.6 238.9,273.1 68.3,273.1 68.3,307.2 204.8,307.2 204.8,443.7  " />
            <Rect x={204.8} y={68.3} width={34.1} height={102.4} />
            <Polygon points="68.3,238.9 307.2,238.9 307.2,68.3 273.1,68.3 273.1,204.8 68.3,204.8  " />
            <Rect x={341.3} y={204.8} width={102.4} height={34.1} />
            <Rect x={341.3} y={341.3} width={34.1} height={34.1} />
            <Rect x={273.1} y={341.3} width={34.1} height={34.1} />
        </G>
    </Svg>
);
export default QrCodeIcon;
