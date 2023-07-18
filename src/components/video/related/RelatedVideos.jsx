import { useGetRelatedVideosQuery } from "../../../rtk_query/features/api/apiSlice";
import Error from "../../ui/Error";
import RelatedVideoLoader from "../../ui/loaders/RelatedVideoLoader";
import RelatedVideo from "./RelatedVideo";

export default function RelatedVideos({ id, title }) {
    const { data: rvideo, isError, isLoading } = useGetRelatedVideosQuery({ id, title });
    console.log(rvideo, title)

    let content = null;
    if (isLoading) {
        content = <>
            <RelatedVideoLoader></RelatedVideoLoader>
            <RelatedVideoLoader></RelatedVideoLoader>
            <RelatedVideoLoader></RelatedVideoLoader>
        </>
    }
    if (!isLoading && isError) {
        content = <Error message="There was an error"></Error>
    }
    if (!isError && !isLoading && rvideo?.length === 0) {
        content = <Error message="No Videos find!"></Error>
    }
    if (!isError && !isLoading && rvideo?.length > 0) {
        content = rvideo.map(v => <RelatedVideo key={v?.id} v={v} />)
    }
    return (
        <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">
            {content}
        </div>
    );
}
