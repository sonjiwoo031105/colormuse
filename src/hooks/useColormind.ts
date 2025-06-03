import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const fetchColors = async () => {
    const res = await axios.post("https://colormind.io/api/", {
        model: "default",
        input: ["N", "N", "N", "N", "N"],
    })
    return res.data.result
}

export const useColormind = () => {
    return useQuery({
        queryKey: ["colors"],
        queryFn: fetchColors,
        refetchOnWindowFocus: false,
    })
}
