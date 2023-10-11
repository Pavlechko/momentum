export type Validation = (
    text: string,
    option?: {}
  ) => { isValid: boolean; helperText?: string };
  
  export type LengthOption = {
    min?: number;
    max?: number;
  };