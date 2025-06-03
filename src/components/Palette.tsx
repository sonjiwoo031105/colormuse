import ColorBlock from "./ColorBlock";

type PaletteProps = {
    colors: [number, number, number][]
}

const Palette = ({ colors }: PaletteProps) => {
    return (
        <div className="flex w-full gap-2 rounded-xl overflow-hidden shadow-lg">
            {colors.map((rgb, idx) => (
                <ColorBlock key={idx} rgb={rgb} />
            ))}
        </div>
    )
}

export default Palette
