import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

interface dataType {
    alpha_two_code: string
    name: string
    country: string
    domains: string
    web_pages: string
    state_province: string
  }

const DetailPage = () => {
    const { name} = useParams();
    const storedData = JSON.parse(localStorage.getItem('universitiesData') as string);
    console.log("stored ", storedData)
    const findUniversity: dataType = storedData.find((university:dataType) => university.name === name  );
    console.log("data", findUniversity)

    return (
        <>
            <div>
                <h6>Name: {findUniversity.name} </h6>
                <h6>Name: {findUniversity.country} </h6>
                <h6>Name: {findUniversity.alpha_two_code} </h6>
            </div>
        </>
    )
}

export default DetailPage
