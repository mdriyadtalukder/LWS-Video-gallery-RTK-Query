import { useState } from "react";
import TextArea from "../ui/TextArea";
import TextInput from "../ui/TextInput";
import { useEditVideoMutation } from "../../rtk_query/features/api/apiSlice";
import Success from "../ui/Success";
import Error from "../ui/Error";

export default function Form({ video }) {
    const { id, title: title1, author: author1, description: description1, link: link1, thumbnail: thumbnail1, date: date1, duration: duration1, views: views1 } = video;
    const [editVideo, { data: videos, isError, isLoading, isSuccess }] = useEditVideoMutation()
    const [title, setTitle] = useState(title1);
    const [author, setAuthor] = useState(author1);
    const [description, setDescription] = useState(description1);
    const [link, setLink] = useState(link1);
    const [thumbnail, setThumpnail] = useState(thumbnail1);
    const [date, setDate] = useState(date1);
    const [duration, setDuration] = useState(duration1);
    const [views, setViews] = useState(views1);
    const edit = (e) => {
        e.preventDefault();
        editVideo({
            id,
            data: {
                title, author, description, link, thumbnail, date, duration, views
            }

        })

    }
    return (
        <form method="POST" onSubmit={edit}>
            <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                            <TextInput title="Video Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <TextInput title="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
                        </div>

                        <div className="col-span-6">
                            <TextArea title="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>

                        <div className="col-span-6">
                            <TextInput title="YouTube Video link" value={link} onChange={(e) => setLink(e.target.value)} />
                        </div>

                        <div className="col-span-6">
                            <TextInput title="Thumbnail link" value={thumbnail} onChange={(e) => setThumpnail(e.target.value)} />
                        </div>

                        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                            <TextInput title="Upload Date" value={date} onChange={(e) => setDate(e.target.value)} />
                        </div>

                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                            <TextInput title="Video Duration" value={duration} onChange={(e) => setDuration(e.target.value)} />
                        </div>

                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                            <TextInput title="Video no of views" value={views} onChange={(e) => setViews(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                        disabled={isLoading}
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-500"
                    >
                        Save
                    </button>
                </div>
                {isSuccess && <Success message="Video was edited successfully" />}
                {isError && <Error message="There was an error"></Error>}
            </div>
        </form>
    );
}
