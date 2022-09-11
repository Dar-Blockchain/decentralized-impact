const fs = require('fs').promises;

const upload = async () => {
    // Read files
    const files = await fs.readdir('upload')
    for (const filename of files) {
        const file = await fs.readFile('upload/'+filename)
        if (file == null) {
            return
        }
        // Upload image to ipfs
        const ipfs = await import('./ipfs.mjs')
        const ipfsResult = await ipfs.upload(file)
        if (ipfsResult.path == null) {
            console.log('[ERROR] Could not upload '+filename+' to IPFS')
            return
        }
        console.log(filename, '->', ipfsResult.path)
    }
}

upload().then(() => console.log('Upload completed!')).catch((e) => console.log(e))