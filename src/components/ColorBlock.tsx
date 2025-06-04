import toast from "react-hot-toast";
import { useFavoritesStore } from "../store/favorites";
import { rgbToHex, type RGB } from "../utils/colorUtils";

const ColorBlock = ({ rgb }: { rgb: RGB }) => {
  const hex = rgbToHex(rgb);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(hex);
    toast.success(`${hex} 복사됨!`);
  }

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

  return (
    <div className="flex flex-col flex-1 items-center gap-2">
      <div
        className="h-40 w-full rounded-lg cursor-pointer transition hover:opacity-90"
        style={{ backgroundColor: hex }}
        onClick={copyToClipboard}
        title="클릭하면 복사됩니다"
      >
        <p className="text-white text-sm text-center mt-2 drop-shadow">
          {hex}
        </p>
      </div>

      <button
        onClick={handleToggleFavorite}
        className={`rounded-lg text-sm font-medium transition cursor-pointer ${isDuplicate(rgb)
            ? 'p-2 bg-red-100 text-red-600 hover:bg-red-200'
            : 'px-4 py-2 bg-pink-100 text-pink-600 hover:bg-pink-200'
          }`}
      >
        {isDuplicate(rgb) ? '💔 좋아요 취소' : '❤️ 좋아요'}
      </button>
    </div>
  )
}

export default ColorBlock
