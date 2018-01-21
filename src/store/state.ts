export type SelectedObjectType = "project" | "user" | "file";

export type SelectedObjectState = {
    id: number,
    type: SelectedObjectType
}

export type TimelineState = {
    pendingEvents: any[],
    currentEvents: any[],
    hasMoreEvents: boolean
}

export type RootState = {
    selectedObject: SelectedObjectState,
    timeline: TimelineState
}