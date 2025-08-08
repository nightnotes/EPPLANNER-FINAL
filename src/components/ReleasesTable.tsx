
import { ReleaseRow } from '../utils/schedule'

type Props = { rows: ReleaseRow[] }
export default function ReleasesTable({ rows }: Props) {
  return (
    <div className="card max-w-6xl mx-auto mt-6 overflow-hidden">
      <div className="px-6 py-4 border-b border-nn_border">
        <div className="text-lg font-bold">Releases</div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-nn_bg2/60">
            <tr className="text-left">
              <th className="px-4 py-3">Datum</th>
              <th className="px-4 py-3">Artiest</th>
              <th className="px-4 py-3">Wie?</th>
              <th className="px-4 py-3">Distributie</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-t border-nn_border/50 hover:bg-nn_bg2/30">
                <td className="px-4 py-2 whitespace-nowrap">{r.date}</td>
                <td className="px-4 py-2">{r.artist}</td>
                <td className="px-4 py-2">{r.who}</td>
                <td className="px-4 py-2">{r.distribution}</td>
                <td className="px-4 py-2">
                  <span className="inline-block w-3 h-3 rounded-full bg-red-500" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
