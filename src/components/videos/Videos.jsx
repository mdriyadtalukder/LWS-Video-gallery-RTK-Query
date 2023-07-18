import { useGetVideosQuery } from "../../rtk_query/features/api/apiSlice";
import Error from "../ui/Error";
import VideoLoader from "../ui/loaders/VideoLoader";
import Video from "./Video";

export default function Videos() {
    const { data: videos, isError, isLoading } = useGetVideosQuery() //data k videos e rename kora holo data:videos ei vbe.
    let content = null;
    if (isLoading) {
        content = <><VideoLoader></VideoLoader>
            <VideoLoader></VideoLoader>
            <VideoLoader></VideoLoader>
            <VideoLoader></VideoLoader></>
    }
    if (!isLoading && isError) {
        content = <Error message="There was an error"></Error>
    }
    if (!isError && !isLoading && videos?.length === 0) {
        content = <Error message="No video found"></Error>

    }
    if (!isError && !isLoading && videos?.length > 0) {
        content = videos.map(video => <Video video={video} key={video?.id}></Video>)
    }


    return content;
}
