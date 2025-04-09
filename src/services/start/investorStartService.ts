import {useHttp} from "@hooks/http.hook.ts";
import {useCallback} from "react";
import {IMainTaskActivityRequest} from "@shared/investor/pipelineMainTask.ts";
import { API_ROUTES } from "@constants/apiRoutes.ts";
import {IMainTask, IPipelineResponse} from "@shared/investor/pipeline.ts";

export const useInvestorStartService = () => {
   const { loadingStatus, errorMessage, sendRequest } = useHttp();

   const addOrderActivity = useCallback(async (request: IMainTaskActivityRequest): Promise<void> => {
        return sendRequest({
            url: API_ROUTES.START_SERVICE.INVESTOR.ORDER_ACTIVITY,
            method: "POST",
            body: JSON.stringify(request)
        });
   }, [ sendRequest ]);

   const getAllPipelines = useCallback(async (): Promise<IPipelineResponse[]> => {
       return await sendRequest({
           url: API_ROUTES.START_SERVICE.INVESTOR.PIPELINE
       })
   }, [ sendRequest ]);

   const getPipelineMainTasks = useCallback(async (pipelineId: number): Promise<IMainTask[]> => {
       return await sendRequest({
           url: `${API_ROUTES.START_SERVICE.INVESTOR.PIPELINE}/${pipelineId}/main-task`,
       })
   }, [ sendRequest ]);

   const addInvestorPipelineStep = useCallback(async (pipelineId: number): Promise<void> => {
       return sendRequest({
           url: `${API_ROUTES.START_SERVICE.INVESTOR.PIPELINE_SUPPORT_STEP}/${pipelineId}`,
           method: "POST"
       })
   }, [ sendRequest ]);

    const addInvestorPipelineMainTask = useCallback(async (request: IMainTaskActivityRequest[]): Promise<void> => {
        return sendRequest({
            url: `${API_ROUTES.START_SERVICE.INVESTOR.PIPELINE_SUPPORT_STEP}`,
            method: "POST",
            body: JSON.stringify(request)
        })
    }, [ sendRequest ]);

    return {
        loadingStatus, errorMessage, addOrderActivity, getAllPipelines, getPipelineMainTasks, addInvestorPipelineMainTask, addInvestorPipelineStep,
    }
}