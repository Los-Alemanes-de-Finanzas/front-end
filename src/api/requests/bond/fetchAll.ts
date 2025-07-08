import unauthenticatedClient from "@/api/clients/unauthenticated";
import { HEADERS } from "@/misc/constants/api";
import { BOND_ROUTES } from "@/misc/constants/apiRoutes";
import { Bond } from "@/misc/types/Bond";
import { AxiosError } from "axios";


const fetchAllBonds = async () => {
    const client = unauthenticatedClient;

    try {
        const endpoint = BOND_ROUTES.ROUTE_GET_ALL();

        const response = await client.get<Bond[]>(endpoint, {
            headers: {
                [HEADERS.CONTENT_TYPE]: HEADERS.APPLICATION_JSON
            }
        })

        return response.data;
    } catch (error: unknown) {
        // 5. Handle errors
        if (error instanceof AxiosError) {
            const statusCode = error.response?.status || 'Unknown';
            const errorMessage = error.response?.data?.message || 'Failed to delete bond';
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

export default fetchAllBonds;