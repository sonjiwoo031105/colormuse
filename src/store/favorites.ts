import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type { RGB } from '../utils/colorUtils'

interface FavoritesState {
    favorites: RGB[]
    addFavorite: (color: RGB) => void
    removeFavorite: (index: number) => void
    isDuplicate: (color: RGB) => boolean
}

export const useFavoritesStore = create<FavoritesState>()(
    devtools(
        persist(
            (set, get) => ({
                favorites: [],
                addFavorite: (color) => {
                    if (get().isDuplicate(color)) return
                    set((state) => ({ favorites: [...state.favorites, color] }), false, 'addFavorite')
                },
                removeFavorite: (index) => {
                    set((state) => ({
                        favorites: state.favorites.filter((_, i) => i !== index),
                    }), false, 'removeFavorite')
                },
                isDuplicate: (color) => {
                    return get().favorites.some((fav) =>
                        JSON.stringify(fav) === JSON.stringify(color)
                    )
                },
            }),
            {
                name: 'colormuse-favorites-storage',
            }
        ),
        { name: 'FavoritesStore' }
    )

)
