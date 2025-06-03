import type { RGB } from "../store/favorites";
import ColorBlock from "./ColorBlock";
import FavoritesList from "./FavoritesList";

const PaletteView = ({ colors }: { colors: RGB[] }) => {
  return (
    <div>
      <div className="flex w-full gap-2 overflow-hidden">
        {colors.map((rgb, idx) => (
          <ColorBlock key={idx} rgb={rgb} />
        ))}
      </div>
      <FavoritesList />
    </div>
  );
}

export default PaletteView
