import { promises as fs } from 'fs'
import { join } from 'path'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)
const PDF_DIR = join(process.cwd(), 'public', 'pdf')
const IMAGES_DIR = join(process.cwd(), 'public', 'images', 'issues')
const POPPLER_BIN = join(process.cwd(), 'scripts', 'poppler-bin', 'pdftoppm.exe')

export async function generatePdfThumbnails() {
  console.log('🔍 Checking PDF files and generating thumbnails...')

  try {
    await fs.mkdir(IMAGES_DIR, { recursive: true })

    const pdfFiles = await fs.readdir(PDF_DIR)
    const pdfNames = pdfFiles.filter((name) => name.endsWith('.pdf'))

    console.log(`📄 Found ${pdfNames.length} PDF files`)

    for (const pdfName of pdfNames) {
      const pngName = pdfName.replace('.pdf', '')
      const pdfPath = join(PDF_DIR, pdfName)
      const pngPath = join(IMAGES_DIR, `${pngName}.png`)

      try {
        await fs.access(pngPath)
        console.log(`✅ ${pngName} already exists, skipping`)
      } catch {
        console.log(`🖼️  Generating thumbnail for ${pdfName}...`)
        
        try {
          const command = `"${POPPLER_BIN}" -png -f 1 -l 1 -singlefile -scale-to 1200 "${pdfPath}" "${pngPath}"`
          
          await execAsync(command)
          
          console.log(`✅ Generated ${pngName}`)
        } catch (error) {
          console.error(`❌ Error generating thumbnail for ${pdfName}:`, error)
        }
      }
    }

    console.log('✨ PDF thumbnail generation completed')
  } catch (error) {
    console.error('❌ Error in PDF thumbnail generation:', error)
  }
}
