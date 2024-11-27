"use client";
import React, { useEffect, useState, useCallback } from "react";
import { RootState } from "@/store/store";
import { Box, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const ProtectedRoute = <P extends object>(WrappedComponent: React.FC<P>) => {
    const ProtectedRoute: React.FC<P> = (props) => {
        const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
        const [isLoading, setIsLoading] = useState(true);
        const router = useRouter();

        const redirectToLogin = useCallback(() => {
            if (!isAuthenticated) {
                router.push('/login');
            } else {
                setIsLoading(false);
            }
        }, [isAuthenticated, router]);

        useEffect(() => {
            redirectToLogin();
        }, [redirectToLogin]);

        if (isLoading) {
            return (
                <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                    <CircularProgress />
                </Box>
            );
        }

        return <WrappedComponent {...props} />;
    };

    return React.memo(ProtectedRoute); 
};

export default ProtectedRoute;
