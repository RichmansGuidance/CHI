import toast from 'react-hot-toast';

const useToast = () => {
    const successNotification = (message: string) => {
        toast.success(message, {
            duration: 6000,
            position: 'top-left',
        });
    };

    const newExhibitNotification = (message: string) => {
        toast.success(message, {
            duration: 6000,
            position: 'top-left',
            icon: '🚀',
        });
    };

    return { successNotification, newExhibitNotification };
};

export default useToast;