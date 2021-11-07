const newDate = (date)=>
{
    if(!date)
    {
        return null;
    }
    const day = date.substring(0,2);
    const month = date.substring(3,5);
    const year = date.substring(6);
    const newDate = `${year}-${month}-${day}`;
    return newDate;
}

module.exports = {newDate};