import ColorHarmony from './ColorHarmony';

interface ColorHarmonyModalProps {
  color: string
  onClose: () => void
}

export default function ColorHarmonyModal({ color, onClose }: ColorHarmonyModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100/50 cursor-default"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg mx-4 relative animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl cursor-pointer"
        >
          ✕
        </button>

        <ColorHarmony color={color} />
      </div>
    </div>
  )
}
