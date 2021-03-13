require('dotenv').config()
import { User, checkApproval } from './helpers'
import { wait } from 'src/utils'
import { KOVAN, OPTIMISM, XDAI } from 'src/constants'
import Logger from 'src/logger'
import { privateKey } from './config'

const TOKEN = 'DAI'
const AMOUNT = 10000
const NETWORKS = [OPTIMISM, XDAI]
const logger = new Logger('TEST')

describe('convert to canonical', () => {
  for (let L2_NETWORK of NETWORKS) {
    const label = `convert token to canonical token on ${L2_NETWORK}`
    it(
      label,
      async () => {
        logger.log(label)
        const user = new User(privateKey)
        logger.log(`minting ${KOVAN} ${TOKEN}`)
        let tx = await user.mint(KOVAN, TOKEN, AMOUNT)
        logger.log(`mint tx: ${tx.hash}`)
        await tx.wait()
        const l1CanonicalBridge = user.getCanonicalBridgeContract(
          L2_NETWORK,
          TOKEN
        )
        logger.log(`checking ${TOKEN} approval on ${L2_NETWORK}`)
        await checkApproval(user, L2_NETWORK, TOKEN, l1CanonicalBridge.address)
        const tokenBalanceBefore = await user.getBalance(L2_NETWORK, TOKEN)
        logger.log(`token ${TOKEN} balance: ${tokenBalanceBefore}`)
        logger.log(`converting ${KOVAN} ${TOKEN} to canonical token`)
        tx = await user.convertToCanonicalToken(L2_NETWORK, TOKEN, AMOUNT)
        logger.log('tx deposit:', tx?.hash)
        await tx?.wait()
        logger.log(`waiting 20s for ${L2_NETWORK} to process tx`)
        await wait(20 * 1000)
        const tokenBalanceAfter = await user.getBalance(L2_NETWORK, TOKEN)
        logger.log(`hop ${TOKEN} balance: ${tokenBalanceAfter}`)
        expect(tokenBalanceAfter).toBeGreaterThan(tokenBalanceBefore)
      },
      300 * 1000
    )
  }
})

describe.only('convert to hop', () => {
  for (let L2_NETWORK of NETWORKS) {
    const label = `convert token to Hop bridge token on ${L2_NETWORK}`
    it(
      label,
      async () => {
        logger.log(label)
        const user = new User(privateKey)
        logger.log(`minting ${KOVAN} ${TOKEN}`)
        let tx = await user.mint(KOVAN, TOKEN, AMOUNT)
        logger.log(`mint tx: ${tx.hash}`)
        await tx.wait()
        const l1Bridge = user.getHopBridgeContract(KOVAN, TOKEN)
        logger.log(`checking ${TOKEN} approval on ${L2_NETWORK}`)
        await checkApproval(user, L2_NETWORK, TOKEN, l1Bridge.address)
        const hopBalanceBefore = await user.getHopBalance(L2_NETWORK, TOKEN)
        logger.log(`hop ${TOKEN} balance: ${hopBalanceBefore}`)
        logger.log(`converting ${KOVAN} ${TOKEN} for hop`)
        tx = await user.canonicalTokenToHopToken(L2_NETWORK, TOKEN, AMOUNT)
        logger.log('tx sendToL2:', tx?.hash)
        await tx?.wait()
        logger.log(`waiting 20s for ${L2_NETWORK} to process tx`)
        await wait(20 * 1000)
        const hopBalanceAfter = await user.getHopBalance(L2_NETWORK, TOKEN)
        logger.log(`hop ${TOKEN} balance: ${hopBalanceAfter}`)
        expect(hopBalanceAfter).toBeGreaterThan(hopBalanceBefore)
      },
      300 * 1000
    )
  }
})