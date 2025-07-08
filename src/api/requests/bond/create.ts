import unauthenticatedClient from "@/api/clients/unauthenticated";
import { HEADERS } from "@/misc/constants/api";
import { BOND_ROUTES } from "@/misc/constants/apiRoutes";
import { Bond } from "@/misc/types/Bond";
import { IssuanceCost } from "@/misc/types/IssuanceCost";
import { AxiosError } from "axios";


const createBond = async (newBond : Bond) => {
    // 1. Create an authenticated client using the access token
    const client = unauthenticatedClient;

    // 2. create try catch block
    try {
        // 3. Define the endpoint
        const endpoint = BOND_ROUTES.ROUTE_CREATE();

        // 4. Make a POST request to the endpoint using the client
        const response = await client.post<Bond>(endpoint, newBond, {
            headers: {
                [HEADERS.CONTENT_TYPE]: HEADERS.APPLICATION_JSON,
            }
        })

        console.log(response.status)
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

export default createBond;