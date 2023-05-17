export const getPlatformName = (url: string) => {
  if (url && url.length > 0) {
    url = url.toLowerCase()
    if (url.includes('1688')) return '1688'
    if (url.includes('alibaba')) return '阿里国际站'
    if (url.includes('allegro')) return 'Allegro'
    if (url.includes('taobao')) return '淘宝'
    if (url.includes('pinduoduo')) return '拼多多'
    if (url.includes('aliexpress')) return '速卖通'
    if (url.includes('shopee')) return 'Shopee'
    if (url.includes('lazada')) return 'Lazada'
    if (url.includes('joom')) return 'Joom'
    if (url.includes('ozon')) return 'Ozon'
    if (url.includes('wish')) return 'WISH'
    if (url.includes('amazon')) return '亚马逊'
    if (url.includes('ebay')) return 'eBay'
    if (url.includes('cdiscount')) return 'Cdiscount'
  }
  return '其他'
}
