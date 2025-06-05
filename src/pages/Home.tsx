import PaletteView from "../components/PaletteView";
import { useColormind } from "../hooks/useColormind";

const Home = () => {
  const { data: colors, isLoading, refetch } = useColormind();

  return (
    <main className="p-4 max-w-2xl mx-auto my-12 text-center">
      <h1 className="text-4xl font-bold mb-4">🎨 ColorMuse</h1>
      <p className="mb-6 text-gray-500">당신만의 감각적인 팔레트를 만나보세요</p>

      <button
        onClick={() => refetch()}
        className="px-4 py-2 mb-6 rounded cursor-pointer bg-stone-50 text-gray-600 hover:text-gray-800 transition"
      >
        새로운 팔레트 🎲
      </button>

      {isLoading ? (
        <p>로딩 중...</p>
      ) : colors ? (
        <PaletteView colors={colors} />
      ) : (
        <p>색상 불러오기에 실패했습니다 😢</p>
      )}
    </main>
  )
}

export default Home
