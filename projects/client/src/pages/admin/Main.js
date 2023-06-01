import { Stats } from "react-daisyui";

const { Stat } = Stats; // Jangan dihapus

export default function MainAdmin () {
  return (
    <div className="text-center">
      <Stats className="bg-base-300 stats-vertical lg:stats-horizontal shadow-md shadow-blue-700">
        <Stats.Stat>
          <Stat.Item variant="title">
            User terdaftar
          </Stat.Item>
          <Stat.Item variant="value">
            10
          </Stat.Item>
        </Stats.Stat>
        <Stats.Stat>
          <Stat.Item variant="title">
            Gudang
          </Stat.Item>
          <Stat.Item variant="value">
            3
          </Stat.Item>
        </Stats.Stat>
      </Stats>
    </div>
  )
}