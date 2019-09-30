export const getPercentage=(data={})=>{
    console.log("pctgData1==..",data)
    let dv = 1;
    if(data.total != 0){
        dv = data.total
    }
    console.log("hihihihihi",((data.correct)/dv) * 100);

    let result=((data.correct /dv) * 100);
    return result;

    // if(result==NaN||result==Infinity){
    //   return 5;
    // }else{
    //   console.log("haha",result)
    //   return result;
  //  }
  }