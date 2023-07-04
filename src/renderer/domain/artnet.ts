
interface Universe {
    universeNumber: number,
    host: string | null,
    port: number | null
}

interface Artnet {
    universes: Array<Universe>;
    universeCounts: {[key: number]: number};
    universeMap: {[key: number]: number};
    universeData: Array<Buffer>;
}

type UniverseSummary = Record<number, { min: number, max: number }>
