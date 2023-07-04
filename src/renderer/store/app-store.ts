import {reactive, ref, Ref, shallowReactive} from 'vue'
import {Installation} from "../domain/installation";
import {defineStore} from "pinia";
import {InstallationState} from "../domain/app";
import {AssignmentDirection, AssignPixelsAndSummarize, GeneratePixels} from "../domain/pixels";

export const useAppStore = defineStore('app', () => {
    // We declare the state using reactive to make sure the object is reactive
    const installation: Installation = reactive({
        width: -1,
        height: -1,
        colorCount: 3,
        pixelTypes: [],
        pixels: []
    });

    const state: Ref<InstallationState> = ref(InstallationState.Moving);

    const setInstallationState = (newState: InstallationState) => {
        if (state.value === InstallationState.Toggling) {
            installation.pixels.forEach((pixel, index, pixels) => {
                pixels[index].isActive = false;
            })
        }
        state.value = newState;
    }

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

        installation.pixels = GeneratePixels(width, height);
    };

    const togglePixel = (pixelNumber: number) => {
        const pixel = installation.pixels[pixelNumber];
        installation.pixels[pixelNumber].isActive = !pixel.isActive
        // need to update universe position as well
    }

    const assignPixels = (
        pixelNumber: number, direction: AssignmentDirection, requestedCount: number,
        universe: number, position: number, omitPixelTypes: Array<number>
    ) => {
        AssignPixelsAndSummarize(
            installation, pixelNumber, direction, requestedCount, universe, position, omitPixelTypes
        );
        // need to update artnet as well
    }

    // We expose the state and functions to the components that will use this store.
    return {
        installation, artnet, state,
        setInstallationState,
        setupInstallation,
        togglePixel,
        assignPixels
    };
})
