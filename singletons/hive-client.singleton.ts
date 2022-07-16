import { Client } from '@hiveio/dhive'

import hive from '@hiveio/hive-js'
import { promisify } from 'util'

hive.broadcast.comment = promisify(hive.broadcast.comment)

export const hiveClient = new Client([
  'https://api.hive.blog',
  'https://api.hivekings.com',
  'https://anyx.io',
  'https://api.openhive.network',
])
