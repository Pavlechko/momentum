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
              responseData.Background = res.Background
              responseData.Exchange = res.Exchange
              responseData.Market = res.Market
              responseData.Settings = res.Settings
              setData(res)
            } else {
              console.log("Something went wrong! Data is empty. Initial data will be displayed.")
            }
          })
      }
    }, [user.loggedIn])

    const [data, setData] = useState<ResponseData>(responseData);

    useEffect(() => {
      localStorage.setItem("data", JSON.stringify(data));
    }, [data])


    console.log("Data Context", data);

    return (
        <DataContext.Provider value={{ data, setData}} >
            {children}
        </DataContext.Provider>
    )
}