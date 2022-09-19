import {create} from 'ipfs-http-client'

export async function upload(data) {
    const config = await import('./config.js')
    const auth = 'Basic ' + Buffer.from(config.INFURA_PROJECT_ID + ':' + config.INFURA_PROJECT_SECRET).toString('base64')
    const client = create({
        host: config.IPFS_HOST,
        port: config.IPFS_PORT,
        protocol: 'https',
        headers: {
            authorization: auth
        }
    })
    return await client.add(data)
}