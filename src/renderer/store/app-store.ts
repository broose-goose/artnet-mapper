import {reactive, shallowReactive} from 'vue'
import {Installation, Pixel} from "../domain/installation";
import {defineStore} from "pinia";

export const useAppStore = defineStore('app', () => {
    // We declare the state using reactive to make sure the object is reactive
    const installation: Installation = reactive({
        width: -1,
        height: -1,
        colorCount: 3,
        pixelTypes: [],
        pixels: []
    });

    const artnet: Artnet = shallowReactive({
        universes: [],
        universeCounts: {},
        universeMap: {},
        universeData: []
    });

    const setupInstallation = (width: number, height: number, isRgbw: boolean) => {
        /* new params */
        installation.width = width;
        installation.height = height;
        isRgbw = false;
        /* reset everything else */
        installation.pixelTypes = ['Default'];
        installation.pixels = [];
        artnet.universes = [];
        artnet.universeCounts = {};
        artnet.universeMap = {};
        artnet.universeData = [];
        const pixels: Array<Pixel> = [];
        /* setup pixels */
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                const pixelNumber = x * height + y;
                pixels.push({
                    xPosition: x,
                    yPosition: y,
                    pixelType: 0
                })
            }
        }
    };

    // We expose the state and functions to the components that will use this store.
    return { installation, artnet, setupInstallation };
})
