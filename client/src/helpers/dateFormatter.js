const dateFormatter = (strDate, outputFormat) => {
  if(outputFormat==='long'){                    //get string as YYMMDD, return string as YYYY/MM/DD
    const day = strDate.slice(4,6);
    const month = strDate.substring(2,4);
    const year = '20' + strDate.substring(0,2);
    return `${year}/${month}/${day}`;
  } 
  else if (outputFormat==='short'){             //get string as YYYY/MM/DD, return string as YYMMDD
    let date = strDate.toString().replace(/\//g,'');
    date = date.slice(2,8);
    return date;
  }
}

module.exports = dateFormatter;