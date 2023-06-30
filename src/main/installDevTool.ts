
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-assembler'

export async function installExt() {
    await installExtension(VUEJS_DEVTOOLS)
        .then(() => {
            console.log('Added Extension');
        })
        .catch((err) => {
            console.log('Extension Error: ', err);
        });
}
