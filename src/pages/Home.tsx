
import Navbar from '../components/Navbar'
import ReleasesTable from '../components/ReleasesTable'
import { generateSchedule } from '../utils/schedule'

export default function Home() {
  const rows = generateSchedule(new Date("2025-08-25"), new Date("2026-12-31"))
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 pt-6">
        <h1 className="text-2xl font-extrabold mb-4">Releaseschema t/m 31-12-2026</h1>
        <ReleasesTable rows={rows} />
      </div>
    </div>
  )
}
