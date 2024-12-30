// const url: string = `https://api.openf1.org/`

export async function getData(url: string): Promise<any>{
    try{
        const response = await fetch(url)
        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
    // console.log(`Data received: ${data}`);
        return data
    }
    catch(error: any){
        console.error(`Error: ${error.message}`);
        throw error;
    }
}
