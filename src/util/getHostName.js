export default function getHostName() 
{
    if(import.meta.env.MODE === "development"){
        return "http://localhost:3000"
    }else{
        return "https://pick-a-place-8yuf.onrender.com"
    }
}