import { useFavoritesStore } from '../store/favorites'
import { rgbToHex } from '../utils/colorUtils';

const FavoritesList = () => {
  const { favorites, removeFavorite } = useFavoritesStore();

  const handleRemoveFavorite = (idx: number) => {
    if (confirm("삭제하시겠습니까?")) {
      removeFavorite(idx);
    } else {
      return;
    }
  }

  if (favorites.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-8">
        좋아요를 눌러보세요!
      </div>
    )
  }

  return (
    <div className="mt-8 space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">🎨 나의 팔레트</h2>
      {favorites.map((color, index) => (
        <div
          key={index}
          className="group flex items-center justify-between p-4 bg-white shadow rounded-xl hover:shadow-lg transition"
        >
          <div className="flex space-x-1">
            <div
              key={index}
              className="w-8 h-8 rounded"
              style={{ backgroundColor: rgbToHex(color) }}
              title={rgbToHex(color)}
            />
          </div>

          <div className="flex gap-2 ml-4">
            <span
              key={index}
              className="text-xs text-gray-500 font-mono hidden sm:inline-block"
            >
              {rgbToHex(color)}
            </span>
          </div>

          <button
            onClick={() => handleRemoveFavorite(index)}
            className="ml-auto text-sm text-red-500 opacity-0 group-hover:opacity-100 transition hover:text-red-600 cursor-pointer"
          >
            삭제
          </button>
        </div>
      ))}
    </div>
  )
}

export default FavoritesList;
