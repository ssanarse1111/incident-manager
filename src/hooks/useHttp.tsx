import React, { useCallback, useState } from 'react';

interface RequestConfiguration {
    url: string;
    method?: string;
    headers?: any;
    body?: any;
}

export const useHttp = () => {

    const [responseData, setResponseData] = useState({ isLoading: true, isError: false, errorMessage: '', response: {} });

    const httpRequest = useCallback(async (requestConfig: RequestConfiguration, getData: Function) => {
        setResponseData(prev => ({ ...prev, isLoading: true, isError: false }));
        try {
            const response = await fetch(requestConfig.url, {
                method: requestConfig.method ? requestConfig.method : "GET",
                body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
                headers: requestConfig.headers ? requestConfig.headers : {}
            });
            if (!response.ok) {
                setResponseData(prev => ({ ...prev, isLoading: false, isError: true }))
                throw new Error(response.statusText)
            }
            else {
                const data = await response.json();
                getData(data);
                setResponseData(prev => ({ ...prev, isLoading: false, isError: false, response: response }));
            }
        } catch (error: any) {
            setResponseData(prev => ({ ...prev, errorMessage: error.message }));
        }
    }, []);

    return { responseData, httpRequest };

}
