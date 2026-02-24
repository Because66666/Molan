import { promises as fs } from 'fs'
import { join } from 'path'

const isSafeLink = (v: unknown) => {
  if (typeof v !== 'string') return false
  if (v.trim() === '') return false
  // allow internal paths
  if (v.startsWith('/')) return true
  // allow http(s)
  return /^https?:\/\//i.test(v)
}

export default defineEventHandler(async (event) => {
  const dir = join(process.cwd(), 'public', 'pictures')
  try {
    const names = await fs.readdir(dir)
    const files = names.filter((n) => /\.(jpg|jpeg|png|gif|webp|avif)$/i.test(n))

    // optional mapping file: carousel.json in public/pictures
    let mapping: Record<string, unknown> = {}
    try {
      const mapPath = join(dir, 'carousel.json')
      const mapRaw = await fs.readFile(mapPath, 'utf-8')
      const parsed = JSON.parse(mapRaw)
      if (parsed && typeof parsed === 'object') mapping = parsed as Record<string, unknown>
    } catch (e) {
      // log JSON parse/read errors but continue with empty mapping
      // This surface is useful for debugging without silently hiding the problem.
      // Do not expose stack traces to clients.
      console.error('[carousel.get] mapping load error:', (e as any)?.message ?? e)
      mapping = {}
    }

    const items = files.map((file) => {
      const name = file
      const url = `/pictures/${file}`
      // try exact filename, then filename without ext
      const keyNoExt = file.replace(/\.[^.]+$/, '')
      const candidate = mapping[name] ?? mapping[keyNoExt] ?? null
      const link = isSafeLink(candidate) ? String(candidate) : null
      return { name, url, link }
    })

    return items
  } catch (err) {
    console.error('[carousel.get] read error:', (err as any)?.message ?? err)
    throw createError({ statusCode: 500, statusMessage: '读取轮播图片失败' })
  }
})
