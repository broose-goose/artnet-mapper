
export interface Pixel {
    xPosition: number;
    yPosition: number;
    pixelType: number;
    isActive: boolean;
    universe?: number;
    position?: number;
}

export interface Installation {
    width: number;
    height: number;
    colorCount: 3 | 4;
    pixelTypes: Array<string>;
    // x * i + y
    pixels: Array<Pixel>;
}
