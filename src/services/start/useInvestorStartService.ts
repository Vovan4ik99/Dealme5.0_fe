import {useHttp} from "@hooks/http.hook.ts";
import {useCallback} from "react";
import {API_ROUTES} from "@constants/apiRoutes.ts";
import {
    IBuyerPersonResponse,
    ICompanySizeResponse,
    IMainTask,
    IMainTaskActivityRequest,
    IPipelineResponse,
    IProductCreateRequest,
    IProductPatchRequest,
    IProductResponse
} from "@shared/start-service/investorStartServiceTypes.ts";


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

    const addInvestorMainTaskActivity = useCallback(async (request: IMainTaskActivityRequest[]): Promise<void> => {
        return sendRequest({
            url: `${API_ROUTES.START_SERVICE.INVESTOR.PIPELINE_SUPPORT_STEP}`,
            method: "POST",
            body: JSON.stringify(request)
        })
    }, [ sendRequest ]);

    const getCompanySize = useCallback(async (): Promise<ICompanySizeResponse[]> => {
        return await sendRequest({
            url: API_ROUTES.START_SERVICE.INVESTOR.COMPANY_SIZE
        })
    }, [ sendRequest ]);

    const getBuyerPerson = useCallback(async (): Promise<IBuyerPersonResponse[]> => {
        return await sendRequest({
            url: API_ROUTES.START_SERVICE.INVESTOR.BUYER_PERSON
        })
    }, [ sendRequest ]);

    const createProduct = useCallback(async (body: IProductCreateRequest): Promise<IProductResponse> => {
        return sendRequest({
            url: API_ROUTES.START_SERVICE.INVESTOR.PRODUCTS,
            method: "POST",
            body: JSON.stringify(body)
        })
    }, [ sendRequest ]);

    const deleteProduct = useCallback(async (id: number): Promise<void> => {
        return sendRequest({
            url: `${API_ROUTES.START_SERVICE.INVESTOR.PRODUCTS}/${id}`,
            method: "DELETE",
        })
    }, [ sendRequest ]);

    const updateProduct = useCallback(async (body: IProductPatchRequest , id: number): Promise<void> => {
        return sendRequest({
            url: `${API_ROUTES.START_SERVICE.INVESTOR.PRODUCTS}/${id}`,
            method: "PATCH",
            body: JSON.stringify(body)
        })
    }, [ sendRequest ]);

    return {
        loadingStatus, errorMessage, addOrderActivity, getAllPipelines, getPipelineMainTasks, addInvestorMainTaskActivity, addInvestorPipelineStep,
        getCompanySize, getBuyerPerson, createProduct, deleteProduct, updateProduct
    }
}