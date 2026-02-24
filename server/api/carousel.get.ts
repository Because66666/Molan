import { promises as fs } from 'fs'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  const dir = join(process.cwd(), 'public', 'pictures')
  try {
    const names = await fs.readdir(dir)
    const files = names.filter((n) => /\.(jpg|jpeg|png|gif|webp|avif)$/i.test(n))

    // optional mapping file: carousel.json in public/pictures
    let mapping: Record<string, string> = {}
    try {
      const mapPath = join(dir, 'carousel.json')
      const mapRaw = await fs.readFile(mapPath, 'utf-8')
      mapping = JSON.parse(mapRaw)
    } catch (e) {
      // ignore if not present or invalid
    }

    const items = files.map((file) => {
      const name = file
      const url = `/pictures/${file}`
      // try exact filename, then filename without ext
      const keyNoExt = file.replace(/\.[^.]+$/, '')
      const link = mapping[name] ?? mapping[keyNoExt] ?? null
      return { name, url, link }
    })

    return items
  } catch (err) {
    return []
  }
})
