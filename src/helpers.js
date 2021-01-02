export const formatDecimal = (value, decimals = 2) => parseFloat(Math.round(value * 100) / 100).toFixed(decimals)
