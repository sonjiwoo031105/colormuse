import toast from "react-hot-toast";
import { useFavoritesStore } from "../store/favorites";
import { rgbToHex, type RGB } from "../utils/colorUtils";

const ColorBlock = ({ rgb }: { rgb: RGB }) => {
  const hex = rgbToHex(rgb);

  const { favorites, addFavorite, removeFavorite, isDuplicate } = useFavoritesStore();

  const handleToggleFavorite = () => {
    const index = favorites.findIndex(
      (fav) => JSON.stringify(fav) === JSON.stringify(rgb)
    )
    if (index !== -1) {
      removeFavorite(index)
    } else {
      addFavorite(rgb)
    }
  }

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
    toast.success(`${color} 복사됨!`);
  }

  return (
    <>
      <div className="flex flex-col flex-1 items-center gap-2">
        <div
          className="h-25 w-full rounded-lg cursor-copy transition hover:opacity-90"
          style={{ backgroundColor: hex }}
          onClick={() => copyToClipboard(hex)}
        >
          <p className="text-white text-sm text-center mt-2 drop-shadow">
            {hex}
          </p>
        </div>

        <button
          onClick={handleToggleFavorite}
          className={`rounded-lg text-sm font-medium bg-stone-50 hover:bg-red-100 transition cursor-pointer ${isDuplicate(rgb) ? 'p-2' : 'px-4 py-2'}`}
        >
          {isDuplicate(rgb) ? '💔 좋아요 취소' : '❤️ 좋아요'}
        </button>
      </div>
    </>
  )
}

export default ColorBlock
