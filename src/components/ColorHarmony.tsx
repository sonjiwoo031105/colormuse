import { useState } from 'react';
import { useQueries } from '@tanstack/react-query';
import { generateAnalogousColors, generateComplementaryColors, generateTriadicColors } from '../utils/harmony';
import type { RGB } from '../utils/colorUtils';
import { fetchColorName } from '../utils/fetchColorName';
import toast from 'react-hot-toast';

const harmonyOptions = ['triadic', 'complementary', 'analogous'] as const;
export type HarmonyType = (typeof harmonyOptions)[number];

export default function ColorHarmony({ color }: { color: string }) {
  const [baseColor, setBaseColor] = useState(color);
  const [harmonyType, setHarmonyType] = useState<HarmonyType>('triadic');

  const baseRgb: RGB = [
    parseInt(baseColor.slice(1, 3), 16),
    parseInt(baseColor.slice(3, 5), 16),
    parseInt(baseColor.slice(5, 7), 16),
  ];

  const harmonyColors =
    harmonyType === 'triadic'
      ? generateTriadicColors(baseRgb)
      : harmonyType === 'complementary'
        ? generateComplementaryColors(baseRgb)
        : generateAnalogousColors(baseRgb);

  const nameQueries = useQueries({
    queries: harmonyColors.map((hex) => ({
      queryKey: ['colorName', hex],
      queryFn: () => fetchColorName(hex),
    })),
  });

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
    toast.success(`${color} 복사됨!`);
  }

  return (
    <div className="flex flex-col items-center gap-6 p-6 w-full max-w-xl mx-auto">
      <h2 className="text-xl font-bold text-gray-800">🎨 Color Harmony</h2>

      {/* 기준 색상 선택 */}
      <div className="flex flex-col items-center">
        <input
          type="color"
          value={baseColor}
          onChange={(e) => setBaseColor(e.target.value)}
          className="input-color w-24 h-24 rounded-full border-4 border-white shadow-md cursor-pointer"
          style={{ backgroundColor: baseColor }}
        />
        <p
          className="mt-2 text-sm text-gray-600 cursor-copy"
          onClick={() => copyToClipboard(baseColor)}
          title="클릭하면 복사됩니다"
        >
          {baseColor}
        </p>

        {/* 조화 방식 선택 */}
        <div className="flex items-center gap-2 mt-3">
          <select
            value={harmonyType}
            onChange={(e) => setHarmonyType(e.target.value as HarmonyType)}
            className="px-3 py-2 text-sm rounded-md border shadow bg-white"
          >
            <option value="triadic">Triadic (삼각 조화)</option>
            <option value="complementary">Complementary (보색)</option>
            <option value="analogous">Analogous (유사색)</option>
          </select>
        </div>
      </div>

      {/* 조화 색상 카드 */}
      <div className={`grid ${harmonyColors.length === 2 ? 'grid-cols-2' : 'grid-cols-3'} gap-4`}>
        {harmonyColors.map((hex, idx) => {
          const { data: name, isLoading } = nameQueries[idx];

          return (
            <div
              key={idx}
              className="w-20 h-20 rounded-lg shadow-md flex flex-col items-center justify-center text-white p-2 text-center cursor-copy"
              style={{ backgroundColor: hex }}
              onClick={() => copyToClipboard(hex)}
              title="클릭하면 복사됩니다"
            >
              <span className="text-xs font-medium">{hex}</span>
              <span className="text-[10px] mt-1 text-white/80">
                {isLoading ? '불러오는 중...' : name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
