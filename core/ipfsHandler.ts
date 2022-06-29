//import ipfsPath from 'go-ipfs'
import Path from 'path'
import os from 'os'
import fs from 'fs'
import * as IPFSHTTPClient from 'ipfs-http-client'
import execa from 'execa'
import { IPFS_HOST, IPFS_SELF_MULTIADDR } from '../constants'
const waIpfs = require('wa-go-ipfs')
const toUri = require('multiaddr-to-uri')

const defaultIpfsConfig = {
  API: {
    HTTPHeaders: {
      'Access-Control-Allow-Credentials': ['true'],
      'Access-Control-Allow-Headers': ['Authorization'],
      'Access-Control-Allow-Origin': ['*'],
      'Access-Control-Expose-Headers': ['Location'],
      'HTTPHeaders.Access-Control-Allow-Methods': ['PUT', 'POST', 'GET'],
    },
  },
  Gateway: {
    HTTPHeaders: {
      'Access-Control-Allow-Credentials': ['true'],
      'Access-Control-Allow-Headers': ['Authorization'],
      'Access-Control-Allow-Origin': ['*'],
      'Access-Control-Expose-Headers': ['Location'],
      'HTTPHeaders.Access-Control-Allow-Methods': ['PUT', 'POST', 'GET'],
    },
  },
  Bootstrap: [
    '/dnsaddr/bootstrap.libp2p.io/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN',
    '/dnsaddr/bootstrap.libp2p.io/p2p/QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa',
    '/dnsaddr/bootstrap.libp2p.io/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb',
    '/dnsaddr/bootstrap.libp2p.io/p2p/QmcZf59bWwK5XFi76CZX8cbJ4BhTzzA3gU1ZjYZcYW3dwt',
    '/ip4/104.131.131.82/tcp/4001/p2p/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ',
    '/ip4/104.131.131.82/udp/4001/quic/p2p/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ',
    '/ip4/5.196.95.75/tcp/4001/p2p/12D3KooWKgdHAPAxhGRtUFhfeec3s4ujhVo31YvEYfKh4HaWXVfe',
    '/ip4/185.130.44.194/tcp/4001/p2p/12D3KooWBGA84tBTHetG3eJ5N6iu6Wh9XeKxzcxvJkp5G46rpsyK',
  ],
  Swarm: {
    ConnMgr: {
      GracePeriod: '20s',
      HighWater: 1500,
      LowWater: 450,
      Type: 'basic',
    },
    EnableAutoRelay: true,
    EnableRelayHop: false,
  },
  Addresses: {
    API: IPFS_SELF_MULTIADDR,
    Announce: [],
    Gateway: '/ip4/127.0.0.1/tcp/8080',
    NoAnnounce: [],
    Swarm: ['/ip4/0.0.0.0/tcp/4001', '/ip6/::/tcp/4001', '/ip6/::/udp/4001/quic'],
  },
}
export class IpfsHandler {
  static events: any
  static get ready() {
    return new Promise(async (resolve, reject) => {
      let ipfsInfo = await IpfsHandler.getIpfs()
      if (ipfsInfo.ipfs) {
        return resolve(ipfsInfo.ipfs)
      } else {
        IpfsHandler.events.once('ready', async () => {
          ipfsInfo = await IpfsHandler.getIpfs()
          return resolve(ipfsInfo.ipfs)
        })
      }
    })
  }
  static async start(appPath: string) {
    console.log(`4`)
    let ipfsInfo = await IpfsHandler.getIpfs()
    if (!ipfsInfo.exists) {
      console.log(`5`)
      ipfsInfo = await IpfsHandler.getIpfs()
      await IpfsHandler.init(ipfsInfo.ipfsPath)
      fs.writeFileSync(
        Path.join(appPath, 'ipfs.pid'),
        `${await IpfsHandler.run(ipfsInfo.ipfsPath)}`,
      )
      IpfsHandler.events.emit('ready')
    } else {
      console.log(`6`)
      if (ipfsInfo.ipfs) {
        IpfsHandler.events.emit('ready')
      } else {
        fs.writeFileSync(
          Path.join(appPath, 'ipfs.pid'),
          `${await IpfsHandler.run(ipfsInfo.ipfsPath)}`,
        )
        IpfsHandler.events.emit('ready')
      }
      //let config = JSON.parse(fs.readFileSync(Path.join(pinzaInfo.pinzaPath, "config")).toString())
      //if (config.ipfs.autoStart === true) {
      //}
    }
  }
  static async stop(appPath: string) {
    try {
      process.kill(Number(fs.readFileSync(Path.join(appPath, 'ipfs.pid'))))
      fs.unlinkSync(Path.join(appPath, 'ipfs.pid'))
    } catch { }
  }
  static async init(repoPath: string) {
    const goIpfsPath = await waIpfs.getPath(
      waIpfs.getDefaultPath({ dev: process.env.NODE_ENV === 'development' }),
    )
    await execa(goIpfsPath, ['init'], {
      env: {
        IPFS_Path: repoPath,
      },
    })
    for (const key in defaultIpfsConfig) {
      const subTree = defaultIpfsConfig[key]
      await execa(goIpfsPath, ['config', '--json', key, JSON.stringify(subTree)], {
        env: {
          IPFS_Path: repoPath,
        },
      })
    }
  }
  static async run(repoPath: string) {
    const goIpfsPath = await waIpfs.getPath(
      waIpfs.getDefaultPath({ dev: process.env.NODE_ENV === 'development' }),
    )

    return new Promise((resolve, reject) => {
      try {
        const subprocess = execa(
          goIpfsPath,
          ['daemon', '--enable-pubsub-experiment', '--enable-gc', '--migrate'],
          {
            env: {
              IPFS_Path: repoPath,
            },
          },
        )
        subprocess.stderr.on('data', (data: { toString: () => any }) => console.error(data.toString()))
        subprocess.stdout.on('data', (data: { toString: () => any }) => console.log(data.toString()))
        let output = ''

        const readyHandler = (data: { toString: () => string }) => {
          output += data.toString()
          if (output.match(/(?:daemon is running|Daemon is ready)/)) {
            // we're good
            subprocess.stdout.off('data', readyHandler)
            resolve(subprocess.pid)
          }
        }
        subprocess.stdout.on('data', readyHandler)
      } catch (ex) {
        reject(ex)
      }
    })
  }
  static async getIpfs() {
    const AppPath = Path.join(os.homedir(), '.blasio-app')

    let ipfsPath: string
    if (process.env.IPFS_Path) {
      ipfsPath = process.env.IPFS_Path
    } else {
      ipfsPath = Path.join(os.homedir(), '.ipfs')
    }

    let exists
    let apiAddr
    let isLocked
    let ipfs
    let gateway
    if (fs.existsSync(ipfsPath)) {
      exists = true
      if (fs.existsSync(Path.join(ipfsPath, 'api'))) {
        apiAddr = fs.readFileSync(Path.join(ipfsPath, 'api')).toString()
      }
      if (fs.existsSync(Path.join(ipfsPath, 'repo.lock'))) {
        isLocked = true
      } else {
        isLocked = false
      }
    } else {
      exists = false
      /*if (fs.existsSync(Path.join(pinzaPath, "config"))) {
                let appConfig = JSON.parse(fs.readFileSync(Path.join(AppPath, "config")).toString())
                apiAddr = appConfig.ipfs.apiAddr;
            }*/
    }

    if (apiAddr) {
      ipfs = IPFSHTTPClient.create({ host: IPFS_HOST })
      try {
        await ipfs.config.get('Addresses')
      } catch (ex) {
        console.error(`Error getting IPFS address config`)
        console.error(ex)
        ipfs = null
      }
    } else {
      console.error(`***** API addr is null!!******`)
    }

    if (ipfs !== null && ipfs) {
      const gma = await ipfs.config.get('Addresses.Gateway')
      gateway = toUri(gma) + '/ipfs/'
    } else {
      gateway = 'http://localhost:8080/ipfs/'
    }

    return {
      isLocked,
      exists,
      ipfsPath,
      ipfs,
      apiAddr,
      gateway,
    }
  }
}
IpfsHandler.events = new (require('events'))()
