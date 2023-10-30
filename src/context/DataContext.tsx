import { createContext, useState, Dispatch, SetStateAction, ReactNode, useEffect, useContext } from "react";
import { getData } from "../services/api.service";
import { initialData } from "../utils/initialData";
import { ResponseData } from "../models/response.types";
import { UserContext } from "./UserContext";


export interface DataContextInterface {
    data: ResponseData,
    setData: Dispatch<SetStateAction<ResponseData>>
}

const defaultState = {
    data: initialData,
    setData: (data: ResponseData) => {}
} as DataContextInterface

export const DataContext = createContext(defaultState);

type DataProviderProps = {
    children: ReactNode
}

export const DataProvider = ({ children }: DataProviderProps) => {
  const { user } = useContext(UserContext)

  const responseData = initialData;
    
    useEffect(() => {
        if (user.loggedIn) {
          
          getData()
            .then(data => {
              if (data) {
                const res = data.data as ResponseData
                console.log(res)
                responseData.Weather = res.Weather;
                responseData.Quote = res.Quote;
                responseData.Backgroung = res.Backgroung
                responseData.Exchange = res.Exchange
                setData(res)
              } else {
                console.log("from else")
              }
            })
        }
      }, [user.loggedIn])

    const [data, setData] = useState<ResponseData>(responseData);

    console.log("Data Context", data);

    return (
        <DataContext.Provider value={{ data, setData}} >
            {children}
        </DataContext.Provider>
    )
}