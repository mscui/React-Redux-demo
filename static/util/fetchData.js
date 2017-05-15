let fetchData = (opt) => {

    let ajax = $.ajax(opt).then((response)=>{
        if (response.errno === 0) {
            return response;
        }
    }, ()=>{
        console.log('fetch data fail.');
    });
    return ajax;
}

export default fetchData;