import Palette from "../components/Palette";
import { useColormind } from "../hooks/useColormind"

const Home = () => {
  const { data: colors, isLoading, refetch } = useColormind();

  return (
    <div className="max-w-2xl mx-auto mt-12 text-center">
      <h1 className="text-4xl font-bold mb-4">🎨 ColorMuse</h1>
      <p className="mb-6 text-gray-500">당신만의 감각적인 팔레트를 만나보세요</p>

      <button
        onClick={() => refetch()}
        className="px-4 py-2 mb-6 bg-black text-white rounded hover:opacity-80"
      >
        새로운 팔레트 🎲
      </button>

      {isLoading ? (
        <p>로딩 중...</p>
      ) : colors ? (
        <Palette colors={colors} />
      ) : (
        <p>색상 불러오기에 실패했습니다 😢</p>
      )}
    </div>
  )
}

export default Home
