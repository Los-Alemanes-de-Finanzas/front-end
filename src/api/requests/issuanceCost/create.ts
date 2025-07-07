import unauthenticatedClient from "@/api/clients/unauthenticated";
import { HEADERS } from "@/misc/constants/api";
import { ISSUANCE_COSTS_ROUTES } from "@/misc/constants/apiRoutes";
import { IssuanceCost } from "@/misc/types/IssuanceCost";
import { AxiosError } from "axios";

const createIssuanceCost = async (newIssuanceCost : IssuanceCost) => {
    // 1. Create an authenticated client using the access token
    const client = unauthenticatedClient;

    // 2. create try catch block
    try {
        // 3. Define the endpoint
        const endpoint = ISSUANCE_COSTS_ROUTES.ROUTE_CREATE();

        // 4. Make a POST request to the endpoint using the client
        await client.post<IssuanceCost>(endpoint, newIssuanceCost, {
            headers: {
                [HEADERS.CONTENT_TYPE]: HEADERS.APPLICATION_JSON,
            }
        })
    } catch (error: unknown) {
         // 5. Handle errors
        if (error instanceof AxiosError) {
            const statusCode = error.response?.status || 'Unknown';
            const errorMessage = error.response?.data?.message || 'Failed to create bulk variation';
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