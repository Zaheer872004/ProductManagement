
export const otpGenerator = () => {
    
    const value =  Math.floor(100000 + Math.random() * 900000);
    console.log(value)

    return value;
}
