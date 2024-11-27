"use client";
import React from "react";
import CreateExhibitForm from "@/components/Posts/CreateExhibitForm";
import ProtectedRoute from "@/utils/ProtectedRoute";

const CreatePost: React.FC = () => {
    return <CreateExhibitForm />
}

export default ProtectedRoute(CreatePost);