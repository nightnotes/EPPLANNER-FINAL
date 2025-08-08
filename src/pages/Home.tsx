
import Navbar from '../components/Navbar'
import ReleasesTable from '../components/ReleasesTable'
import { generateSchedule } from '../utils/schedule'

export default function Home() {
  const start = new Date() // vandaag
  const end = new Date(); end.setDate(end.getDate() + 44) // 45 dagen window
  const rows = generateSchedule(start, end)
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 pt-6">
        <h1 className="text-2xl font-semibold mb-4">Releaseschema (volgende 45 dagen)</h1>
        <ReleasesTable rows={rows} />
      </div>
    </div>
  )
}
