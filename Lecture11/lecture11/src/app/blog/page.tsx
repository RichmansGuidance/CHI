import Blog from "@/components/Blog";
import { ExhibitsActions } from "@/api/exhibitsActions";
import React from "react";
import { BlogPagePropsI } from "@/Interfaces/BlogPagePropsI";

const ExhibitsPage: React.FC<BlogPagePropsI> = async ({ searchParams }) => {
    let { page=1, limit=10 } = await searchParams;

    try {
        const exhibitsData = await ExhibitsActions.exhibits(page, limit);
        return (
            <Blog
              initialExhibits={exhibitsData.data}
              page={Number(exhibitsData.page)}
              lastPage={exhibitsData.lastPage}
              limit={limit}
              showToaster={true}
            />
          );
    } catch (err) {
        console.error("Failed to fetch:", err);
        return <div>Failed to load exhibits.</div>;
    }
};

export default ExhibitsPage;
