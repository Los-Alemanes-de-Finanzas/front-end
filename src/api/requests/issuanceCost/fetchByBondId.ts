import unauthenticatedClient from "@/api/clients/unauthenticated";
import { HEADERS } from "@/misc/constants/api";
import { ISSUANCE_COSTS_ROUTES } from "@/misc/constants/apiRoutes";
import { IssuanceCost } from "@/misc/types/IssuanceCost";
import { AxiosError } from "axios";

const fetchIssuanceCostByBondId = async (id: string): Promise<IssuanceCost> => {
    const client = unauthenticatedClient;

    try {
        const endpoint = ISSUANCE_COSTS_ROUTES.ROUTE_GET_ALL();
        
        const response = await client.get<IssuanceCost[]>(endpoint, {
            headers: {
                [HEADERS.CONTENT_TYPE]: HEADERS.APPLICATION_JSON,
            },
        });
        
        const bondResult = response.data.find(e => e.bondId.toString() == id);
        console.log(bondResult);
        return bondResult!;
    } catch(error: unknown) {
        // 5. Handle errors
        if (error instanceof AxiosError) {
            const statusCode = error.response?.status || 'Unknown';
            const errorMessage = error.response?.data?.message || 'Failed to delete commodity';

            console.error('AxiosError occurred:', {
                statusCode,
                errorMessage,
            });
            throw new Error(`${statusCode}: ${errorMessage}`);
        } else if (error instanceof Error) {
            console.error('An unexpected error occurred:', {
                message: error.message,
                stack: error.stack
            });
            throw new Error('An unexpected error occurred');
        } else {
            console.error('An unknown error occurred:', error);
            throw new Error('An unknown error occurred');
        }
    }
}

export default fetchIssuanceCostByBondId;