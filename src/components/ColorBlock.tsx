import { useFavoritesStore, type RGB } from "../store/favorites";
import { rgbToHex } from "../utils/color";

const ColorBlock = ({ rgb }: { rgb: RGB }) => {
  const hex = rgbToHex(rgb);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(hex);
    alert("클립보드에 복사되었습니다.");
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
    <div className="flex flex-col flex-1 gap-2">
      <div
        className="h-40 rounded-lg cursor-copy"
        style={{ backgroundColor: hex }}
        onClick={copyToClipboard}
        title="Click to copy"
      >
        <p className="text-white text-sm text-center mt-2 drop-shadow">{hex}</p>
      </div>

      <button
        onClick={handleToggleFavorite}
        className="p-2 rounded text-sm bg-stone-50 text-gray-800 cursor-pointer"
      >
        {isDuplicate(rgb) ? '💔 좋아요 취소' : '❤️ 좋아요'}
      </button>
    </div>
  )
}

export default ColorBlock
