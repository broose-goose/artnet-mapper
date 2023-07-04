import { Installation } from "./installation";
import { Pixel } from "./pixel";

export const GeneratePixels = (width: number, height: number): Array<Pixel> => {
    const pixels: Array<Pixel> = [];
    /* setup pixels */
    for (let y = height - 1; y >= 0; y--) {
        for (let x = 0; x < width; x++) {
            pixels.push({
                xPosition: x,
                yPosition: y,
                universe: -1,
                position: -1,
                pixelType: 0,
                isActive: false
            })
        }
    }
    return pixels;
}

export enum AssignmentDirection {
    LeftToRightTopToBottom = 0,
    LeftToRightBottomToTop = 1,
    RightToLeftTopToBottom = 2,
    RightToLeftBottomToTop = 3
}

enum Direction {
    Down = 0,
    Up = 1,
    Right = 2,
    Left = 3
}

const getStartingDirection: Record<AssignmentDirection, Direction> = {
    [AssignmentDirection.LeftToRightTopToBottom]: Direction.Down,
    [AssignmentDirection.LeftToRightBottomToTop]: Direction.Up,
    [AssignmentDirection.RightToLeftTopToBottom]: Direction.Down,
    [AssignmentDirection.RightToLeftBottomToTop]: Direction.Up,
}

const getScootDirection: Record<AssignmentDirection, Direction> = {
    [AssignmentDirection.LeftToRightTopToBottom]: Direction.Right,
    [AssignmentDirection.LeftToRightBottomToTop]: Direction.Right,
    [AssignmentDirection.RightToLeftTopToBottom]: Direction.Left,
    [AssignmentDirection.RightToLeftBottomToTop]: Direction.Left,
}

const getFlipDirection: Record<AssignmentDirection, Record<Direction, Direction>> = {
    [AssignmentDirection.LeftToRightTopToBottom]: {
        [Direction.Up]: Direction.Down,
        [Direction.Down]: Direction.Up
    } as Record<Direction, Direction>,
    [AssignmentDirection.LeftToRightBottomToTop]: {
        [Direction.Up]: Direction.Down,
        [Direction.Down]: Direction.Up
    } as Record<Direction, Direction>,
    [AssignmentDirection.RightToLeftTopToBottom]: {
        [Direction.Up]: Direction.Down,
        [Direction.Down]: Direction.Up
    } as Record<Direction, Direction>,
    [AssignmentDirection.RightToLeftBottomToTop]: {
        [Direction.Up]: Direction.Down,
        [Direction.Down]: Direction.Up
    } as Record<Direction, Direction>
}

interface nextPixelRet {
    nextPixel: number | undefined,
    nextDirection: Direction | undefined
}

const getNextPixel = (
    width: number, maxPixel: number, currentPixel: number, currentDirection: Direction
): number | undefined => {
    let nextPixel = -1;
    switch (currentDirection) {
        case Direction.Right:
            nextPixel = currentPixel + 1;
            break;
        case Direction.Left:
            nextPixel = currentPixel - 1;
            break;
        case Direction.Down:
            nextPixel = currentPixel + width;
            break;
        case Direction.Up:
            nextPixel = currentPixel - width;
            break;
    }
    if (0 <= nextPixel && nextPixel < maxPixel) {
        return nextPixel;
    } else {
        return undefined;
    }
}

const getNextPixelAndDirection = (
    width: number, maxPixel: number, currentPixel: number, currentDirection: Direction,
    assignmentDirection: AssignmentDirection
): nextPixelRet => {
    let nextDirection = currentDirection;
    let nextPixel = getNextPixel(width, maxPixel, currentPixel, nextDirection);
    if (nextPixel !== undefined) {
        return { nextPixel, nextDirection };
    }
    let scootDirection = getScootDirection[assignmentDirection];
    nextDirection = getFlipDirection[assignmentDirection][currentDirection];
    nextPixel = getNextPixel(width, maxPixel, currentPixel, scootDirection);
    if (nextPixel !== undefined) {
        return { nextPixel, nextDirection };
    }
    return { nextPixel: undefined, nextDirection: undefined };

}

export const AssignPixelsAndSummarize = (
    installation: Installation, startPixel: number,
    assignmentDirection: AssignmentDirection, requestedCount: number,
    universe: number, startPosition: number, omitPixelTypes: Array<number>
): UniverseSummary => {
    const pixelsPerUniverse = installation.colorCount === 3 ? 170 : 128
    const { width, pixels } = installation;
    let currentDirection = getStartingDirection[assignmentDirection];
    let assignedCount = 0;
    let currentPixel = startPixel;
    let currentUniverse = universe;
    let currentPosition = startPosition;
    let universeSummary: UniverseSummary = {[universe]: { min: startPosition, max: startPosition }};
    while (requestedCount > assignedCount) {
        let pixel = pixels[currentPixel];
        if (!omitPixelTypes.includes(pixel.pixelType)) {
            pixel.universe = currentUniverse;
            pixel.position = currentPosition;
            ++assignedCount;
            if (Object.hasOwn(universeSummary, currentUniverse)) {
                universeSummary[currentUniverse].max = currentPosition;
            } else {
                universeSummary[currentUniverse] = { min: 0, max: 0 };
            }
        }
        // early break before calculating the next pixel
        if (assignedCount >= requestedCount) {
            break;
        }
        // try to increment universe if needed
        if (++currentPosition >= pixelsPerUniverse) {
            ++currentUniverse;
            currentPosition = 0;
        }
        let { nextPixel, nextDirection }: nextPixelRet = getNextPixelAndDirection(
            width, pixels.length, currentPixel, currentDirection, assignmentDirection
        );
        if (nextPixel === undefined || nextDirection === undefined) {
            break;
        } else {
            currentPixel = nextPixel;
            currentDirection = nextDirection;
        }
    }
    if (assignedCount < requestedCount) {
        console.warn(`Only assigned  ${assignedCount} or ${requestedCount} pixels`)
    }
    return universeSummary;
}
