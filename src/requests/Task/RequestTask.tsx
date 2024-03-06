import { createSlice } from "@reduxjs/toolkit";
import TaskApi from "src/api/Task/ApiTask";
import { IGetTaskDetailsBody } from "src/interfaces/Task/ITask";
import { AppThunk } from "src/store";


const Taskslice = createSlice({
    name: 'Task',
    initialState: {
        AddTaskMsg: '',
        TaskList: [],
        TaskDetails: null,
        updateTaskdetailsMsg: '',
        deleteTaskdetailsMsg: '',
        TaskSubjectList: [],
        TaskTypeList: [],
        Loading: true
    },
    reducers: {
        getTaskSubjectList(state, action) {
            state.Loading = false;
            state.TaskSubjectList = action.payload;
        },
        getLoading(state, action) {
            state.Loading = true;
        },
        getTaskDetails(state, action) {
            state.Loading = false;
            state.TaskDetails = action.payload;
        },
    }
});

export const getTaskDetails =
    (data: IGetTaskDetailsBody): AppThunk =>
        async (dispatch) => {
            dispatch(Taskslice.actions.getLoading(true));
            const response = await TaskApi.GetTaskDetailsApi(data);

            dispatch(Taskslice.actions.getTaskDetails(response.data));
        };

export const getTaskSubjectList =
    (): AppThunk =>
        async (dispatch) => {
            dispatch(Taskslice.actions.getLoading(true));
            const response = await TaskApi.GetTaskSubjectListApi();
            const responseData = response.data.map((Item, i) => {
                return {
                    Id: Item.TaskSubjectId,
                    Name: Item.TaskSubjectName,
                    Value: Item.TaskSubjectId.toString()
                };
            });
            dispatch(Taskslice.actions.getTaskSubjectList(responseData));
        };

export default Taskslice.reducer;