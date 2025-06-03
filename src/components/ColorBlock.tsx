type ColorBlockProps = {
    rgb: [number, number, number]
}

const ColorBlock = ({ rgb }: ColorBlockProps) => {
    const hex = `#${rgb.map(x => x.toString(16).padStart(2, "0")).join("")}`;

    const copyToClipboard  = () => {
        navigator.clipboard.writeText(hex);
    }
    
    return (
        <div
            className="flex-1 h-40 cursor-pointer"
            style={{ backgroundColor: hex }}
            onClick={copyToClipboard}
            title="Click to copy"
        >
            <p className="text-white text-sm text-center mt-2 drop-shadow">{hex}</p>
        </div>
    )
}

export default ColorBlock
