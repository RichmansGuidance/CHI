export interface ActionsBarPropsI {
    expanded: boolean;
    toggleExpand: () => void;
    showAddComment: boolean;
    toggleAddComment: () => void;
    onDelete: () => void;
    isOwner: boolean;
    isDeleting: boolean;
}
