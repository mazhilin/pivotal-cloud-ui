import defaultSettings from '@/settings'

const title = defaultSettings.title || 'PivotalCloud云服务管理平台'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
