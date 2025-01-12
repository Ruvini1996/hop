import React from 'react'
import Button from 'src/components/buttons/Button'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { TokenIcon } from 'src/pages/Pools/components/TokenIcon'

const useStyles = makeStyles((theme) => ({
  root: {
  },
  label: {
    'white-space': 'nowrap'
  },
  boxWrapper: {
    background: theme.palette.type === 'dark' ? '#0000003d' : '#fff',
    borderRadius: '2rem'
  }
}))

interface Props {
  token0: any
  token1: any
  priceImpact: string
  total: string
  onConfirm: (confirmed: boolean, opts: any) => void
  showStakeOption: boolean
}

export function AddLiquidityAndStake (props: Props) {
  const { onConfirm, token0, token1, priceImpact, total, showStakeOption } = props
  const styles = useStyles()

  function handleDepositAndStake() {
    onConfirm(true, { stake: true })
  }

  function handleDeposit() {
    onConfirm(true, { stake: false })
  }

  const token0Amount = token0.amount
  const token0AmountUsd = token0.amountUsd
  const token0ImageUrl = token0.token.imageUrl
  const token0Symbol = token0.token.symbol

  const token1Amount = token1.amount
  const token1AmountUsd = token1.amountUsd
  const token1ImageUrl = token1.token.imageUrl
  const token1Symbol = token1.token.symbol

  return (
    <Box className={styles.root} margin="0 auto" maxWidth="350px">
      <Box mb={4} display="flex" justifyContent="center" alignItems="center" textAlign="center">
        <Typography variant="h5">
          Confirm Add Liquidity
        </Typography>
      </Box>
      <Box mb={4} p={2} className={styles.boxWrapper}>
        <Box mb={1} display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center">
            {!!token0ImageUrl && (
              <Box mr={1} display="flex" alignItems="center">
                <TokenIcon width="24px" src={token0ImageUrl} alt={token0Symbol} title={token0Symbol} />
              </Box>
            )}
            <Box mr={1} display="flex" alignItems="center">
              <Typography variant="subtitle1" className={styles.label}>
                {token0Amount} {token0Symbol}
              </Typography>
            </Box>
          </Box>
          <Box>
            <Typography variant="subtitle1">
              {token0AmountUsd}
            </Typography>
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center">
            {!!token1ImageUrl && (
              <Box mr={1} display="flex" alignItems="center">
                <TokenIcon width="24px" src={token1ImageUrl} alt={token1Symbol} title={token1Symbol} />
              </Box>
            )}
            <Box mr={1} display="flex" alignItems="center">
              <Typography variant="subtitle1" className={styles.label}>
                {token1Amount} {token1Symbol}
              </Typography>
            </Box>
          </Box>
          <Box>
            <Typography variant="subtitle1">
              {token1AmountUsd}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box mb={1} display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="subtitle1" color="secondary">
            Price Impact
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle1" color="secondary">
            {priceImpact}
          </Typography>
        </Box>
      </Box>
      <Box mb={4} display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h5">
            Total
          </Typography>
        </Box>
        <Box>
          <Typography variant="h5">
            {total}
          </Typography>
        </Box>
      </Box>
      {showStakeOption && (
        <Box mb={4} justifyContent="center" alignItems="center">
          <Button
            onClick={handleDepositAndStake}
            fullWidth
            large
            highlighted
          >
            Deposit + Stake
          </Button>
        </Box>
      )}
      <Box mb={4} justifyContent="center" alignItems="center">
        <Button
          onClick={handleDeposit}
          fullWidth
          large
          highlighted
        >
          Deposit
        </Button>
      </Box>
    </Box>
  )
}
