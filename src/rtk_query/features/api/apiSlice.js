import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:9000"
    }),
    tagTypes: ["videos", "video", "relatedVideos"],
    endpoints: (builder) => ({
        getVideos: builder.query({
            query: () => '/videos',
            keepUnusedDataFor: 600, //600 seconde..default vabe 60s ba 1 min thke..
            providesTags: ["videos"]
        }),
        getVideo: builder.query({
            query: (id) => `videos/${id}`,
            providesTags: (result, error, arg) => [{ type: 'video', id: arg }]
        }),
        getRelatedVideos: builder.query({
            ///videos?title_like=css&title_like=react
            query: ({ id, title }) => {
                const tags = title.split(" ");
                const queries = tags.map((tag) => `title_like=${tag}`);
                const queryString = `videos?${queries.join("&")}&_limit=4`;
                return queryString;
            },
            providesTags: (result, error, arg) => [{ type: "relatedVideos", id: arg.id }]
        }),
        addVideos: builder.mutation({
            query: (data) => ({
                url: "/videos",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["videos"]
        }),
        editVideo: builder.mutation({
            query: ({ id, data }) => ({
                url: `videos/${id}`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: (result, error, arg) => ["videos", { type: "video", id: arg.id }, { type: "relatedVideos", id: arg.id }]

        }),
        deleteVideo: builder.mutation({
            query: (id) => ({
                url: `videos/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["videos"]
        })
    })

})
export const { useGetVideosQuery, useGetVideoQuery, useGetRelatedVideosQuery, useAddVideosMutation, useEditVideoMutation ,useDeleteVideoMutation} = apiSlice