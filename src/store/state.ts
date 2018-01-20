export type SelectedObjectType = "project" | "user" | "file";

export interface SelectedObjectState {
    id: number,
    type: SelectedObjectType
}

export interface RootState {
    selectedObject: SelectedObjectState
}