export const restAPIHelper = () => {
    
    const callAPI = async (endpointurl, options = {}) => {
        const defaultHTTPMethod = "GET"
        const defaultHTTPHeaders = {  //set defaultHeaders of Http request
            "Content-Type": "application/json",
            Accept: "application/json",
        }
        const controller = new AbortController() //using  AbortController to cancel ongoing fetch requests
        options.signal = controller.signal

        options.method = options.method || defaultHTTPMethod

        options.headers = options.headers
            ? { ...defaultHTTPHeaders, ...options.headers }
            : defaultHTTPHeaders

        options.body = JSON.stringify(options.body) || false
        if (!options.body) delete options.body

        setTimeout(() => { // cancel request if it will take more then 5s 
            controller.abort()
        }, 5000)

        try {
            const apiResponse = await fetch(endpointurl, options)
            return await apiResponse.json()
        } catch (err) {
            return err
        }
    }

    //calling get API For fetching data
    const get = (endpointurl, options = {}) => callAPI(endpointurl, options)

    //Post to insert 
    const postCreate = (endpointurl, options) => {
        options.method = "POST"
        return callAPI(endpointurl, options)
    }


    //Put Api calling
    const putUpdate = (endpointurl, options) => {
        options.method = "PUT"
        return callAPI(endpointurl, options)
    }

    //Delete Api calling
    const deletedata = (endpointurl, options) => {
        options.method = "DELETE"
        return callAPI(endpointurl, options)
    }

    return {
        get,
        postCreate,
        putUpdate,
        deletedata,
    }
}