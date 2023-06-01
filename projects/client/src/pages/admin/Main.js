import { Stats } from "react-daisyui";

const { Stat } = Stats; // Jangan dihapus

export default function MainAdmin () {
  return (
    <div className="text-center">
      <Stats className="bg-base-300 stats-vertical md:stats-horizontal shadow-md shadow-blue-700">
        <Stats.Stat>
          <Stat.Item variant="title">
            User terdaftar
          </Stat.Item>
          <Stat.Item variant="value">
            10
            {/* Masih hardcode, dapat diganti dengan response dari REST API */}
          </Stat.Item>
        </Stats.Stat>
        <Stats.Stat>
          <Stat.Item variant="title">
            Gudang
          </Stat.Item>
          <Stat.Item variant="value">
            3
            {/* Masih hardcode, dapat diganti dengan response dari REST API */}
          </Stat.Item>
        </Stats.Stat>
      </Stats>
    </div>
  )
}