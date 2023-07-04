import {Pixel} from "./pixel";

export interface Installation {
    width: number;
    height: number;
    colorCount: 3 | 4;
    pixelTypes: Array<string>;
    // x * i + y
    pixels: Array<Pixel>;
}
