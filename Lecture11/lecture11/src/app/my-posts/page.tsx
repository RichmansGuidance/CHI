import Blog from "@/components/Blog";
import { ExhibitsActions } from "@/api/exhibitsActions";
import React from "react";
import { MyPostsPagePropsI } from "@/Interfaces/MyPostsPagePropsI";

const MyPosts: React.FC<MyPostsPagePropsI> = async ({ searchParams }) => {
    let { page=1, limit=10 } = await searchParams;

    try {
        const exhibitsData = await ExhibitsActions.myExhibits(page, limit);
        return (
            <Blog
              initialExhibits={exhibitsData.data}
              page={Number(exhibitsData.page)}
              lastPage={exhibitsData.lastPage}
              limit={limit}
              showToaster={false}
            />
          );
    } catch (err) {
        console.error("Failed to fetch exhibits:", err);
        return <div>Failed to load exhibits. Please try again later.</div>;
    }
};

export default MyPosts;
