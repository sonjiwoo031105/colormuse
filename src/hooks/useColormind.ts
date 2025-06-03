import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const fetchColors = async () => {
    const res = await axios.post("/api/colormind", {
        model: "default",
        input: ["N", "N", "N", "N", "N"],
    });

    const result = res.data.result;

    if (!result) {
        throw new Error("색상 정보를 가져오지 못했습니다.");
    }

    return result;
}

export const useColormind = () => {
    return useQuery({
        queryKey: ["colors"],
        queryFn: fetchColors,
        refetchOnWindowFocus: false,
    });
}
